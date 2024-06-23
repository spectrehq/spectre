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


mapping state:
	key as u8.public;
	value as field.public;


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
    cast 110909517301300533074857324275280078190u128 357896115028u64 6u8 into r0 as metadata;
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
    async add_validator r0 into r1;
    output r1 as spectre_stcredits_v1.aleo/add_validator.future;

finalize add_validator:
    input r0 as address.public;
    get state[2u8] into r1;
    cast r1 into r2 as u32;
    is.neq block.height r2 into r3;
    assert.eq r3 true;
    cast 0u64 true into r4 as committee_state;
    get.or_use credits.aleo/committee[r0] r4 into r5;
    assert.eq r5.is_open true;
    contains validator_delegators[r0] into r6;
    not r6 into r7;
    assert.eq r7 true;
    get.or_use validators_count[0u8] 0u32 into r8;
    set r0 into validators[r8];
    add r8 1u32 into r9;
    set r9 into validators_count[0u8];
    set aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc into validator_delegators[r0];




function remove_validator:
    input r0 as u32.public;
    input r1 as address.public;
    async remove_validator r0 r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/remove_validator.future;

finalize remove_validator:
    input r0 as u32.public;
    input r1 as address.public;
    get state[2u8] into r2;
    cast r2 into r3 as u32;
    is.neq block.height r3 into r4;
    assert.eq r4 true;
    get validators[r0] into r5;
    assert.eq r5 r1;
    get validator_delegators[r1] into r6;
    contains delegators[r6] into r7;
    assert.eq r7 true;
    cast r1 0u64 into r8 as bond_state;
    get.or_use credits.aleo/bonded[r6] r8 into r9;
    cast 0u64 0u32 into r10 as unbond_state;
    get.or_use credits.aleo/unbonding[r6] r10 into r11;
    is.eq r9.microcredits 0u64 into r12;
    is.eq r11.microcredits 0u64 into r13;
    and r12 r13 into r14;
    assert.eq r14 true;
    get.or_use validators_count[0u8] 0u32 into r15;
    gte r15 1u32 into r16;
    assert.eq r16 true;
    sub r15 1u32 into r17;
    is.neq r0 r17 into r18;
    branch.eq r18 false to end_then_0_0;
    sub r15 1u32 into r19;
    get validators[r19] into r20;
    set r20 into validators[r0];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;
    sub r15 1u32 into r21;
    set r21 into validators_count[0u8];
    sub r15 1u32 into r22;
    remove validators[r22];
    remove validator_delegators[r1];
    remove delegators[r6];




function register_delegator:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as address.public;
    assert.eq r2 self.caller;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.signer into r3;
    async register_delegator r3 r0 r1 r2 into r4;
    output r4 as spectre_stcredits_v1.aleo/register_delegator.future;

finalize register_delegator:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as u32.public;
    input r2 as address.public;
    input r3 as address.public;
    await r0;
    get state[2u8] into r4;
    cast r4 into r5 as u32;
    is.neq block.height r5 into r6;
    assert.eq r6 true;
    get validators[r1] into r7;
    assert.eq r7 r2;
    get validator_delegators[r2] into r8;
    assert.eq r8 aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;
    contains delegators[r3] into r9;
    not r9 into r10;
    assert.eq r10 true;
    set r3 into validator_delegators[r2];
    set true into delegators[r3];




function bond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as address.public;
    input r3 as u64.public;
    assert.eq r2 self.caller;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.signer into r4;
    call credits.aleo/transfer_public r2 r3 into r5;
    async bond r4 r5 r0 r1 self.caller r3 into r6;
    output r6 as spectre_stcredits_v1.aleo/bond.future;

