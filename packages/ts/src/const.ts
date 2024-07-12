import assert from "assert"

export const ZERO_ADDRESS = "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc"

export const DEFAULT_ADMIN_ROLE = 0

export const STAKING_ADMIN_ROLE = 1
export const STAKING_OPERATOR_ROLE = 2
export const POOL_ADMIN_ROLE = 3
export const EMERGENCY_ADMIN_ROLE = 4
export const RISK_ADMIN_ROLE = 5
export const ASSET_LISTING_ADMIN_ROLE = 6

export const WITHDRAW_DELAY = 360n
export const STCREDITS_CACHE_BATCH_NUM = 10n

export const START_INVITE_CODE = 10000n
export const EMPTY_INVITE_CODE = 0n

export const VERSION = "v1"
export const PREFIX = "spectre"

function programName(program: string) {
  return `${PREFIX}_${program}_${VERSION}_${config!.programSuffix}.aleo`
}

export const ACCESS_CONTROL_PROGRAM = () => programName(config!.programs.accessControl)
export const ACL_MANAGER_PROGRAM = () => programName(config!.programs.aclManager)
export const STCREDITS_PROGRAM = () => programName(config!.programs.stcredits)
export const STCREDITS_POINTS_PROGRAM = () => programName(config!.programs.stcreditsPoints)

export function delegatorProgramName(index: number) {
  const cloneNo = (index + 1).toString().padStart(3, "0")
  return `${PREFIX}_${config!.programs.delegator}_${VERSION}_${config!.programSuffix}_${cloneNo}.aleo`
}

interface Configuration {
  programSuffix: string
  programs: {
    accessControl: string
    aclManager: string
    stcredits: string
    stcreditsPoints: string
    delegator: string
  }
}

let config: Configuration | undefined

export function initialize(cfg: Configuration) {
  assert(!config)
  config = cfg
}
