import * as path from "path"
import { fileURLToPath } from "url"
import * as child_process from "child_process"
import * as util from "util"
import config from "../config.json"

export const exec = util.promisify(child_process.exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const VERSION = "v1"

export const ROOT_DIR = path.dirname(__dirname)
export const SPECTRE_DIR = path.join(ROOT_DIR, `spectre_${VERSION}`)
export const BUILD_DIR = path.join(ROOT_DIR, "build")

export function addSuffix(name: string, no?: string) {
  const parts = name.split(".")
  return `${parts[0]}_${config.programSuffix}${no ? "_" + no : ""}.${parts[1]}`
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
