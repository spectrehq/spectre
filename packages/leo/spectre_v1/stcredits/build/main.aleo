import spectre_access_control_v1.aleo;
import spectre_acl_manager_v1.aleo;
import credits.aleo;
program spectre_stcredits_v1.aleo;

struct committee_state:
    microcredits as u64;
    is_open as boolean;

struct bond_state:
    validator as address;
    microcredits as u64;

struct unbond_state:
    microcredits as u64;
    height as u32;


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

struct Config:
    initialized as boolean;
    treasury as address;
    paused as boolean;

struct CacheState:
    state as u8;
    height as u32;
    total_bonded as field;
    total_unbonding as field;
    next_index as u32;

struct Withdraw:
    amount as field;
    height as u32;

struct PendingWithdraw:
    amount as field;
    index as field;

struct QueueStartEnd:
    start as field;
    end as field;


mapping total_supply:
	key as u8.public;
	value as u64.public;


mapping account:
	key as address.public;
	value as u64.public;


mapping approvals:
	key as field.public;
	value as u64.public;


mapping config:
	key as u8.public;
	value as Config.public;


mapping state:
	key as u8.public;
	value as field.public;


mapping cache_state:
	key as u8.public;
	value as CacheState.public;


mapping withdraws:
	key as address.public;
	value as Withdraw.public;


mapping pending_withdraws:
	key as address.public;
	value as PendingWithdraw.public;


mapping pending_queue:
	key as field.public;
	value as address.public;


mapping pending_queue_start_end:
	key as u8.public;
	value as QueueStartEnd.public;


mapping validators_count:
	key as u8.public;
	value as u32.public;


mapping validators:
	key as u32.public;
	value as address.public;


mapping delegators:
	key as address.public;
	value as boolean.public;


mapping validator_delegators:
	key as address.public;
	value as address.public;


mapping validator_bonded:
	key as address.public;
	value as u64.public;


function initialize:
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r0;
    async initialize r0 self.caller into r1;
    output r1 as spectre_stcredits_v1.aleo/initialize.future;

finalize initialize:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as address.public;
    await r0;
    get config[0u8] into r2;
    not r2.initialized into r3;
    assert.eq r3 true;
    cast true r1 true into r4 as Config;
    set r4 into config[0u8];
    set 0field into state[0u8];
    set 0field into state[1u8];
    set 0field into state[2u8];
    set 0field into state[3u8];
    set 0field into state[4u8];
    cast 0u8 0u32 0field 0field 0u32 into r5 as CacheState;
    set r5 into cache_state[0u8];
    cast 0field 0field into r6 as QueueStartEnd;
    set r6 into pending_queue_start_end[0u8];
    set 0u32 into validators_count[0u8];




function transfer_public:
    input r0 as address.public;
    input r1 as u64.public;
    async transfer_public self.caller r0 r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/transfer_public.future;

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
    output r5 as spectre_stcredits_v1.aleo/transfer_private_to_public.future;

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
    output r3 as spectre_stcredits_v1.aleo/transfer_public_to_private.future;

finalize transfer_public_to_private:
    input r0 as address.public;
    input r1 as u64.public;
    get.or_use account[r0] 0u64 into r2;
    sub r2 r1 into r3;
    set r3 into account[r0];



function get_metadata:
    cast 8319383754638649716u128 8319383754638649716u64 6u8 into r0 as metadata;
    output r0 as metadata.private;



function approve_public:
    input r0 as address.public;
    input r1 as u64.public;
    cast self.caller r0 into r2 as approval;
    hash.bhp256 r2 into r3 as field;
    async approve_public r3 r1 into r4;
    output r4 as spectre_stcredits_v1.aleo/approve_public.future;

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
    output r4 as spectre_stcredits_v1.aleo/unapprove_public.future;

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
    output r5 as spectre_stcredits_v1.aleo/transfer_from_public.future;

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




function add_validator:
    input r0 as address.public;
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r1;
    async add_validator r1 r0 into r2;
    output r2 as spectre_stcredits_v1.aleo/add_validator.future;

finalize add_validator:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as address.public;
    await r0;
    cast 0u8 0u32 0field 0field 0u32 into r2 as CacheState;
    set r2 into cache_state[0u8];
    cast 0u64 true into r3 as committee_state;
    get.or_use credits.aleo/committee[r1] r3 into r4;
    assert.eq r4.is_open true;
    contains validator_delegators[r1] into r5;
    not r5 into r6;
    assert.eq r6 true;
    get validators_count[0u8] into r7;
    add r7 1u32 into r8;
    set r8 into validators_count[0u8];
    set r1 into validators[r7];
    set aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc into validator_delegators[r1];




function remove_validator:
    input r0 as u32.public;
    input r1 as address.public;
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r2;
    async remove_validator r2 r0 r1 into r3;
    output r3 as spectre_stcredits_v1.aleo/remove_validator.future;

