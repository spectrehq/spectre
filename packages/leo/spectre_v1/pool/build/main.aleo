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

struct STokenMetadata:
    name as u128;
    symbol as u64;
    decimals as u8;
    total_supply as u128;

struct STokenUser:
    reserve as address;
    account as address;

struct STokenUserState:
    balance as u128;
    index as u128;

struct STokenApproval:
    reserve as address;
    approver as address;
    spender as address;


mapping reserves:
	key as address.public;
	value as ReserveData.public;


mapping users_config:
	key as address.public;
	value as UserConfigurationMap.public;


mapping reserves_list:
	key as u128.public;
	value as address.public;


mapping reserves_cache:
	key as u8.public;
	value as ReserveCache.public;


mapping stoken_metadatas:
	key as address.public;
	value as STokenMetadata.public;


mapping stoken_user_states:
	key as field.public;
	value as STokenUserState.public;


mapping stoken_approvals:
	key as field.public;
	value as u128.public;


















function supply:
    input r0 as address.public;
    input r1 as u128.private;
    input r2 as address.private;
    async supply r0 r1 r2 into r3;
    output r3 as spectre_pool_v1.aleo/supply.future;

finalize supply:
    input r0 as address.public;
    input r1 as u128.public;
    input r2 as address.public;
    get reserves[r0] into r3;
    cast r3.liquidity_index into r4 as field;
    cast r3.liquidity_index into r5 as field;
    cast r3.variable_borrow_index into r6 as field;
    cast r3.variable_borrow_index into r7 as field;
    cast r3.current_liquidity_rate into r8 as field;
    cast r3.current_variable_borrow_rate into r9 as field;
    cast r3.configuration.reserve_factor into r10 as field;
    cast 0field 0field r4 r5 r6 r7 r8 r9 r10 r3.configuration r3.stoken_address r3.variable_debt_token_address r3.last_update_timestamp into r11 as ReserveCache;
    cast block.height into r12 as u64;
    is.eq r3.last_update_timestamp r12 into r13;
    is.neq r11.curr_liquidity_rate 0field into r14;
    sub r12 r11.reserve_last_update_timestamp into r15;
    cast r15 into r16 as field;
    mul r11.curr_liquidity_rate r16 into r17;
    div r17 31536000field into r18;
    add 1000000000000000000000000000field r18 into r19;
    mul r19 r11.curr_liquidity_index into r20;
    add r20 500000000000000000000000000field into r21;
    div r21 1000000000000000000000000000field into r22;
    cast r22 into r23 as u128;
    ternary r14 r22 r11.next_liquidity_index into r24;
    ternary r14 r23 r3.liquidity_index into r25;
    is.neq r11.curr_scaled_variable_debt 0field into r26;
    sub r12 r11.reserve_last_update_timestamp into r27;
    cast r27 into r28 as field;
    is.eq r28 0field into r29;
    sub r28 1field into r30;
    gt r28 2field into r31;
    sub r28 2field into r32;
    ternary r31 r32 0field into r33;
    mul r11.curr_variable_borrow_rate r11.curr_variable_borrow_rate into r34;
    add r34 500000000000000000000000000field into r35;
    div r35 1000000000000000000000000000field into r36;
    mul 31536000field 31536000field into r37;
    div r36 r37 into r38;
    mul r38 r11.curr_variable_borrow_rate into r39;
    add r39 500000000000000000000000000field into r40;
    div r40 1000000000000000000000000000field into r41;
    div r41 31536000field into r42;
    mul r28 r30 into r43;
    mul r43 r38 into r44;
    div r44 2field into r45;
    mul r28 r30 into r46;
    mul r46 r33 into r47;
    mul r47 r42 into r48;
    div r48 6field into r49;
    mul r11.curr_variable_borrow_rate r28 into r50;
    div r50 31536000field into r51;
    add 1000000000000000000000000000field r51 into r52;
    add r52 r45 into r53;
    add r53 r49 into r54;
    ternary r29 1000000000000000000000000000field r54 into r55;
    mul r55 r11.curr_variable_borrow_index into r56;
    add r56 500000000000000000000000000field into r57;
    div r57 1000000000000000000000000000field into r58;
    cast r58 into r59 as u128;
    ternary r26 r58 r11.next_variable_borrow_index into r60;
    ternary r26 r59 r3.variable_borrow_index into r61;
    is.neq r11.reserve_factor 0field into r62;
    mul r11.curr_scaled_variable_debt r11.curr_variable_borrow_index into r63;
    add r63 500000000000000000000000000field into r64;
    div r64 1000000000000000000000000000field into r65;
    mul r11.curr_scaled_variable_debt r11.next_variable_borrow_index into r66;
    add r66 500000000000000000000000000field into r67;
    div r67 1000000000000000000000000000field into r68;
    sub r68 r65 into r69;
    mul r69 r11.reserve_factor into r70;
    add r70 5000field into r71;
    div r71 10000field into r72;
    is.neq r72 0field into r73;
    mul r72 1000000000000000000000000000field into r74;
    div r11.next_liquidity_index 2field into r75;
    add r74 r75 into r76;
    div r76 r11.next_liquidity_index into r77;
    cast r77 into r78 as u128;
    add r3.accrued_to_treasury r78 into r79;
    ternary r73 r79 r3.accrued_to_treasury into r80;
    ternary r62 r80 r3.accrued_to_treasury into r81;
    cast r3.configuration r25 r3.current_liquidity_rate r61 r3.current_variable_borrow_rate r12 r3.id r3.stoken_address r3.variable_debt_token_address r3.interest_rate_strategy_address r81 r3.isolation_mode_total_debt into r82 as ReserveData;
    cast r11.curr_scaled_variable_debt r11.next_scaled_variable_debt r11.curr_liquidity_index r24 r11.curr_variable_borrow_index r60 r11.curr_liquidity_rate r11.curr_variable_borrow_rate r11.reserve_factor r11.reserve_configuration r11.stoken_address r11.variable_debt_token_address r11.reserve_last_update_timestamp into r83 as ReserveCache;
    ternary r13 r3.configuration.ltv r82.configuration.ltv into r84;
    ternary r13 r3.configuration.liquidation_threshold r82.configuration.liquidation_threshold into r85;
    ternary r13 r3.configuration.liquidation_bonus r82.configuration.liquidation_bonus into r86;
    ternary r13 r3.configuration.decimals r82.configuration.decimals into r87;
    ternary r13 r3.configuration.is_active r82.configuration.is_active into r88;
    ternary r13 r3.configuration.is_frozen r82.configuration.is_frozen into r89;
    ternary r13 r3.configuration.borrowing_enabled r82.configuration.borrowing_enabled into r90;
    ternary r13 r3.configuration.is_paused r82.configuration.is_paused into r91;
    ternary r13 r3.configuration.borrowing_in_isolation_mode r82.configuration.borrowing_in_isolation_mode into r92;
    ternary r13 r3.configuration.siloed_borrowing_enabled r82.configuration.siloed_borrowing_enabled into r93;
    ternary r13 r3.configuration.reserve_factor r82.configuration.reserve_factor into r94;
    ternary r13 r3.configuration.borrow_cap r82.configuration.borrow_cap into r95;
    ternary r13 r3.configuration.supply_cap r82.configuration.supply_cap into r96;
    ternary r13 r3.configuration.liquidation_protocol_fee r82.configuration.liquidation_protocol_fee into r97;
    ternary r13 r3.configuration.emode_category r82.configuration.emode_category into r98;
    ternary r13 r3.configuration.debt_ceiling r82.configuration.debt_ceiling into r99;
    cast r84 r85 r86 r87 r88 r89 r90 r91 r92 r93 r94 r95 r96 r97 r98 r99 into r100 as ReserveConfiguration;
    ternary r13 r3.liquidity_index r82.liquidity_index into r101;
    ternary r13 r3.current_liquidity_rate r82.current_liquidity_rate into r102;
    ternary r13 r3.variable_borrow_index r82.variable_borrow_index into r103;
    ternary r13 r3.current_variable_borrow_rate r82.current_variable_borrow_rate into r104;
    ternary r13 r3.last_update_timestamp r82.last_update_timestamp into r105;
    ternary r13 r3.id r82.id into r106;
    ternary r13 r3.stoken_address r82.stoken_address into r107;
    ternary r13 r3.variable_debt_token_address r82.variable_debt_token_address into r108;
    ternary r13 r3.interest_rate_strategy_address r82.interest_rate_strategy_address into r109;
    ternary r13 r3.accrued_to_treasury r82.accrued_to_treasury into r110;
    ternary r13 r3.isolation_mode_total_debt r82.isolation_mode_total_debt into r111;
    cast r100 r101 r102 r103 r104 r105 r106 r107 r108 r109 r110 r111 into r112 as ReserveData;
    ternary r13 r11.curr_scaled_variable_debt r83.curr_scaled_variable_debt into r113;
    ternary r13 r11.next_scaled_variable_debt r83.next_scaled_variable_debt into r114;
    ternary r13 r11.curr_liquidity_index r83.curr_liquidity_index into r115;
    ternary r13 r11.next_liquidity_index r83.next_liquidity_index into r116;
    ternary r13 r11.curr_variable_borrow_index r83.curr_variable_borrow_index into r117;
    ternary r13 r11.next_variable_borrow_index r83.next_variable_borrow_index into r118;
    ternary r13 r11.curr_liquidity_rate r83.curr_liquidity_rate into r119;
    ternary r13 r11.curr_variable_borrow_rate r83.curr_variable_borrow_rate into r120;
    ternary r13 r11.reserve_factor r83.reserve_factor into r121;
    ternary r13 r11.reserve_configuration.ltv r83.reserve_configuration.ltv into r122;
    ternary r13 r11.reserve_configuration.liquidation_threshold r83.reserve_configuration.liquidation_threshold into r123;
    ternary r13 r11.reserve_configuration.liquidation_bonus r83.reserve_configuration.liquidation_bonus into r124;
    ternary r13 r11.reserve_configuration.decimals r83.reserve_configuration.decimals into r125;
    ternary r13 r11.reserve_configuration.is_active r83.reserve_configuration.is_active into r126;
    ternary r13 r11.reserve_configuration.is_frozen r83.reserve_configuration.is_frozen into r127;
    ternary r13 r11.reserve_configuration.borrowing_enabled r83.reserve_configuration.borrowing_enabled into r128;
    ternary r13 r11.reserve_configuration.is_paused r83.reserve_configuration.is_paused into r129;
    ternary r13 r11.reserve_configuration.borrowing_in_isolation_mode r83.reserve_configuration.borrowing_in_isolation_mode into r130;
    ternary r13 r11.reserve_configuration.siloed_borrowing_enabled r83.reserve_configuration.siloed_borrowing_enabled into r131;
    ternary r13 r11.reserve_configuration.reserve_factor r83.reserve_configuration.reserve_factor into r132;
    ternary r13 r11.reserve_configuration.borrow_cap r83.reserve_configuration.borrow_cap into r133;
    ternary r13 r11.reserve_configuration.supply_cap r83.reserve_configuration.supply_cap into r134;
    ternary r13 r11.reserve_configuration.liquidation_protocol_fee r83.reserve_configuration.liquidation_protocol_fee into r135;
    ternary r13 r11.reserve_configuration.emode_category r83.reserve_configuration.emode_category into r136;
    ternary r13 r11.reserve_configuration.debt_ceiling r83.reserve_configuration.debt_ceiling into r137;
    cast r122 r123 r124 r125 r126 r127 r128 r129 r130 r131 r132 r133 r134 r135 r136 r137 into r138 as ReserveConfiguration;
    ternary r13 r11.stoken_address r83.stoken_address into r139;
    ternary r13 r11.variable_debt_token_address r83.variable_debt_token_address into r140;
    ternary r13 r11.reserve_last_update_timestamp r83.reserve_last_update_timestamp into r141;
    cast r113 r114 r115 r116 r117 r118 r119 r120 r121 r138 r139 r140 r141 into r142 as ReserveCache;
    cast r1 into r143 as field;
    mul r143 1000000000000000000000000000field into r144;
    div r142.next_liquidity_index 2field into r145;
    add r144 r145 into r146;
    div r146 r142.next_liquidity_index into r147;
    is.neq r147 0field into r148;
    assert.eq r148 true;
    cast r0 r2 into r149 as STokenUser;
    hash.bhp256 r149 into r150 as field;
    cast 0u128 0u128 into r151 as STokenUserState;
    get.or_use stoken_user_states[r150] r151 into r152;
    cast r152.balance into r153 as field;
    get stoken_metadatas[r0] into r154;
    cast r147 into r155 as u128;
    add r154.total_supply r155 into r156;
    cast r154.name r154.symbol r154.decimals r156 into r157 as STokenMetadata;
    set r157 into stoken_metadatas[r0];
    cast r147 into r158 as u128;
    add r152.balance r158 into r159;
    cast r142.next_liquidity_index into r160 as u128;
    cast r159 r160 into r161 as STokenUserState;
    set r161 into stoken_user_states[r150];
    is.eq r153 0field into r162;




