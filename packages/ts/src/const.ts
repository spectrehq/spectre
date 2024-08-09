import assert from 'assert'

export const ZERO_ADDRESS = 'aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc'

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
export const INVITER_REWARD = 16n
export const INVITER_OF_INVITER_REWARD = 8n

export const VERSION = 'v1'
export const SPECTRE = 'spectre'
export const STAKING = 'staking'

function programName(program: string, prefix: string, cloneNo?: string) {
  return `${prefix}_${program}_${VERSION}${config!.programSuffix ? '_' + config!.programSuffix : ''}${cloneNo ? '_' + cloneNo : ''}.aleo`
}

function spectreProgramName(program: string) {
  return programName(program, SPECTRE)
}

function stakingProgramName(program: string) {
  return programName(program, STAKING)
}

export const ACCESS_CONTROL_PROGRAM = () => spectreProgramName(config!.programs.spectre.accessControl)
export const ACL_MANAGER_PROGRAM = () => spectreProgramName(config!.programs.spectre.aclManager)
export const STCREDITS_PROGRAM = () => stakingProgramName(config!.programs.staking.stcredits)
export const STCREDITS_POINTS_PROGRAM = () => stakingProgramName(config!.programs.staking.stcreditsPoints)

export function delegatorProgramName(index: number) {
  const cloneNo = (index + 1).toString().padStart(3, '0')
  return programName(config!.programs.staking.delegator, STAKING, cloneNo)
}

interface Configuration {
  programSuffix: string
  programs: {
    credits: string
    multiTokenSupport: string
    spectre: {
      accessControl: string
      aclManager: string
    }
    staking: {
      stcredits: string
      stcreditsPoints: string
      delegator: string
    }
  }
}

let config: Configuration | undefined

export function initialize(cfg: Configuration) {
  assert(!config)
  config = cfg
}
