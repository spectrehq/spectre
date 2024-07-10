import { ProgramBase, u32, u32Str, u64, u8Str, parsePlaintext } from "./types"
import { bhp256HashToField, programAddress } from "./wasm"
import { STCREDITS_PROGRAM } from "./const"
import { CreditsProgram } from "./credits"

export interface Approval {
  approver: string
  spender: string
}

export interface Config {
  paused: boolean
  treasury: string
  protocol_fee: bigint
}

export interface State {
  withdraw: bigint
  pending_withdraw: bigint
  bonded: bigint
  unbonding: bigint
  resolved_height: bigint
}

export enum CacheStatus {
  INVALID = 0,
  IN_PROGRESS = 1,
  VALID = 2,
}

export interface CacheState {
  status: CacheStatus
  height: bigint
  total_bonded: bigint
  total_unbonding: bigint
  next_index: bigint
}

export interface Withdraw {
  amount: bigint
  pending: boolean
  height: bigint
}

export interface Delegator {
  delegator: string
  validator: string
  bonded: bigint
}

export class StCreditsProgram extends ProgramBase {
  constructor(getMappingValueString: (mapping: string, key: string) => Promise<string>, public credits: CreditsProgram) {
    super(getMappingValueString)
  }

  async getTotalSupply() {
    return u64(await this.getMappingValueOrDefault("total_supply", u8Str(0), "0"))
  }

  async getPublicBalance(account: string) {
    return u64(await this.getMappingValueOrDefault("account", account, "0"))
  }

  async getApproval(approver: string, spender: string) {
    const hash = await bhp256HashToField(`{
      approver: ${approver},
      spender: ${spender}
    }`)
    return u64(await this.getMappingValueOrDefault("approvals", hash, "0"))
  }

  async getConfig() {
    const configStr = await this.getMappingValueOrNull("config", u8Str(0))
    return configStr === null ? null : (parsePlaintext(configStr) as unknown as Config)
  }

  async isInitialized() {
    const config = await this.getConfig()
    return config !== null
  }

  async isPaused() {
    const config = await this.getConfig()
    return config !== null && config.paused
  }

  async getState() {
    return parsePlaintext(await this.getMappingValue("state", u8Str(0))) as unknown as State
  }

  async getCacheState() {
    const cache = parsePlaintext(await this.getMappingValue("cache_state", u8Str(0))) as unknown as CacheState
    cache.status = Number(cache.status)
    return cache
  }

  async getWithdraw(account: string) {
    const withdraw = await this.getMappingValueOrNull("withdraws", account)
    return withdraw === null ? null : (parsePlaintext(withdraw) as unknown as Withdraw)
  }

  isWithdrawClaimable(withdraw: Withdraw, totalWithdraw: bigint, resolvedHeight: bigint, currentHeight: bigint) {
    return (withdraw.height <= (!withdraw.pending ? currentHeight : resolvedHeight)) && (withdraw.amount <= totalWithdraw)
  }

  async getDelegatorsCount() {
    return u32(await this.getMappingValue("delegators_count", u8Str(0)))
  }

  async getDelegator(index: number | bigint) {
    const delegator = await this.getMappingValueOrNull("delegators", u32Str(index))
    return delegator === null ? null : (parsePlaintext(delegator) as unknown as Delegator)
  }

  async getDelegatorIndex(delegator: string) {
    const index = await this.getMappingValueOrNull("delegator_pos", delegator)
    return index === null ? null : u32(index)
  }

  async getValidatorIndex(validator: string) {
    const index = await this.getMappingValueOrNull("validator_pos", validator)
    return index === null ? null : u32(index)
  }

  async hasDelegator(delegator: string) {
    return await this.getDelegatorIndex(delegator) !== null
  }

  async hasValidator(validator: string) {
    return await this.getValidatorIndex(validator) !== null
  }

  async getDelegatorByValidator(validator: string) {
    const index = await this.getValidatorIndex(validator)
    return index === null ? null : await this.getDelegator(index)
  }

  async getTotalBuffered() {
    return this.credits.getPublicBalance(await programAddress(STCREDITS_PROGRAM()))
  }

  getTotalPooled(
    totalBuffered: bigint,
    totalBonded: bigint,
    totalUnbonding: bigint,
    totalWithdraw: bigint,
    totalPendingWithdraw: bigint
  ) {
    return totalBuffered + totalBonded + totalUnbonding - totalWithdraw - totalPendingWithdraw
  }

  getStCreditsFromCredits(credits: bigint, totalPooledCredits: bigint, totalStCreditsSupply: bigint) {
    return (
      (credits * (totalStCreditsSupply > 0n ? totalStCreditsSupply : 1n)) /
      (totalPooledCredits > 0n ? totalPooledCredits : 1n)
    )
  }

  getCreditsFromStCredits(stCredits: bigint, totalPooledCredits: bigint, totalStCreditsSupply: bigint) {
    return (
      (stCredits * (totalPooledCredits > 0n ? totalPooledCredits : 1n)) /
      (totalStCreditsSupply > 0n ? totalStCreditsSupply : 1n)
    )
  }
}
