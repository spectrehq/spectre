import { ProgramBase, u64, u64Str, parsePlaintext } from './types'

export interface CommitteeState {
  // The boolean flag indicating if the validator is open to new stakers.
  is_open: boolean
  // The percentage amount (from 0 to 100, inclusive) of rewards that retained by the validator.
  commission: bigint
}

export interface BondState {
  // The validator to which the staker is bonded.
  validator: string
  // The bonded microcredits.
  microcredits: bigint
}

export interface UnbondState {
  // The unbonding microcredits.
  microcredits: bigint
  // The block height at which the unbonding will be completed, and can be claimed.
  height: bigint
}

export class CreditsProgram extends ProgramBase {
  /**
   * Get the state of the committee for an **active** validator.
   * @param validator
   * @returns The committee state or null if the validator is not in the committee.
   */
  async getCommitteeState(validator: string) {
    const state = await this.getMappingValueOrNull('committee', validator)
    return state === null ? null : (parsePlaintext(state) as unknown as CommitteeState)
  }

  /**
   * Get the total number of **active** validators in the committee.
   */
  async getCommitteeValidatorsCount() {
    return u64(
      await this.getMappingValueOrDefault(
        'metadata',
        'aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc',
        u64Str(0)
      )
    )
  }

  /**
   * Get the total number of delegators (not including validators).
   */
  async getDelegatorsCount() {
    return u64(
      await this.getMappingValueOrDefault(
        'metadata',
        'aleo1qgqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqanmpl0',
        u64Str(0)
      )
    )
  }

  /**
   * Get the total amount of microcredits that are prebonded and bonded to a validator.
   * Note: It includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
   * @param validator
   */
  async getDelegated(validator: string) {
    return u64(await this.getMappingValueOrDefault('delegated', validator, u64Str(0)))
  }

  /**
   * Get the bond state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getBonded(staker: string) {
    const bonded = await this.getMappingValueOrNull('bonded', staker)
    return bonded === null ? null : (parsePlaintext(bonded) as unknown as BondState)
  }

  /**
   * Get the unbonding state of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getUnbonding(staker: string) {
    const unbonding = await this.getMappingValueOrNull('unbonding', staker)
    return unbonding === null ? null : (parsePlaintext(unbonding) as unknown as UnbondState)
  }

  /**
   * Get the withdrawal address of the staker.
   * @param staker The staker (validator or delegator)
   */
  async getWithdrawAddress(staker: string) {
    return await this.getMappingValueOrNull('withdraw', staker)
  }

  /**
   * Get the public microcredits balance of the account.
   * @param account
   */
  async getPublicBalance(account: string) {
    return u64(await this.getMappingValueOrDefault('account', account, '0'))
  }
}