finalize remove_validator:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as u32.public;
    input r2 as address.public;
    await r0;
    cast 0u8 0u32 0field 0field 0u32 into r3 as CacheState;
    set r3 into cache_state[0u8];
    get validators[r1] into r4;
    assert.eq r4 r2;
    get validator_delegators[r2] into r5;
    contains delegators[r5] into r6;
    is.eq r5 aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc into r7;
    or r6 r7 into r8;
    assert.eq r8 true;
    cast r2 0u64 into r9 as bond_state;
    get.or_use credits.aleo/bonded[r5] r9 into r10;
    is.eq r10.validator r2 into r11;
    assert.eq r11 true;
    cast 0u64 0u32 into r12 as unbond_state;
    get.or_use credits.aleo/unbonding[r5] r12 into r13;
    is.eq r10.microcredits 0u64 into r14;
    is.eq r13.microcredits 0u64 into r15;
    and r14 r15 into r16;
    assert.eq r16 true;
    get validators_count[0u8] into r17;
    gte r17 1u32 into r18;
    assert.eq r18 true;
    sub r17 1u32 into r19;
    is.neq r1 r19 into r20;
    branch.eq r20 false to end_then_0_0;
    sub r17 1u32 into r21;
    get validators[r21] into r22;
    set r22 into validators[r1];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;
    sub r17 1u32 into r23;
    set r23 into validators_count[0u8];
    sub r17 1u32 into r24;
    remove validators[r24];
    remove validator_delegators[r2];
    remove delegators[r5];




function register_delegator:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as address.public;
    assert.eq r2 self.caller;
    call spectre_acl_manager_v1.aleo/only_staking_admin self.signer into r3;
    async register_delegator r3 r0 r1 r2 into r4;
    output r4 as spectre_stcredits_v1.aleo/register_delegator.future;

finalize register_delegator:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as u32.public;
    input r2 as address.public;
    input r3 as address.public;
    await r0;
    cast 0u8 0u32 0field 0field 0u32 into r4 as CacheState;
    set r4 into cache_state[0u8];
    get validators[r1] into r5;
    assert.eq r5 r2;
    get validator_delegators[r2] into r6;
    assert.eq r6 aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;
    contains delegators[r3] into r7;
    not r7 into r8;
    assert.eq r8 true;
    set r3 into validator_delegators[r2];
    set true into delegators[r3];






function bond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u64.public;
    assert.eq r2 self.caller;
    call spectre_acl_manager_v1.aleo/only_staking_operator self.signer into r4;
    call credits.aleo/transfer_public r2 r3 into r5;
    async bond r4 r5 r0 r1 self.caller r3 into r6;
    output r6 as spectre_stcredits_v1.aleo/bond.future;

finalize bond:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_operator.future;
    input r1 as credits.aleo/transfer_public.future;
    input r2 as u32.public;
    input r3 as address.public;
    input r4 as address.public;
    input r5 as u64.public;
    await r0;
    await r1;
    get config[0u8] into r6;
    not r6.paused into r7;
    assert.eq r7 true;
    get cache_state[0u8] into r8;
    assert.eq r8.state 2u8;
    cast 0u8 0u32 0field 0field 0u32 into r9 as CacheState;
    set r9 into cache_state[0u8];
    get validators[r2] into r10;
    assert.eq r10 r3;
    get validator_delegators[r3] into r11;
    assert.eq r11 r4;
    cast spectre_stcredits_v1.aleo into r12 as address;
    get.or_use credits.aleo/account[r12] 0u64 into r13;
    cast r13 into r14 as field;
    get state[0u8] into r15;
    get state[1u8] into r16;
    cast r5 into r17 as field;
    sub r14 r15 into r18;
    sub r18 r16 into r19;
    lte r17 r19 into r20;
    assert.eq r20 true;
    cast r3 0u64 into r21 as bond_state;
    get.or_use credits.aleo/bonded[r4] r21 into r22;
    is.eq r22.validator r3 into r23;
    assert.eq r23 true;
    get.or_use validator_bonded[r3] 0u64 into r24;
    sub r22.microcredits r24 into r25;
    cast r25 into r26 as field;
    get state[4u8] into r27;
    mul r26 r27 into r28;
    div r28 100field into r29;
    gt r29 0field into r30;
    branch.eq r30 false to end_then_0_2;
    get state[2u8] into r31;
    get state[3u8] into r32;
    add r31 r14 into r33;
    add r33 r32 into r34;
    sub r34 r15 into r35;
    sub r35 r16 into r36;
    get.or_use total_supply[0u8] 0u64 into r37;
    cast r37 into r38 as field;
    gt r36 0field into r39;
    ternary r39 r36 1field into r40;
    gt r38 0field into r41;
    ternary r41 r38 1field into r42;
    mul r29 r42 into r43;
    div r43 r40 into r44;
    get config[0u8] into r45;
    get.or_use account[r45.treasury] 0u64 into r46;
    cast r44 into r47 as u64;
    add r46 r47 into r48;
    set r48 into account[r45.treasury];
    add r38 r44 into r49;
    cast r49 into r50 as u64;
    set r50 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;
    add r22.microcredits r5 into r51;
    set r51 into validator_bonded[r3];