function withdraw:
    input r0 as address.public;
    input r1 as u128.private;
    input r2 as address.private;
    async withdraw r0 r1 r2 into r3;
    output r3 as spectre_pool_v1.aleo/withdraw.future;

finalize withdraw:
    input r0 as address.public;
    input r1 as u128.public;
    input r2 as address.public;
    get reserves[r0] into r3;
    cast r3.liquidity_index into r4 as field;
    cast r3.liquidity_index into r5 as field;
    cast r3.variable_borrow_index into r6 as field;
    cast r3.variable_borrow_index into r7 as field;
    cast r3.current_liquidity_rate into r8 as field;
    cast r3.current_variable_borrow_rate into r9 as field;
    cast r3.configuration.reserve_factor into r10 as field;
    cast 0field 0field r4 r5 r6 r7 r8 r9 r10 r3.configuration r3.stoken_address r3.variable_debt_token_address r3.last_update_timestamp into r11 as ReserveCache;
    cast block.height into r12 as u64;
    is.eq r3.last_update_timestamp r12 into r13;
    is.neq r11.curr_liquidity_rate 0field into r14;
    sub r12 r11.reserve_last_update_timestamp into r15;
    cast r15 into r16 as field;
    mul r11.curr_liquidity_rate r16 into r17;
    div r17 31536000field into r18;
    add 1000000000000000000000000000field r18 into r19;
    mul r19 r11.curr_liquidity_index into r20;
    add r20 500000000000000000000000000field into r21;
    div r21 1000000000000000000000000000field into r22;
    cast r22 into r23 as u128;
    ternary r14 r22 r11.next_liquidity_index into r24;
    ternary r14 r23 r3.liquidity_index into r25;
    is.neq r11.curr_scaled_variable_debt 0field into r26;
    sub r12 r11.reserve_last_update_timestamp into r27;
    cast r27 into r28 as field;
    is.eq r28 0field into r29;
    sub r28 1field into r30;
    gt r28 2field into r31;
    sub r28 2field into r32;
    ternary r31 r32 0field into r33;
    mul r11.curr_variable_borrow_rate r11.curr_variable_borrow_rate into r34;
    add r34 500000000000000000000000000field into r35;
    div r35 1000000000000000000000000000field into r36;
    mul 31536000field 31536000field into r37;
    div r36 r37 into r38;
    mul r38 r11.curr_variable_borrow_rate into r39;
    add r39 500000000000000000000000000field into r40;
    div r40 1000000000000000000000000000field into r41;
    div r41 31536000field into r42;
    mul r28 r30 into r43;
    mul r43 r38 into r44;
    div r44 2field into r45;
    mul r28 r30 into r46;
    mul r46 r33 into r47;
    mul r47 r42 into r48;
    div r48 6field into r49;
    mul r11.curr_variable_borrow_rate r28 into r50;
    div r50 31536000field into r51;
    add 1000000000000000000000000000field r51 into r52;
    add r52 r45 into r53;
    add r53 r49 into r54;
    ternary r29 1000000000000000000000000000field r54 into r55;
    mul r55 r11.curr_variable_borrow_index into r56;
    add r56 500000000000000000000000000field into r57;
    div r57 1000000000000000000000000000field into r58;
    cast r58 into r59 as u128;
    ternary r26 r58 r11.next_variable_borrow_index into r60;
    ternary r26 r59 r3.variable_borrow_index into r61;
    is.neq r11.reserve_factor 0field into r62;
    mul r11.curr_scaled_variable_debt r11.curr_variable_borrow_index into r63;
    add r63 500000000000000000000000000field into r64;
    div r64 1000000000000000000000000000field into r65;
    mul r11.curr_scaled_variable_debt r11.next_variable_borrow_index into r66;
    add r66 500000000000000000000000000field into r67;
    div r67 1000000000000000000000000000field into r68;
    sub r68 r65 into r69;
    mul r69 r11.reserve_factor into r70;
    add r70 5000field into r71;
    div r71 10000field into r72;
    is.neq r72 0field into r73;
    mul r72 1000000000000000000000000000field into r74;
    div r11.next_liquidity_index 2field into r75;
    add r74 r75 into r76;
    div r76 r11.next_liquidity_index into r77;
    cast r77 into r78 as u128;
    add r3.accrued_to_treasury r78 into r79;
    ternary r73 r79 r3.accrued_to_treasury into r80;
    ternary r62 r80 r3.accrued_to_treasury into r81;
    cast r3.configuration r25 r3.current_liquidity_rate r61 r3.current_variable_borrow_rate r12 r3.id r3.stoken_address r3.variable_debt_token_address r3.interest_rate_strategy_address r81 r3.isolation_mode_total_debt into r82 as ReserveData;
    cast r11.curr_scaled_variable_debt r11.next_scaled_variable_debt r11.curr_liquidity_index r24 r11.curr_variable_borrow_index r60 r11.curr_liquidity_rate r11.curr_variable_borrow_rate r11.reserve_factor r11.reserve_configuration r11.stoken_address r11.variable_debt_token_address r11.reserve_last_update_timestamp into r83 as ReserveCache;
    ternary r13 r3.configuration.ltv r82.configuration.ltv into r84;
    ternary r13 r3.configuration.liquidation_threshold r82.configuration.liquidation_threshold into r85;
    ternary r13 r3.configuration.liquidation_bonus r82.configuration.liquidation_bonus into r86;
    ternary r13 r3.configuration.decimals r82.configuration.decimals into r87;
    ternary r13 r3.configuration.is_active r82.configuration.is_active into r88;
    ternary r13 r3.configuration.is_frozen r82.configuration.is_frozen into r89;
    ternary r13 r3.configuration.borrowing_enabled r82.configuration.borrowing_enabled into r90;
    ternary r13 r3.configuration.is_paused r82.configuration.is_paused into r91;
    ternary r13 r3.configuration.borrowing_in_isolation_mode r82.configuration.borrowing_in_isolation_mode into r92;
    ternary r13 r3.configuration.siloed_borrowing_enabled r82.configuration.siloed_borrowing_enabled into r93;
    ternary r13 r3.configuration.reserve_factor r82.configuration.reserve_factor into r94;
    ternary r13 r3.configuration.borrow_cap r82.configuration.borrow_cap into r95;
    ternary r13 r3.configuration.supply_cap r82.configuration.supply_cap into r96;
    ternary r13 r3.configuration.liquidation_protocol_fee r82.configuration.liquidation_protocol_fee into r97;
    ternary r13 r3.configuration.emode_category r82.configuration.emode_category into r98;
    ternary r13 r3.configuration.debt_ceiling r82.configuration.debt_ceiling into r99;
    cast r84 r85 r86 r87 r88 r89 r90 r91 r92 r93 r94 r95 r96 r97 r98 r99 into r100 as ReserveConfiguration;
    ternary r13 r3.liquidity_index r82.liquidity_index into r101;
    ternary r13 r3.current_liquidity_rate r82.current_liquidity_rate into r102;
    ternary r13 r3.variable_borrow_index r82.variable_borrow_index into r103;
    ternary r13 r3.current_variable_borrow_rate r82.current_variable_borrow_rate into r104;
    ternary r13 r3.last_update_timestamp r82.last_update_timestamp into r105;
    ternary r13 r3.id r82.id into r106;
    ternary r13 r3.stoken_address r82.stoken_address into r107;
    ternary r13 r3.variable_debt_token_address r82.variable_debt_token_address into r108;
    ternary r13 r3.interest_rate_strategy_address r82.interest_rate_strategy_address into r109;
    ternary r13 r3.accrued_to_treasury r82.accrued_to_treasury into r110;
    ternary r13 r3.isolation_mode_total_debt r82.isolation_mode_total_debt into r111;
    cast r100 r101 r102 r103 r104 r105 r106 r107 r108 r109 r110 r111 into r112 as ReserveData;
    ternary r13 r11.curr_scaled_variable_debt r83.curr_scaled_variable_debt into r113;
    ternary r13 r11.next_scaled_variable_debt r83.next_scaled_variable_debt into r114;
    ternary r13 r11.curr_liquidity_index r83.curr_liquidity_index into r115;
    ternary r13 r11.next_liquidity_index r83.next_liquidity_index into r116;
    ternary r13 r11.curr_variable_borrow_index r83.curr_variable_borrow_index into r117;
    ternary r13 r11.next_variable_borrow_index r83.next_variable_borrow_index into r118;
    ternary r13 r11.curr_liquidity_rate r83.curr_liquidity_rate into r119;
    ternary r13 r11.curr_variable_borrow_rate r83.curr_variable_borrow_rate into r120;
    ternary r13 r11.reserve_factor r83.reserve_factor into r121;
    ternary r13 r11.reserve_configuration.ltv r83.reserve_configuration.ltv into r122;
    ternary r13 r11.reserve_configuration.liquidation_threshold r83.reserve_configuration.liquidation_threshold into r123;
    ternary r13 r11.reserve_configuration.liquidation_bonus r83.reserve_configuration.liquidation_bonus into r124;
    ternary r13 r11.reserve_configuration.decimals r83.reserve_configuration.decimals into r125;
    ternary r13 r11.reserve_configuration.is_active r83.reserve_configuration.is_active into r126;
    ternary r13 r11.reserve_configuration.is_frozen r83.reserve_configuration.is_frozen into r127;
    ternary r13 r11.reserve_configuration.borrowing_enabled r83.reserve_configuration.borrowing_enabled into r128;
    ternary r13 r11.reserve_configuration.is_paused r83.reserve_configuration.is_paused into r129;
    ternary r13 r11.reserve_configuration.borrowing_in_isolation_mode r83.reserve_configuration.borrowing_in_isolation_mode into r130;
    ternary r13 r11.reserve_configuration.siloed_borrowing_enabled r83.reserve_configuration.siloed_borrowing_enabled into r131;
    ternary r13 r11.reserve_configuration.reserve_factor r83.reserve_configuration.reserve_factor into r132;
    ternary r13 r11.reserve_configuration.borrow_cap r83.reserve_configuration.borrow_cap into r133;
    ternary r13 r11.reserve_configuration.supply_cap r83.reserve_configuration.supply_cap into r134;
    ternary r13 r11.reserve_configuration.liquidation_protocol_fee r83.reserve_configuration.liquidation_protocol_fee into r135;
    ternary r13 r11.reserve_configuration.emode_category r83.reserve_configuration.emode_category into r136;
    ternary r13 r11.reserve_configuration.debt_ceiling r83.reserve_configuration.debt_ceiling into r137;
    cast r122 r123 r124 r125 r126 r127 r128 r129 r130 r131 r132 r133 r134 r135 r136 r137 into r138 as ReserveConfiguration;
    ternary r13 r11.stoken_address r83.stoken_address into r139;
    ternary r13 r11.variable_debt_token_address r83.variable_debt_token_address into r140;
    ternary r13 r11.reserve_last_update_timestamp r83.reserve_last_update_timestamp into r141;
    cast r113 r114 r115 r116 r117 r118 r119 r120 r121 r138 r139 r140 r141 into r142 as ReserveCache;
    cast r1 into r143 as field;
    mul r143 1000000000000000000000000000field into r144;
    div r142.next_liquidity_index 2field into r145;
    add r144 r145 into r146;
    div r146 r142.next_liquidity_index into r147;
    is.neq r147 0field into r148;
    assert.eq r148 true;
    cast r0 r2 into r149 as STokenUser;
    hash.bhp256 r149 into r150 as field;
    cast 0u128 0u128 into r151 as STokenUserState;
    get.or_use stoken_user_states[r150] r151 into r152;
    cast r152.balance into r153 as field;
    get stoken_metadatas[r0] into r154;
    cast r147 into r155 as u128;
    sub r154.total_supply r155 into r156;
    cast r154.name r154.symbol r154.decimals r156 into r157 as STokenMetadata;
    set r157 into stoken_metadatas[r0];
    cast r147 into r158 as u128;
    sub r152.balance r158 into r159;
    cast r142.next_liquidity_index into r160 as u128;
    cast r159 r160 into r161 as STokenUserState;
    set r161 into stoken_user_states[r150];






