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
    get.or_use state[2u8] 0field into r6;
    add r6 1field into r7;
    set r7 into state[2u8];
    get validators[r2] into r8;
    assert.eq r8 r3;
    get validator_delegators[r3] into r9;
    assert.eq r9 r4;
    cast spectre_stcredits_v1.aleo into r10 as address;
    get.or_use credits.aleo/account[r10] 0u64 into r11;
    cast r11 into r12 as field;
    get.or_use state[0u8] 0field into r13;
    get.or_use state[1u8] 0field into r14;
    cast r5 into r15 as field;
    sub r12 r13 into r16;
    sub r16 r14 into r17;
    lte r15 r17 into r18;
    assert.eq r18 true;
    cast r3 0u64 into r19 as bond_state;
    get.or_use credits.aleo/bonded[r4] r19 into r20;
    is.eq r20.validator r3 into r21;
    assert.eq r21 true;
    get.or_use validator_bonded[r3] 0u64 into r22;
    sub r20.microcredits r22 into r23;
    cast r23 into r24 as field;
    get.or_use state[5u8] 0field into r25;
    mul r24 r25 into r26;
    div r26 100field into r27;
    gt r27 0field into r28;
    branch.eq r28 false to end_then_0_2;
    get.or_use state[3u8] 0field into r29;
    get.or_use state[4u8] 0field into r30;
    add r29 r12 into r31;
    add r31 r30 into r32;
    sub r32 r13 into r33;
    sub r33 r14 into r34;
    get.or_use total_supply[0u8] 0u64 into r35;
    cast r35 into r36 as field;
    gt r34 0field into r37;
    ternary r37 r34 1field into r38;
    gt r36 0field into r39;
    ternary r39 r36 1field into r40;
    mul r27 r40 into r41;
    div r41 r38 into r42;
    get config[0u8] into r43;
    get.or_use account[r43.treasury] 0u64 into r44;
    cast r42 into r45 as u64;
    add r44 r45 into r46;
    set r46 into account[r43.treasury];
    add r36 r42 into r47;
    cast r47 into r48 as u64;
    set r48 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;
    add r20.microcredits r5 into r49;
    set r49 into validator_bonded[r3];




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
    get.or_use state[2u8] 0field into r6;
    add r6 1field into r7;
    set r7 into state[2u8];
    get validators[r2] into r8;
    assert.eq r8 r3;
    get validator_delegators[r3] into r9;
    assert.eq r9 r4;
    cast r3 0u64 into r10 as bond_state;
    get.or_use credits.aleo/bonded[r4] r10 into r11;
    is.eq r11.validator r3 into r12;
    assert.eq r12 true;
    get.or_use validator_bonded[r3] 0u64 into r13;
    sub r11.microcredits r13 into r14;
    cast r14 into r15 as field;
    get.or_use state[5u8] 0field into r16;
    mul r15 r16 into r17;
    div r17 100field into r18;
    gt r18 0field into r19;
    branch.eq r19 false to end_then_0_4;
    cast spectre_stcredits_v1.aleo into r20 as address;
    get.or_use credits.aleo/account[r20] 0u64 into r21;
    cast r21 into r22 as field;
    get.or_use state[3u8] 0field into r23;
    get.or_use state[4u8] 0field into r24;
    get.or_use state[0u8] 0field into r25;
    get.or_use state[1u8] 0field into r26;
    add r23 r22 into r27;
    add r27 r24 into r28;
    sub r28 r25 into r29;
    sub r29 r26 into r30;
    get.or_use total_supply[0u8] 0u64 into r31;
    cast r31 into r32 as field;
    gt r30 0field into r33;
    ternary r33 r30 1field into r34;
    gt r32 0field into r35;
    ternary r35 r32 1field into r36;
    mul r18 r36 into r37;
    div r37 r34 into r38;
    get config[0u8] into r39;
    get.or_use account[r39.treasury] 0u64 into r40;
    cast r38 into r41 as u64;
    add r40 r41 into r42;
    set r42 into account[r39.treasury];
    add r32 r38 into r43;
    cast r43 into r44 as u64;
    set r44 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_5;
    position end_then_0_4;
    position end_otherwise_0_5;
    await r1;
    cast r3 0u64 into r45 as bond_state;
    get.or_use credits.aleo/bonded[r4] r45 into r46;
    set r46.microcredits into validator_bonded[r3];




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
    get.or_use state[2u8] 0field into r4;
    add r4 1field into r5;
    set r5 into state[2u8];
    get validators[r1] into r6;
    assert.eq r6 r2;
    get validator_delegators[r2] into r7;
    assert.eq r7 r3;




