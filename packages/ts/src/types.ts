import assert from 'assert'

export function bool(s: string): boolean {
  if (s === 'true') {
    return true
  } else if (s === 'false') {
    return false
  } else {
    throw new Error('invalid boolean string')
  }
}

export function boolStr(b: boolean): string {
  return b ? 'true' : 'false'
}

function stripType(s: string, type: string): string {
  return s.split(type)[0]
}

export function i8(s: string): bigint {
  return BigInt(stripType(s, 'i8'))
}

export function i8Str(i: bigint): string {
  return `${i}i8`
}

export function i16(s: string): bigint {
  return BigInt(stripType(s, 'i16'))
}

export function i16Str(i: bigint): string {
  return `${i}i16`
}

export function i32(s: string): bigint {
  return BigInt(stripType(s, 'i32'))
}

export function i32Str(i: bigint): string {
  return `${i}i32`
}

export function i64(s: string): bigint {
  return BigInt(stripType(s, 'i64'))
}

export function i64Str(i: bigint): string {
  return `${i}i64`
}

export function i128(s: string): bigint {
  return BigInt(stripType(s, 'i128'))
}

export function i128Str(i: bigint): string {
  return `${i}i128`
}

export function u8(s: string): bigint {
  return BigInt(stripType(s, 'u8'))
}

export function u8Str(i: bigint | number): string {
  return `${i}u8`
}

export function u16(s: string): bigint {
  return BigInt(stripType(s, 'u16'))
}

export function u16Str(i: bigint | number): string {
  return `${i}u16`
}

export function u32(s: string): bigint {
  return BigInt(stripType(s, 'u32'))
}

export function u32Str(i: bigint | number): string {
  return `${i}u32`
}

export function u64(s: string): bigint {
  return BigInt(stripType(s, 'u64'))
}

export function u64Str(i: bigint | number): string {
  return `${i}u64`
}

export function u128(s: string): bigint {
  return BigInt(stripType(s, 'u128'))
}

export function u128Str(i: bigint | number): string {
  return `${i}u128`
}

export function field(s: string): bigint {
  const v = BigInt(stripType(s, 'field'))
  assert(v >= 0n, 'field must be non-negative')
  return v
}

export function fieldStr(i: bigint | number): string {
  assert(i >= 0n, 'field must be non-negative')
  return `${i}field`
}

export interface Approval {
  approver: string
  spender: string
}

export interface Config {
  initialized: boolean
  treasury: string
  paused: boolean
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

export function parsePlaintext(plaintext: string): unknown {
  // TODO: call wasm api to parse the plaintext
  return plaintext
}

export function bhp256HashToField(plaintext: string): string {
  // TODO: call wasm api to hash the plaintext
  return plaintext
}

export class StCredtisProgram {
  constructor(private getMappingValueOrNull: (mapping: string, key: string) => Promise<string>) {}

  private async getMappingValue(mapping: string, key: string): Promise<string> {
    const value = await this.getMappingValueOrNull(mapping, key)
    if (value === 'null') {
      throw new Error('mapping value not found')
    }
    return value
  }

  async getTotalSupply() {
    return u64(await this.getMappingValue('total_supply', u8Str(0)))
  }

  async getAccount(account: string) {
    return u64(await this.getMappingValue('account', account))
  }

  async getBalance(account: string) {
    return this.getAccount(account)
  }

  async getApproval(approver: string, spender: string) {
    const hash = bhp256HashToField(`{
      approver: ${approver},
      spender: ${spender}
    }`)
    return u64(await this.getMappingValue('approvals', hash))
  }

  async getConfig() {
    return parsePlaintext(await this.getMappingValue('config', u8Str(0))) as Config
  }

  static readonly TOTAL_WITHDRAW_KEY = 0
  static readonly TOTAL_PENDING_WITHDRAW_KEY = 1
  static readonly TOTAL_BONDED_KEY = 2
  static readonly TOTAL_UNBONDING_KEY = 3
  static readonly PROTOCOL_FEE_KEY = 4

  async getState(key: number) {
    return field(await this.getMappingValue('state', u8Str(key)))
  }

  async getCacheState() {
    return parsePlaintext(await this.getMappingValue('cache_state', u8Str(0))) as CacheState
  }

  async getWithdraw(account: string) {
    return parsePlaintext(await this.getMappingValue('withdraws', account)) as Withdraw
  }

  async getPendingWithdraw(account: string) {
    return parsePlaintext(await this.getMappingValue('pending_withdraws', account)) as PendingWithdraw
  }

  async getPendingQueueUser(index: number) {
    return await this.getMappingValue('pending_queue', fieldStr(index))
  }

  async getPendingQueueStartEnd() {
    return parsePlaintext(await this.getMappingValue('pending_queue_start_end', u8Str(0))) as QueueStartEnd
  }

  async getValidatorsCount() {
    return u32(await this.getMappingValue('validators_count', u8Str(0)))
  }

  async getValidator(index: number) {
    return await this.getMappingValue('validators', u32Str(index))
  }

  async hasDelegator(delegator: string) {
    // TODO
    return bool(await this.getMappingValue('delegators', delegator))
  }

  async getValidatorDelegator(validator: string) {
    return await this.getMappingValue('validator_delegators', validator)
  }

  async getValidatorBonded(validator: string) {
    return u64(await this.getMappingValue('validator_bonded', validator))
  }
}