function stoken_total_supply:
    input r0 as address.public;
    async stoken_total_supply r0 into r1;
    output r1 as spectre_pool_v1.aleo/stoken_total_supply.future;

finalize stoken_total_supply:
    input r0 as address.public;
    get stoken_metadatas[r0] into r1;
    cast r1.total_supply into r2 as field;
    get reserves[r0] into r3;
    cast block.height into r4 as u64;
    is.eq r3.last_update_timestamp r4 into r5;
    cast r3.liquidity_index into r6 as field;
    cast r3.current_liquidity_rate into r7 as field;
    sub r4 r3.last_update_timestamp into r8;
    cast r8 into r9 as field;
    mul r7 r9 into r10;
    div r10 31536000field into r11;
    add 1000000000000000000000000000field r11 into r12;
    cast r3.liquidity_index into r13 as field;
    mul r12 r13 into r14;
    add r14 500000000000000000000000000field into r15;
    div r15 1000000000000000000000000000field into r16;
    ternary r5 r6 r16 into r17;
    mul r2 r17 into r18;
    add r18 500000000000000000000000000field into r19;
    div r19 1000000000000000000000000000field into r20;




function stoken_balance_of:
    input r0 as address.public;
    input r1 as address.public;
    async stoken_balance_of r0 r1 into r2;
    output r2 as spectre_pool_v1.aleo/stoken_balance_of.future;

