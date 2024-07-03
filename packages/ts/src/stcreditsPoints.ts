import { ProgramBase, u128, u8Str, parsePlaintext } from './types'

export interface StCreditsPointsState {
  // The total locked stcredits.
  stcredits: bigint
  // The block height at which the last settlement was made.
  height: bigint
}

export class StCreditsPointsProgram extends ProgramBase {
  /**
   * Get the total supply of points.
   */
  async getTotalSupply() {
    return u128(await this.getMappingValueOrDefault('total_supply', u8Str(0), '0'))
  }

  /**
   * Get the balance of points for an account.
   * @param account
   */
  async getBalance(account: string) {
    return u128(await this.getMappingValueOrDefault('account', account, '0'))
  }

  /**
   * Get the state of an account.
   * @param account
   */
  async getState(account: string) {
    const state = await this.getMappingValueOrNull('state', account)
    return state === null
      ? ({
          stcredits: 0n,
          height: 0n,
        } as StCreditsPointsState)
      : (parsePlaintext(state) as unknown as StCreditsPointsState)
  }
}
