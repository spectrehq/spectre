import { ProgramBase, u8Str, parsePlaintext, u32Str, u32, bool } from "./types"
import { EMPTY_INVITE_CODE, START_INVITE_CODE } from "./const"

export interface StCreditsPointsState {
  // The total locked stcredits of user
  stcredits: bigint
  // The points of user (includes `invite_points` and `invite_of_invite_points`)
  points: bigint
  // The block height at which the last settlement was made
  height: bigint
  // Inviter of user
  inviter: string
  // Inviter of inviter of user
  inviter_of_inviter: string
  // Earned points on top of user's invites
  invite_points: bigint
  // Earned points on top of user's invites' invites
  invite_of_invite_points: bigint
}

export interface StCreditsPointsStats {
  // The total locked stcredits
  stcredits: bigint
  // The total points
  points: bigint
}

export class StCreditsPointsProgram extends ProgramBase {
  /**
   * Whether the program is paused.
   */
  async isPaused() {
    return bool(await this.getMappingValueOrDefault("paused", u8Str(0), "true"))
  }

  /**
   * Get the points for an account, including the unsettled points.
   * @param account
   * @param currentHeight
   */
  async getEstimatedPoints(account: string, currentHeight: bigint) {
    const state = await this.getState(account)
    if (!state) {
      return 0n
    }
    const points = state.stcredits * (currentHeight - state.height)
    return state.points + points
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
   * Get the stats of the program.
   */
  async getStats() {
    const state = await this.getMappingValueOrNull("stats", u8Str(0))
    return state === null ? {
      stcredits: 0n,
      points: 0n
    } as StCreditsPointsStats : (parsePlaintext(state) as unknown as StCreditsPointsStats)
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