finalize stoken_balance_of:
    input r0 as address.public;
    input r1 as address.public;
    cast r0 r1 into r2 as STokenUser;
    hash.bhp256 r2 into r3 as field;
    cast 0u128 0u128 into r4 as STokenUserState;
    get.or_use stoken_user_states[r3] r4 into r5;
    cast r5.balance into r6 as field;
    get reserves[r0] into r7;
    cast block.height into r8 as u64;
    is.eq r7.last_update_timestamp r8 into r9;
    cast r7.liquidity_index into r10 as field;
    cast r7.current_liquidity_rate into r11 as field;
    sub r8 r7.last_update_timestamp into r12;
    cast r12 into r13 as field;
    mul r11 r13 into r14;
    div r14 31536000field into r15;
    add 1000000000000000000000000000field r15 into r16;
    cast r7.liquidity_index into r17 as field;
    mul r16 r17 into r18;
    add r18 500000000000000000000000000field into r19;
    div r19 1000000000000000000000000000field into r20;
    ternary r9 r10 r20 into r21;
    mul r6 r21 into r22;
    add r22 500000000000000000000000000field into r23;
    div r23 1000000000000000000000000000field into r24;






function stoken_approve_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as u128.public;
    cast r0 self.caller r1 into r3 as STokenApproval;
    hash.bhp256 r3 into r4 as field;
    async stoken_approve_public r0 r4 r2 into r5;
    output r5 as spectre_pool_v1.aleo/stoken_approve_public.future;

