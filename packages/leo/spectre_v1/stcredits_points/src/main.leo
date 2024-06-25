import spectre_stcredits_v1.aleo;
import spectre_acl_manager_v1.aleo;

program spectre_stcredits_points_v1.aleo {
    mapping total_supply: u8 => u128; // 0u8 => total_supply

    mapping account: address => u128;

    struct State {
        stcredits: u64,
        height: u32,
    }

    mapping states: address => State;

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

        let state: State = Mapping::get(states, user);
        // Calculate points: stcredits balance * blocks.
        // The more stcredits you have and the longer you hold them, the more points you get.
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        if (points > 0u128) {
            Mapping::set(account, user, Mapping::get_or_use(account, user, 0u128) + points);
            Mapping::set(total_supply, 0u8, Mapping::get_or_use(total_supply, 0u8, 0u128) + points);
        }

        // Update the stcredits balance and the block height.
        Mapping::set(states, user, State {stcredits: state.stcredits, height: block.height});
    }

    /**
     * Lock user's stcredits to get points.
     */
    async transition lock(public stcredits: u64) -> Future {
        // Transfer stcredits from the user to this program.
        let f: Future = spectre_stcredits_v1.aleo/transfer_from_public(self.signer, spectre_stcredits_points_v1.aleo as address, stcredits);

        return finalize_lock(f, self.signer, stcredits);
    }

    async function finalize_lock(f: Future, user: address, stcredits: u64) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(paused, 0u8));

        // Settle points.
        let state: State = Mapping::get_or_use(states, user, State {stcredits: 0u64, height: 0u32});
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        if (points > 0u128) {
            Mapping::set(account, user, Mapping::get_or_use(account, user, 0u128) + points);
            Mapping::set(total_supply, 0u8, Mapping::get_or_use(total_supply, 0u8, 0u128) + points);
        }


        // Update the stcredits balance and the block height.
        Mapping::set(states, user, State {stcredits: state.stcredits + stcredits, height: block.height});
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

        // Settle points.
        let state: State = Mapping::get(states, user);
        let points: u128 = state.stcredits as u128 * (block.height - state.height) as u128;
        if (points > 0u128) {
            Mapping::set(account, user, Mapping::get_or_use(account, user, 0u128) + points);
            Mapping::set(total_supply, 0u8, Mapping::get_or_use(total_supply, 0u8, 0u128) + points);
        }

        // Update the stcredits balance and the block height.
        state = State {stcredits: state.stcredits - stcredits, height: block.height};
        if (state.stcredits > 0u64) {
            Mapping::set(states, user, state);
        } else {
            Mapping::remove(states, user);
        }
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