function unbond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as address.private;
    input r3 as u64.public;
    call spectre_acl_manager_v1.aleo/only_staking_operator self.caller into r4;
    call credits.aleo/unbond_public r3 into r5;
    async unbond r4 r5 r0 r1 r2 r3 into r6;
    output r6 as spectre_stcredits_v1.aleo/unbond.future;

finalize unbond:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_operator.future;
    input r1 as credits.aleo/unbond_public.future;
    input r2 as u32.public;
    input r3 as address.public;
    input r4 as address.public;
    input r5 as u64.public;
    await r0;
    get config[0u8] into r6;
    not r6.paused into r7;
    assert.eq r7 true;
    get cache_state[0u8] into r8;
    assert.eq r8.state 2u8;
    cast 0u8 0u32 0field 0field 0u32 into r9 as CacheState;
    set r9 into cache_state[0u8];
    get validators[r2] into r10;
    assert.eq r10 r3;
    get validator_delegators[r3] into r11;
    assert.eq r11 r4;
    cast r3 0u64 into r12 as bond_state;
    get.or_use credits.aleo/bonded[r4] r12 into r13;
    is.eq r13.validator r3 into r14;
    assert.eq r14 true;
    get.or_use validator_bonded[r3] 0u64 into r15;
    sub r13.microcredits r15 into r16;
    cast r16 into r17 as field;
    get state[4u8] into r18;
    mul r17 r18 into r19;
    div r19 100field into r20;
    gt r20 0field into r21;
    branch.eq r21 false to end_then_0_4;
    cast spectre_stcredits_v1.aleo into r22 as address;
    get.or_use credits.aleo/account[r22] 0u64 into r23;
    cast r23 into r24 as field;
    get state[2u8] into r25;
    get state[3u8] into r26;
    get state[0u8] into r27;
    get state[1u8] into r28;
    add r25 r24 into r29;
    add r29 r26 into r30;
    sub r30 r27 into r31;
    sub r31 r28 into r32;
    get.or_use total_supply[0u8] 0u64 into r33;
    cast r33 into r34 as field;
    gt r32 0field into r35;
    ternary r35 r32 1field into r36;
    gt r34 0field into r37;
    ternary r37 r34 1field into r38;
    mul r20 r38 into r39;
    div r39 r36 into r40;
    get config[0u8] into r41;
    get.or_use account[r41.treasury] 0u64 into r42;
    cast r40 into r43 as u64;
    add r42 r43 into r44;
    set r44 into account[r41.treasury];
    add r34 r40 into r45;
    cast r45 into r46 as u64;
    set r46 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_5;
    position end_then_0_4;
    position end_otherwise_0_5;
    await r1;
    cast r3 0u64 into r47 as bond_state;
    get.or_use credits.aleo/bonded[r4] r47 into r48;
    set r48.microcredits into validator_bonded[r3];




function claim_unbond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as address.private;
    call credits.aleo/claim_unbond_public into r3;
    async claim_unbond r3 r0 r1 r2 into r4;
    output r4 as spectre_stcredits_v1.aleo/claim_unbond.future;

finalize claim_unbond:
    input r0 as credits.aleo/claim_unbond_public.future;
    input r1 as u32.public;
    input r2 as address.public;
    input r3 as address.public;
    await r0;
    get config[0u8] into r4;
    not r4.paused into r5;
    assert.eq r5 true;
    cast 0u8 0u32 0field 0field 0u32 into r6 as CacheState;
    set r6 into cache_state[0u8];
    get validators[r1] into r7;
    assert.eq r7 r2;
    get validator_delegators[r2] into r8;
    assert.eq r8 r3;




function resolve_withdrawal:
    async resolve_withdrawal into r0;
    output r0 as spectre_stcredits_v1.aleo/resolve_withdrawal.future;