finalize stoken_approve_public:
    input r0 as address.public;
    input r1 as field.public;
    input r2 as u128.public;
    get reserves[r0] into r3;
    cast block.height into r4 as u64;
    is.eq r3.last_update_timestamp r4 into r5;
    cast r3.liquidity_index into r6 as field;
    cast r3.current_liquidity_rate into r7 as field;
    sub r4 r3.last_update_timestamp into r8;
    cast r8 into r9 as field;
    mul r7 r9 into r10;
    div r10 31536000field into r11;
    add 1000000000000000000000000000field r11 into r12;
    cast r3.liquidity_index into r13 as field;
    mul r12 r13 into r14;
    add r14 500000000000000000000000000field into r15;
    div r15 1000000000000000000000000000field into r16;
    ternary r5 r6 r16 into r17;
    cast r2 into r18 as field;
    mul r18 1000000000000000000000000000field into r19;
    div r17 2field into r20;
    add r19 r20 into r21;
    div r21 r17 into r22;
    get.or_use stoken_approvals[r1] 0u128 into r23;
    cast r22 into r24 as u128;
    add r23 r24 into r25;
    set r25 into stoken_approvals[r1];




function stoken_unapprove_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as u128.public;
    cast r0 self.caller r1 into r3 as STokenApproval;
    hash.bhp256 r3 into r4 as field;
    async stoken_unapprove_public r0 r4 r2 into r5;
    output r5 as spectre_pool_v1.aleo/stoken_unapprove_public.future;

