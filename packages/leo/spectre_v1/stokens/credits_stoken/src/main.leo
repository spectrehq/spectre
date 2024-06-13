import credits.aleo;
import spectre_acl_manager_v1.aleo;
import spectre_pool_v1.aleo;

program spectre_credits_stoken_v1.aleo {
    struct metadata {
        name: u128, // 16 bytes -> 16 characters with ASCII encoding
        symbol: u64, // 8 bytes -> 8 characters with ASCII encoding
        decimals: u8,
    }

    mapping total_supply: u8 => u64; // 0u8 => total_supply

    mapping account: address => u64;

    record token {
        owner: address,
        amount: u64,
    }

    struct approval {
        approver: address,
        spender: address,
    }

    mapping approvals: field => u64;

    transition get_metadata() -> metadata {
        return metadata {
            name: 25823134300601792548089644367u128, // "Spectre ALEO" -> 0x5370656374726520414c454f -> 25823134300601792548089644367
            symbol: 495016756559u64, // "sALEO" -> 0x73414c454f -> 495016756559
            decimals: 6u8,
        };
    }

    async function balance_of(owner: address, current_timestamp: u64) {
        let balance_scaled: u64 = Mapping::get_or_use(account, owner, 0u64);
        let index: field = get_reserve_normalized_income(Mapping::get(spectre_pool_v1.aleo/reserves, credits.aleo as address), current_timestamp);
        let balance: u64 = ((balance_scaled as field) * index) as u64;
    }

    async function total_supply(owner: address, current_timestamp: u64) {
        let supply_scaled: u64 = Mapping::get(total_supply, 0u8);
        let index: field = get_reserve_normalized_income(Mapping::get(spectre_pool_v1.aleo/reserves, credits.aleo as address), current_timestamp);
        let supply: u64 = ((supply_scaled as field) * index) as u64;
    }

    transition mint() {
    }

    /* Approve & Transfer from */
    async transition approve_public(public spender: address, public amount: u64) -> Future {
        return finalize_approve_public(BHP256::hash_to_field(approval {approver: self.caller, spender}), amount);
    }

    async function finalize_approve_public(hash: field, amount: u64) {
        // If approvals for approval field exists, the approved amount is increased.
        // Otherwise, the approved allowance is created.
        let approval_amount : u64 = Mapping::get_or_use(approvals, hash, 0u64);
        Mapping::set(approvals, hash, approval_amount + amount);
    }

    async transition unapprove_public(public spender: address, public amount: u64) -> Future {
        return finalize_unapprove_public(BHP256::hash_to_field(approval {approver: self.caller, spender}), amount);
    }

    async function finalize_unapprove_public(hash: field, amount: u64) {
        let approval_amount : u64 = Mapping::get(approvals, hash);
        Mapping::set(approvals, hash, approval_amount - amount);
    }

    async transition transfer_from_public(public approver: address, public receiver: address, public amount: u64) -> Future {
        return finalize_transfer_from_public(BHP256::hash_to_field(approval {approver, spender: self.caller}), approver, receiver, amount);
    }

    async function finalize_transfer_from_public(hash: field, approver: address, receiver: address, amount: u64) {
        // Decrease the approved amount.
        let approval_amount : u64 = Mapping::get(approvals, hash);
        Mapping::set(approvals, hash, approval_amount - amount);
        // Decrements `account[approver]` by `amount`.
        // If `account[approver] - amount` underflows, `transfer_from_public` is reverted.
        let approver_amount: u64 = Mapping::get(account, approver);
        Mapping::set(account, approver, approver_amount - amount);
        // Increments `account[receiver]` by `amount`.
        // If `account[receiver]` does not exist, it will be created.
        // If `account[receiver] + amount` overflows, `transfer_from_public` is reverted.
        let receiver_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
        Mapping::set(account, receiver, receiver_amount + amount);
    }

    /* Transfer */
    async transition transfer_public(public receiver: address, public amount: u64) -> Future {
        // Transfer the tokens publicly, by invoking the computation on-chain.
        return finalize_transfer_public(self.caller, receiver, amount);
    }

    async function finalize_transfer_public(public sender: address, public receiver: address, public amount: u64) {
        // Decrements `account[sender]` by `amount`.
        // If `account[sender]` does not exist, it will be created.
        // If `account[sender] - amount` underflows, `transfer_public` is reverted.
        let sender_amount: u64 = Mapping::get_or_use(account, sender, 0u64);
        Mapping::set(account, sender, sender_amount - amount);
        // Increments `account[receiver]` by `amount`.
        // If `account[receiver]` does not exist, it will be created.
        // If `account[receiver] + amount` overflows, `transfer_public` is reverted.
        let receiver_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
        Mapping::set(account, receiver, receiver_amount + amount);
    }

    // The function `transfer_private` sends the specified token amount to the token receiver from the specified token record.
    transition transfer_private(sender: token, receiver: address, amount: u64) -> (token, token) {
        // Checks the given token record has sufficient balance.
        // This `sub` operation is safe, and the proof will fail if an overflow occurs.
        // `difference` holds the change amount to be returned to sender.
        let difference: u64 = sender.amount - amount;

        // Produce a token record with the change amount for the sender.
        let remaining: token = token {
            owner: sender.owner,
            amount: difference,
        };

        // Produce a token record for the specified receiver.
        let transferred: token = token {
            owner: receiver,
            amount: amount,
        };

        // Output the sender's change record and the receiver's record.
        return (remaining, transferred);
    }

    // The function `transfer_private_to_public` turns a specified token amount from a token record into public tokens for the specified receiver.
    // This function preserves privacy for the sender's record, however it publicly reveals the token receiver and the token amount.
    async transition transfer_private_to_public(sender: token, public receiver: address, public amount: u64) -> (token, Future) {
        // Checks the given token record has a sufficient token amount.
        // This `sub` operation is safe, and the proof will fail if an underflow occurs.
        // `difference` holds the change amount for the caller.
        let difference: u64 = sender.amount - amount;

        // Produces a token record with the change amount for the caller.
        let remaining: token = token {
            owner: sender.owner,
            amount: difference,
        };

        // Output the sender's change record.
        // Increment the token amount publicly for the token receiver.
        return (remaining, finalize_transfer_private_to_public(receiver, amount));
    }

    async function finalize_transfer_private_to_public(public receiver: address, public amount: u64) {
        // Increments `account[receiver]` by `amount`.
        // If `account[receiver]` does not exist, it will be created.
        // If `account[receiver] + amount` overflows, `transfer_private_to_public` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
        Mapping::set(account, receiver, current_amount + amount);
    }

    // The function `transfer_public_to_private` turns a specified token amount from `account` into a token record for the specified receiver.
    // This function preserves privacy for the receiver's record, however it publicly reveals the caller and the specified token amount.
    async transition transfer_public_to_private(public receiver: address, public amount: u64) -> (token, Future) {
        // Produces a token record for the token receiver.
        let transferred: token = token {
            owner: receiver,
            amount: amount,
        };

        // Output the receiver's record.
        // Decrement the token amount of the caller publicly.
        return (transferred, finalize_transfer_public_to_private(self.caller, amount));
    }

    async function finalize_transfer_public_to_private(public sender: address, public amount: u64) {
        // Decrements `account[sender]` by `amount`.
        // If `account[sender]` does not exist, it will be created.
        // If `account[sender] - amount` underflows, `transfer_public_to_private` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account, sender, 0u64);
        Mapping::set(account, sender, current_amount - amount);
    }

    async transition supply_reserve(public amount: u64, public on_behalf_of: address) -> Future {
        return finalize_supply_reserve(amount, on_behalf_of);
    }

    async function finalize_supply_reserve(amount: u64, on_behalf_of: address) {
        let reserve: ReserveData = Mapping::get(spectre_pool_v1.aleo/reserves, credits.aleo as address);
        let reserve_cache: ReserveCache = reserve_cache(reserve);
    }

    async transition rescue_tokens(public receiver: address, public amount: u64) -> Future {
        let f1: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.caller);
        let f2: Future = credits.aleo/transfer_public(receiver, amount);
        return finalize_rescue_tokens(f1, f2);
    }

    async function finalize_rescue_tokens(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }

    inline update_reserve_state(reserve: ReserveData, reserve_cache: ReserveCache, current_timestamp: u64) -> (ReserveData, ReserveCache) {
        // If time didn't pass since last stored timestamp, skip state update.
        if (reserve.last_update_timestamp == current_timestamp) {
            return (reserve, reserve_cache);
        }

        /* Update indexes */

        // Only cumulating on the supply side if there is any income being produced
        // The case of Reserve Factor 100% is not a problem (current_liquidity_rate == 0),
        // as liquidity index should not be updated
        let next_liquidity_index: field = reserve_cache.next_liquidity_index;
        let liquidity_index: u128 = reserve.liquidity_index;
        if (reserve_cache.curr_liquidity_rate != 0field) {
            let cumulated_liquidity_interest: field = calculate_linear_interest(reserve_cache.curr_liquidity_rate, reserve_cache.reserve_last_update_timestamp, current_timestamp);
            next_liquidity_index = ray_mul(cumulated_liquidity_interest, reserve_cache.curr_liquidity_index);
            liquidity_index = next_liquidity_index as u128;
        }

        // Variable borrow index only gets updated if there is any variable debt.
        // reserveCache.curr_variable_borrow_rate != 0 is not a correct validation,
        // because a positive base variable rate can be stored on
        // reserveCache.curr_variable_borrow_rate, but the index should not increase
        let next_variable_borrow_index: field = reserve_cache.next_variable_borrow_index;
        let variable_borrow_index: u128 = reserve.variable_borrow_index;
        if (reserve_cache.curr_scaled_variable_debt != 0field) {
            let cumulatedVariableBorrowInterest: field = calculate_compounded_interest(reserve_cache.curr_variable_borrow_rate, reserve_cache.reserve_last_update_timestamp, current_timestamp);
            next_variable_borrow_index = ray_mul(cumulatedVariableBorrowInterest, reserve_cache.curr_variable_borrow_index);
            variable_borrow_index = next_variable_borrow_index as u128;
        }

        /* Accrue to treasury */

        return (ReserveData {
            configuration: reserve.configuration,
            liquidity_index: reserve_cache.next_liquidity_index as u128,
            current_liquidity_rate: reserve_cache.curr_liquidity_rate as u128,
            variable_borrow_index: reserve_cache.next_variable_borrow_index as u128,
            current_variable_borrow_rate: reserve_cache.curr_variable_borrow_rate as u128,
            last_update_timestamp: current_timestamp,
            id: reserve.id,
            stoken_address: reserve.stoken_address,
            variable_debt_token_address: reserve.variable_debt_token_address,
            interest_rate_strategy_address: reserve.interest_rate_strategy_address,
            accrued_to_treasury: reserve.accrued_to_treasury,
            isolation_mode_total_debt: reserve.isolation_mode_total_debt
        }, ReserveCache {
            curr_scaled_variable_debt: reserve_cache.next_scaled_variable_debt,
            next_scaled_variable_debt: 0field,
            curr_liquidity_index: reserve_cache.next_liquidity_index,
            next_liquidity_index: 0field,
            curr_variable_borrow_index: reserve_cache.next_variable_borrow_index,
            next_variable_borrow_index: 0field,
            curr_liquidity_rate: reserve_cache.curr_liquidity_rate,
            curr_variable_borrow_rate: reserve_cache.curr_variable_borrow_rate,
            reserve_factor: reserve_cache.reserve_factor,
            reserve_configuration: reserve_cache.reserve_configuration,
            stoken_address: reserve_cache.stoken_address,
            variable_debt_token_address: reserve_cache.variable_debt_token_address,
            reserve_last_update_timestamp: current_timestamp // update timestamp
        });
    }

    inline reserve_cache(reserve: ReserveData) -> ReserveCache {
        return ReserveCache {
            curr_scaled_variable_debt: 0field,
            next_scaled_variable_debt: 0field,
            curr_liquidity_index: reserve.liquidity_index as field,
            next_liquidity_index: reserve.liquidity_index as field,
            curr_variable_borrow_index: reserve.variable_borrow_index as field,
            next_variable_borrow_index: reserve.variable_borrow_index as field,
            curr_liquidity_rate: reserve.current_liquidity_rate as field,
            curr_variable_borrow_rate: reserve.current_variable_borrow_rate as field,
            reserve_factor: reserve.configuration.reserve_factor as field,
            reserve_configuration: reserve.configuration,
            stoken_address: reserve.stoken_address,
            variable_debt_token_address: reserve.variable_debt_token_address,
            reserve_last_update_timestamp: reserve.last_update_timestamp
        };
    }

    inline get_reserve_normalized_income(reserve: ReserveData, current_timestamp: u64) -> field {
        if (reserve.last_update_timestamp == current_timestamp) {
            return reserve.liquidity_index as field;
        } else {
            let interest: field = calculate_linear_interest(reserve.current_liquidity_rate as field, reserve.last_update_timestamp, current_timestamp);
            return ray_mul(interest, reserve.liquidity_index as field);
        }
    }

    inline get_reserve_normalized_debt(reserve: ReserveData, current_timestamp: u64) -> field {
        if (reserve.last_update_timestamp == current_timestamp) {
            return reserve.variable_borrow_index as field;
        } else {
            let interest: field = calculate_compounded_interest(reserve.current_variable_borrow_rate as field, reserve.last_update_timestamp, current_timestamp);
            return ray_mul(interest, reserve.variable_borrow_index as field);
        }
    }

    const SECONDS_PER_YEAR: field = 31536000field;

    const RAY: field = 1000000000000000000000000000field; // 1e27
    const HALF_RAY: field = 500000000000000000000000000field; // 0.5e27

    inline ray_mul(a: field, b: field) -> field {
        return (a * b + HALF_RAY) / RAY;
    }

    /**
     * Calculate the interest accumulated using a linear interest rate formula
     * @param rate The interest rate, in ray
     * @param last_update_timestamp The timestamp of the last update of the interest
     * @param current_timestamp The timestamp of the current block
     * @return The interest rate linearly accumulated during the timeDelta, in ray
     */
    inline calculate_linear_interest(rate: field, last_update_timestamp: u64, current_timestamp: u64) -> field {
        let exp: field = (current_timestamp - last_update_timestamp) as field;
        let result: field = rate * exp / SECONDS_PER_YEAR;
        return RAY + result;
    }

    /**
     * Calculate the interest using a compounded interest rate formula
     * To avoid expensive exponentiation, the calculation is performed using a binomial approximation:
     *
     *  (1+x)^n = 1+n*x+[n/2*(n-1)]*x^2+[n/6*(n-1)*(n-2)*x^3...
     *
     * The approximation slightly underpays liquidity providers and undercharges borrowers, with the advantage of great
     * tx fee reductions.
     *
     * @param rate The interest rate, in ray
     * @param last_update_timestamp The timestamp of the last update of the interest
     * @param current_timestamp The timestamp of the current block
     * @return The interest rate compounded during the timeDelta, in ray
     */
    inline calculate_compounded_interest(rate: field, last_update_timestamp: u64, current_timestamp: u64) -> field {
        let exp: field = (current_timestamp - last_update_timestamp) as field;
        if (exp == 0field) {
            return RAY;
        }

        let expMinusOne: field = exp - 1field;
        let expMinusTwo: field = exp > 2field ? exp - 2field : 0field;

        let basePowerTwo: field = ray_mul(rate, rate) / (SECONDS_PER_YEAR * SECONDS_PER_YEAR);
        let basePowerThree: field = ray_mul(basePowerTwo, rate) / SECONDS_PER_YEAR;

        let secondTerm: field = exp * expMinusOne * basePowerTwo / 2field;
        let thirdTerm: field = exp * expMinusOne * expMinusTwo * basePowerThree / 6field;

        return RAY + (rate * exp) / SECONDS_PER_YEAR + secondTerm + thirdTerm;
    }
}
