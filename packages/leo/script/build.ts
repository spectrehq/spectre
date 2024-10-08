import * as fs from "fs/promises"
import * as path from "path"
import * as os from "os"
import "dotenv/config"
import { SPECTRE_DIR, BUILD_DIR, addSuffix, exec, ProgramJson, ROOT_DIR } from "./util"
import config from "../config.json"

async function copyProgram(program: string, cloneNo?: string) {
  const src = path.join(SPECTRE_DIR, program)
  program = `${program}${cloneNo ? "_" + cloneNo : ""}`
  const dest = path.join(BUILD_DIR, program)

  console.log(`Copy ${src} to ${dest}`)

  await fs.cp(src, dest, {
    force: true,
    recursive: true,
    filter: (source: string, destination: string): boolean => {
      if (["src", "program.json"].some((s) => source.includes(s))) {
        return true
      } else {
        return !["build", "leo.lock", "outputs"].some((s) => source.includes(s))
      }
    }
  })

  await fs.cp(path.join(ROOT_DIR, ".env"), path.join(dest, ".env"), {
    force: true
  })

  const programJsonPath = path.join(BUILD_DIR, program, "program.json")

  const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson
  const originalProgram = programJson.program
  programJson.program = addSuffix(programJson.program, cloneNo)
  for (const dependency of programJson.dependencies || []) {
    if (dependency.location === "local") {
      dependency.name = addSuffix(dependency.name)
    }
    if (dependency.name === 'multi_token_support_program.aleo') {
      dependency.name = config.programs.multiTokenSupport + ".aleo"
    }
  }

  await fs.writeFile(programJsonPath, JSON.stringify(programJson, null, 2), "utf-8")

  const srcMainPath = path.join(BUILD_DIR, program, "src", "main.leo")

  let srcMain = await fs.readFile(srcMainPath, "utf-8")
  srcMain = srcMain.replaceAll(originalProgram, programJson.program)
  srcMain = srcMain.replaceAll("_v1.aleo", `_v1_${config.programSuffix}.aleo`)
  srcMain = srcMain.replaceAll("multi_token_support_program.aleo", config.programs.multiTokenSupport + ".aleo")

  // Insert the initial admin account address.
  if (program === config.programs.spectre.accessControl) {
    const { stdout } = await exec(`leo account import ${process.env.ADMIN_PRIVATE_KEY || process.env.PRIVATE_KEY}`)
    const parts = stdout.trim().split("Address")
    const adminAddress = parts[parts.length - 1].trim()

    srcMain = srcMain.replaceAll("aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc", adminAddress)
  }

  await fs.writeFile(srcMainPath, srcMain, "utf-8")
}

async function compileProgram(program: string, cloneNo?: string) {
  program = `${program}${cloneNo ? "_" + cloneNo : ""}`
  const programPath = path.join(BUILD_DIR, program)

  const programJsonPath = path.join(programPath, "program.json")
  const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson
  console.log(`Compile program ${programJson.program}`)
  console.log(`leo build --non-recursive ${programPath}`)

  const { stdout, stderr } = await exec("leo build --non-recursive", {
    cwd: programPath
  })
  if (stdout) {
    console.log(stdout)
  }
  if (stderr) {
    console.error(stderr)
  }
}

async function main() {
  await fs.stat(path.join(ROOT_DIR, ".env"))

  console.log(`Program suffix: ${config.programSuffix}`)
  console.log(`Total number of delegator programs: ${config.delegatorNum}\n`)

  await fs.rm(path.join(os.homedir(), ".aleo/registry"), { recursive: true, force: true })

  for (const program of [
    config.programs.spectre.accessControl,
    config.programs.spectre.aclManager,
    config.programs.staking.stcredits,
    config.programs.staking.stcreditsPoints
  ]) {
    await copyProgram(program)
    await compileProgram(program)
  }

  const delegatorName = config.programs.staking.delegator
  for (const i of Array(config.delegatorNum).keys()) {
    const cloneNo = (i + 1).toString().padStart(3, "0")
    await copyProgram(delegatorName, cloneNo)
    await compileProgram(delegatorName, cloneNo)
  }
}

await main()