finalize stoken_unapprove_public:
    input r0 as address.public;
    input r1 as field.public;
    input r2 as u128.public;
    get reserves[r0] into r3;
    cast block.height into r4 as u64;
    is.eq r3.last_update_timestamp r4 into r5;
    cast r3.liquidity_index into r6 as field;
    cast r3.current_liquidity_rate into r7 as field;
    sub r4 r3.last_update_timestamp into r8;
    cast r8 into r9 as field;
    mul r7 r9 into r10;
    div r10 31536000field into r11;
    add 1000000000000000000000000000field r11 into r12;
    cast r3.liquidity_index into r13 as field;
    mul r12 r13 into r14;
    add r14 500000000000000000000000000field into r15;
    div r15 1000000000000000000000000000field into r16;
    ternary r5 r6 r16 into r17;
    cast r2 into r18 as field;
    mul r18 1000000000000000000000000000field into r19;
    div r17 2field into r20;
    add r19 r20 into r21;
    div r21 r17 into r22;
    get stoken_approvals[r1] into r23;
    cast r22 into r24 as u128;
    sub r23 r24 into r25;
    set r25 into stoken_approvals[r1];




function stoken_transfer_from_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u128.public;
    cast r0 r1 self.caller into r4 as STokenApproval;
    hash.bhp256 r4 into r5 as field;
    async stoken_transfer_from_public r0 r5 r1 r2 r3 into r6;
    output r6 as spectre_pool_v1.aleo/stoken_transfer_from_public.future;