finalize resolve_withdrawal:
    get config[0u8] into r0;
    not r0.paused into r1;
    assert.eq r1 true;
    get pending_queue_start_end[0u8] into r2;
    sub r2.end r2.start into r3;
    lte r3 0field into r4;
    branch.eq r4 false to end_then_0_6;
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    position end_otherwise_0_7;
    get pending_queue[r2.start] into r5;
    get pending_withdraws[r5] into r6;
    is.eq r6.index r2.start into r7;
    assert.eq r7 true;
    gt r6.amount 0field into r8;
    assert.eq r8 true;
    cast spectre_stcredits_v1.aleo into r9 as address;
    get.or_use credits.aleo/account[r9] 0u64 into r10;
    cast r10 into r11 as field;
    get state[0u8] into r12;
    sub r11 r12 into r13;
    lt r13 r6.amount into r14;
    branch.eq r14 false to end_then_0_8;
    branch.eq true true to end_otherwise_0_9;
    position end_then_0_8;
    position end_otherwise_0_9;
    add r2.start 1field into r15;
    cast r15 r2.end into r16 as QueueStartEnd;
    set r16 into pending_queue_start_end[0u8];
    remove pending_queue[r2.start];
    remove pending_withdraws[r5];
    cast 0field 0u32 into r17 as Withdraw;
    get.or_use withdraws[r5] r17 into r18;
    add r18.amount r6.amount into r19;
    add block.height 360u32 into r20;
    cast r19 r20 into r21 as Withdraw;
    set r21 into withdraws[r5];
    get state[1u8] into r22;
    sub r22 r6.amount into r23;
    set r23 into state[1u8];
    add r12 r6.amount into r24;
    set r24 into state[0u8];
    get pending_queue_start_end[0u8] into r25;
    sub r25.end r25.start into r26;
    lte r26 0field into r27;
    branch.eq r27 false to end_then_0_10;
    branch.eq true true to end_otherwise_0_11;
    position end_then_0_10;
    position end_otherwise_0_11;
    get pending_queue[r25.start] into r28;
    get pending_withdraws[r28] into r29;
    is.eq r29.index r25.start into r30;
    assert.eq r30 true;
    gt r29.amount 0field into r31;
    assert.eq r31 true;
    cast spectre_stcredits_v1.aleo into r32 as address;
    get.or_use credits.aleo/account[r32] 0u64 into r33;
    cast r33 into r34 as field;
    get state[0u8] into r35;
    sub r34 r35 into r36;
    lt r36 r29.amount into r37;
    branch.eq r37 false to end_then_0_12;
    branch.eq true true to end_otherwise_0_13;
    position end_then_0_12;
    position end_otherwise_0_13;
    add r25.start 1field into r38;
    cast r38 r25.end into r39 as QueueStartEnd;
    set r39 into pending_queue_start_end[0u8];
    remove pending_queue[r25.start];
    remove pending_withdraws[r28];
    cast 0field 0u32 into r40 as Withdraw;
    get.or_use withdraws[r28] r40 into r41;
    add r41.amount r29.amount into r42;
    add block.height 360u32 into r43;
    cast r42 r43 into r44 as Withdraw;
    set r44 into withdraws[r28];
    get state[1u8] into r45;
    sub r45 r29.amount into r46;
    set r46 into state[1u8];
    add r35 r29.amount into r47;
    set r47 into state[0u8];




function supply:
    input r0 as u64.public;
    gt r0 0u64 into r1;
    assert.eq r1 true;
    cast spectre_stcredits_v1.aleo into r2 as address;
    call credits.aleo/transfer_public_as_signer r2 r0 into r3;
    cast r0 into r4 as field;
    async supply r3 self.signer r4 into r5;
    output r5 as spectre_stcredits_v1.aleo/supply.future;

finalize supply:
    input r0 as credits.aleo/transfer_public_as_signer.future;
    input r1 as address.public;
    input r2 as field.public;
    await r0;
    get config[0u8] into r3;
    not r3.paused into r4;
    assert.eq r4 true;
    get cache_state[0u8] into r5;
    assert.eq r5.state 2u8;
    get cache_state[0u8] into r6;
    assert.eq r6.state 2u8;
    cast spectre_stcredits_v1.aleo into r7 as address;
    get.or_use credits.aleo/account[r7] 0u64 into r8;
    cast r8 into r9 as field;
    get state[2u8] into r10;
    get state[3u8] into r11;
    get state[0u8] into r12;
    get state[1u8] into r13;
    add r10 r9 into r14;
    add r14 r11 into r15;
    sub r15 r12 into r16;
    sub r16 r13 into r17;
    get.or_use total_supply[0u8] 0u64 into r18;
    cast r18 into r19 as field;
    gt r17 0field into r20;
    ternary r20 r17 1field into r21;
    gt r19 0field into r22;
    ternary r22 r19 1field into r23;
    mul r2 r23 into r24;
    div r24 r21 into r25;
    get.or_use account[r1] 0u64 into r26;
    cast r25 into r27 as u64;
    add r26 r27 into r28;
    set r28 into account[r1];
    add r19 r25 into r29;
    cast r29 into r30 as u64;
    set r30 into total_supply[0u8];






function withdraw:
    input r0 as u64.public;
    cast r0 into r1 as field;
    async withdraw self.signer r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/withdraw.future;

