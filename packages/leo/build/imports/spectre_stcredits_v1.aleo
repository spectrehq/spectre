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

struct WithdrawRequest:
    amount as field;
    height as u32;
    validator as address;


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


mapping user_requests_counts:
	key as address.public;
	value as u32.public;


mapping user_requests:
	key as field.public;
	value as WithdrawRequest.public;


mapping validator_requests_count:
	key as u8.public;
	value as u32.public;


mapping validator_requests:
	key as u32.public;
	value as WithdrawRequest.public;


mapping validators_count:
	key as u8.public;
	value as u32.public;


mapping validators:
	key as u32.public;
	value as address.public;


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
    cast 0u64 true into r1 as committee_state;
    get.or_use credits.aleo/committee[r0] r1 into r2;
    assert.eq r2.is_open true;
    contains validator_delegators[r0] into r3;
    not r3 into r4;
    assert.eq r4 true;
    get.or_use validators_count[0u8] 0u32 into r5;
    set r0 into validators[r5];
    add r5 1u32 into r6;
    set r6 into validators_count[0u8];
    set aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc into validator_delegators[r0];




function remove_validator:
    input r0 as u32.public;
    input r1 as address.public;
    async remove_validator r0 r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/remove_validator.future;

finalize remove_validator:
    input r0 as u32.public;
    input r1 as address.public;
    get validators[r0] into r2;
    assert.eq r2 r1;
    contains validator_delegators[r1] into r3;
    assert.eq r3 true;
    get.or_use validators_count[0u8] 0u32 into r4;
    gte r4 1u32 into r5;
    assert.eq r5 true;
    sub r4 1u32 into r6;
    is.neq r0 r6 into r7;
    branch.eq r7 false to end_then_0_0;
    sub r4 1u32 into r8;
    get validators[r8] into r9;
    set r9 into validators[r0];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;
    sub r4 1u32 into r10;
    set r10 into validators_count[0u8];
    remove validator_delegators[r1];




function register_delegator:
    input r0 as u32.public;
    input r1 as address.public;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.signer into r2;
    async register_delegator r2 r0 r1 self.caller into r3;
    output r3 as spectre_stcredits_v1.aleo/register_delegator.future;

finalize register_delegator:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as u32.public;
    input r2 as address.public;
    input r3 as address.public;
    await r0;
    get validators[r1] into r4;
    assert.eq r4 r2;
    get validator_delegators[r2] into r5;
    assert.eq r5 aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;
    set r3 into validator_delegators[r2];




function notify_bond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as u64.public;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.signer into r3;
    async notify_bond r3 r0 r1 self.caller r2 into r4;
    output r4 as spectre_stcredits_v1.aleo/notify_bond.future;

finalize notify_bond:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as u32.public;
    input r2 as address.public;
    input r3 as address.public;
    input r4 as u64.public;
    await r0;
    get validators[r1] into r5;
    assert.eq r5 r2;
    get validator_delegators[r2] into r6;
    assert.eq r6 r3;






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
    get state[4u8] into r4;
    cast r4 into r5 as u32;
    assert.eq block.height r5;
    get state[5u8] into r6;
    cast r6 into r7 as u32;
    assert.eq r3 r7;
    get state[6u8] into r8;
    get state[0u8] into r9;
    get state[1u8] into r10;
    add r8 r9 into r11;
    sub r11 r10 into r12;
    get.or_use total_supply[0u8] 0u64 into r13;
    cast r13 into r14 as field;
    gt r12 0field into r15;
    ternary r15 r12 1field into r16;
    gt r14 0field into r17;
    ternary r17 r14 1field into r18;
    mul r2 r18 into r19;
    div r19 r16 into r20;
    get.or_use account[r1] 0u64 into r21;
    cast r20 into r22 as u64;
    add r21 r22 into r23;
    set r23 into account[r1];
    add r14 r20 into r24;
    cast r24 into r25 as u64;
    set r25 into total_supply[0u8];
    add r9 r2 into r26;
    set r26 into state[0u8];




function cache_validators_bonded:
    input r0 as u32.public;
    input r1 as u32.public;
    async cache_validators_bonded r0 r1 into r2;
    output r2 as spectre_stcredits_v1.aleo/cache_validators_bonded.future;

finalize cache_validators_bonded:
    input r0 as u32.public;
    input r1 as u32.public;
    is.eq r0 0u32 into r2;
    branch.eq r2 false to end_then_0_2;
    cast block.height into r3 as field;
    set r3 into state[4u8];
    set 0field into state[5u8];
    set 0field into state[6u8];
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;
    get state[4u8] into r4;
    cast r4 into r5 as u32;
    assert.eq block.height r5;
    get state[5u8] into r6;
    cast r6 into r7 as u32;
    assert.eq r0 r7;
    sub r1 r0 into r8;
    assert.eq r8 4u32;
    cast r1 into r9 as field;
    set r9 into state[5u8];
    get.or_use validators_count[0u8] 0u32 into r10;
    add r0 0u32 into r11;
    lt r11 r10 into r12;
    branch.eq r12 false to end_then_0_4;
    get validators[r11] into r13;
    get validator_delegators[r13] into r14;
    cast r13 0u64 into r15 as bond_state;
    get.or_use credits.aleo/bonded[r14] r15 into r16;
    cast r16.microcredits into r17 as field;
    get state[6u8] into r18;
    add r17 r18 into r19;
    set r19 into state[6u8];
    branch.eq true true to end_otherwise_0_5;
    position end_then_0_4;
    position end_otherwise_0_5;
    add r0 1u32 into r20;
    lt r20 r10 into r21;
    branch.eq r21 false to end_then_0_6;
    get validators[r20] into r22;
    get validator_delegators[r22] into r23;
    cast r22 0u64 into r24 as bond_state;
    get.or_use credits.aleo/bonded[r23] r24 into r25;
    cast r25.microcredits into r26 as field;
    get state[6u8] into r27;
    add r26 r27 into r28;
    set r28 into state[6u8];
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    position end_otherwise_0_7;
    add r0 2u32 into r29;
    lt r29 r10 into r30;
    branch.eq r30 false to end_then_0_8;
    get validators[r29] into r31;
    get validator_delegators[r31] into r32;
    cast r31 0u64 into r33 as bond_state;
    get.or_use credits.aleo/bonded[r32] r33 into r34;
    cast r34.microcredits into r35 as field;
    get state[6u8] into r36;
    add r35 r36 into r37;
    set r37 into state[6u8];
    branch.eq true true to end_otherwise_0_9;
    position end_then_0_8;
    position end_otherwise_0_9;
    add r0 3u32 into r38;
    lt r38 r10 into r39;
    branch.eq r39 false to end_then_0_10;
    get validators[r38] into r40;
    get validator_delegators[r40] into r41;
    cast r40 0u64 into r42 as bond_state;
    get.or_use credits.aleo/bonded[r41] r42 into r43;
    cast r43.microcredits into r44 as field;
    get state[6u8] into r45;
    add r44 r45 into r46;
    set r46 into state[6u8];
    branch.eq true true to end_otherwise_0_11;
    position end_then_0_10;
    position end_otherwise_0_11;