finalize bond:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as credits.aleo/transfer_public.future;
    input r2 as u32.public;
    input r3 as address.public;
    input r4 as address.public;
    input r5 as u64.public;
    await r0;
    await r1;
    get state[2u8] into r6;
    cast r6 into r7 as u32;
    is.neq block.height r7 into r8;
    assert.eq r8 true;
    get validators[r2] into r9;
    assert.eq r9 r3;
    get validator_delegators[r3] into r10;
    assert.eq r10 r4;
    cast spectre_stcredits_v1.aleo into r11 as address;
    get.or_use credits.aleo/account[r11] 0u64 into r12;
    cast r12 into r13 as field;
    get.or_use state[0u8] 0field into r14;
    get.or_use state[1u8] 0field into r15;
    cast r5 into r16 as field;
    sub r13 r14 into r17;
    sub r17 r15 into r18;
    lte r16 r18 into r19;
    assert.eq r19 true;




function unbond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as address.private;
    input r3 as u64.public;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.caller into r4;
    call credits.aleo/unbond_public r3 into r5;
    async unbond r4 r5 r0 r1 r2 r3 into r6;
    output r6 as spectre_stcredits_v1.aleo/unbond.future;

finalize unbond:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as credits.aleo/unbond_public.future;
    input r2 as u32.public;
    input r3 as address.public;
    input r4 as address.public;
    input r5 as u64.public;
    await r0;
    await r1;
    get state[2u8] into r6;
    cast r6 into r7 as u32;
    is.neq block.height r7 into r8;
    assert.eq r8 true;
    get validators[r2] into r9;
    assert.eq r9 r3;
    get validator_delegators[r3] into r10;
    assert.eq r10 r4;




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
    get state[2u8] into r4;
    cast r4 into r5 as u32;
    is.neq block.height r5 into r6;
    assert.eq r6 true;
    get validators[r1] into r7;
    assert.eq r7 r2;
    get validator_delegators[r2] into r8;
    assert.eq r8 r3;




function resolve_withdrawal:
    async resolve_withdrawal into r0;
    output r0 as spectre_stcredits_v1.aleo/resolve_withdrawal.future;

finalize resolve_withdrawal:
    cast 0field 0field into r0 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r0 into r1;
    sub r1.end r1.start into r2;
    lte r2 0field into r3;
    branch.eq r3 false to end_then_0_2;
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;
    get pending_queue[r1.start] into r4;
    get pending_withdraws[r4] into r5;
    is.eq r5.index r1.start into r6;
    assert.eq r6 true;
    gt r5.amount 0field into r7;
    assert.eq r7 true;
    cast spectre_stcredits_v1.aleo into r8 as address;
    get.or_use credits.aleo/account[r8] 0u64 into r9;
    cast r9 into r10 as field;
    get.or_use state[0u8] 0field into r11;
    sub r10 r11 into r12;
    lt r12 r5.amount into r13;
    branch.eq r13 false to end_then_0_4;
    branch.eq true true to end_otherwise_0_5;
    position end_then_0_4;
    position end_otherwise_0_5;
    add r1.start 1field into r14;
    cast r14 r1.end into r15 as QueueStartEnd;
    set r15 into pending_queue_start_end[0u8];
    remove pending_queue[r1.start];
    remove pending_withdraws[r4];
    cast 0field 0u32 into r16 as Withdraw;
    get.or_use withdraws[r4] r16 into r17;
    add r17.amount r5.amount into r18;
    add block.height 360u32 into r19;
    cast r18 r19 into r20 as Withdraw;
    set r20 into withdraws[r4];
    get.or_use state[1u8] 0field into r21;
    sub r21 r5.amount into r22;
    set r22 into state[1u8];
    add r11 r5.amount into r23;
    set r23 into state[0u8];
    cast 0field 0field into r24 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r24 into r25;
    sub r25.end r25.start into r26;
    lte r26 0field into r27;
    branch.eq r27 false to end_then_0_6;
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    position end_otherwise_0_7;
    get pending_queue[r25.start] into r28;
    get pending_withdraws[r28] into r29;
    is.eq r29.index r25.start into r30;
    assert.eq r30 true;
    gt r29.amount 0field into r31;
    assert.eq r31 true;
    cast spectre_stcredits_v1.aleo into r32 as address;
    get.or_use credits.aleo/account[r32] 0u64 into r33;
    cast r33 into r34 as field;
    get.or_use state[0u8] 0field into r35;
    sub r34 r35 into r36;
    lt r36 r29.amount into r37;
    branch.eq r37 false to end_then_0_8;
    branch.eq true true to end_otherwise_0_9;
    position end_then_0_8;
    position end_otherwise_0_9;
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
    get.or_use state[1u8] 0field into r45;
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
    async supply r3 self.caller r4 into r5;
    output r5 as spectre_stcredits_v1.aleo/supply.future;

