import { bool, field, fieldStr, ProgramBase, u32, u32Str, u64, u8Str, parsePlaintext } from './types'
import { bhp256HashToField } from './wasm'
import { ZERO_ADDRESS } from './const'

export interface Approval {
  approver: string
  spender: string
}

export interface Config {
  initialized: boolean
  treasury: string
  paused: boolean
}

export enum StateEnum {
  TOTAL_WITHDRAW_KEY = 0,
  TOTAL_PENDING_WITHDRAW_KEY = 1,
  TOTAL_BONDED_KEY = 2,
  TOTAL_UNBONDING_KEY = 3,
  PROTOCOL_FEE_KEY = 4,
}

export enum CacheStateEnum {
  INVALID = 0,
  IN_PROGRESS = 1,
  VALID = 2,
}

export interface CacheState {
  state: CacheStateEnum
  height: bigint
  total_bonded: bigint
  total_unbonding: bigint
  next_index: bigint
}

export interface Withdraw {
  amount: bigint
  height: bigint
}

export interface PendingWithdraw {
  amount: bigint
  index: bigint
}

export interface QueueStartEnd {
  start: bigint
  end: bigint
}

export class StCreditsProgram extends ProgramBase {
  async getTotalSupply() {
    return u64(await this.getMappingValueOrDefault('total_supply', u8Str(0), '0'))
  }

  async getBalance(account: string) {
    return u64(await this.getMappingValueOrDefault('account', account, '0'))
  }

  async getApproval(approver: string, spender: string) {
    const hash = await bhp256HashToField(`{
      approver: ${approver},
      spender: ${spender}
    }`)
    return u64(await this.getMappingValueOrDefault('approvals', hash, '0'))
  }

  async getConfig() {
    const configStr = await this.getMappingValueOrNull('config', u8Str(0))
    return configStr === null ? null : (parsePlaintext(configStr) as unknown as Config)
  }

  async isInitialized() {
    const config = await this.getConfig()
    return config !== null && config.initialized
  }

  async getState(key: StateEnum) {
    return field(await this.getMappingValue('state', u8Str(key)))
  }

  async getCacheState() {
    return parsePlaintext(await this.getMappingValue('cache_state', u8Str(0))) as unknown as CacheState
  }

  async getWithdraw(account: string) {
    const withdraw = await this.getMappingValueOrNull('withdraws', account)
    return withdraw === null ? null : (parsePlaintext(withdraw) as unknown as Withdraw)
  }

  async getPendingWithdraw(account: string) {
    const pendingWithdraw = await this.getMappingValueOrNull('pending_withdraws', account)
    return pendingWithdraw === null ? null : (parsePlaintext(pendingWithdraw) as unknown as PendingWithdraw)
  }

  async getPendingQueueUser(index: number) {
    return await this.getMappingValueOrNull('pending_queue', fieldStr(index))
  }

  async getPendingQueueStartEnd() {
    return parsePlaintext(await this.getMappingValue('pending_queue_start_end', u8Str(0))) as unknown as QueueStartEnd
  }

  async getValidatorsCount() {
    return u32(await this.getMappingValue('validators_count', u8Str(0)))
  }

  async getValidator(index: number) {
    return await this.getMappingValueOrNull('validators', u32Str(index))
  }

  async hasValidator(validator: string) {
    const delegator = await this.getMappingValueOrNull('validator_delegators', validator)
    return delegator !== null
  }

  async hasDelegator(delegator: string) {
    return bool(await this.getMappingValueOrDefault('delegators', delegator, 'false'))
  }

  async getValidatorDelegator(validator: string) {
    const delegator = await this.getMappingValue('validator_delegators', validator)
    return delegator === ZERO_ADDRESS ? null : delegator
  }

  async getValidatorBonded(validator: string) {
    return u64(await this.getMappingValueOrDefault('validator_bonded', validator, '0'))
  }
}