finalize stoken_transfer_from_public:
    input r0 as address.public;
    input r1 as field.public;
    input r2 as address.public;
    input r3 as address.public;
    input r4 as u128.public;
    get reserves[r0] into r5;
    cast block.height into r6 as u64;
    is.eq r5.last_update_timestamp r6 into r7;
    cast r5.liquidity_index into r8 as field;
    cast r5.current_liquidity_rate into r9 as field;
    sub r6 r5.last_update_timestamp into r10;
    cast r10 into r11 as field;
    mul r9 r11 into r12;
    div r12 31536000field into r13;
    add 1000000000000000000000000000field r13 into r14;
    cast r5.liquidity_index into r15 as field;
    mul r14 r15 into r16;
    add r16 500000000000000000000000000field into r17;
    div r17 1000000000000000000000000000field into r18;
    ternary r7 r8 r18 into r19;
    cast r4 into r20 as field;
    mul r20 1000000000000000000000000000field into r21;
    div r19 2field into r22;
    add r21 r22 into r23;
    div r23 r19 into r24;
    get stoken_approvals[r1] into r25;
    cast r24 into r26 as u128;
    sub r25 r26 into r27;
    set r27 into stoken_approvals[r1];
    cast r0 r2 into r28 as STokenUser;
    hash.bhp256 r28 into r29 as field;
    cast 0u128 0u128 into r30 as STokenUserState;
    get.or_use stoken_user_states[r29] r30 into r31;
    cast r24 into r32 as u128;
    sub r31.balance r32 into r33;
    cast r33 r31.index into r34 as STokenUserState;
    set r34 into stoken_user_states[r29];
    cast r0 r3 into r35 as STokenUser;
    hash.bhp256 r35 into r36 as field;
    cast 0u128 0u128 into r37 as STokenUserState;
    get.or_use stoken_user_states[r36] r37 into r38;
    cast r24 into r39 as u128;
    add r38.balance r39 into r40;
    cast r40 r38.index into r41 as STokenUserState;
    set r41 into stoken_user_states[r36];




