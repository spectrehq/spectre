import spectre_stcredits_v1.aleo;
import spectre_acl_manager_v1.aleo;

program spectre_stcredits_points_v1.aleo {
    const ZERO_ADDRESS: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

    const START_INVITE_CODE: u32 = 10000u32;
    const EMPTY_INVITE_CODE: u32 = 0u32;

    const INVITER_REWARD: u128 = 16u128;
    const INVITER_OF_INVITER_REWARD: u128 = 8u128;

    mapping total_supply: u8 => u128; // 0u8 => total_supply

    mapping account: address => u128; // user => points

    struct UserState {
        stcredits: u64, // the total locked stcredits
        height: u32, // the block height at which the last settlement was made
        inviter: address,
        inviter_of_inviter: address,
    }

    mapping states: address => UserState; // user => state

    mapping inviters: u32 => address; // invite code => inviter

    mapping invite_codes: address => u32; // inviter => invite code

    mapping invite_code_counter: u8 => u32; // 0u8 => invite code counter

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
        if (points > 0u128) {
            Mapping::set(account, user, Mapping::get_or_use(account, user, 0u128) + points);

            let inviter_points: u128 = points * INVITER_REWARD / 100u128;
            if (has_inviter) {
                Mapping::set(account, inviter, Mapping::get_or_use(account, inviter, 0u128) + inviter_points);
            }

            let inviter_of_inviter_points: u128 = points * INVITER_OF_INVITER_REWARD / 100u128;
            if (has_inviter_of_inviter) {
                Mapping::set(account, inviter_of_inviter, Mapping::get_or_use(account, inviter_of_inviter, 0u128) + inviter_of_inviter_points);
            }

            Mapping::set(total_supply, 0u8, Mapping::get_or_use(total_supply, 0u8, 0u128) +
                points +
                (has_inviter ? inviter_points : 0u128) +
                (has_inviter_of_inviter ? inviter_of_inviter_points : 0u128)
            );
        }

        // Update the stcredits balance and the block height.
        Mapping::set(states, user, UserState {
            stcredits: state.stcredits,
            height: block.height,
            inviter,
            inviter_of_inviter,
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
        let f: Future = spectre_stcredits_v1.aleo/transfer_from_public(self.signer, spectre_stcredits_points_v1.aleo as address, stcredits);

        return finalize_lock(f, self.signer, stcredits, invite_code);
    }

    async function finalize_lock(f: Future, user: address, stcredits: u64, invite_code: u32) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(paused, 0u8));

        let state: UserState = Mapping::get_or_use(states, user, UserState {
            stcredits: 0u64,
            height: 0u32,
            inviter: ZERO_ADDRESS,
            inviter_of_inviter: ZERO_ADDRESS,
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
            height: 0u32,
            inviter: ZERO_ADDRESS,
            inviter_of_inviter: ZERO_ADDRESS,
        }).inviter;

        // Get the user's inviter and the inviter of inviter.
        let inviter: address = is_new_user ? inviter_ : state.inviter;
        let inviter_of_inviter: address = is_new_user ? inviter_of_inviter_ : state.inviter_of_inviter;

        let has_inviter: bool = inviter != ZERO_ADDRESS;
        let has_inviter_of_inviter: bool = inviter_of_inviter != ZERO_ADDRESS;

        // Settle points.
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        if (points > 0u128) {
            Mapping::set(account, user, Mapping::get_or_use(account, user, 0u128) + points);

            let inviter_points: u128 = points * INVITER_REWARD / 100u128;
            if (has_inviter) {
                Mapping::set(account, inviter, Mapping::get_or_use(account, inviter, 0u128) + inviter_points);
            }

            let inviter_of_inviter_points: u128 = points * INVITER_OF_INVITER_REWARD / 100u128;
            if (has_inviter_of_inviter) {
                Mapping::set(account, inviter_of_inviter, Mapping::get_or_use(account, inviter_of_inviter, 0u128) + inviter_of_inviter_points);
            }

            Mapping::set(total_supply, 0u8, Mapping::get_or_use(total_supply, 0u8, 0u128) +
                points +
                (has_inviter ? inviter_points : 0u128) +
                (has_inviter_of_inviter ? inviter_of_inviter_points : 0u128)
            );
        }

        // Update the user's state.
        Mapping::set(states, user, UserState {
            // The locked stcredits of the user.
            stcredits: state.stcredits + stcredits,
            // The current block height.
            height: block.height,
            // Set the user's inviter.
            inviter,
            // Set the inviter of the user's inviter.
            inviter_of_inviter,
        });

        if (is_new_user) {
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
        let f: Future = spectre_stcredits_v1.aleo/transfer_public(self.signer, stcredits);

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

        // Settle points.
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        if (points > 0u128) {
            Mapping::set(account, user, Mapping::get_or_use(account, user, 0u128) + points);

            let inviter_points: u128 = points * INVITER_REWARD / 100u128;
            if (has_inviter) {
                Mapping::set(account, inviter, Mapping::get_or_use(account, inviter, 0u128) + inviter_points);
            }

            let inviter_of_inviter_points: u128 = points * INVITER_OF_INVITER_REWARD / 100u128;
            if (has_inviter_of_inviter) {
                Mapping::set(account, inviter_of_inviter, Mapping::get_or_use(account, inviter_of_inviter, 0u128) + inviter_of_inviter_points);
            }

            Mapping::set(total_supply, 0u8, Mapping::get_or_use(total_supply, 0u8, 0u128) +
                points +
                (has_inviter ? inviter_points : 0u128) +
                (has_inviter_of_inviter ? inviter_of_inviter_points : 0u128)
            );
        }

        // Update the stcredits balance and the block height.
        Mapping::set(states, user, UserState {
            stcredits: state.stcredits - stcredits,
            height: block.height,
            inviter,
            inviter_of_inviter,
        });
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