finalize withdraw:
    input r0 as address.public;
    input r1 as field.public;
    get config[0u8] into r2;
    not r2.paused into r3;
    assert.eq r3 true;
    get cache_state[0u8] into r4;
    assert.eq r4.state 2u8;
    get cache_state[0u8] into r5;
    assert.eq r5.state 2u8;
    cast spectre_stcredits_v1.aleo into r6 as address;
    get.or_use credits.aleo/account[r6] 0u64 into r7;
    cast r7 into r8 as field;
    get state[2u8] into r9;
    get state[3u8] into r10;
    get state[0u8] into r11;
    get state[1u8] into r12;
    add r9 r8 into r13;
    add r13 r10 into r14;
    sub r14 r11 into r15;
    sub r15 r12 into r16;
    get.or_use total_supply[0u8] 0u64 into r17;
    cast r17 into r18 as field;
    gt r16 0field into r19;
    ternary r19 r16 1field into r20;
    gt r18 0field into r21;
    ternary r21 r18 1field into r22;
    mul r1 r20 into r23;
    div r23 r22 into r24;
    get.or_use account[r0] 0u64 into r25;
    cast r1 into r26 as u64;
    sub r25 r26 into r27;
    set r27 into account[r0];
    sub r18 r1 into r28;
    cast r28 into r29 as u64;
    set r29 into total_supply[0u8];
    sub r8 r11 into r30;
    contains withdraws[r0] into r31;
    not r31 into r32;
    branch.eq r32 false to end_then_0_14;
    gte r30 r24 into r33;
    branch.eq r33 false to end_then_1_16;
    add r11 r24 into r34;
    set r34 into state[0u8];
    add block.height 360u32 into r35;
    cast r24 r35 into r36 as Withdraw;
    set r36 into withdraws[r0];
    branch.eq true true to end_otherwise_1_17;
    position end_then_1_16;
    add r11 r30 into r37;
    set r37 into state[0u8];
    position end_otherwise_1_17;
    branch.eq true true to end_otherwise_0_15;
    position end_then_0_14;
    position end_otherwise_0_15;
    not r31 into r38;
    sub r24 r30 into r39;
    ternary r38 r39 r24 into r40;
    get pending_queue_start_end[0u8] into r41;
    contains pending_withdraws[r0] into r42;
    not r42 into r43;
    branch.eq r43 false to end_then_0_18;
    set r0 into pending_queue[r41.end];
    add r41.end 1field into r44;
    cast r41.start r44 into r45 as QueueStartEnd;
    set r45 into pending_queue_start_end[0u8];
    cast r40 r41.end into r46 as PendingWithdraw;
    set r46 into pending_withdraws[r0];
    branch.eq true true to end_otherwise_0_19;
    position end_then_0_18;
    get pending_withdraws[r0] into r47;
    gte r47.index r41.start into r48;
    lt r47.index r41.end into r49;
    and r48 r49 into r50;
    assert.eq r50 true;
    sub r41.end 1field into r51;
    is.neq r47.index r51 into r52;
    branch.eq r52 false to end_then_1_20;
    get pending_queue[r51] into r53;
    get pending_withdraws[r53] into r54;
    set r53 into pending_queue[r47.index];
    set r0 into pending_queue[r51];
    cast r54.amount r47.index into r55 as PendingWithdraw;
    set r55 into pending_withdraws[r53];
    branch.eq true true to end_otherwise_1_21;
    position end_then_1_20;
    position end_otherwise_1_21;
    add r47.amount r40 into r56;
    cast r56 r51 into r57 as PendingWithdraw;
    set r57 into pending_withdraws[r0];
    position end_otherwise_0_19;
    get state[1u8] into r58;
    add r58 r40 into r59;
    set r59 into state[1u8];




function claim:
    input r0 as u64.public;
    call credits.aleo/transfer_public self.caller r0 into r1;
    cast r0 into r2 as field;
    async claim r1 self.caller r2 into r3;
    output r3 as spectre_stcredits_v1.aleo/claim.future;

finalize claim:
    input r0 as credits.aleo/transfer_public.future;
    input r1 as address.public;
    input r2 as field.public;
    await r0;
    get config[0u8] into r3;
    not r3.paused into r4;
    assert.eq r4 true;
    get withdraws[r1] into r5;
    lte r5.height block.height into r6;
    assert.eq r6 true;
    assert.eq r5.amount r2;
    remove withdraws[r1];
    get state[0u8] into r7;
    sub r7 r2 into r8;
    set r8 into state[0u8];




function cache_total_bonded_unbonding:
    input r0 as u32.public;
    call spectre_acl_manager_v1.aleo/only_staking_operator self.signer into r1;
    async cache_total_bonded_unbonding r1 r0 into r2;
    output r2 as spectre_stcredits_v1.aleo/cache_total_bonded_unbonding.future;

