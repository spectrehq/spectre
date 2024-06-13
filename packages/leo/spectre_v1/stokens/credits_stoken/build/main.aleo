import spectre_access_control_v1.aleo;
import spectre_acl_manager_v1.aleo;
import credits.aleo;
import spectre_pool_v1.aleo;
program spectre_credits_stoken_v1.aleo;


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

struct metadata:
    name as u128;
    symbol as u64;
    decimals as u8;

record token:
    owner as address.private;
    amount as u64.private;

struct approval:
    approver as address;
    spender as address;


mapping total_supply:
	key as u8.public;
	value as u64.public;


mapping account:
	key as address.public;
	value as u64.public;


mapping approvals:
	key as field.public;
	value as u64.public;


function transfer_public:
    input r0 as address.public;
    input r1 as u64.public;
    async transfer_public self.caller r0 r1 into r2;
    output r2 as spectre_credits_stoken_v1.aleo/transfer_public.future;

finalize transfer_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as u64.public;
    get.or_use account[r0] 0u64 into r3;
    sub r3 r2 into r4;
    set r4 into account[r0];
    get.or_use account[r1] 0u64 into r5;
    add r5 r2 into r6;
    set r6 into account[r1];



function transfer_private:
    input r0 as token.record;
    input r1 as address.private;
    input r2 as u64.private;
    sub r0.amount r2 into r3;
    cast r0.owner r3 into r4 as token.record;
    cast r1 r2 into r5 as token.record;
    output r4 as token.record;
    output r5 as token.record;



function transfer_private_to_public:
    input r0 as token.record;
    input r1 as address.public;
    input r2 as u64.public;
    sub r0.amount r2 into r3;
    cast r0.owner r3 into r4 as token.record;
    async transfer_private_to_public r1 r2 into r5;
    output r4 as token.record;
    output r5 as spectre_credits_stoken_v1.aleo/transfer_private_to_public.future;

finalize transfer_private_to_public:
    input r0 as address.public;
    input r1 as u64.public;
    get.or_use account[r0] 0u64 into r2;
    add r2 r1 into r3;
    set r3 into account[r0];




function transfer_public_to_private:
    input r0 as address.public;
    input r1 as u64.public;
    cast r0 r1 into r2 as token.record;
    async transfer_public_to_private self.caller r1 into r3;
    output r2 as token.record;
    output r3 as spectre_credits_stoken_v1.aleo/transfer_public_to_private.future;

finalize transfer_public_to_private:
    input r0 as address.public;
    input r1 as u64.public;
    get.or_use account[r0] 0u64 into r2;
    sub r2 r1 into r3;
    set r3 into account[r0];





function get_metadata:
    cast 25823134300601792548089644367u128 495016756559u64 6u8 into r0 as metadata;
    output r0 as metadata.private;


function mint:



function approve_public:
    input r0 as address.public;
    input r1 as u64.public;
    cast self.caller r0 into r2 as approval;
    hash.bhp256 r2 into r3 as field;
    async approve_public r3 r1 into r4;
    output r4 as spectre_credits_stoken_v1.aleo/approve_public.future;

finalize approve_public:
    input r0 as field.public;
    input r1 as u64.public;
    get.or_use approvals[r0] 0u64 into r2;
    add r2 r1 into r3;
    set r3 into approvals[r0];




function unapprove_public:
    input r0 as address.public;
    input r1 as u64.public;
    cast self.caller r0 into r2 as approval;
    hash.bhp256 r2 into r3 as field;
    async unapprove_public r3 r1 into r4;
    output r4 as spectre_credits_stoken_v1.aleo/unapprove_public.future;

finalize unapprove_public:
    input r0 as field.public;
    input r1 as u64.public;
    get approvals[r0] into r2;
    sub r2 r1 into r3;
    set r3 into approvals[r0];




function transfer_from_public:
    input r0 as address.public;
    input r1 as address.public;
    input r2 as u64.public;
    cast r0 self.caller into r3 as approval;
    hash.bhp256 r3 into r4 as field;
    async transfer_from_public r4 r0 r1 r2 into r5;
    output r5 as spectre_credits_stoken_v1.aleo/transfer_from_public.future;

finalize transfer_from_public:
    input r0 as field.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u64.public;
    get approvals[r0] into r4;
    sub r4 r3 into r5;
    set r5 into approvals[r0];
    get account[r1] into r6;
    sub r6 r3 into r7;
    set r7 into account[r1];
    get.or_use account[r2] 0u64 into r8;
    add r8 r3 into r9;
    set r9 into account[r2];






function supply_reserve:
    input r0 as u64.public;
    input r1 as address.public;
    async supply_reserve r0 r1 into r2;
    output r2 as spectre_credits_stoken_v1.aleo/supply_reserve.future;

finalize supply_reserve:
    input r0 as u64.public;
    input r1 as address.public;
    cast credits.aleo into r2 as address;
    get spectre_pool_v1.aleo/reserves[r2] into r3;
    cast r3.liquidity_index into r4 as field;
    cast r3.liquidity_index into r5 as field;
    cast r3.variable_borrow_index into r6 as field;
    cast r3.variable_borrow_index into r7 as field;
    cast r3.current_liquidity_rate into r8 as field;
    cast r3.current_variable_borrow_rate into r9 as field;
    cast r3.configuration.reserve_factor into r10 as field;
    cast 0field 0field r4 r5 r6 r7 r8 r9 r10 r3.configuration r3.stoken_address r3.variable_debt_token_address r3.last_update_timestamp into r11 as ReserveCache;




function rescue_tokens:
    input r0 as address.public;
    input r1 as u64.public;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.caller into r2;
    call credits.aleo/transfer_public r0 r1 into r3;
    async rescue_tokens r2 r3 into r4;
    output r4 as spectre_credits_stoken_v1.aleo/rescue_tokens.future;

finalize rescue_tokens:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as credits.aleo/transfer_public.future;
    await r0;
    await r1;













