import staking_stcredits_v1.aleo;
import spectre_acl_manager_v1.aleo;

program staking_stcredits_points_v1.aleo {
    const ZERO_ADDRESS: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

    const START_INVITE_CODE: u32 = 10000u32;
    const EMPTY_INVITE_CODE: u32 = 0u32;

    const INVITER_REWARD: u128 = 16u128;
    const INVITER_OF_INVITER_REWARD: u128 = 8u128;

    struct UserState {
        stcredits: u64, // the total locked stcredits of user
        points: u128, // the points of user (includes `invite_points` and `invite_of_invite_points`)
        height: u32, // the block height at which the last settlement was made
        inviter: address, // inviter of user
        inviter_of_inviter: address, // inviter of inviter of user
        invite_points: u128, // earned points on top of user's invites
        invite_of_invite_points: u128, // earned points on top of user's invites' invites
    }

    mapping states: address => UserState; // user => state

    mapping inviters: u32 => address; // invite code => inviter

    mapping invite_codes: address => u32; // inviter => invite code

    mapping invite_code_counter: u8 => u32; // 0u8 => invite code counter

    struct Stats {
        stcredits: u64, // the total locked stcredits
        points: u128, // the total points
    }

    mapping stats: u8 => Stats; // 0u8 => stats

    mapping paused: u8 => bool; // 0u8 => paused

    /**
     * Settle points for the user at current block height.
     */
    async transition settle() -> Future {
        return finalize_settle(self.caller);
    }

    async function finalize_settle(user: address) {
        // Check whether paused.
        assert(!Mapping::get(paused, 0u8));

        let state: UserState = Mapping::get(states, user);

        let inviter: address = state.inviter;
        let inviter_of_inviter: address = state.inviter_of_inviter;
        let has_inviter: bool = inviter != ZERO_ADDRESS;
        let has_inviter_of_inviter: bool = inviter_of_inviter != ZERO_ADDRESS;

        // Calculate points: stcredits balance * blocks.
        // The more stcredits you have and the longer you hold them, the more points you get.
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        let inviter_points: u128 = points * INVITER_REWARD / 100u128;
        let inviter_of_inviter_points: u128 = points * INVITER_OF_INVITER_REWARD / 100u128;

        // Update the user's state.
        Mapping::set(states, user, UserState {
            // The locked stcredits of the user.
            stcredits: state.stcredits,
            // The points of the user.
            points: state.points + points,
            // The current block height.
            height: block.height,
            // The user's inviter.
            inviter,
            // The inviter of the user's inviter.
            inviter_of_inviter,
            // Earned points on top of user's invites.
            invite_points: state.invite_points,
            // Earned points on top of user's invites' invites.
            invite_of_invite_points: state.invite_of_invite_points,
        });

        if (has_inviter && inviter_points > 0u128) {
            let s: UserState = Mapping::get_or_use(states, inviter, UserState {
                stcredits: 0u64,
                points: 0u128,
                height: 0u32,
                inviter: ZERO_ADDRESS,
                inviter_of_inviter: ZERO_ADDRESS,
                invite_points: 0u128,
                invite_of_invite_points: 0u128,
            });
            Mapping::set(states, inviter, UserState {
                stcredits: s.stcredits,
                points: s.points + inviter_points,
                // Retain its block height to be waited for the next settlement.
                height: s.height,
                inviter: s.inviter,
                inviter_of_inviter: s.inviter_of_inviter,
                invite_points: s.invite_points + inviter_points,
                invite_of_invite_points: s.invite_of_invite_points,
            });
        }
        if (has_inviter_of_inviter && inviter_of_inviter_points > 0u128) {
            let s: UserState = Mapping::get_or_use(states, inviter_of_inviter, UserState {
                stcredits: 0u64,
                points: 0u128,
                height: 0u32,
                inviter: ZERO_ADDRESS,
                inviter_of_inviter: ZERO_ADDRESS,
                invite_points: 0u128,
                invite_of_invite_points: 0u128,
            });
            Mapping::set(states, inviter_of_inviter, UserState {
                stcredits: s.stcredits,
                points: s.points + inviter_of_inviter_points,
                // Retain its block height to be waited for the next settlement.
                height: s.height,
                inviter: s.inviter,
                inviter_of_inviter: s.inviter_of_inviter,
                invite_points: s.invite_points,
                invite_of_invite_points: s.invite_of_invite_points + inviter_of_inviter_points,
            });
        }

        // Update the stats.
        let st: Stats = Mapping::get_or_use(stats, 0u8, Stats { stcredits: 0u64, points: 0u128 });
        Mapping::set(stats, 0u8, Stats {
            stcredits: st.stcredits,
            points: st.points +
                points +
                (has_inviter ? inviter_points : 0u128) +
                (has_inviter_of_inviter ? inviter_of_inviter_points : 0u128),
        });
    }

    /**
     * Lock user's stcredits to get points.
     * For a new user, the `invite_code` points to the user's inviter.
     * And if `invite_code` is empty, the caller's inviter and the inviter of inviter will be both none.
     * If the user is not new, `invite_code` must be empty (zero).
     */
    async transition lock(public stcredits: u64, public invite_code: u32) -> Future {
        // Transfer stcredits from the user to this program.
        let f: Future = staking_stcredits_v1.aleo/transfer_from_public(self.signer, staking_stcredits_points_v1.aleo as address, stcredits);

        return finalize_lock(f, self.signer, stcredits, invite_code);
    }

    async function finalize_lock(f: Future, user: address, stcredits: u64, invite_code: u32) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(paused, 0u8));

        let state: UserState = Mapping::get_or_use(states, user, UserState {
            stcredits: 0u64,
            points: 0u128,
            height: 0u32,
            inviter: ZERO_ADDRESS,
            inviter_of_inviter: ZERO_ADDRESS,
            invite_points: 0u128,
            invite_of_invite_points: 0u128,
        });

        // If `height` is zero, the user must be a newbie.
        let is_new_user: bool = state.height == 0u32;

        // If the user is not new, `invite_code` must be empty.
        assert(is_new_user || invite_code == EMPTY_INVITE_CODE);

        let inviter_: address = Mapping::get_or_use(inviters, invite_code, ZERO_ADDRESS);
        // Non-empty invite code must point to an inviter.
        assert(inviter_ != ZERO_ADDRESS || invite_code == EMPTY_INVITE_CODE);
        let inviter_of_inviter_: address = Mapping::get_or_use(states, inviter_, UserState {
            stcredits: 0u64,
            points: 0u128,
            height: 0u32,
            inviter: ZERO_ADDRESS,
            inviter_of_inviter: ZERO_ADDRESS,
            invite_points: 0u128,
            invite_of_invite_points: 0u128,
        }).inviter;

        // Get the user's inviter and the inviter of inviter.
        let inviter: address = is_new_user ? inviter_ : state.inviter;
        let inviter_of_inviter: address = is_new_user ? inviter_of_inviter_ : state.inviter_of_inviter;

        let has_inviter: bool = inviter != ZERO_ADDRESS;
        let has_inviter_of_inviter: bool = inviter_of_inviter != ZERO_ADDRESS;

        // Calculate points: stcredits balance * blocks.
        // The more stcredits you have and the longer you hold them, the more points you get.
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        let inviter_points: u128 = points * INVITER_REWARD / 100u128;
        let inviter_of_inviter_points: u128 = points * INVITER_OF_INVITER_REWARD / 100u128;

        // Update the user's state.
        Mapping::set(states, user, UserState {
            // The locked stcredits of the user.
            stcredits: state.stcredits + stcredits,
            // The points of the user.
            points: state.points + points,
            // The current block height.
            height: block.height,
            // Set the user's inviter.
            inviter,
            // Set the inviter of the user's inviter.
            inviter_of_inviter,
            // Earned points on top of user's invites.
            invite_points: state.invite_points,
            // Earned points on top of user's invites' invites.
            invite_of_invite_points: state.invite_of_invite_points,
        });

        if (has_inviter && inviter_points > 0u128) {
            let s: UserState = Mapping::get_or_use(states, inviter, UserState {
                stcredits: 0u64,
                points: 0u128,
                height: 0u32,
                inviter: ZERO_ADDRESS,
                inviter_of_inviter: ZERO_ADDRESS,
                invite_points: 0u128,
                invite_of_invite_points: 0u128,
            });
            Mapping::set(states, inviter, UserState {
                stcredits: s.stcredits,
                points: s.points + inviter_points,
                // Retain its block height to be waited for the next settlement.
                height: s.height,
                inviter: s.inviter,
                inviter_of_inviter: s.inviter_of_inviter,
                invite_points: s.invite_points + inviter_points,
                invite_of_invite_points: s.invite_of_invite_points,
            });
        }
        if (has_inviter_of_inviter && inviter_of_inviter_points > 0u128) {
            let s: UserState = Mapping::get_or_use(states, inviter_of_inviter, UserState {
                stcredits: 0u64,
                points: 0u128,
                height: 0u32,
                inviter: ZERO_ADDRESS,
                inviter_of_inviter: ZERO_ADDRESS,
                invite_points: 0u128,
                invite_of_invite_points: 0u128,
            });
            Mapping::set(states, inviter_of_inviter, UserState {
                stcredits: s.stcredits,
                points: s.points + inviter_of_inviter_points,
                // Retain its block height to be waited for the next settlement.
                height: s.height,
                inviter: s.inviter,
                inviter_of_inviter: s.inviter_of_inviter,
                invite_points: s.invite_points,
                invite_of_invite_points: s.invite_of_invite_points + inviter_of_inviter_points,
            });
        }

        // Update the stats.
        let st: Stats = Mapping::get_or_use(stats, 0u8, Stats { stcredits: 0u64, points: 0u128 });
        Mapping::set(stats, 0u8, Stats {
            stcredits: st.stcredits + stcredits,
            points: st.points +
                points +
                (has_inviter ? inviter_points : 0u128) +
                (has_inviter_of_inviter ? inviter_of_inviter_points : 0u128),
        });

        if (!Mapping::contains(invite_codes, user)) {
            // Set the user's invite code.
            let my_inviter_code: u32 = Mapping::get_or_use(invite_code_counter, 0u8, START_INVITE_CODE) + 1u32;
            Mapping::set(invite_code_counter, 0u8, my_inviter_code);
            Mapping::set(inviters, my_inviter_code, user);
            Mapping::set(invite_codes, user, my_inviter_code);
        }
    }

    /**
     * Unlock user's stcredits and settle points.
     */
    async transition unlock(public stcredits: u64) -> Future {
        // Transfer stcredits from this program to the user.
        let f: Future = staking_stcredits_v1.aleo/transfer_public(self.signer, stcredits);

        return finalize_unlock(f, self.signer, stcredits);
    }

    async function finalize_unlock(f: Future, user: address, stcredits: u64) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(paused, 0u8));

        let state: UserState = Mapping::get(states, user);

        let inviter: address = state.inviter;
        let inviter_of_inviter: address = state.inviter_of_inviter;
        let has_inviter: bool = inviter != ZERO_ADDRESS;
        let has_inviter_of_inviter: bool = inviter_of_inviter != ZERO_ADDRESS;

        // Calculate points: stcredits balance * blocks.
        // The more stcredits you have and the longer you hold them, the more points you get.
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        let inviter_points: u128 = points * INVITER_REWARD / 100u128;
        let inviter_of_inviter_points: u128 = points * INVITER_OF_INVITER_REWARD / 100u128;

        // Update the user's state.
        Mapping::set(states, user, UserState {
            // The locked stcredits of the user.
            stcredits: state.stcredits - stcredits,
            // The points of the user.
            points: state.points + points,
            // The current block height.
            height: block.height,
            // The user's inviter.
            inviter,
            // The inviter of the user's inviter.
            inviter_of_inviter,
            // Earned points on top of user's invites.
            invite_points: state.invite_points,
            // Earned points on top of user's invites' invites.
            invite_of_invite_points: state.invite_of_invite_points,
        });

        if (has_inviter && inviter_points > 0u128) {
            let s: UserState = Mapping::get_or_use(states, inviter, UserState {
                stcredits: 0u64,
                points: 0u128,
                height: 0u32,
                inviter: ZERO_ADDRESS,
                inviter_of_inviter: ZERO_ADDRESS,
                invite_points: 0u128,
                invite_of_invite_points: 0u128,
            });
            Mapping::set(states, inviter, UserState {
                stcredits: s.stcredits,
                points: s.points + inviter_points,
                // Retain its block height to be waited for the next settlement.
                height: s.height,
                inviter: s.inviter,
                inviter_of_inviter: s.inviter_of_inviter,
                invite_points: s.invite_points + inviter_points,
                invite_of_invite_points: s.invite_of_invite_points,
            });
        }
        if (has_inviter_of_inviter && inviter_of_inviter_points > 0u128) {
            let s: UserState = Mapping::get_or_use(states, inviter_of_inviter, UserState {
                stcredits: 0u64,
                points: 0u128,
                height: 0u32,
                inviter: ZERO_ADDRESS,
                inviter_of_inviter: ZERO_ADDRESS,
                invite_points: 0u128,
                invite_of_invite_points: 0u128,
            });
            Mapping::set(states, inviter_of_inviter, UserState {
                stcredits: s.stcredits,
                points: s.points + inviter_of_inviter_points,
                // Retain its block height to be waited for the next settlement.
                height: s.height,
                inviter: s.inviter,
                inviter_of_inviter: s.inviter_of_inviter,
                invite_points: s.invite_points,
                invite_of_invite_points: s.invite_of_invite_points + inviter_of_inviter_points,
            });
        }

        // Update the stats.
        let st: Stats = Mapping::get_or_use(stats, 0u8, Stats { stcredits: 0u64, points: 0u128 });
        Mapping::set(stats, 0u8, Stats {
            stcredits: st.stcredits - stcredits,
            points: st.points +
                points +
                (has_inviter ? inviter_points : 0u128) +
                (has_inviter_of_inviter ? inviter_of_inviter_points : 0u128),
        });
    }

    async transition invite_code() -> Future {
        return finalize_invite_code(self.caller);
    }

    async function finalize_invite_code(user: address) {
        // User must have no invite code.
        assert(!Mapping::contains(invite_codes, user));

        // Set the user's invite code.
        let my_inviter_code: u32 = Mapping::get_or_use(invite_code_counter, 0u8, START_INVITE_CODE) + 1u32;
        Mapping::set(invite_code_counter, 0u8, my_inviter_code);
        Mapping::set(inviters, my_inviter_code, user);
        Mapping::set(invite_codes, user, my_inviter_code);
    }

    async transition pause() -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);
        return finalize_pause(f);
    }

    async function finalize_pause(f: Future) {
        f.await();
        Mapping::set(paused, 0u8, true);
    }

    async transition unpause() -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);
        return finalize_unpause(f);
    }

    async function finalize_unpause(f: Future) {
        f.await();
        Mapping::set(paused, 0u8, false);
    }
}
