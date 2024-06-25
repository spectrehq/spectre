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
    treasury as address;
    paused as boolean;

struct CacheState:
    height as u32;
    beacon as field;
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
    get.or_use state[2u8] 0field into r2;
    add r2 1field into r3;
    set r3 into state[2u8];
    cast 0u64 true into r4 as committee_state;
    get.or_use credits.aleo/committee[r1] r4 into r5;
    assert.eq r5.is_open true;
    contains validator_delegators[r1] into r6;
    not r6 into r7;
    assert.eq r7 true;
    get.or_use validators_count[0u8] 0u32 into r8;
    add r8 1u32 into r9;
    set r9 into validators_count[0u8];
    set r1 into validators[r8];
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
    get.or_use state[2u8] 0field into r3;
    add r3 1field into r4;
    set r4 into state[2u8];
    get validators[r1] into r5;
    assert.eq r5 r2;
    get validator_delegators[r2] into r6;
    contains delegators[r6] into r7;
    is.eq r6 aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc into r8;
    or r7 r8 into r9;
    assert.eq r9 true;
    cast r2 0u64 into r10 as bond_state;
    get.or_use credits.aleo/bonded[r6] r10 into r11;
    is.eq r11.validator r2 into r12;
    assert.eq r12 true;
    cast 0u64 0u32 into r13 as unbond_state;
    get.or_use credits.aleo/unbonding[r6] r13 into r14;
    is.eq r11.microcredits 0u64 into r15;
    is.eq r14.microcredits 0u64 into r16;
    and r15 r16 into r17;
    assert.eq r17 true;
    get validators_count[0u8] into r18;
    gte r18 1u32 into r19;
    assert.eq r19 true;
    sub r18 1u32 into r20;
    is.neq r1 r20 into r21;
    branch.eq r21 false to end_then_0_0;
    sub r18 1u32 into r22;
    get validators[r22] into r23;
    set r23 into validators[r1];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;
    sub r18 1u32 into r24;
    set r24 into validators_count[0u8];
    sub r18 1u32 into r25;
    remove validators[r25];
    remove validator_delegators[r2];
    remove delegators[r6];




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
    get.or_use state[2u8] 0field into r4;
    add r4 1field into r5;
    set r5 into state[2u8];
    get validators[r1] into r6;
    assert.eq r6 r2;
    get validator_delegators[r2] into r7;
    assert.eq r7 aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;
    contains delegators[r3] into r8;
    not r8 into r9;
    assert.eq r9 true;
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
    get.or_use state[2u8] 0field into r8;
    add r8 1field into r9;
    set r9 into state[2u8];
    get validators[r2] into r10;
    assert.eq r10 r3;
    get validator_delegators[r3] into r11;
    assert.eq r11 r4;
    cast spectre_stcredits_v1.aleo into r12 as address;
    get.or_use credits.aleo/account[r12] 0u64 into r13;
    cast r13 into r14 as field;
    get.or_use state[0u8] 0field into r15;
    get.or_use state[1u8] 0field into r16;
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
    get.or_use state[5u8] 0field into r27;
    mul r26 r27 into r28;
    div r28 100field into r29;
    gt r29 0field into r30;
    branch.eq r30 false to end_then_0_2;
    get.or_use state[3u8] 0field into r31;
    get.or_use state[4u8] 0field into r32;
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
    get.or_use state[2u8] 0field into r8;
    add r8 1field into r9;
    set r9 into state[2u8];
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
    get.or_use state[5u8] 0field into r18;
    mul r17 r18 into r19;
    div r19 100field into r20;
    gt r20 0field into r21;
    branch.eq r21 false to end_then_0_4;
    cast spectre_stcredits_v1.aleo into r22 as address;
    get.or_use credits.aleo/account[r22] 0u64 into r23;
    cast r23 into r24 as field;
    get.or_use state[3u8] 0field into r25;
    get.or_use state[4u8] 0field into r26;
    get.or_use state[0u8] 0field into r27;
    get.or_use state[1u8] 0field into r28;
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
    get.or_use state[2u8] 0field into r6;
    add r6 1field into r7;
    set r7 into state[2u8];
    get validators[r1] into r8;
    assert.eq r8 r2;
    get validator_delegators[r2] into r9;
    assert.eq r9 r3;