finalize supply:
    input r0 as credits.aleo/transfer_public_as_signer.future;
    input r1 as address.public;
    input r2 as field.public;
    await r0;
    get.or_use validators_count[0u8] 0u32 into r3;
    get state[2u8] into r4;
    cast r4 into r5 as u32;
    assert.eq block.height r5;
    get state[3u8] into r6;
    cast r6 into r7 as u32;
    assert.eq r3 r7;
    get state[4u8] into r8;
    cast spectre_stcredits_v1.aleo into r9 as address;
    get.or_use credits.aleo/account[r9] 0u64 into r10;
    cast r10 into r11 as field;
    get state[5u8] into r12;
    get state[0u8] into r13;
    get state[1u8] into r14;
    add r8 r11 into r15;
    add r15 r12 into r16;
    sub r16 r13 into r17;
    sub r17 r14 into r18;
    get.or_use total_supply[0u8] 0u64 into r19;
    cast r19 into r20 as field;
    gt r18 0field into r21;
    ternary r21 r18 1field into r22;
    gt r20 0field into r23;
    ternary r23 r20 1field into r24;
    mul r2 r24 into r25;
    div r25 r22 into r26;
    get.or_use account[r1] 0u64 into r27;
    cast r26 into r28 as u64;
    add r27 r28 into r29;
    set r29 into account[r1];
    add r20 r26 into r30;
    cast r30 into r31 as u64;
    set r31 into total_supply[0u8];






function withdraw:
    input r0 as u64.public;
    cast r0 into r1 as field;
    async withdraw self.caller r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/withdraw.future;