finalize cache_total_bonded_unbonding:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_operator.future;
    input r1 as u32.public;
    await r0;
    get config[0u8] into r2;
    not r2.paused into r3;
    assert.eq r3 true;
    get validators_count[0u8] into r4;
    is.eq r1 0u32 into r5;
    branch.eq r5 false to end_then_0_22;
    cast 1u8 block.height 0field 0field 0u32 into r6 as CacheState;
    set r6 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_23;
    position end_then_0_22;
    position end_otherwise_0_23;
    get cache_state[0u8] into r7;
    assert.eq r7.state 1u8;
    assert.eq r1 r7.next_index;
    add r1 0u32 into r8;
    lt r8 r4 into r9;
    branch.eq r9 false to end_then_0_24;
    get validators[r8] into r10;
    get validator_delegators[r10] into r11;
    cast r10 0u64 into r12 as bond_state;
    get.or_use credits.aleo/bonded[r11] r12 into r13;
    is.eq r13.validator r10 into r14;
    assert.eq r14 true;
    cast 0u64 0u32 into r15 as unbond_state;
    get.or_use credits.aleo/unbonding[r11] r15 into r16;
    get cache_state[0u8] into r17;
    cast r13.microcredits into r18 as field;
    add r17.total_bonded r18 into r19;
    cast r16.microcredits into r20 as field;
    add r17.total_unbonding r20 into r21;
    cast 1u8 r17.height r19 r21 r17.next_index into r22 as CacheState;
    set r22 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_25;
    position end_then_0_24;
    position end_otherwise_0_25;
    ternary r9 r17.state r7.state into r23;
    ternary r9 r17.height r7.height into r24;
    ternary r9 r17.total_bonded r7.total_bonded into r25;
    ternary r9 r17.total_unbonding r7.total_unbonding into r26;
    ternary r9 r17.next_index r7.next_index into r27;
    cast r23 r24 r25 r26 r27 into r28 as CacheState;
    add r1 1u32 into r29;
    lt r29 r4 into r30;
    branch.eq r30 false to end_then_0_26;
    get validators[r29] into r31;
    get validator_delegators[r31] into r32;
    cast r31 0u64 into r33 as bond_state;
    get.or_use credits.aleo/bonded[r32] r33 into r34;
    is.eq r34.validator r31 into r35;
    assert.eq r35 true;
    cast 0u64 0u32 into r36 as unbond_state;
    get.or_use credits.aleo/unbonding[r32] r36 into r37;
    get cache_state[0u8] into r38;
    cast r34.microcredits into r39 as field;
    add r38.total_bonded r39 into r40;
    cast r37.microcredits into r41 as field;
    add r38.total_unbonding r41 into r42;
    cast 1u8 r38.height r40 r42 r38.next_index into r43 as CacheState;
    set r43 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_27;
    position end_then_0_26;
    position end_otherwise_0_27;
    ternary r30 r38.state r28.state into r44;
    ternary r30 r38.height r28.height into r45;
    ternary r30 r38.total_bonded r28.total_bonded into r46;
    ternary r30 r38.total_unbonding r28.total_unbonding into r47;
    ternary r30 r38.next_index r28.next_index into r48;
    cast r44 r45 r46 r47 r48 into r49 as CacheState;
    add r1 2u32 into r50;
    lt r50 r4 into r51;
    branch.eq r51 false to end_then_0_28;
    get validators[r50] into r52;
    get validator_delegators[r52] into r53;
    cast r52 0u64 into r54 as bond_state;
    get.or_use credits.aleo/bonded[r53] r54 into r55;
    is.eq r55.validator r52 into r56;
    assert.eq r56 true;
    cast 0u64 0u32 into r57 as unbond_state;
    get.or_use credits.aleo/unbonding[r53] r57 into r58;
    get cache_state[0u8] into r59;
    cast r55.microcredits into r60 as field;
    add r59.total_bonded r60 into r61;
    cast r58.microcredits into r62 as field;
    add r59.total_unbonding r62 into r63;
    cast 1u8 r59.height r61 r63 r59.next_index into r64 as CacheState;
    set r64 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_29;
    position end_then_0_28;
    position end_otherwise_0_29;
    ternary r51 r59.state r49.state into r65;
    ternary r51 r59.height r49.height into r66;
    ternary r51 r59.total_bonded r49.total_bonded into r67;
    ternary r51 r59.total_unbonding r49.total_unbonding into r68;
    ternary r51 r59.next_index r49.next_index into r69;
    cast r65 r66 r67 r68 r69 into r70 as CacheState;
    add r1 3u32 into r71;
    lt r71 r4 into r72;
    branch.eq r72 false to end_then_0_30;
    get validators[r71] into r73;
    get validator_delegators[r73] into r74;
    cast r73 0u64 into r75 as bond_state;
    get.or_use credits.aleo/bonded[r74] r75 into r76;
    is.eq r76.validator r73 into r77;
    assert.eq r77 true;
    cast 0u64 0u32 into r78 as unbond_state;
    get.or_use credits.aleo/unbonding[r74] r78 into r79;
    get cache_state[0u8] into r80;
    cast r76.microcredits into r81 as field;
    add r80.total_bonded r81 into r82;
    cast r79.microcredits into r83 as field;
    add r80.total_unbonding r83 into r84;
    cast 1u8 r80.height r82 r84 r80.next_index into r85 as CacheState;
    set r85 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_31;
    position end_then_0_30;
    position end_otherwise_0_31;
    ternary r72 r80.state r70.state into r86;
    ternary r72 r80.height r70.height into r87;
    ternary r72 r80.total_bonded r70.total_bonded into r88;
    ternary r72 r80.total_unbonding r70.total_unbonding into r89;
    ternary r72 r80.next_index r70.next_index into r90;
    cast r86 r87 r88 r89 r90 into r91 as CacheState;
    add r1 4u32 into r92;
    lt r92 r4 into r93;
    branch.eq r93 false to end_then_0_32;
    get validators[r92] into r94;
    get validator_delegators[r94] into r95;
    cast r94 0u64 into r96 as bond_state;
    get.or_use credits.aleo/bonded[r95] r96 into r97;
    is.eq r97.validator r94 into r98;
    assert.eq r98 true;
    cast 0u64 0u32 into r99 as unbond_state;
    get.or_use credits.aleo/unbonding[r95] r99 into r100;
    get cache_state[0u8] into r101;
    cast r97.microcredits into r102 as field;
    add r101.total_bonded r102 into r103;
    cast r100.microcredits into r104 as field;
    add r101.total_unbonding r104 into r105;
    cast 1u8 r101.height r103 r105 r101.next_index into r106 as CacheState;
    set r106 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_33;
    position end_then_0_32;
    position end_otherwise_0_33;
    ternary r93 r101.state r91.state into r107;
    ternary r93 r101.height r91.height into r108;
    ternary r93 r101.total_bonded r91.total_bonded into r109;
    ternary r93 r101.total_unbonding r91.total_unbonding into r110;
    ternary r93 r101.next_index r91.next_index into r111;
    cast r107 r108 r109 r110 r111 into r112 as CacheState;
    add r1 5u32 into r113;
    lt r113 r4 into r114;
    branch.eq r114 false to end_then_0_34;
    get validators[r113] into r115;
    get validator_delegators[r115] into r116;
    cast r115 0u64 into r117 as bond_state;
    get.or_use credits.aleo/bonded[r116] r117 into r118;
    is.eq r118.validator r115 into r119;
    assert.eq r119 true;
    cast 0u64 0u32 into r120 as unbond_state;
    get.or_use credits.aleo/unbonding[r116] r120 into r121;
    get cache_state[0u8] into r122;
    cast r118.microcredits into r123 as field;
    add r122.total_bonded r123 into r124;
    cast r121.microcredits into r125 as field;
    add r122.total_unbonding r125 into r126;
    cast 1u8 r122.height r124 r126 r122.next_index into r127 as CacheState;
    set r127 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_35;
    position end_then_0_34;
    position end_otherwise_0_35;
    ternary r114 r122.state r112.state into r128;
    ternary r114 r122.height r112.height into r129;
    ternary r114 r122.total_bonded r112.total_bonded into r130;
    ternary r114 r122.total_unbonding r112.total_unbonding into r131;
    ternary r114 r122.next_index r112.next_index into r132;
    cast r128 r129 r130 r131 r132 into r133 as CacheState;
    add r1 6u32 into r134;
    lt r134 r4 into r135;
    branch.eq r135 false to end_then_0_36;
    get validators[r134] into r136;
    get validator_delegators[r136] into r137;
    cast r136 0u64 into r138 as bond_state;
    get.or_use credits.aleo/bonded[r137] r138 into r139;
    is.eq r139.validator r136 into r140;
    assert.eq r140 true;
    cast 0u64 0u32 into r141 as unbond_state;
    get.or_use credits.aleo/unbonding[r137] r141 into r142;
    get cache_state[0u8] into r143;
    cast r139.microcredits into r144 as field;
    add r143.total_bonded r144 into r145;
    cast r142.microcredits into r146 as field;
    add r143.total_unbonding r146 into r147;
    cast 1u8 r143.height r145 r147 r143.next_index into r148 as CacheState;
    set r148 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_37;
    position end_then_0_36;
    position end_otherwise_0_37;
    ternary r135 r143.state r133.state into r149;
    ternary r135 r143.height r133.height into r150;
    ternary r135 r143.total_bonded r133.total_bonded into r151;
    ternary r135 r143.total_unbonding r133.total_unbonding into r152;
    ternary r135 r143.next_index r133.next_index into r153;
    cast r149 r150 r151 r152 r153 into r154 as CacheState;
    add r1 7u32 into r155;
    lt r155 r4 into r156;
    branch.eq r156 false to end_then_0_38;
    get validators[r155] into r157;
    get validator_delegators[r157] into r158;
    cast r157 0u64 into r159 as bond_state;
    get.or_use credits.aleo/bonded[r158] r159 into r160;
    is.eq r160.validator r157 into r161;
    assert.eq r161 true;
    cast 0u64 0u32 into r162 as unbond_state;
    get.or_use credits.aleo/unbonding[r158] r162 into r163;
    get cache_state[0u8] into r164;
    cast r160.microcredits into r165 as field;
    add r164.total_bonded r165 into r166;
    cast r163.microcredits into r167 as field;
    add r164.total_unbonding r167 into r168;
    cast 1u8 r164.height r166 r168 r164.next_index into r169 as CacheState;
    set r169 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_39;
    position end_then_0_38;
    position end_otherwise_0_39;
    ternary r156 r164.state r154.state into r170;
    ternary r156 r164.height r154.height into r171;
    ternary r156 r164.total_bonded r154.total_bonded into r172;
    ternary r156 r164.total_unbonding r154.total_unbonding into r173;
    ternary r156 r164.next_index r154.next_index into r174;
    cast r170 r171 r172 r173 r174 into r175 as CacheState;
    add r1 8u32 into r176;
    lt r176 r4 into r177;
    branch.eq r177 false to end_then_0_40;
    get validators[r176] into r178;
    get validator_delegators[r178] into r179;
    cast r178 0u64 into r180 as bond_state;
    get.or_use credits.aleo/bonded[r179] r180 into r181;
    is.eq r181.validator r178 into r182;
    assert.eq r182 true;
    cast 0u64 0u32 into r183 as unbond_state;
    get.or_use credits.aleo/unbonding[r179] r183 into r184;
    get cache_state[0u8] into r185;
    cast r181.microcredits into r186 as field;
    add r185.total_bonded r186 into r187;
    cast r184.microcredits into r188 as field;
    add r185.total_unbonding r188 into r189;
    cast 1u8 r185.height r187 r189 r185.next_index into r190 as CacheState;
    set r190 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_41;
    position end_then_0_40;
    position end_otherwise_0_41;
    ternary r177 r185.state r175.state into r191;
    ternary r177 r185.height r175.height into r192;
    ternary r177 r185.total_bonded r175.total_bonded into r193;
    ternary r177 r185.total_unbonding r175.total_unbonding into r194;
    ternary r177 r185.next_index r175.next_index into r195;
    cast r191 r192 r193 r194 r195 into r196 as CacheState;
    add r1 9u32 into r197;
    lt r197 r4 into r198;
    branch.eq r198 false to end_then_0_42;
    get validators[r197] into r199;
    get validator_delegators[r199] into r200;
    cast r199 0u64 into r201 as bond_state;
    get.or_use credits.aleo/bonded[r200] r201 into r202;
    is.eq r202.validator r199 into r203;
    assert.eq r203 true;
    cast 0u64 0u32 into r204 as unbond_state;
    get.or_use credits.aleo/unbonding[r200] r204 into r205;
    get cache_state[0u8] into r206;
    cast r202.microcredits into r207 as field;
    add r206.total_bonded r207 into r208;
    cast r205.microcredits into r209 as field;
    add r206.total_unbonding r209 into r210;
    cast 1u8 r206.height r208 r210 r206.next_index into r211 as CacheState;
    set r211 into cache_state[0u8];
    branch.eq true true to end_otherwise_0_43;
    position end_then_0_42;
    position end_otherwise_0_43;
    ternary r198 r206.state r196.state into r212;
    ternary r198 r206.height r196.height into r213;
    ternary r198 r206.total_bonded r196.total_bonded into r214;
    ternary r198 r206.total_unbonding r196.total_unbonding into r215;
    ternary r198 r206.next_index r196.next_index into r216;
    cast r212 r213 r214 r215 r216 into r217 as CacheState;
    add r1 10u32 into r218;
    get cache_state[0u8] into r219;
    lt r218 r4 into r220;
    ternary r220 1u8 2u8 into r221;
    lt r218 r4 into r222;
    ternary r222 r219.height block.height into r223;
    lt r218 r4 into r224;
    ternary r224 r218 0u32 into r225;
    cast r221 r223 r219.total_bonded r219.total_unbonding r225 into r226 as CacheState;
    set r226 into cache_state[0u8];
    gte r218 r4 into r227;
    branch.eq r227 false to end_then_0_44;
    set r219.total_bonded into state[2u8];
    set r219.total_unbonding into state[3u8];
    branch.eq true true to end_otherwise_0_45;
    position end_then_0_44;
    position end_otherwise_0_45;




