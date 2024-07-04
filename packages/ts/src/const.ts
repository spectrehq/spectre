import config from '../config.json'

export const ZERO_ADDRESS = 'aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc'

export const DEFAULT_ADMIN_ROLE = 0

export const STAKING_ADMIN_ROLE = 1
export const STAKING_OPERATOR_ROLE = 2
export const POOL_ADMIN_ROLE = 3
export const EMERGENCY_ADMIN_ROLE = 4
export const RISK_ADMIN_ROLE = 5
export const ASSET_LISTING_ADMIN_ROLE = 6

function programWithSuffix(program: string) {
  return `${program}_${config.programSuffix}.aleo`
}

export const ACCESS_CONTROL_PROGRAM = programWithSuffix(config.programs.accessControl)
export const ACL_MANAGER_PROGRAM = programWithSuffix(config.programs.aclManager)
export const STCREDITS_PROGRAM = programWithSuffix(config.programs.stcredits)
export const STCREDITS_POINTS_PROGRAM = programWithSuffix(config.programs.stcreditsPoints)

export function delegatorProgram(index: number) {
  const cloneNo = (index + 1).toString().padStart(3, '0')
  return `${config.programs.delegator}_${config.programSuffix}_${cloneNo}.aleo`
}