function stoken_transfer_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as u128.public;
    async stoken_transfer_public r0 self.caller r1 r2 into r3;
    output r3 as spectre_pool_v1.aleo/stoken_transfer_public.future;

finalize stoken_transfer_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u128.public;
    get reserves[r0] into r4;
    cast block.height into r5 as u64;
    is.eq r4.last_update_timestamp r5 into r6;
    cast r4.liquidity_index into r7 as field;
    cast r4.current_liquidity_rate into r8 as field;
    sub r5 r4.last_update_timestamp into r9;
    cast r9 into r10 as field;
    mul r8 r10 into r11;
    div r11 31536000field into r12;
    add 1000000000000000000000000000field r12 into r13;
    cast r4.liquidity_index into r14 as field;
    mul r13 r14 into r15;
    add r15 500000000000000000000000000field into r16;
    div r16 1000000000000000000000000000field into r17;
    ternary r6 r7 r17 into r18;
    cast r3 into r19 as field;
    mul r19 1000000000000000000000000000field into r20;
    div r18 2field into r21;
    add r20 r21 into r22;
    div r22 r18 into r23;
    cast r0 r1 into r24 as STokenUser;
    hash.bhp256 r24 into r25 as field;
    cast 0u128 0u128 into r26 as STokenUserState;
    get.or_use stoken_user_states[r25] r26 into r27;
    cast r23 into r28 as u128;
    sub r27.balance r28 into r29;
    cast r18 into r30 as u128;
    cast r29 r30 into r31 as STokenUserState;
    set r31 into stoken_user_states[r25];
    cast r0 r2 into r32 as STokenUser;
    hash.bhp256 r32 into r33 as field;
    cast 0u128 0u128 into r34 as STokenUserState;
    get.or_use stoken_user_states[r33] r34 into r35;
    cast r23 into r36 as u128;
    add r35.balance r36 into r37;
    cast r18 into r38 as u128;
    cast r37 r38 into r39 as STokenUserState;
    set r39 into stoken_user_states[r33];















