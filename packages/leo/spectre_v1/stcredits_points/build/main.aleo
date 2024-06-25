import credits.aleo;
import spectre_access_control_v1.aleo;
import spectre_acl_manager_v1.aleo;
import spectre_stcredits_v1.aleo;
program spectre_stcredits_points_v1.aleo;


struct metadata:
    name as u128;
    symbol as u64;
    decimals as u8;


struct State:
    stcredits as u64;
    height as u32;


mapping total_supply:
	key as u8.public;
	value as u128.public;


mapping account:
	key as address.public;
	value as u128.public;


mapping states:
	key as address.public;
	value as State.public;


mapping paused:
	key as u8.public;
	value as boolean.public;


function pause:
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r0;
    async pause r0 into r1;
    output r1 as spectre_stcredits_points_v1.aleo/pause.future;

finalize pause:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    await r0;
    set true into paused[0u8];




function unpause:
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r0;
    async unpause r0 into r1;
    output r1 as spectre_stcredits_points_v1.aleo/unpause.future;

finalize unpause:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    await r0;
    set false into paused[0u8];




function settle:
    async settle self.caller into r0;
    output r0 as spectre_stcredits_points_v1.aleo/settle.future;

finalize settle:
    input r0 as address.public;
    get paused[0u8] into r1;
    not r1 into r2;
    assert.eq r2 true;
    get states[r0] into r3;
    cast r3.stcredits into r4 as u128;
    sub block.height r3.height into r5;
    cast r5 into r6 as u128;
    mul r4 r6 into r7;
    gt r7 0u128 into r8;
    branch.eq r8 false to end_then_0_0;
    get.or_use account[r0] 0u128 into r9;
    add r9 r7 into r10;
    set r10 into account[r0];
    get.or_use total_supply[0u8] 0u128 into r11;
    add r11 r7 into r12;
    set r12 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;
    cast r3.stcredits block.height into r13 as State;
    set r13 into states[r0];




function lock:
    input r0 as u64.public;
    cast spectre_stcredits_points_v1.aleo into r1 as address;
    call spectre_stcredits_v1.aleo/transfer_from_public self.signer r1 r0 into r2;
    async lock r2 self.signer r0 into r3;
    output r3 as spectre_stcredits_points_v1.aleo/lock.future;

finalize lock:
    input r0 as spectre_stcredits_v1.aleo/transfer_from_public.future;
    input r1 as address.public;
    input r2 as u64.public;
    await r0;
    get paused[0u8] into r3;
    not r3 into r4;
    assert.eq r4 true;
    cast 0u64 0u32 into r5 as State;
    get.or_use states[r1] r5 into r6;
    cast r6.stcredits into r7 as u128;
    sub block.height r6.height into r8;
    cast r8 into r9 as u128;
    mul r7 r9 into r10;
    gt r10 0u128 into r11;
    branch.eq r11 false to end_then_0_2;
    get.or_use account[r1] 0u128 into r12;
    add r12 r10 into r13;
    set r13 into account[r1];
    get.or_use total_supply[0u8] 0u128 into r14;
    add r14 r10 into r15;
    set r15 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;
    add r6.stcredits r2 into r16;
    cast r16 block.height into r17 as State;
    set r17 into states[r1];




function unlock:
    input r0 as u64.public;
    call spectre_stcredits_v1.aleo/transfer_public self.signer r0 into r1;
    async unlock r1 self.signer r0 into r2;
    output r2 as spectre_stcredits_points_v1.aleo/unlock.future;

finalize unlock:
    input r0 as spectre_stcredits_v1.aleo/transfer_public.future;
    input r1 as address.public;
    input r2 as u64.public;
    await r0;
    get paused[0u8] into r3;
    not r3 into r4;
    assert.eq r4 true;
    get states[r1] into r5;
    cast r5.stcredits into r6 as u128;
    sub block.height r5.height into r7;
    cast r7 into r8 as u128;
    mul r6 r8 into r9;
    gt r9 0u128 into r10;
    branch.eq r10 false to end_then_0_4;
    get.or_use account[r1] 0u128 into r11;
    add r11 r9 into r12;
    set r12 into account[r1];
    get.or_use total_supply[0u8] 0u128 into r13;
    add r13 r9 into r14;
    set r14 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_5;
    position end_then_0_4;
    position end_otherwise_0_5;
    sub r5.stcredits r2 into r15;
    cast r15 block.height into r16 as State;
    gt r16.stcredits 0u64 into r17;
    branch.eq r17 false to end_then_0_6;
    set r16 into states[r1];
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    remove states[r1];
    position end_otherwise_0_7;

