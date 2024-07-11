import { ProgramBase, u128, u8Str, parsePlaintext, u32Str, u32, bool } from "./types"
import { EMPTY_INVITE_CODE, START_INVITE_CODE } from "./const"

export interface StCreditsPointsState {
  // The total locked stcredits.
  stcredits: bigint
  // The block height at which the last settlement was made.
  height: bigint
  inviter: string
  inviter_of_inviter: string
}

export class StCreditsPointsProgram extends ProgramBase {
  /**
   * Whether the program is paused.
   */
  async isPaused() {
    return bool(await this.getMappingValueOrDefault("paused", u8Str(0), "true"))
  }

  /**
   * Get the total supply of points.
   */
  async getTotalSupply() {
    return u128(await this.getMappingValueOrDefault("total_supply", u8Str(0), "0"))
  }

  /**
   * Get the balance of points for an account.
   * @param account
   */
  async getBalance(account: string) {
    return u128(await this.getMappingValueOrDefault("account", account, "0"))
  }

  /**
   * Get the state of an account.
   * @param account
   */
  async getState(account: string) {
    const state = await this.getMappingValueOrNull("state", account)
    return state === null ? null : (parsePlaintext(state) as unknown as StCreditsPointsState)
  }

  /**
   * Get the inviter by the invite code.
   * @param code
   */
  async getInviterByCode(code: number | bigint) {
    return await this.getMappingValueOrNull("inviters", u32Str(code))
  }

  /**
   * Get the invite code by the inviter.
   * @param inviter
   */
  async getInviteCode(inviter: string) {
    return u32(await this.getMappingValueOrDefault("invite_codes", inviter, String(EMPTY_INVITE_CODE)))
  }

  /**
   * Get the invite code counter.
   */
  async getInviteCodeCounter() {
    return u32(await this.getMappingValueOrDefault("invite_code_counter", u8Str(0), String(START_INVITE_CODE)))
  }
}
