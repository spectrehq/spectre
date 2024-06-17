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
    function way_mul(a: field, b: field) -> field {
        return (a * b + HALF_WAD) / WAD;
    }

    /**
     * Divides two wad, rounding half up to the nearest wad
     * @param a Wad
     * @param b Wad
     * @return c = a/b, in wad
     */
    function way_div(a: field, b: field) -> field {
        return (a * WAD + b / 2field) / b;
    }

    /**
     * Multiplies two ray, rounding half up to the nearest ray
     * @param a Ray
     * @param b Ray
     * @return c = a raymul b
     */
    function ray_mul(a: field, b: field) -> field {
        return (a * b + HALF_RAY) / RAY;
    }

    /**
     * Divides two ray, rounding half up to the nearest ray
     * @param a Ray
     * @param b Ray
     * @return c = a raydiv b
     */
    function ray_div(a: field, b: field) -> field {
        return (a * RAY + b / 2field) / b;
    }

    /**
     * Casts ray down to wad
     * @param a Ray
     * @return b = a converted to wad, rounded half up to the nearest wad
     */
    function ray_to_wad(a: field) -> field {
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
    function wad_to_ray(a: field) -> field {
        return a * WAD_RAY_RATIO;
    }

    // Maximum percentage factor (100.00%)
    const PERCENTAGE_FACTOR: field = 10000field; // 1e4

    // Half percentage factor (50.00%)
    const HALF_PERCENTAGE_FACTOR: field = 5000field; // 0.5e4

    function percent_mul(value: field, percentage: field) -> field {
        return (value * percentage + HALF_PERCENTAGE_FACTOR) / PERCENTAGE_FACTOR;
    }

    function percent_div(value: field, percentage: field) -> field {
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

    async transition supply(public asset: address, amount: u64, on_behalf_of: address) -> Future {
        return finalize_supply(asset, amount, on_behalf_of);
    }

    async function finalize_supply(asset: address, amount: u64, on_behalf_of: address) {
        let reserve: ReserveData = Mapping::get(reserves, asset);
    }

    async transition withdraw(public asset: address, amount: u64, to: address) -> Future {
        return finalize_withdraw(asset, amount, to);
    }

    async function finalize_withdraw(asset: address, amount: u64, to: address) {
        let reserve: ReserveData = Mapping::get(reserves, asset);
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