function resolve_withdrawal:
    async resolve_withdrawal into r0;
    output r0 as spectre_stcredits_v1.aleo/resolve_withdrawal.future;

finalize resolve_withdrawal:
    get config[0u8] into r0;
    not r0.paused into r1;
    assert.eq r1 true;
    get.or_use state[2u8] 0field into r2;
    add r2 1field into r3;
    set r3 into state[2u8];
    cast 0field 0field into r4 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r4 into r5;
    sub r5.end r5.start into r6;
    lte r6 0field into r7;
    branch.eq r7 false to end_then_0_6;
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    position end_otherwise_0_7;
    get pending_queue[r5.start] into r8;
    get pending_withdraws[r8] into r9;
    is.eq r9.index r5.start into r10;
    assert.eq r10 true;
    gt r9.amount 0field into r11;
    assert.eq r11 true;
    cast spectre_stcredits_v1.aleo into r12 as address;
    get.or_use credits.aleo/account[r12] 0u64 into r13;
    cast r13 into r14 as field;
    get.or_use state[0u8] 0field into r15;
    sub r14 r15 into r16;
    lt r16 r9.amount into r17;
    branch.eq r17 false to end_then_0_8;
    branch.eq true true to end_otherwise_0_9;
    position end_then_0_8;
    position end_otherwise_0_9;
    add r5.start 1field into r18;
    cast r18 r5.end into r19 as QueueStartEnd;
    set r19 into pending_queue_start_end[0u8];
    remove pending_queue[r5.start];
    remove pending_withdraws[r8];
    cast 0field 0u32 into r20 as Withdraw;
    get.or_use withdraws[r8] r20 into r21;
    add r21.amount r9.amount into r22;
    add block.height 360u32 into r23;
    cast r22 r23 into r24 as Withdraw;
    set r24 into withdraws[r8];
    get.or_use state[1u8] 0field into r25;
    sub r25 r9.amount into r26;
    set r26 into state[1u8];
    add r15 r9.amount into r27;
    set r27 into state[0u8];
    cast 0field 0field into r28 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r28 into r29;
    sub r29.end r29.start into r30;
    lte r30 0field into r31;
    branch.eq r31 false to end_then_0_10;
    branch.eq true true to end_otherwise_0_11;
    position end_then_0_10;
    position end_otherwise_0_11;
    get pending_queue[r29.start] into r32;
    get pending_withdraws[r32] into r33;
    is.eq r33.index r29.start into r34;
    assert.eq r34 true;
    gt r33.amount 0field into r35;
    assert.eq r35 true;
    cast spectre_stcredits_v1.aleo into r36 as address;
    get.or_use credits.aleo/account[r36] 0u64 into r37;
    cast r37 into r38 as field;
    get.or_use state[0u8] 0field into r39;
    sub r38 r39 into r40;
    lt r40 r33.amount into r41;
    branch.eq r41 false to end_then_0_12;
    branch.eq true true to end_otherwise_0_13;
    position end_then_0_12;
    position end_otherwise_0_13;
    add r29.start 1field into r42;
    cast r42 r29.end into r43 as QueueStartEnd;
    set r43 into pending_queue_start_end[0u8];
    remove pending_queue[r29.start];
    remove pending_withdraws[r32];
    cast 0field 0u32 into r44 as Withdraw;
    get.or_use withdraws[r32] r44 into r45;
    add r45.amount r33.amount into r46;
    add block.height 360u32 into r47;
    cast r46 r47 into r48 as Withdraw;
    set r48 into withdraws[r32];
    get.or_use state[1u8] 0field into r49;
    sub r49 r33.amount into r50;
    set r50 into state[1u8];
    add r39 r33.amount into r51;
    set r51 into state[0u8];




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
    get state[2u8] into r5;
    add r5 1field into r6;
    set r6 into state[2u8];
    get.or_use validators_count[0u8] 0u32 into r7;
    get cache_state[0u8] into r8;
    assert.eq block.height r8.height;
    assert.eq r7 r8.next_index;
    assert.eq r6 r8.beacon;
    cast spectre_stcredits_v1.aleo into r9 as address;
    get.or_use credits.aleo/account[r9] 0u64 into r10;
    cast r10 into r11 as field;
    get.or_use state[3u8] 0field into r12;
    get.or_use state[4u8] 0field into r13;
    get.or_use state[0u8] 0field into r14;
    get.or_use state[1u8] 0field into r15;
    add r12 r11 into r16;
    add r16 r13 into r17;
    sub r17 r14 into r18;
    sub r18 r15 into r19;
    get.or_use total_supply[0u8] 0u64 into r20;
    cast r20 into r21 as field;
    gt r19 0field into r22;
    ternary r22 r19 1field into r23;
    gt r21 0field into r24;
    ternary r24 r21 1field into r25;
    mul r2 r25 into r26;
    div r26 r23 into r27;
    get.or_use account[r1] 0u64 into r28;
    cast r27 into r29 as u64;
    add r28 r29 into r30;
    set r30 into account[r1];
    add r21 r27 into r31;
    cast r31 into r32 as u64;
    set r32 into total_supply[0u8];






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
    get state[2u8] into r4;
    add r4 1field into r5;
    set r5 into state[2u8];
    get.or_use validators_count[0u8] 0u32 into r6;
    get cache_state[0u8] into r7;
    assert.eq block.height r7.height;
    assert.eq r6 r7.next_index;
    assert.eq r5 r7.beacon;
    cast spectre_stcredits_v1.aleo into r8 as address;
    get.or_use credits.aleo/account[r8] 0u64 into r9;
    cast r9 into r10 as field;
    get.or_use state[3u8] 0field into r11;
    get.or_use state[4u8] 0field into r12;
    get.or_use state[0u8] 0field into r13;
    get.or_use state[1u8] 0field into r14;
    add r11 r10 into r15;
    add r15 r12 into r16;
    sub r16 r13 into r17;
    sub r17 r14 into r18;
    get.or_use total_supply[0u8] 0u64 into r19;
    cast r19 into r20 as field;
    gt r18 0field into r21;
    ternary r21 r18 1field into r22;
    gt r20 0field into r23;
    ternary r23 r20 1field into r24;
    mul r1 r22 into r25;
    div r25 r24 into r26;
    get.or_use account[r0] 0u64 into r27;
    cast r1 into r28 as u64;
    sub r27 r28 into r29;
    set r29 into account[r0];
    sub r20 r1 into r30;
    cast r30 into r31 as u64;
    set r31 into total_supply[0u8];
    sub r10 r13 into r32;
    contains withdraws[r0] into r33;
    not r33 into r34;
    branch.eq r34 false to end_then_0_14;
    gte r32 r26 into r35;
    branch.eq r35 false to end_then_1_16;
    add r13 r26 into r36;
    set r36 into state[0u8];
    add block.height 360u32 into r37;
    cast r26 r37 into r38 as Withdraw;
    set r38 into withdraws[r0];
    branch.eq true true to end_otherwise_1_17;
    position end_then_1_16;
    add r13 r32 into r39;
    set r39 into state[0u8];
    position end_otherwise_1_17;
    branch.eq true true to end_otherwise_0_15;
    position end_then_0_14;
    position end_otherwise_0_15;
    not r33 into r40;
    sub r26 r32 into r41;
    ternary r40 r41 r26 into r42;
    cast 0field 0field into r43 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r43 into r44;
    contains pending_withdraws[r0] into r45;
    not r45 into r46;
    branch.eq r46 false to end_then_0_18;
    set r0 into pending_queue[r44.end];
    add r44.end 1field into r47;
    cast r44.start r47 into r48 as QueueStartEnd;
    set r48 into pending_queue_start_end[0u8];
    cast r42 r44.end into r49 as PendingWithdraw;
    set r49 into pending_withdraws[r0];
    branch.eq true true to end_otherwise_0_19;
    position end_then_0_18;
    get pending_withdraws[r0] into r50;
    gte r50.index r44.start into r51;
    lt r50.index r44.end into r52;
    and r51 r52 into r53;
    assert.eq r53 true;
    sub r44.end 1field into r54;
    is.neq r50.index r54 into r55;
    branch.eq r55 false to end_then_1_20;
    get pending_queue[r54] into r56;
    get pending_withdraws[r56] into r57;
    set r56 into pending_queue[r50.index];
    set r0 into pending_queue[r54];
    cast r57.amount r50.index into r58 as PendingWithdraw;
    set r58 into pending_withdraws[r56];
    branch.eq true true to end_otherwise_1_21;
    position end_then_1_20;
    position end_otherwise_1_21;
    add r50.amount r42 into r59;
    cast r59 r54 into r60 as PendingWithdraw;
    set r60 into pending_withdraws[r0];
    position end_otherwise_0_19;
    get.or_use state[1u8] 0field into r61;
    add r61 r42 into r62;
    set r62 into state[1u8];




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
    get.or_use state[2u8] 0field into r5;
    add r5 1field into r6;
    set r6 into state[2u8];
    get withdraws[r1] into r7;
    lte r7.height block.height into r8;
    assert.eq r8 true;
    assert.eq r7.amount r2;
    remove withdraws[r1];