function resolve_withdrawal:
    async resolve_withdrawal into r0;
    output r0 as spectre_stcredits_v1.aleo/resolve_withdrawal.future;

finalize resolve_withdrawal:
    get.or_use state[2u8] 0field into r0;
    add r0 1field into r1;
    set r1 into state[2u8];
    cast 0field 0field into r2 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r2 into r3;
    sub r3.end r3.start into r4;
    lte r4 0field into r5;
    branch.eq r5 false to end_then_0_6;
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    position end_otherwise_0_7;
    get pending_queue[r3.start] into r6;
    get pending_withdraws[r6] into r7;
    is.eq r7.index r3.start into r8;
    assert.eq r8 true;
    gt r7.amount 0field into r9;
    assert.eq r9 true;
    cast spectre_stcredits_v1.aleo into r10 as address;
    get.or_use credits.aleo/account[r10] 0u64 into r11;
    cast r11 into r12 as field;
    get.or_use state[0u8] 0field into r13;
    sub r12 r13 into r14;
    lt r14 r7.amount into r15;
    branch.eq r15 false to end_then_0_8;
    branch.eq true true to end_otherwise_0_9;
    position end_then_0_8;
    position end_otherwise_0_9;
    add r3.start 1field into r16;
    cast r16 r3.end into r17 as QueueStartEnd;
    set r17 into pending_queue_start_end[0u8];
    remove pending_queue[r3.start];
    remove pending_withdraws[r6];
    cast 0field 0u32 into r18 as Withdraw;
    get.or_use withdraws[r6] r18 into r19;
    add r19.amount r7.amount into r20;
    add block.height 360u32 into r21;
    cast r20 r21 into r22 as Withdraw;
    set r22 into withdraws[r6];
    get.or_use state[1u8] 0field into r23;
    sub r23 r7.amount into r24;
    set r24 into state[1u8];
    add r13 r7.amount into r25;
    set r25 into state[0u8];
    cast 0field 0field into r26 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r26 into r27;
    sub r27.end r27.start into r28;
    lte r28 0field into r29;
    branch.eq r29 false to end_then_0_10;
    branch.eq true true to end_otherwise_0_11;
    position end_then_0_10;
    position end_otherwise_0_11;
    get pending_queue[r27.start] into r30;
    get pending_withdraws[r30] into r31;
    is.eq r31.index r27.start into r32;
    assert.eq r32 true;
    gt r31.amount 0field into r33;
    assert.eq r33 true;
    cast spectre_stcredits_v1.aleo into r34 as address;
    get.or_use credits.aleo/account[r34] 0u64 into r35;
    cast r35 into r36 as field;
    get.or_use state[0u8] 0field into r37;
    sub r36 r37 into r38;
    lt r38 r31.amount into r39;
    branch.eq r39 false to end_then_0_12;
    branch.eq true true to end_otherwise_0_13;
    position end_then_0_12;
    position end_otherwise_0_13;
    add r27.start 1field into r40;
    cast r40 r27.end into r41 as QueueStartEnd;
    set r41 into pending_queue_start_end[0u8];
    remove pending_queue[r27.start];
    remove pending_withdraws[r30];
    cast 0field 0u32 into r42 as Withdraw;
    get.or_use withdraws[r30] r42 into r43;
    add r43.amount r31.amount into r44;
    add block.height 360u32 into r45;
    cast r44 r45 into r46 as Withdraw;
    set r46 into withdraws[r30];
    get.or_use state[1u8] 0field into r47;
    sub r47 r31.amount into r48;
    set r48 into state[1u8];
    add r37 r31.amount into r49;
    set r49 into state[0u8];




function supply:
    input r0 as u64.public;
    gt r0 0u64 into r1;
    assert.eq r1 true;
    cast spectre_stcredits_v1.aleo into r2 as address;
    call credits.aleo/transfer_public_as_signer r2 r0 into r3;
    cast r0 into r4 as field;
    async supply r3 self.caller r4 into r5;
    output r5 as spectre_stcredits_v1.aleo/supply.future;

