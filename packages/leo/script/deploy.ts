import * as path from "path"
import * as fs from "fs/promises"
import config from "./config.json"
import { ROOT_DIR, BUILD_DIR, exec, ProgramJson } from "./util"

async function deployProgram(program: string, cloneNo?: string) {
  program = `${program}${cloneNo ? "_" + cloneNo : ""}`
  const programPath = path.join(BUILD_DIR, program)

  await fs.cp(path.join(ROOT_DIR, ".env"), path.join(programPath, ".env"), {
    force: true,
  })

  const programJsonPath = path.join(programPath, "program.json")
  const programJson = JSON.parse(await fs.readFile(programJsonPath, "utf-8")) as ProgramJson

  try {
    const { stdout } = await exec(`leo query program ${programJson.program}`, {
      cwd: programPath,
    })
    if (stdout.includes(`program ${programJson.program}`)) {
      console.log(`Program ${programJson.program} has been deployed, so skip it\n`)
      return
    }
  } catch {}

  console.log(`Deploy program ${programJson.program}`)
  console.log(`leo deploy --recursive ${programPath}`)

  const { stdout, stderr } = await exec("leo deploy --recursive", {
    cwd: programPath,
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

  for (const program of ["access_control", "acl_manager", "stcredits", "stcredits_points"]) {
    await deployProgram(program)
  }

  for (const i of Array(config.delegatorNum).keys()) {
    const cloneNo = (i + 1).toString().padStart(3, "0")
    await deployProgram("delegator", cloneNo)
  }
}

main().then()
