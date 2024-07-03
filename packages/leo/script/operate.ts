import * as path from "path"
import * as fs from "fs/promises"
import { Argument, Command } from "commander"
import "dotenv/config"
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
  importAleo
} from "spectre"
import { BUILD_DIR, exec, ProgramJson } from "./util"
import config from "../config.json"
import assert from "assert"

const PRIVATE_KEY = process.env.PRIVATE_KEY
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY || PRIVATE_KEY
const STAKING_ADMIN_PRIVATE_KEY = process.env.STAKING_ADMIN_PRIVATE_KEY || ADMIN_PRIVATE_KEY
const STAKING_OPERATOR_PRIVATE_KEY = process.env.STAKING_OPERATOR_PRIVATE_KEY || STAKING_ADMIN_PRIVATE_KEY

async function execute(programPath: string, func: string, inputs: string[], privateKey: string) {
  const { stdout, stderr } = await exec(`leo execute --private-key ${privateKey} -b ${func} ${inputs.join(" ")}`, {
    cwd: programPath,
  })
  if (stdout) {
    console.log(stdout)
  }
  if (stderr) {
    console.error(stderr)
  }
}

async function run(programPath: string, func: string, inputs: string[]) {
  const { stdout } = await exec(`leo run -q --non-recursive ${func} ${inputs.join(" ")}`, {
    cwd: programPath,
  })
  return stdout.trim()
}

async function query(programPath: string, mapping: string, key: string) {
  const programJsonPath = path.join(programPath, "program.json")
  const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson

  let { stdout } = await exec(`leo query program -q --mapping-value ${mapping} '${key}' ${programJson.program}`, {
    cwd: programPath,
  })
  return stdout.trim()
}

function programPath(program: string, cloneNo?: string) {
  program = `${program}${cloneNo ? "_" + cloneNo : ""}`
  return path.join(BUILD_DIR, program)
}

const program = new Command()
program.name("operate").description("CLI to spectre operations").version("0.0.1")

program
  .command("initialize-acl")
  .description("initialize Access Control and ACL")
  .action(async () => {
    const accessControl = new AccessControlProgram(async (mapping: string, key: string) => {
      return await query(programPath("access_control"), mapping, key)
    })

    if (!(await accessControl.isInitialized())) {
      await execute(programPath("access_control"), "initialize", [], ADMIN_PRIVATE_KEY)
    } else {
      console.log("Access Control is already initialized")
    }

    const { Account } = await importAleo()
    const stakingAdminAccount = new Account({
      privateKey: STAKING_ADMIN_PRIVATE_KEY,
    })
    const stakingAdminAddress = stakingAdminAccount.address().to_string()
    const stakingOperatorAccount = new Account({
      privateKey: STAKING_OPERATOR_PRIVATE_KEY,
    })
    const stakingOperatorAddress = stakingOperatorAccount.address().to_string()

    for (const [role, account] of [
      [STAKING_ADMIN_ROLE, stakingAdminAddress],
      [STAKING_OPERATOR_ROLE, stakingOperatorAddress],
    ] as [number, string][]) {
      if (!(await accessControl.hasRole(role, account))) {
        await execute(programPath("access_control"), "grant_role", [u8Str(role), account], ADMIN_PRIVATE_KEY)
      } else {
        console.log(`Account ${account} already has role ${roleStrings.get(role)}`)
      }
    }
  })

program
  .command("initialize-stcredits")
  .description("initialize the stcredits program")
  .action(async () => {
    const stcredits = new StCreditsProgram(async (mapping: string, key: string) => {
      return await query(programPath("stcredits"), mapping, key)
    })

    if (!(await stcredits.isInitialized())) {
      await execute(programPath("stcredits"), "initialize", [], STAKING_ADMIN_PRIVATE_KEY)
    }
  })

program
  .command("list-validators")
  .description("list validators who sustain the stcredits program")
  .action(async () => {
    const stcredits = new StCreditsProgram(async (mapping: string, key: string) => {
      return await query(programPath("stcredits"), mapping, key)
    })

    const delegators = new Map<string, string>()
    for (const i of Array(config.delegatorNum).keys()) {
      const cloneNo = (i + 1).toString().padStart(3, "0")
      const programJsonPath = path.join(programPath("delegator", cloneNo), "program.json")
      const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson
      const parts = (await run(programPath("delegator", cloneNo), "get_address", [])).split(" ")
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
      const bonded = await stcredits.getValidatorBonded(validator)
      console.log(`    Bonded: ${Number(bonded) / 1e6}`)
      // TODO: get bonded from on-chain
    }
  })

program
  .command("add-validator")
  .description("add validator for the stcredits program")
  .argument("<validator>")
  .action(async (validator: string) => {
    const stcredits = new StCreditsProgram(async (mapping: string, key: string) => {
      return await query(programPath("stcredits"), mapping, key)
    })
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

    const stcredits = new StCreditsProgram(async (mapping: string, key: string) => {
      return await query(programPath("stcredits"), mapping, key)
    })
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

    const stcredits = new StCreditsProgram(async (mapping: string, key: string) => {
      return await query(programPath("stcredits"), mapping, key)
    })
    if (!(await stcredits.hasValidator(validator)) || validator !== (await stcredits.getValidator(index))) {
      console.log(`Validator ${validator} with index ${index} does not exist`)
      return
    }

    const cloneNo = (delegatorIndex + 1).toString().padStart(3, "0")
    await execute(programPath("delegator", cloneNo), "register", [u32Str(index), validator], STAKING_ADMIN_PRIVATE_KEY)
  })

const roles = {
  STAKING_ADMIN_ROLE,
  STAKING_OPERATOR_ROLE,
  POOL_ADMIN_ROLE,
  EMERGENCY_ADMIN_ROLE,
  RISK_ADMIN_ROLE,
  ASSET_LISTING_ADMIN_ROLE,
}

const roleStrings = new Map([
  [STAKING_ADMIN_ROLE, "STAKING_ADMIN_ROLE"],
  [STAKING_OPERATOR_ROLE, "STAKING_OPERATOR_ROLE"],
  [POOL_ADMIN_ROLE, "POOL_ADMIN_ROLE"],
  [EMERGENCY_ADMIN_ROLE, "EMERGENCY_ADMIN_ROLE"],
  [RISK_ADMIN_ROLE, "RISK_ADMIN_ROLE"],
  [ASSET_LISTING_ADMIN_ROLE, "ASSET_LISTING_ADMIN_ROLE"],
])

async function grantOrRevokeRole(action: "grant" | "revoke", role: string, account: string) {
  await execute(
    programPath("access_control"),
    `${action}_role`,
    [u8Str(roles[role as keyof typeof roles]), account],
    ADMIN_PRIVATE_KEY,
  )
}

const ROLES = [
  "STAKING_ADMIN_ROLE",
  "STAKING_OPERATOR_ROLE",
  "POOL_ADMIN_ROLE",
  "EMERGENCY_ADMIN_ROLE",
  "RISK_ADMIN_ROLE",
  "ASSET_LISTING_ADMIN_ROLE",
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
