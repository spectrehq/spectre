import * as path from "path"
import * as fs from "fs/promises"
import { Argument, Command } from "commander"
import assert from "assert"
import {
  AccessControlProgram,
  ASSET_LISTING_ADMIN_ROLE,
  EMERGENCY_ADMIN_ROLE,
  POOL_ADMIN_ROLE,
  RISK_ADMIN_ROLE,
  STAKING_ADMIN_ROLE,
  STAKING_OPERATOR_ROLE,
  StCreditsProgram,
  u8Str,
  importAleo,
  CacheStatus,
  initialize,
  CreditsProgram
} from "spectre"
import {
  ADMIN_PRIVATE_KEY,
  execute,
  ProgramJson,
  programPath,
  queryMappingValue,
  queryMappingValueFromPath,
  run,
  STAKING_ADMIN_PRIVATE_KEY,
  STAKING_OPERATOR_PRIVATE_KEY
} from "./util"
import config from "../config.json"

initialize(config)

const credits = new CreditsProgram(async (mapping: string, key: string) => {
  return await queryMappingValue(config.programs.credits, mapping, key)
})
const stcredits = new StCreditsProgram(async (mapping: string, key: string) => {
  return await queryMappingValueFromPath(programPath(config.programs.staking.stcredits), mapping, key)
}, credits)

const program = new Command()
program.name("operate").description("CLI to spectre operations").version("0.0.1")

program
  .command("acl-initialize")
  .description("initialize Access Control and ACL")
  .action(async () => {
    const accessControl = new AccessControlProgram(async (mapping: string, key: string) => {
      return await queryMappingValueFromPath(programPath(config.programs.spectre.accessControl), mapping, key)
    })

    if (!(await accessControl.isInitialized())) {
      await execute(programPath(config.programs.spectre.accessControl), "initialize", [], ADMIN_PRIVATE_KEY)
    } else {
      console.log("Access Control is already initialized")
    }

    const { Account } = await importAleo()
    const stakingAdminAccount = new Account({
      privateKey: STAKING_ADMIN_PRIVATE_KEY
    })
    const stakingAdminAddress = stakingAdminAccount.address().to_string()
    const stakingOperatorAccount = new Account({
      privateKey: STAKING_OPERATOR_PRIVATE_KEY
    })
    const stakingOperatorAddress = stakingOperatorAccount.address().to_string()

    for (const [role, account] of [
      [STAKING_ADMIN_ROLE, stakingAdminAddress],
      [STAKING_OPERATOR_ROLE, stakingOperatorAddress]
    ] as [number, string][]) {
      if (!(await accessControl.hasRole(role, account))) {
        await execute(programPath(config.programs.spectre.accessControl), "grant_role", [u8Str(role), account], ADMIN_PRIVATE_KEY)
      } else {
        console.log(`Account ${account} already has role ${roleStrings.get(role)}`)
      }
    }
  })

program
  .command("stcredits-initialize")
  .description("initialize the stcredits program")
  .action(async () => {
    if (!(await stcredits.isInitialized())) {
      await execute(programPath(config.programs.staking.stcredits), "initialize", [], STAKING_ADMIN_PRIVATE_KEY)
    }
  })

program
  .command("stcredits-unpause")
  .description("unpause the stcredits program")
  .action(async () => {
    if (await stcredits.isPaused()) {
      await execute(programPath(config.programs.staking.stcredits), "unpause", [], STAKING_ADMIN_PRIVATE_KEY)
    } else {
      console.warn("The stcredits program is not paused")
    }
  })

program
  .command("stcredits-pause")
  .description("pause the stcredits program")
  .action(async () => {
    if (!(await stcredits.isPaused())) {
      await execute(programPath(config.programs.staking.stcredits), "pause", [], STAKING_ADMIN_PRIVATE_KEY)
    } else {
      console.warn("The stcredits program is already paused")
    }
  })

const cacheStatusStrings = new Map([
  [CacheStatus.INVALID, "INVALID"],
  [CacheStatus.IN_PROGRESS, "IN_PROGRESS"],
  [CacheStatus.VALID, "VALID"]
])