finalize withdraw:
    input r0 as address.public;
    input r1 as field.public;
    get.or_use validators_count[0u8] 0u32 into r2;
    get state[2u8] into r3;
    cast r3 into r4 as u32;
    assert.eq block.height r4;
    get state[3u8] into r5;
    cast r5 into r6 as u32;
    assert.eq r2 r6;
    get state[4u8] into r7;
    cast spectre_stcredits_v1.aleo into r8 as address;
    get.or_use credits.aleo/account[r8] 0u64 into r9;
    cast r9 into r10 as field;
    get state[5u8] into r11;
    get state[0u8] into r12;
    get state[1u8] into r13;
    add r7 r10 into r14;
    add r14 r11 into r15;
    sub r15 r12 into r16;
    sub r16 r13 into r17;
    get.or_use total_supply[0u8] 0u64 into r18;
    cast r18 into r19 as field;
    gt r17 0field into r20;
    ternary r20 r17 1field into r21;
    gt r19 0field into r22;
    ternary r22 r19 1field into r23;
    mul r1 r21 into r24;
    div r24 r23 into r25;
    get.or_use account[r0] 0u64 into r26;
    cast r1 into r27 as u64;
    sub r26 r27 into r28;
    set r28 into account[r0];
    sub r19 r1 into r29;
    cast r29 into r30 as u64;
    set r30 into total_supply[0u8];
    sub r10 r12 into r31;
    contains withdraws[r0] into r32;
    not r32 into r33;
    branch.eq r33 false to end_then_0_10;
    gte r31 r25 into r34;
    branch.eq r34 false to end_then_1_12;
    add r12 r25 into r35;
    set r35 into state[0u8];
    add block.height 360u32 into r36;
    cast r25 r36 into r37 as Withdraw;
    set r37 into withdraws[r0];
    branch.eq true true to end_otherwise_1_13;
    position end_then_1_12;
    add r12 r31 into r38;
    set r38 into state[0u8];
    position end_otherwise_1_13;
    branch.eq true true to end_otherwise_0_11;
    position end_then_0_10;
    position end_otherwise_0_11;
    not r32 into r39;
    sub r25 r31 into r40;
    ternary r39 r40 r25 into r41;
    cast 0field 0field into r42 as QueueStartEnd;
    get.or_use pending_queue_start_end[0u8] r42 into r43;
    contains pending_withdraws[r0] into r44;
    not r44 into r45;
    branch.eq r45 false to end_then_0_14;
    set r0 into pending_queue[r43.end];
    add r43.end 1field into r46;
    cast r43.start r46 into r47 as QueueStartEnd;
    set r47 into pending_queue_start_end[0u8];
    cast r41 r43.end into r48 as PendingWithdraw;
    set r48 into pending_withdraws[r0];
    branch.eq true true to end_otherwise_0_15;
    position end_then_0_14;
    get pending_withdraws[r0] into r49;
    gte r49.index r43.start into r50;
    lt r49.index r43.end into r51;
    and r50 r51 into r52;
    assert.eq r52 true;
    sub r43.end 1field into r53;
    is.neq r49.index r53 into r54;
    branch.eq r54 false to end_then_1_16;
    get pending_queue[r53] into r55;
    get pending_withdraws[r55] into r56;
    set r55 into pending_queue[r49.index];
    set r0 into pending_queue[r53];
    cast r56.amount r49.index into r57 as PendingWithdraw;
    set r57 into pending_withdraws[r55];
    branch.eq true true to end_otherwise_1_17;
    position end_then_1_16;
    position end_otherwise_1_17;
    add r49.amount r41 into r58;
    cast r58 r53 into r59 as PendingWithdraw;
    set r59 into pending_withdraws[r0];
    position end_otherwise_0_15;
    get.or_use state[1u8] 0field into r60;
    add r60 r41 into r61;
    set r61 into state[1u8];




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
    get withdraws[r1] into r3;
    lte r3.height block.height into r4;
    assert.eq r4 true;
    assert.eq r3.amount r2;
    remove withdraws[r1];




function cache_total_bonded_unbonding:
    input r0 as u32.public;
    input r1 as u32.public;
    async cache_total_bonded_unbonding r0 r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/cache_total_bonded_unbonding.future;

