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

    transition main() {}
}