function cache_total_bonded_unbonding:
    input r0 as u32.public;
    async cache_total_bonded_unbonding r0 into r1;
    output r1 as spectre_stcredits_v1.aleo/cache_total_bonded_unbonding.future;

finalize cache_total_bonded_unbonding:
    input r0 as u32.public;
    get config[0u8] into r1;
    not r1.paused into r2;
    assert.eq r2 true;
    get.or_use state[2u8] 0field into r3;
    add r3 1field into r4;
    set r4 into state[2u8];
    get.or_use validators_count[0u8] 0u32 into r5;
    is.eq r0 0u32 into r6;
    branch.eq r6 false to end_then_0_22;
    add r5 5u32 into r7;
    sub r7 1u32 into r8;
    div r8 5u32 into r9;
    cast r9 into r10 as field;
    add r4 r10 into r11;
    cast block.height r11 0u32 into r12 as CacheState;
    set r12 into cache_state[0u8];
    set 0field into state[3u8];
    set 0field into state[4u8];
    branch.eq true true to end_otherwise_0_23;
    position end_then_0_22;
    position end_otherwise_0_23;
    get cache_state[0u8] into r13;
    assert.eq block.height r13.height;
    assert.eq r0 r13.next_index;
    add r0 5u32 into r14;
    lt r14 r5 into r15;
    ternary r15 r14 r5 into r16;
    cast r13.height r13.beacon r16 into r17 as CacheState;
    set r17 into cache_state[0u8];
    add r0 0u32 into r18;
    lt r18 r5 into r19;
    branch.eq r19 false to end_then_0_24;
    get validators[r18] into r20;
    get validator_delegators[r20] into r21;
    cast r20 0u64 into r22 as bond_state;
    get.or_use credits.aleo/bonded[r21] r22 into r23;
    is.eq r23.validator r20 into r24;
    assert.eq r24 true;
    cast r23.microcredits into r25 as field;
    get state[3u8] into r26;
    add r25 r26 into r27;
    set r27 into state[3u8];
    cast 0u64 0u32 into r28 as unbond_state;
    get.or_use credits.aleo/unbonding[r21] r28 into r29;
    cast r29.microcredits into r30 as field;
    get state[4u8] into r31;
    add r30 r31 into r32;
    set r32 into state[4u8];
    branch.eq true true to end_otherwise_0_25;
    position end_then_0_24;
    position end_otherwise_0_25;
    add r0 1u32 into r33;
    lt r33 r5 into r34;
    branch.eq r34 false to end_then_0_26;
    get validators[r33] into r35;
    get validator_delegators[r35] into r36;
    cast r35 0u64 into r37 as bond_state;
    get.or_use credits.aleo/bonded[r36] r37 into r38;
    is.eq r38.validator r35 into r39;
    assert.eq r39 true;
    cast r38.microcredits into r40 as field;
    get state[3u8] into r41;
    add r40 r41 into r42;
    set r42 into state[3u8];
    cast 0u64 0u32 into r43 as unbond_state;
    get.or_use credits.aleo/unbonding[r36] r43 into r44;
    cast r44.microcredits into r45 as field;
    get state[4u8] into r46;
    add r45 r46 into r47;
    set r47 into state[4u8];
    branch.eq true true to end_otherwise_0_27;
    position end_then_0_26;
    position end_otherwise_0_27;
    add r0 2u32 into r48;
    lt r48 r5 into r49;
    branch.eq r49 false to end_then_0_28;
    get validators[r48] into r50;
    get validator_delegators[r50] into r51;
    cast r50 0u64 into r52 as bond_state;
    get.or_use credits.aleo/bonded[r51] r52 into r53;
    is.eq r53.validator r50 into r54;
    assert.eq r54 true;
    cast r53.microcredits into r55 as field;
    get state[3u8] into r56;
    add r55 r56 into r57;
    set r57 into state[3u8];
    cast 0u64 0u32 into r58 as unbond_state;
    get.or_use credits.aleo/unbonding[r51] r58 into r59;
    cast r59.microcredits into r60 as field;
    get state[4u8] into r61;
    add r60 r61 into r62;
    set r62 into state[4u8];
    branch.eq true true to end_otherwise_0_29;
    position end_then_0_28;
    position end_otherwise_0_29;
    add r0 3u32 into r63;
    lt r63 r5 into r64;
    branch.eq r64 false to end_then_0_30;
    get validators[r63] into r65;
    get validator_delegators[r65] into r66;
    cast r65 0u64 into r67 as bond_state;
    get.or_use credits.aleo/bonded[r66] r67 into r68;
    is.eq r68.validator r65 into r69;
    assert.eq r69 true;
    cast r68.microcredits into r70 as field;
    get state[3u8] into r71;
    add r70 r71 into r72;
    set r72 into state[3u8];
    cast 0u64 0u32 into r73 as unbond_state;
    get.or_use credits.aleo/unbonding[r66] r73 into r74;
    cast r74.microcredits into r75 as field;
    get state[4u8] into r76;
    add r75 r76 into r77;
    set r77 into state[4u8];
    branch.eq true true to end_otherwise_0_31;
    position end_then_0_30;
    position end_otherwise_0_31;
    add r0 4u32 into r78;
    lt r78 r5 into r79;
    branch.eq r79 false to end_then_0_32;
    get validators[r78] into r80;
    get validator_delegators[r80] into r81;
    cast r80 0u64 into r82 as bond_state;
    get.or_use credits.aleo/bonded[r81] r82 into r83;
    is.eq r83.validator r80 into r84;
    assert.eq r84 true;
    cast r83.microcredits into r85 as field;
    get state[3u8] into r86;
    add r85 r86 into r87;
    set r87 into state[3u8];
    cast 0u64 0u32 into r88 as unbond_state;
    get.or_use credits.aleo/unbonding[r81] r88 into r89;
    cast r89.microcredits into r90 as field;
    get state[4u8] into r91;
    add r90 r91 into r92;
    set r92 into state[4u8];
    branch.eq true true to end_otherwise_0_33;
    position end_then_0_32;
    position end_otherwise_0_33;




function set_treasury:
    input r0 as address.public;
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r1;
    async set_treasury r1 r0 into r2;
    output r2 as spectre_stcredits_v1.aleo/set_treasury.future;

finalize set_treasury:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as address.public;
    await r0;
    cast r1 false into r2 as Config;
    get.or_use config[0u8] r2 into r3;
    cast r1 r3.paused into r4 as Config;
    set r4 into config[0u8];




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
    set r1 into state[5u8];




function pause:
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r0;
    async pause r0 into r1;
    output r1 as spectre_stcredits_v1.aleo/pause.future;

finalize pause:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    await r0;
    cast aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc false into r1 as Config;
    get.or_use config[0u8] r1 into r2;
    cast r2.treasury true into r3 as Config;
    set r3 into config[0u8];




function unpause:
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r0;
    async unpause r0 into r1;
    output r1 as spectre_stcredits_v1.aleo/unpause.future;

finalize unpause:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    await r0;
    cast aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc false into r1 as Config;
    get.or_use config[0u8] r1 into r2;
    cast r2.treasury false into r3 as Config;
    set r3 into config[0u8];

