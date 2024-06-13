program spectre_pool_v1.aleo;

struct ReserveConfiguration:
    ltv as u16;
    liquidation_threshold as u16;
    liquidation_bonus as u16;
    decimals as u8;
    is_active as boolean;
    is_frozen as boolean;
    borrowing_enabled as boolean;
    is_paused as boolean;
    borrowing_in_isolation_mode as boolean;
    siloed_borrowing_enabled as boolean;
    reserve_factor as u16;
    borrow_cap as u64;
    supply_cap as u64;
    liquidation_protocol_fee as u16;
    emode_category as u8;
    debt_ceiling as u64;

struct ReserveData:
    configuration as ReserveConfiguration;
    liquidity_index as u128;
    current_liquidity_rate as u128;
    variable_borrow_index as u128;
    current_variable_borrow_rate as u128;
    last_update_timestamp as u64;
    id as u16;
    stoken_address as address;
    variable_debt_token_address as address;
    interest_rate_strategy_address as address;
    accrued_to_treasury as u128;
    isolation_mode_total_debt as u128;

struct UserConfigurationMap:
    data1 as u128;
    data2 as u128;

struct ReserveCache:
    curr_scaled_variable_debt as field;
    next_scaled_variable_debt as field;
    curr_liquidity_index as field;
    next_liquidity_index as field;
    curr_variable_borrow_index as field;
    next_variable_borrow_index as field;
    curr_liquidity_rate as field;
    curr_variable_borrow_rate as field;
    reserve_factor as field;
    reserve_configuration as ReserveConfiguration;
    stoken_address as address;
    variable_debt_token_address as address;
    reserve_last_update_timestamp as u64;


mapping reserves:
	key as address.public;
	value as ReserveData.public;


mapping users_config:
	key as address.public;
	value as UserConfigurationMap.public;


mapping reserves_list:
	key as u128.public;
	value as address.public;

function main:


closure way_mul:
    input r0 as field;
    input r1 as field;
    mul r0 r1 into r2;
    add r2 500000000000000000field into r3;
    div r3 1000000000000000000field into r4;
    output r4 as field;


closure way_div:
    input r0 as field;
    input r1 as field;
    mul r0 1000000000000000000field into r2;
    div r1 2field into r3;
    add r2 r3 into r4;
    div r4 r1 into r5;
    output r5 as field;


closure ray_mul:
    input r0 as field;
    input r1 as field;
    mul r0 r1 into r2;
    add r2 500000000000000000000000000field into r3;
    div r3 1000000000000000000000000000field into r4;
    output r4 as field;


closure ray_div:
    input r0 as field;
    input r1 as field;
    mul r0 1000000000000000000000000000field into r2;
    div r1 2field into r3;
    add r2 r3 into r4;
    div r4 r1 into r5;
    output r5 as field;


closure ray_to_wad:
    input r0 as field;
    div r0 1000000000field into r1;
    mul r1 1000000000field into r2;
    sub r0 r2 into r3;
    div 1000000000field 2field into r4;
    gte r3 r4 into r5;
    add r1 1field into r6;
    ternary r5 r6 r1 into r7;
    output r7 as field;


closure wad_to_ray:
    input r0 as field;
    mul r0 1000000000field into r1;
    output r1 as field;


