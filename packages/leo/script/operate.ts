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
  u32Str,
  u8Str,
  importAleo,
  StateEnum,
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
  return await queryMappingValue("credits", mapping, key)
})
const stcredits = new StCreditsProgram(async (mapping: string, key: string) => {
  return await queryMappingValueFromPath(programPath("stcredits"), mapping, key)
}, credits)

const program = new Command()
program.name("operate").description("CLI to spectre operations").version("0.0.1")

program
  .command("acl-initialize")
  .description("initialize Access Control and ACL")
  .action(async () => {
    const accessControl = new AccessControlProgram(async (mapping: string, key: string) => {
      return await queryMappingValueFromPath(programPath("access_control"), mapping, key)
    })

    if (!(await accessControl.isInitialized())) {
      await execute(programPath("access_control"), "initialize", [], ADMIN_PRIVATE_KEY)
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
        await execute(programPath("access_control"), "grant_role", [u8Str(role), account], ADMIN_PRIVATE_KEY)
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
      await execute(programPath("stcredits"), "initialize", [], STAKING_ADMIN_PRIVATE_KEY)
    }
  })

program
  .command("stcredits-unpause")
  .description("unpause the stcredits program")
  .action(async () => {
    if (await stcredits.isPaused()) {
      await execute(programPath("stcredits"), "unpause", [], STAKING_ADMIN_PRIVATE_KEY)
    } else {
      console.warn("The stcredits program is not paused")
    }
  })

program
  .command("stcredits-pause")
  .description("pause the stcredits program")
  .action(async () => {
    if (!(await stcredits.isPaused())) {
      await execute(programPath("stcredits"), "pause", [], STAKING_ADMIN_PRIVATE_KEY)
    } else {
      console.warn("The stcredits program is already paused")
    }
  })

const stateStrings = new Map([
  [StateEnum.TOTAL_WITHDRAW_KEY, "Total withdraw"],
  [StateEnum.TOTAL_PENDING_WITHDRAW_KEY, "Total pending withdraw"],
  [StateEnum.TOTAL_BONDED_KEY, "Total bonded"],
  [StateEnum.TOTAL_UNBONDING_KEY, "Total unbonding"],
  [StateEnum.PROTOCOL_FEE_KEY, "Protocol fee"]
])

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
    if (!config || !config.initialized) {
      console.log("stcredits program is not initialized")
      return
    }
    console.log("Config:", config)

    console.log("State:")

    const totalSupply = await stcredits.getTotalSupply()
    console.log(`    Total supply: ${Number(totalSupply) / 1e6} stcredits`)

    const totalBuffered = await stcredits.getTotalBuffered()
    console.log(`    Total buffered: ${Number(totalBuffered) / 1e6} credits`)

    for (const key of [StateEnum.TOTAL_WITHDRAW_KEY,
      StateEnum.TOTAL_PENDING_WITHDRAW_KEY,
      StateEnum.TOTAL_BONDED_KEY,
      StateEnum.TOTAL_UNBONDING_KEY
    ]) {
      const state = await stcredits.getState(key)
      console.log(`    ${stateStrings.get(key)}: ${Number(state) / 1e6} credits`)
    }

    const protocolFee = await stcredits.getState(StateEnum.PROTOCOL_FEE_KEY)
    console.log(`    Protocol fee rate: ${protocolFee}%`)

    const pendingWithdrawResolved = await stcredits.getPendingWithdrawResolved()
    console.log(`    Pending withdraw resolved at: ${pendingWithdrawResolved}`)

    console.log("Cache:")
    const cacheState = await stcredits.getCacheState()
    console.log(`    Status: ${cacheStatusStrings.get(Number(cacheState.status))}`)
    console.log(`    Height: ${cacheState.height}`)
    console.log(`    Total bonded: ${Number(cacheState.total_bonded) / 1e6}`)
    console.log(`    Total unbonding: ${Number(cacheState.total_unbonding) / 1e6}`)
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

program
  .command("list-validators")
  .description("list validators who sustain the stcredits program")
  .action(async () => {
    const delegators = new Map<string, string>()
    for (let i = 0; i < config.delegatorNum; i++) {
      const delegatorPath = programPath("delegator", i + 1)
      const programJsonPath = path.join(delegatorPath, "program.json")
      const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson
      const parts = (await run(delegatorPath, "get_address", [])).split(" ")
      const delegatorAddress = parts[parts.length - 1]
      delegators.set(delegatorAddress, programJson.program)
    }

    console.log("Validators:")

    const count = await stcredits.getValidatorsCount()
    for (let i = 0; i < count; i++) {
      const validator = await stcredits.getValidator(i)
      if (!validator) {
        console.error(`Failed to get validator ${i}`)
        continue
      }
      console.log(`${i}. ${validator}`)
      const delegator = await stcredits.getValidatorDelegator(validator)
      if (!delegator) {
        console.log("    Delegator: None")
      } else {
        const delegatorProgram = delegators.get(delegator)
        console.log(`    Delegator: ${delegator}${delegatorProgram ? ` (${delegatorProgram})` : ""}`)
      }
      const bondedAmount = await stcredits.getValidatorBonded(validator)
      console.log(`    Bonded (at last cache): ${Number(bondedAmount) / 1e6}`)
      if (delegator) {
        const bonded = await stcredits.credits.getBonded(delegator)
        console.log(`    Bonded (actual): ${bonded ? Number(bonded.microcredits) / 1e6 : 0}`)
      }
    }
  })

program
  .command("add-validator")
  .description("add validator for the stcredits program")
  .argument("<validator>")
  .action(async (validator: string) => {
    if (await stcredits.hasValidator(validator)) {
      console.log(`Validator ${validator} already exists`)
      return
    }

    await execute(programPath("stcredits"), "add_validator", [validator], STAKING_ADMIN_PRIVATE_KEY)
  })

program
  .command("remove-validator")
  .description("remove validator (must have neither bonding nor unbonding) from the stcredits program")
  .argument("<validator-index>")
  .argument("<validator>")
  .action(async (validatorIndex: string, validator: string) => {
    const index = Number(validatorIndex)
    assert(Number.isInteger(index) && index >= 0, "invalid validator index")

    if (!(await stcredits.hasValidator(validator)) || validator !== (await stcredits.getValidator(index))) {
      console.log(`Validator ${validator} with index ${index} does not exist`)
      return
    }

    await execute(programPath("stcredits"), "remove_validator", [u32Str(index), validator], STAKING_ADMIN_PRIVATE_KEY)
  })

program
  .command("register-delegator")
  .description("register delegator program for specified validator for the stcredits program")
  .argument("<validator-index>")
  .argument("<validator>")
  .argument("<delegator-index>", "delegator program index (delegator number = index + 1)")
  .action(async (validatorIndex: string, validator: string, delegatorIndex: any) => {
    const index = Number(validatorIndex)
    assert(Number.isInteger(index) && index >= 0, "invalid validator index")

    delegatorIndex = Number(delegatorIndex)
    assert(Number.isInteger(delegatorIndex) && delegatorIndex >= 0, "invalid delegator index")

    if (!(await stcredits.hasValidator(validator)) || validator !== (await stcredits.getValidator(index))) {
      console.log(`Validator ${validator} with index ${index} does not exist`)
      return
    }

    await execute(programPath("delegator", delegatorIndex + 1), "register", [u32Str(index), validator], STAKING_ADMIN_PRIVATE_KEY)
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
    programPath("access_control"),
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