finalize supply:
    input r0 as credits.aleo/transfer_public_as_signer.future;
    input r1 as address.public;
    input r2 as field.public;
    await r0;
    get state[2u8] into r3;
    add r3 1field into r4;
    set r4 into state[2u8];
    get.or_use validators_count[0u8] 0u32 into r5;
    get cache_state[0u8] into r6;
    assert.eq block.height r6.height;
    assert.eq r5 r6.next_index;
    assert.eq r4 r6.beacon;
    cast spectre_stcredits_v1.aleo into r7 as address;
    get.or_use credits.aleo/account[r7] 0u64 into r8;
    cast r8 into r9 as field;
    get.or_use state[3u8] 0field into r10;
    get.or_use state[4u8] 0field into r11;
    get.or_use state[0u8] 0field into r12;
    get.or_use state[1u8] 0field into r13;
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
    async withdraw self.caller r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/withdraw.future;

finalize withdraw:
    input r0 as address.public;
    input r1 as field.public;
    get state[2u8] into r2;
    add r2 1field into r3;
    set r3 into state[2u8];
    get.or_use validators_count[0u8] 0u32 into r4;
    get cache_state[0u8] into r5;
    assert.eq block.height r5.height;
    assert.eq r4 r5.next_index;
    assert.eq r3 r5.beacon;
    cast spectre_stcredits_v1.aleo into r6 as address;
    get.or_use credits.aleo/account[r6] 0u64 into r7;
    cast r7 into r8 as field;
    get.or_use state[3u8] 0field into r9;
    get.or_use state[4u8] 0field into r10;
    get.or_use state[0u8] 0field into r11;
    get.or_use state[1u8] 0field into r12;
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
    cast 0field 0field into r41 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r41 into r42;
    contains pending_withdraws[r0] into r43;
    not r43 into r44;
    branch.eq r44 false to end_then_0_18;
    set r0 into pending_queue[r42.end];
    add r42.end 1field into r45;
    cast r42.start r45 into r46 as QueueStartEnd;
    set r46 into pending_queue_start_end[0u8];
    cast r40 r42.end into r47 as PendingWithdraw;
    set r47 into pending_withdraws[r0];
    branch.eq true true to end_otherwise_0_19;
    position end_then_0_18;
    get pending_withdraws[r0] into r48;
    gte r48.index r42.start into r49;
    lt r48.index r42.end into r50;
    and r49 r50 into r51;
    assert.eq r51 true;
    sub r42.end 1field into r52;
    is.neq r48.index r52 into r53;
    branch.eq r53 false to end_then_1_20;
    get pending_queue[r52] into r54;
    get pending_withdraws[r54] into r55;
    set r54 into pending_queue[r48.index];
    set r0 into pending_queue[r52];
    cast r55.amount r48.index into r56 as PendingWithdraw;
    set r56 into pending_withdraws[r54];
    branch.eq true true to end_otherwise_1_21;
    position end_then_1_20;
    position end_otherwise_1_21;
    add r48.amount r40 into r57;
    cast r57 r52 into r58 as PendingWithdraw;
    set r58 into pending_withdraws[r0];
    position end_otherwise_0_19;
    get.or_use state[1u8] 0field into r59;
    add r59 r40 into r60;
    set r60 into state[1u8];




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
    get.or_use state[2u8] 0field into r3;
    add r3 1field into r4;
    set r4 into state[2u8];
    get withdraws[r1] into r5;
    lte r5.height block.height into r6;
    assert.eq r6 true;
    assert.eq r5.amount r2;
    remove withdraws[r1];




function cache_total_bonded_unbonding:
    input r0 as u32.public;
    async cache_total_bonded_unbonding r0 into r1;
    output r1 as spectre_stcredits_v1.aleo/cache_total_bonded_unbonding.future;