function set_treasury:
    input r0 as address.public;
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r1;
    async set_treasury r1 r0 into r2;
    output r2 as spectre_stcredits_v1.aleo/set_treasury.future;

finalize set_treasury:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as address.public;
    await r0;
    get config[0u8] into r2;
    cast r2.initialized r1 r2.paused into r3 as Config;
    set r3 into config[0u8];




function set_protocol_fee:
    input r0 as field.public;
    gt r0 0field into r1;
    lte r0 100field into r2;
    and r1 r2 into r3;
    assert.eq r3 true;
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r4;
    async set_protocol_fee r4 r0 into r5;
    output r5 as spectre_stcredits_v1.aleo/set_protocol_fee.future;

finalize set_protocol_fee:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as field.public;
    await r0;
    set r1 into state[4u8];




function pause:
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r0;
    async pause r0 into r1;
    output r1 as spectre_stcredits_v1.aleo/pause.future;

finalize pause:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    await r0;
    get config[0u8] into r1;
    cast r1.initialized r1.treasury true into r2 as Config;
    set r2 into config[0u8];




function unpause:
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r0;
    async unpause r0 into r1;
    output r1 as spectre_stcredits_v1.aleo/unpause.future;

finalize unpause:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    await r0;
    get config[0u8] into r1;
    cast r1.initialized r1.treasury false into r2 as Config;
    set r2 into config[0u8];