finalize cache_total_bonded_unbonding:
    input r0 as u32.public;
    input r1 as u32.public;
    is.eq r0 0u32 into r2;
    branch.eq r2 false to end_then_0_18;
    cast block.height into r3 as field;
    set r3 into state[2u8];
    set 0field into state[3u8];
    set 0field into state[4u8];
    set 0field into state[5u8];
    branch.eq true true to end_otherwise_0_19;
    position end_then_0_18;
    position end_otherwise_0_19;
    get state[2u8] into r4;
    cast r4 into r5 as u32;
    assert.eq block.height r5;
    get state[3u8] into r6;
    cast r6 into r7 as u32;
    assert.eq r0 r7;
    get.or_use validators_count[0u8] 0u32 into r8;
    add r0 r1 into r9;
    lte r9 r8 into r10;
    assert.eq r10 true;
    lte r1 5u32 into r11;
    assert.eq r11 true;
    add r0 r1 into r12;
    cast r12 into r13 as field;
    set r13 into state[3u8];
    add r0 0u32 into r14;
    lt r14 r8 into r15;
    branch.eq r15 false to end_then_0_20;
    get validators[r14] into r16;
    get validator_delegators[r16] into r17;
    cast r16 0u64 into r18 as bond_state;
    get.or_use credits.aleo/bonded[r17] r18 into r19;
    cast r19.microcredits into r20 as field;
    get state[4u8] into r21;
    add r20 r21 into r22;
    set r22 into state[4u8];
    cast 0u64 0u32 into r23 as unbond_state;
    get.or_use credits.aleo/unbonding[r17] r23 into r24;
    cast r24.microcredits into r25 as field;
    get state[5u8] into r26;
    add r25 r26 into r27;
    set r27 into state[5u8];
    branch.eq true true to end_otherwise_0_21;
    position end_then_0_20;
    position end_otherwise_0_21;
    add r0 1u32 into r28;
    lt r28 r8 into r29;
    branch.eq r29 false to end_then_0_22;
    get validators[r28] into r30;
    get validator_delegators[r30] into r31;
    cast r30 0u64 into r32 as bond_state;
    get.or_use credits.aleo/bonded[r31] r32 into r33;
    cast r33.microcredits into r34 as field;
    get state[4u8] into r35;
    add r34 r35 into r36;
    set r36 into state[4u8];
    cast 0u64 0u32 into r37 as unbond_state;
    get.or_use credits.aleo/unbonding[r31] r37 into r38;
    cast r38.microcredits into r39 as field;
    get state[5u8] into r40;
    add r39 r40 into r41;
    set r41 into state[5u8];
    branch.eq true true to end_otherwise_0_23;
    position end_then_0_22;
    position end_otherwise_0_23;
    add r0 2u32 into r42;
    lt r42 r8 into r43;
    branch.eq r43 false to end_then_0_24;
    get validators[r42] into r44;
    get validator_delegators[r44] into r45;
    cast r44 0u64 into r46 as bond_state;
    get.or_use credits.aleo/bonded[r45] r46 into r47;
    cast r47.microcredits into r48 as field;
    get state[4u8] into r49;
    add r48 r49 into r50;
    set r50 into state[4u8];
    cast 0u64 0u32 into r51 as unbond_state;
    get.or_use credits.aleo/unbonding[r45] r51 into r52;
    cast r52.microcredits into r53 as field;
    get state[5u8] into r54;
    add r53 r54 into r55;
    set r55 into state[5u8];
    branch.eq true true to end_otherwise_0_25;
    position end_then_0_24;
    position end_otherwise_0_25;
    add r0 3u32 into r56;
    lt r56 r8 into r57;
    branch.eq r57 false to end_then_0_26;
    get validators[r56] into r58;
    get validator_delegators[r58] into r59;
    cast r58 0u64 into r60 as bond_state;
    get.or_use credits.aleo/bonded[r59] r60 into r61;
    cast r61.microcredits into r62 as field;
    get state[4u8] into r63;
    add r62 r63 into r64;
    set r64 into state[4u8];
    cast 0u64 0u32 into r65 as unbond_state;
    get.or_use credits.aleo/unbonding[r59] r65 into r66;
    cast r66.microcredits into r67 as field;
    get state[5u8] into r68;
    add r67 r68 into r69;
    set r69 into state[5u8];
    branch.eq true true to end_otherwise_0_27;
    position end_then_0_26;
    position end_otherwise_0_27;
    add r0 4u32 into r70;
    lt r70 r8 into r71;
    branch.eq r71 false to end_then_0_28;
    get validators[r70] into r72;
    get validator_delegators[r72] into r73;
    cast r72 0u64 into r74 as bond_state;
    get.or_use credits.aleo/bonded[r73] r74 into r75;
    cast r75.microcredits into r76 as field;
    get state[4u8] into r77;
    add r76 r77 into r78;
    set r78 into state[4u8];
    cast 0u64 0u32 into r79 as unbond_state;
    get.or_use credits.aleo/unbonding[r73] r79 into r80;
    cast r80.microcredits into r81 as field;
    get state[5u8] into r82;
    add r81 r82 into r83;
    set r83 into state[5u8];
    branch.eq true true to end_otherwise_0_29;
    position end_then_0_28;
    position end_otherwise_0_29;