program
  .command("stcredits-state")
  .description("show state of the stcredits program")
  .action(async () => {
    const config = await stcredits.getConfig()
    if (!config) {
      console.log("stcredits program is not initialized")
      return
    }
    console.log("Config:", config)

    console.log("State:")

    const totalSupply = await stcredits.getTotalSupply()
    console.log(`    Total supply: ${Number(totalSupply) / 1e6} stcredits`)

    const totalBuffered = await stcredits.getTotalBuffered()
    console.log(`    Total buffered: ${Number(totalBuffered) / 1e6} credits`)

    const state = await stcredits.getState()
    console.log(`    Total withdraw: ${Number(state.withdraw) / 1e6} credits`)
    console.log(`    Total pending withdraw: ${Number(state.pending_withdraw) / 1e6} credits`)
    console.log(`    Total bonded: ${Number(state.bonded) / 1e6} credits`)
    console.log(`    Total unbonding: ${Number(state.unbonding) / 1e6} credits`)
    console.log(`    Pending withdraw resolved height: ${state.resolved_height}`)

    console.log("Cache:")
    const cacheState = await stcredits.getCacheState()
    console.log(`    Status: ${cacheStatusStrings.get(Number(cacheState.status))}`)
    console.log(`    Height: ${cacheState.height}`)
    console.log(`    Total bonded: ${Number(cacheState.bonded) / 1e6}`)
    console.log(`    Total unbonding: ${Number(cacheState.unbonding) / 1e6}`)
    console.log(`    Next index: ${cacheState.next_index}`)
  })

program
  .command("stcredits-user-state")
  .argument("<user>")
  .description("show state of the user")
  .action(async (user: string) => {
    console.log(`User: ${user}`)
    const publicCredits = await credits.getPublicBalance(user)
    console.log(`Public balance: ${Number(publicCredits) / 1e6} credits`)
    const publicStcredits = await stcredits.getPublicBalance(user)
    console.log(`                ${Number(publicStcredits) / 1e6} stcredits`)
    const withdraw = await stcredits.getWithdraw(user)
    if (!withdraw) {
      console.log("Withdraw: None")
      return
    }
    console.log(`Withdraw: ${Number(withdraw.amount) / 1e6} credits, claimable height ${withdraw.height}, ${withdraw.pending ? "pending" : "not pending"}`)
  })

async function getDelegatorAddressAndProgramName(index: number) {
  const delegatorPath = programPath(config.programs.staking.delegator, index + 1)
  const programJsonPath = path.join(delegatorPath, "program.json")
  const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson
  const parts = (await run(delegatorPath, "get_address", [])).split(" ")
  const address = parts[parts.length - 1]
  return {
    address,
    program: programJson.program
  }
}

program
  .command("list-delegators")
  .description("list delegators who sustain the stcredits program")
  .action(async () => {
    const delegators = new Map<string, string>()
    for (let i = 0; i < config.delegatorNum; i++) {
      const { address, program } = await getDelegatorAddressAndProgramName(i)
      delegators.set(address, program)
    }

    console.log("Delegators:")

    const count = await stcredits.getDelegatorsCount()
    for (let i = 0; i < count; i++) {
      const delegator = await stcredits.getDelegator(i)
      if (!delegator) {
        console.error(`Failed to get delegator ${i}`)
        continue
      }
      const delegatorProgram = delegators.get(delegator.delegator)
      console.log(`${i}. ${delegator.delegator}${delegatorProgram ? ` (${delegatorProgram})` : ""}`)
      console.log(`    Validator: ${delegator.validator}`)
      console.log(`    Bonded (at last settlement): ${Number(delegator.bonded) / 1e6}`)
      const bonded = await stcredits.credits.getBonded(delegator.delegator)
      const unbonding = await stcredits.credits.getUnbonding(delegator.delegator)
      console.log(`    Bonded (actual): ${bonded ? Number(bonded.microcredits) / 1e6 : 0}`)
      console.log(`    Unbonding (actual): ${unbonding ? `${Number(unbonding.microcredits) / 1e6}, height: ${unbonding.height}` : 0}`)
    }
  })

