program spectre_pool_v1.aleo {
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

    mapping reserves: address => ReserveData;

    mapping users_config: address => UserConfigurationMap;

    mapping reserves_list: u128 => address;

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

    transition main() {}
}
