import * as path from "path"
import { fileURLToPath } from "url"
import * as child_process from "child_process"
import * as util from "util"
import fs from "fs/promises"
import "dotenv/config"
import { parsePlaintext } from "spectre"
import config from "../config.json"

export const exec = util.promisify(child_process.exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const VERSION = "v1"

export const ROOT_DIR = path.dirname(__dirname)
export const SPECTRE_DIR = path.join(ROOT_DIR, `spectre_${VERSION}`)
export const BUILD_DIR = path.join(ROOT_DIR, "build")

export function programPath(program: string, cloneNo?: number | string) {
  if (typeof cloneNo === "number") {
    cloneNo = cloneNo.toString().padStart(3, "0")
  }
  program = `${program}${cloneNo ? "_" + cloneNo : ""}`
  return path.join(BUILD_DIR, program)
}

export function addSuffix(name: string, cloneNo?: number | string) {
  if (typeof cloneNo === "number") {
    cloneNo = cloneNo.toString().padStart(3, "0")
  }
  const parts = name.split(".")
  return `${parts[0]}_${config.programSuffix}${cloneNo ? "_" + cloneNo : ""}.${parts[1]}`
}

export type ProgramJson = {
  program: string
  version: string
  description: string
  license: string
  dependencies: Dependency[]
}

export type Dependency = {
  name: string
  location: string
  network?: string
  path?: string
}

export const PRIVATE_KEY = process.env.PRIVATE_KEY
export const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY || PRIVATE_KEY
export const STAKING_ADMIN_PRIVATE_KEY = process.env.STAKING_ADMIN_PRIVATE_KEY || ADMIN_PRIVATE_KEY
export const STAKING_OPERATOR_PRIVATE_KEY = process.env.STAKING_OPERATOR_PRIVATE_KEY || STAKING_ADMIN_PRIVATE_KEY

export const ENDPOINT = process.env.ENDPOINT || "https://api.explorer.aleo.org/v1"

export async function execute(programPath: string, func: string, inputs: string[], privateKey: string) {
  const {
    stdout,
    stderr
  } = await exec(`leo execute -y -b --local --endpoint ${ENDPOINT} --private-key ${privateKey} ${func} ${inputs.join(" ")}`, {
    cwd: programPath
  })
  if (stdout) {
    console.log(stdout)
  }
  if (stderr) {
    console.error(stderr)
  }

  if (stdout) {
    const re = /Execution\s+(\w+)\s+.*has been broadcast to/
    const result = re.exec(stdout)
    if (result?.[1]) {
      const txId = result[1]
      const success = await queryTransaction(txId)
      if (success) {
        return
      }
    }
  }

  throw new Error("execution failed")
}

export async function run(programPath: string, func: string, inputs: string[]) {
  const { stdout } = await exec(`leo run -q --non-recursive ${func} ${inputs.join(" ")}`, {
    cwd: programPath
  })
  return stdout.trim()
}

export async function queryMappingValue(program: string, mapping: string, key: string) {
  let { stdout } = await exec(`leo query --endpoint ${ENDPOINT} program -q --mapping-value ${mapping} '${key}' ${program}`)
  return stdout.trim()
}

export async function queryMappingValueFromPath(programPath: string, mapping: string, key: string) {
  const programJsonPath = path.join(programPath, "program.json")
  const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson

  let { stdout } = await exec(`leo query --endpoint ${ENDPOINT} program -q --mapping-value ${mapping} '${key}' ${programJson.program}`, {
    cwd: programPath
  })
  return stdout.trim()
}

async function queryTransaction(txId: string) {
  while (true) {
    let result
    try {
      await delay(2000)
      let { stdout, stderr } = await exec(`leo query -q --endpoint ${ENDPOINT} transaction ${txId}`)

      if (stderr.includes("contents unavailable")) {
        continue
      }

      result = stdout
    } catch (err) {
      if ((err as any).toString().includes("contents unavailable")) {
        continue
      }
      console.error(err)
      throw err
    }

    const tx = parsePlaintext(result.trim())
    return typeof tx === "object" && "execution" in tx
  }
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