finalize cache_total_bonded_unbonding:
    input r0 as u32.public;
    get.or_use state[2u8] 0field into r1;
    add r1 1field into r2;
    set r2 into state[2u8];
    get.or_use validators_count[0u8] 0u32 into r3;
    is.eq r0 0u32 into r4;
    branch.eq r4 false to end_then_0_22;
    add r3 5u32 into r5;
    sub r5 1u32 into r6;
    div r6 5u32 into r7;
    cast r7 into r8 as field;
    add r2 r8 into r9;
    cast block.height r9 0u32 into r10 as CacheState;
    set r10 into cache_state[0u8];
    set 0field into state[3u8];
    set 0field into state[4u8];
    branch.eq true true to end_otherwise_0_23;
    position end_then_0_22;
    position end_otherwise_0_23;
    get cache_state[0u8] into r11;
    assert.eq block.height r11.height;
    assert.eq r0 r11.next_index;
    add r0 5u32 into r12;
    lt r12 r3 into r13;
    ternary r13 r12 r3 into r14;
    cast r11.height r11.beacon r14 into r15 as CacheState;
    set r15 into cache_state[0u8];
    add r0 0u32 into r16;
    lt r16 r3 into r17;
    branch.eq r17 false to end_then_0_24;
    get validators[r16] into r18;
    get validator_delegators[r18] into r19;
    cast r18 0u64 into r20 as bond_state;
    get.or_use credits.aleo/bonded[r19] r20 into r21;
    is.eq r21.validator r18 into r22;
    assert.eq r22 true;
    cast r21.microcredits into r23 as field;
    get state[3u8] into r24;
    add r23 r24 into r25;
    set r25 into state[3u8];
    cast 0u64 0u32 into r26 as unbond_state;
    get.or_use credits.aleo/unbonding[r19] r26 into r27;
    cast r27.microcredits into r28 as field;
    get state[4u8] into r29;
    add r28 r29 into r30;
    set r30 into state[4u8];
    branch.eq true true to end_otherwise_0_25;
    position end_then_0_24;
    position end_otherwise_0_25;
    add r0 1u32 into r31;
    lt r31 r3 into r32;
    branch.eq r32 false to end_then_0_26;
    get validators[r31] into r33;
    get validator_delegators[r33] into r34;
    cast r33 0u64 into r35 as bond_state;
    get.or_use credits.aleo/bonded[r34] r35 into r36;
    is.eq r36.validator r33 into r37;
    assert.eq r37 true;
    cast r36.microcredits into r38 as field;
    get state[3u8] into r39;
    add r38 r39 into r40;
    set r40 into state[3u8];
    cast 0u64 0u32 into r41 as unbond_state;
    get.or_use credits.aleo/unbonding[r34] r41 into r42;
    cast r42.microcredits into r43 as field;
    get state[4u8] into r44;
    add r43 r44 into r45;
    set r45 into state[4u8];
    branch.eq true true to end_otherwise_0_27;
    position end_then_0_26;
    position end_otherwise_0_27;
    add r0 2u32 into r46;
    lt r46 r3 into r47;
    branch.eq r47 false to end_then_0_28;
    get validators[r46] into r48;
    get validator_delegators[r48] into r49;
    cast r48 0u64 into r50 as bond_state;
    get.or_use credits.aleo/bonded[r49] r50 into r51;
    is.eq r51.validator r48 into r52;
    assert.eq r52 true;
    cast r51.microcredits into r53 as field;
    get state[3u8] into r54;
    add r53 r54 into r55;
    set r55 into state[3u8];
    cast 0u64 0u32 into r56 as unbond_state;
    get.or_use credits.aleo/unbonding[r49] r56 into r57;
    cast r57.microcredits into r58 as field;
    get state[4u8] into r59;
    add r58 r59 into r60;
    set r60 into state[4u8];
    branch.eq true true to end_otherwise_0_29;
    position end_then_0_28;
    position end_otherwise_0_29;
    add r0 3u32 into r61;
    lt r61 r3 into r62;
    branch.eq r62 false to end_then_0_30;
    get validators[r61] into r63;
    get validator_delegators[r63] into r64;
    cast r63 0u64 into r65 as bond_state;
    get.or_use credits.aleo/bonded[r64] r65 into r66;
    is.eq r66.validator r63 into r67;
    assert.eq r67 true;
    cast r66.microcredits into r68 as field;
    get state[3u8] into r69;
    add r68 r69 into r70;
    set r70 into state[3u8];
    cast 0u64 0u32 into r71 as unbond_state;
    get.or_use credits.aleo/unbonding[r64] r71 into r72;
    cast r72.microcredits into r73 as field;
    get state[4u8] into r74;
    add r73 r74 into r75;
    set r75 into state[4u8];
    branch.eq true true to end_otherwise_0_31;
    position end_then_0_30;
    position end_otherwise_0_31;
    add r0 4u32 into r76;
    lt r76 r3 into r77;
    branch.eq r77 false to end_then_0_32;
    get validators[r76] into r78;
    get validator_delegators[r78] into r79;
    cast r78 0u64 into r80 as bond_state;
    get.or_use credits.aleo/bonded[r79] r80 into r81;
    is.eq r81.validator r78 into r82;
    assert.eq r82 true;
    cast r81.microcredits into r83 as field;
    get state[3u8] into r84;
    add r83 r84 into r85;
    set r85 into state[3u8];
    cast 0u64 0u32 into r86 as unbond_state;
    get.or_use credits.aleo/unbonding[r79] r86 into r87;
    cast r87.microcredits into r88 as field;
    get state[4u8] into r89;
    add r88 r89 into r90;
    set r90 into state[4u8];
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
    cast r1 into r2 as Config;
    set r2 into config[0u8];




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

