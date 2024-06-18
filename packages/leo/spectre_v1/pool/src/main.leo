program spectre_pool_v1.aleo {
    const WAD: field = 1000000000000000000field; // 1e18
    const HALF_WAD: field = 500000000000000000field; // 0.5e18
    const RAY: field = 1000000000000000000000000000field; // 1e27
    const HALF_RAY: field = 500000000000000000000000000field; // 0.5e27
    const WAD_RAY_RATIO: field = 1000000000field; // 1e9

    /**
     * Multiplies two wad, rounding half up to the nearest wad
     * @param a Wad
     * @param b Wad
     * @return c = a*b, in wad
     */
    inline way_mul(a: field, b: field) -> field {
        return (a * b + HALF_WAD) / WAD;
    }

    /**
     * Divides two wad, rounding half up to the nearest wad
     * @param a Wad
     * @param b Wad
     * @return c = a/b, in wad
     */
    inline way_div(a: field, b: field) -> field {
        return (a * WAD + b / 2field) / b;
    }

    /**
     * Multiplies two ray, rounding half up to the nearest ray
     * @param a Ray
     * @param b Ray
     * @return c = a raymul b
     */
    inline ray_mul(a: field, b: field) -> field {
        return (a * b + HALF_RAY) / RAY;
    }

    /**
     * Divides two ray, rounding half up to the nearest ray
     * @param a Ray
     * @param b Ray
     * @return c = a raydiv b
     */
    inline ray_div(a: field, b: field) -> field {
        return (a * RAY + b / 2field) / b;
    }

    /**
     * Casts ray down to wad
     * @param a Ray
     * @return b = a converted to wad, rounded half up to the nearest wad
     */
    inline ray_to_wad(a: field) -> field {
        let b: field = a / WAD_RAY_RATIO;
        let remainder: field = a - b * WAD_RAY_RATIO;
        if (remainder >= WAD_RAY_RATIO / 2field) {
            b += 1field;
        }
        return b;
    }

    /**
     * Converts wad up to ray
     * @param a Wad
     * @return b = a converted in ray
     */
    inline wad_to_ray(a: field) -> field {
        return a * WAD_RAY_RATIO;
    }

    // Maximum percentage factor (100.00%)
    const PERCENTAGE_FACTOR: field = 10000field; // 1e4

    // Half percentage factor (50.00%)
    const HALF_PERCENTAGE_FACTOR: field = 5000field; // 0.5e4

    inline percent_mul(value: field, percentage: field) -> field {
        return (value * percentage + HALF_PERCENTAGE_FACTOR) / PERCENTAGE_FACTOR;
    }

    inline percent_div(value: field, percentage: field) -> field {
        return (value * PERCENTAGE_FACTOR + percentage / 2field) / percentage;
    }

    struct ReserveData {
        configuration: ReserveConfiguration;
        // the liquidity index. Expressed in ray
        liquidity_index: u128;
        // the current supply rate. Expressed in ray
        current_liquidity_rate: u128;
        // variable borrow index. Expressed in ray
        variable_borrow_index: u128;
        // the current variable borrow rate. Expressed in ray
        current_variable_borrow_rate: u128;
        // timestamp of last update
        last_update_timestamp: u64;
        // the id of the reserve. Represents the position in the list of the active reserves
        id: u16;
        // stoken address
        stoken_address: address;
        // variable_debt_token address
        variable_debt_token_address: address;
        // address of the interest rate strategy
        interest_rate_strategy_address: address;
        // the current treasury balance, scaled
        accrued_to_treasury: u128;
        // the outstanding debt borrowed against this asset in isolation mode
        isolation_mode_total_debt: u128;
    }

    struct ReserveConfiguration {
        ltv: u16;
        liquidation_threshold: u16;
        liquidation_bonus: u16;
        decimals: u8;
        is_active: bool;
        is_frozen: bool;
        borrowing_enabled: bool;
        is_paused: bool;
        borrowing_in_isolation_mode: bool;
        siloed_borrowing_enabled: bool;
        reserve_factor: u16;
        borrow_cap: u64;
        supply_cap: u64;
        liquidation_protocol_fee: u16;
        emode_category: u8;
        debt_ceiling: u64;
    }

    struct UserConfigurationMap {
        data1: u128;
        data2: u128;
    }

    struct ReserveCache {
        curr_scaled_variable_debt: field;
        next_scaled_variable_debt: field;
        curr_liquidity_index: field;
        next_liquidity_index: field;
        curr_variable_borrow_index: field;
        next_variable_borrow_index: field;
        curr_liquidity_rate: field;
        curr_variable_borrow_rate: field;
        reserve_factor: field;
        reserve_configuration: ReserveConfiguration;
        stoken_address: address;
        variable_debt_token_address: address;
        reserve_last_update_timestamp: u64;
    }

    mapping reserves: address => ReserveData;

    mapping users_config: address => UserConfigurationMap;

    mapping reserves_list: u128 => address;

    // Not used. Just make the type `ReserveCache` visible.
    mapping reserves_cache: u8 => ReserveCache;

    /******************** Supply logic ********************/

    async transition supply(public asset: address, amount: u128, on_behalf_of: address) -> Future {
        return finalize_supply(asset, amount, on_behalf_of);
    }

    async function finalize_supply(asset: address, amount: u128, on_behalf_of: address) {
        let reserve_1: ReserveData = Mapping::get(reserves, asset);
        let reserve_cache_1: ReserveCache = cache_reserve(reserve_1);

        let (reserve, reserve_cache): (ReserveData, ReserveCache) = update_reserve_state(reserve_1, reserve_cache_1, block.height as u64);

        // Mint stoken
        let is_first_supply: bool = false;
        {
            let amount_scaled: field = ray_div(amount as field, reserve_cache.next_liquidity_index);
            assert(amount_scaled != 0field);

            let user_hash: field = stoken_hash_user(asset, on_behalf_of);
            let user_state: STokenUserState = Mapping::get_or_use(stoken_user_states, user_hash, STokenUserState {balance: 0u128, index: 0u128});
            let scaled_balance: field = user_state.balance as field;
            // let balance_increase: field = ray_mul(scaled_balance, reserve_cache.next_liquidity_index) - ray_mul(scaled_balance, user_state.index as field);

            let stoken_metadata: STokenMetadata = Mapping::get(stoken_metadatas, asset);
            Mapping::set(stoken_metadatas, asset, STokenMetadata {name: stoken_metadata.name, symbol: stoken_metadata.symbol, decimals: stoken_metadata.decimals, total_supply: stoken_metadata.total_supply + amount_scaled as u128});

            Mapping::set(stoken_user_states, user_hash, STokenUserState {balance: user_state.balance + amount_scaled as u128, index: reserve_cache.next_liquidity_index as u128});

            is_first_supply = scaled_balance == 0field;
        }
    }

    async transition withdraw(public asset: address, amount: u128, on_behalf_of: address) -> Future {
        return finalize_withdraw(asset, amount, on_behalf_of);
    }

    async function finalize_withdraw(asset: address, amount: u128, on_behalf_of: address) {
        let reserve_1: ReserveData = Mapping::get(reserves, asset);
        let reserve_cache_1: ReserveCache = cache_reserve(reserve_1);

        let (reserve, reserve_cache): (ReserveData, ReserveCache) = update_reserve_state(reserve_1, reserve_cache_1, block.height as u64);

        // Burn stoken
        {
            let amount_scaled: field = ray_div(amount as field, reserve_cache.next_liquidity_index);
            assert(amount_scaled != 0field);

            let user_hash: field = stoken_hash_user(asset, on_behalf_of);
            let user_state: STokenUserState = Mapping::get_or_use(stoken_user_states, user_hash, STokenUserState {balance: 0u128, index: 0u128});
            // let scaled_balance: field = user_state.balance as field;
            // let balance_increase: field = ray_mul(scaled_balance, reserve_cache.next_liquidity_index) - ray_mul(scaled_balance, user_state.index as field);

            let stoken_metadata: STokenMetadata = Mapping::get(stoken_metadatas, asset);
            Mapping::set(stoken_metadatas, asset, STokenMetadata {name: stoken_metadata.name, symbol: stoken_metadata.symbol, decimals: stoken_metadata.decimals, total_supply: stoken_metadata.total_supply - amount_scaled as u128});

            Mapping::set(stoken_user_states, user_hash, STokenUserState {balance: user_state.balance - amount_scaled as u128, index: reserve_cache.next_liquidity_index as u128});
        }
    }

    /******************** Borrow logic ********************/

    async transition borrow(public asset: address, amount: u128, on_behalf_of: address) -> Future {
        return finalize_borrow(asset, amount, on_behalf_of);
    }

    async function finalize_borrow(asset: address, amount: u128, on_behalf_of: address) {
        let reserve_1: ReserveData = Mapping::get(reserves, asset);
        let reserve_cache_1: ReserveCache = cache_reserve(reserve_1);

        let (reserve, reserve_cache): (ReserveData, ReserveCache) = update_reserve_state(reserve_1, reserve_cache_1, block.height as u64);

        // Mint dtoken
        let is_first_borrow: bool = false;
        let next_scaled_variable_debt: field = reserve_cache.next_scaled_variable_debt;
        {
            let amount_scaled: field = ray_div(amount as field, reserve_cache.next_variable_borrow_index);
            assert(amount_scaled != 0field);

            let user_hash: field = dtoken_hash_user(asset, on_behalf_of);
            let user_state: DTokenUserState = Mapping::get_or_use(dtoken_user_states, user_hash, DTokenUserState {balance: 0u128, index: 0u128});
            let scaled_balance: field = user_state.balance as field;

            let dtoken_metadata: DTokenMetadata = Mapping::get(dtoken_metadatas, asset);
            let total_supply: u128 = dtoken_metadata.total_supply + amount_scaled as u128;
            Mapping::set(dtoken_metadatas, asset, DTokenMetadata {name: dtoken_metadata.name, symbol: dtoken_metadata.symbol, decimals: dtoken_metadata.decimals, total_supply});

            Mapping::set(dtoken_user_states, user_hash, DTokenUserState {balance: user_state.balance + amount_scaled as u128, index: reserve_cache.next_variable_borrow_index as u128});

            is_first_borrow = scaled_balance == 0field;
            next_scaled_variable_debt = total_supply as field;
        }
    }

    async transition repay(public asset: address, amount: u128, on_behalf_of: address) -> Future {
        return finalize_repay(asset, amount, on_behalf_of);
    }

    async function finalize_repay(asset: address, amount: u128, on_behalf_of: address) {
        let reserve_1: ReserveData = Mapping::get(reserves, asset);
        let reserve_cache_1: ReserveCache = cache_reserve(reserve_1);

        let (reserve, reserve_cache): (ReserveData, ReserveCache) = update_reserve_state(reserve_1, reserve_cache_1, block.height as u64);

        let user_hash: field = dtoken_hash_user(asset, on_behalf_of);
        let user_state: DTokenUserState = Mapping::get_or_use(dtoken_user_states, user_hash, DTokenUserState {balance: 0u128, index: 0u128});
        let variable_debt: field = ray_mul(user_state.balance as field, get_reserve_normalized_debt(Mapping::get(reserves, asset), block.height as u64));

        let payback_amount: field = (amount as field) < variable_debt ? amount as field : variable_debt;

        // Burn dtoken
        let next_scaled_variable_debt: field = reserve_cache.next_scaled_variable_debt;
        {
            let amount_scaled: field = ray_div(payback_amount, reserve_cache.next_variable_borrow_index);
            assert(amount_scaled != 0field);

            let dtoken_metadata: DTokenMetadata = Mapping::get(dtoken_metadatas, asset);
            let total_supply: u128 = dtoken_metadata.total_supply - amount_scaled as u128;
            Mapping::set(dtoken_metadatas, asset, DTokenMetadata {name: dtoken_metadata.name, symbol: dtoken_metadata.symbol, decimals: dtoken_metadata.decimals, total_supply});

            Mapping::set(dtoken_user_states, user_hash, DTokenUserState {balance: user_state.balance - amount_scaled as u128, index: reserve_cache.next_variable_borrow_index as u128});

            next_scaled_variable_debt = total_supply as field;
        }
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

        let accrued_to_treasury: u128 = reserve.accrued_to_treasury;
        if (reserve_cache.reserve_factor != 0field) {
            // Calculate the total variable debt at moment of the last interaction
            let prev_total_variable_debt: field = ray_mul(reserve_cache.curr_scaled_variable_debt, reserve_cache.curr_variable_borrow_index);
            // Calculate the new total variable debt after accumulation of the interest on the index
            let curr_total_variable_debt: field = ray_mul(reserve_cache.curr_scaled_variable_debt, reserve_cache.next_variable_borrow_index);

            // Debt accrued is the sum of the current debt minus the sum of the debt at the last update
            let total_debt_accrued: field = curr_total_variable_debt - prev_total_variable_debt;

            let amount_to_mint: field = percent_mul(total_debt_accrued, reserve_cache.reserve_factor);

            if (amount_to_mint != 0field) {
                accrued_to_treasury += ray_div(amount_to_mint, reserve_cache.next_liquidity_index) as u128;
            }
        }

        return (ReserveData {
            configuration: reserve.configuration,
            liquidity_index,
            current_liquidity_rate: reserve.current_liquidity_rate,
            variable_borrow_index,
            current_variable_borrow_rate: reserve.current_variable_borrow_rate,
            last_update_timestamp: current_timestamp, // update timestamp
            id: reserve.id,
            stoken_address: reserve.stoken_address,
            variable_debt_token_address: reserve.variable_debt_token_address,
            interest_rate_strategy_address: reserve.interest_rate_strategy_address,
            accrued_to_treasury,
            isolation_mode_total_debt: reserve.isolation_mode_total_debt
        }, ReserveCache {
            curr_scaled_variable_debt: reserve_cache.curr_scaled_variable_debt,
            next_scaled_variable_debt: reserve_cache.next_scaled_variable_debt,
            curr_liquidity_index: reserve_cache.curr_liquidity_index,
            next_liquidity_index,
            curr_variable_borrow_index: reserve_cache.curr_variable_borrow_index,
            next_variable_borrow_index,
            curr_liquidity_rate: reserve_cache.curr_liquidity_rate,
            curr_variable_borrow_rate: reserve_cache.curr_variable_borrow_rate,
            reserve_factor: reserve_cache.reserve_factor,
            reserve_configuration: reserve_cache.reserve_configuration,
            stoken_address: reserve_cache.stoken_address,
            variable_debt_token_address: reserve_cache.variable_debt_token_address,
            reserve_last_update_timestamp: reserve_cache.reserve_last_update_timestamp,
        });
    }

    inline cache_reserve(reserve: ReserveData) -> ReserveCache {
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

    /******************** Validation Logic ********************/

    inline validate_supply(reserve_cache: ReserveCache, reserve: ReserveData, amount: u64) {
        assert(amount != 0u64);

        assert(reserve_cache.reserve_configuration.is_active);
        assert(!reserve_cache.reserve_configuration.is_frozen);
        assert(!reserve_cache.reserve_configuration.is_paused);

        let supply_cap: u64 = reserve_cache.reserve_configuration.supply_cap;
        assert(supply_cap == 0u64);
    }

    /******************** SToken: implementation of the interest bearing token for the Spectre protocol ********************/

    struct STokenMetadata {
        name: u128, // 16 bytes -> 16 characters with ASCII encoding
        symbol: u64, // 8 bytes -> 8 characters with ASCII encoding
        decimals: u8,
        total_supply: u128,
    }

    struct STokenUser {
        reserve: address,
        account: address,
    }

    struct STokenUserState {
        balance: u128,
        index: u128,
    }

    struct STokenApproval {
        reserve: address,
        approver: address,
        spender: address,
    }

    mapping stoken_metadatas: address => STokenMetadata; // reserve => metadata
    mapping stoken_user_states: field => STokenUserState; // hash(reserve, account) => user state
    mapping stoken_approvals: field => u128; // hash(reserve, approver, spender) => approved amount

    async transition stoken_total_supply(public reserve: address) -> Future {
        return finalize_stoken_total_supply(reserve);
    }

    async function finalize_stoken_total_supply(reserve: address) {
        let metadata: STokenMetadata = Mapping::get(stoken_metadatas, reserve);
        let total_supply: field = ray_mul(metadata.total_supply as field, get_reserve_normalized_income(Mapping::get(reserves, reserve), block.height as u64));
    }

    async transition stoken_balance_of(public reserve: address, public account: address) -> Future {
        return finalize_stoken_balance_of(reserve, account);
    }

    async function finalize_stoken_balance_of(reserve: address, account: address) {
        let user_hash: field = stoken_hash_user(reserve, account);
        let user_state: STokenUserState = Mapping::get_or_use(stoken_user_states, user_hash, STokenUserState {balance: 0u128, index: 0u128});
        let balance: field = ray_mul(user_state.balance as field, get_reserve_normalized_income(Mapping::get(reserves, reserve), block.height as u64));
    }

    async transition stoken_approve_public(public reserve: address, public spender: address, public amount: u128) -> Future {
        return finalize_stoken_approve_public(reserve, stoken_hash_approval(reserve, self.caller, spender), amount);
    }

    async function finalize_stoken_approve_public(reserve: address, hash: field, amount: u128) {
        let index: field = get_reserve_normalized_income(Mapping::get(reserves, reserve), block.height as u64);
        let amount_scaled: field = ray_div(amount as field, index);

        let approval_amount: u128 = Mapping::get_or_use(stoken_approvals, hash, 0u128);
        Mapping::set(stoken_approvals, hash, approval_amount + amount_scaled as u128);
    }

    async transition stoken_unapprove_public(public reserve: address, public spender: address, public amount: u128) -> Future {
        return finalize_stoken_unapprove_public(reserve, stoken_hash_approval(reserve, self.caller, spender), amount);
    }

    async function finalize_stoken_unapprove_public(reserve: address, hash: field, amount: u128) {
        let index: field = get_reserve_normalized_income(Mapping::get(reserves, reserve), block.height as u64);
        let amount_scaled: field = ray_div(amount as field, index);

        let approval_amount: u128 = Mapping::get(stoken_approvals, hash);
        Mapping::set(stoken_approvals, hash, approval_amount - amount_scaled as u128);
    }

    async transition stoken_transfer_from_public(public reserve: address, public approver: address, public receiver: address, public amount: u128) -> Future {
        return finalize_stoken_transfer_from_public(reserve, stoken_hash_approval(reserve, approver, self.caller), approver, receiver, amount);
    }

    async function finalize_stoken_transfer_from_public(reserve: address, hash: field, approver: address, receiver: address, amount: u128) {
        let index: field = get_reserve_normalized_income(Mapping::get(reserves, reserve), block.height as u64);
        let amount_scaled: field = ray_div(amount as field, index);

        let approval_amount: u128 = Mapping::get(stoken_approvals, hash);
        Mapping::set(stoken_approvals, hash, approval_amount - amount_scaled as u128);

        let approver_hash: field = stoken_hash_user(reserve, approver);
        let approver_state: STokenUserState = Mapping::get_or_use(stoken_user_states, approver_hash, STokenUserState {balance: 0u128, index: 0u128});
        Mapping::set(stoken_user_states, approver_hash, STokenUserState {balance: approver_state.balance - amount_scaled as u128, index: approver_state.index});

        let receiver_hash: field = stoken_hash_user(reserve, receiver);
        let receiver_state: STokenUserState = Mapping::get_or_use(stoken_user_states, receiver_hash, STokenUserState {balance: 0u128, index: 0u128});
        Mapping::set(stoken_user_states, receiver_hash, STokenUserState {balance: receiver_state.balance + amount_scaled as u128, index: receiver_state.index});

        // TODO: validate
    }

    async transition stoken_transfer_public(public reserve: address, public receiver: address, public amount: u128) -> Future {
        return finalize_stoken_transfer_public(reserve, self.caller, receiver, amount);
    }

    async function finalize_stoken_transfer_public(public reserve: address, public sender: address, public receiver: address, public amount: u128) {
        let index: field = get_reserve_normalized_income(Mapping::get(reserves, reserve), block.height as u64);
        let amount_scaled: field = ray_div(amount as field, index);

        let sender_hash: field = stoken_hash_user(reserve, sender);
        let sender_state: STokenUserState = Mapping::get_or_use(stoken_user_states, sender_hash, STokenUserState {balance: 0u128, index: 0u128});
        Mapping::set(stoken_user_states, sender_hash, STokenUserState {balance: sender_state.balance - amount_scaled as u128, index: index as u128});

        let receiver_hash: field = stoken_hash_user(reserve, receiver);
        let receiver_state: STokenUserState = Mapping::get_or_use(stoken_user_states, receiver_hash, STokenUserState {balance: 0u128, index: 0u128});
        Mapping::set(stoken_user_states, receiver_hash, STokenUserState {balance: receiver_state.balance + amount_scaled as u128, index: index as u128});

        // TODO: validate
    }

    inline stoken_hash_user(reserve: address, account: address) -> field {
        return BHP256::hash_to_field(STokenUser {reserve, account});
    }

    inline stoken_hash_approval(reserve: address, approver: address, spender: address) -> field {
        return BHP256::hash_to_field(STokenApproval {reserve, approver, spender});
    }

    /******************** DebtToken: implementation of a variable debt token to track the borrowing positions of user at variable rate mode ********************/

    struct DTokenMetadata {
        name: u128, // 16 bytes -> 16 characters with ASCII encoding
        symbol: u64, // 8 bytes -> 8 characters with ASCII encoding
        decimals: u8,
        total_supply: u128,
    }

    struct DTokenUser {
        reserve: address,
        account: address,
    }

    struct DTokenUserState {
        balance: u128,
        index: u128,
    }

    mapping dtoken_metadatas: address => DTokenMetadata; // reserve => metadata
    mapping dtoken_user_states: field => DTokenUserState; // hash(reserve, account) => user state

    async transition dtoken_total_supply(public reserve: address) -> Future {
        return finalize_dtoken_total_supply(reserve);
    }

    async function finalize_dtoken_total_supply(reserve: address) {
        let metadata: DTokenMetadata = Mapping::get(dtoken_metadatas, reserve);
        let total_supply: field = ray_mul(metadata.total_supply as field, get_reserve_normalized_debt(Mapping::get(reserves, reserve), block.height as u64));
    }

    async transition dtoken_balance_of(public reserve: address, public account: address) -> Future {
        return finalize_dtoken_balance_of(reserve, account);
    }

    async function finalize_dtoken_balance_of(reserve: address, account: address) {
        let user_hash: field = dtoken_hash_user(reserve, account);
        let user_state: DTokenUserState = Mapping::get_or_use(dtoken_user_states, user_hash, DTokenUserState {balance: 0u128, index: 0u128});
        let balance: field = ray_mul(user_state.balance as field, get_reserve_normalized_debt(Mapping::get(reserves, reserve), block.height as u64));
    }

    inline dtoken_hash_user(reserve: address, account: address) -> field {
        return BHP256::hash_to_field(DTokenUser {reserve, account});
    }
}