program
  .command("unregister-delegator")
  .description("unregister delegator (must have neither bonding nor unbonding) from the stcredits program")
  .argument("<delegator-index>", "delegator program index (delegator number = index + 1)")
  .action(async (delegatorIndex: any) => {
    delegatorIndex = Number(delegatorIndex)
    assert(Number.isInteger(delegatorIndex) && delegatorIndex >= 0, "invalid delegator index")

    const { address: delegator } = await getDelegatorAddressAndProgramName(delegatorIndex)

    if (!(await stcredits.hasDelegator(delegator))) {
      console.log(`Delegator ${delegator} has not been registered`)
      return
    }

    await execute(programPath(config.programs.staking.stcredits), "unregister_delegator", [delegator], STAKING_ADMIN_PRIVATE_KEY)
  })

program
  .command("register-delegator")
  .description("register delegator program for specified validator for the stcredits program")
  .argument("<delegator-index>", "delegator program index (delegator number = index + 1)")
  .argument("<validator>")
  .action(async (delegatorIndex: any, validator: string) => {
    delegatorIndex = Number(delegatorIndex)
    assert(Number.isInteger(delegatorIndex) && delegatorIndex >= 0, "invalid delegator index")

    const { address: delegator } = await getDelegatorAddressAndProgramName(delegatorIndex)

    if (await stcredits.hasValidator(validator)) {
      console.log(`Validator ${validator} already exists`)
      return
    }
    if (await stcredits.hasDelegator(delegator)) {
      console.log(`Delegator ${delegator} has already been registered`)
      return
    }

    await execute(programPath(config.programs.staking.stcredits), "register_delegator", [delegator, validator], STAKING_ADMIN_PRIVATE_KEY)
  })

const roles = {
  STAKING_ADMIN_ROLE,
  STAKING_OPERATOR_ROLE,
  POOL_ADMIN_ROLE,
  EMERGENCY_ADMIN_ROLE,
  RISK_ADMIN_ROLE,
  ASSET_LISTING_ADMIN_ROLE
}

const roleStrings = new Map([
  [STAKING_ADMIN_ROLE, "STAKING_ADMIN_ROLE"],
  [STAKING_OPERATOR_ROLE, "STAKING_OPERATOR_ROLE"],
  [POOL_ADMIN_ROLE, "POOL_ADMIN_ROLE"],
  [EMERGENCY_ADMIN_ROLE, "EMERGENCY_ADMIN_ROLE"],
  [RISK_ADMIN_ROLE, "RISK_ADMIN_ROLE"],
  [ASSET_LISTING_ADMIN_ROLE, "ASSET_LISTING_ADMIN_ROLE"]
])

async function grantOrRevokeRole(action: "grant" | "revoke", role: string, account: string) {
  await execute(
    programPath(config.programs.spectre.accessControl),
    `${action}_role`,
    [u8Str(roles[role as keyof typeof roles]), account],
    ADMIN_PRIVATE_KEY
  )
}

const ROLES = [
  "STAKING_ADMIN_ROLE",
  "STAKING_OPERATOR_ROLE",
  "POOL_ADMIN_ROLE",
  "EMERGENCY_ADMIN_ROLE",
  "RISK_ADMIN_ROLE",
  "ASSET_LISTING_ADMIN_ROLE"
]

program
  .command("grant-role")
  .addArgument(new Argument("<role>", "role to grant").choices(ROLES))
  .argument("<address>", "account address")
  .action(async (role: string, account: string) => grantOrRevokeRole("grant", role, account))

program
  .command("revoke-role")
  .addArgument(new Argument("<role>", "role to revoke").choices(ROLES))
  .argument("<address>", "account address")
  .action(async (role: string, account: string) => grantOrRevokeRole("revoke", role, account))

await program.parseAsync()
