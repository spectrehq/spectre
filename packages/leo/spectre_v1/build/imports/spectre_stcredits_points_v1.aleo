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


function settle:
    async settle self.caller into r0;
    output r0 as spectre_stcredits_points_v1.aleo/settle.future;

finalize settle:
    input r0 as address.public;
    get states[r0] into r1;
    cast r1.stcredits into r2 as u128;
    sub block.height r1.height into r3;
    cast r3 into r4 as u128;
    mul r2 r4 into r5;
    gt r5 0u128 into r6;
    branch.eq r6 false to end_then_0_0;
    get.or_use account[r0] 0u128 into r7;
    add r7 r5 into r8;
    set r8 into account[r0];
    get.or_use total_supply[0u8] 0u128 into r9;
    add r9 r5 into r10;
    set r10 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_1;
    position end_then_0_0;
    position end_otherwise_0_1;
    cast r1.stcredits block.height into r11 as State;
    set r11 into states[r0];




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
    cast 0u64 0u32 into r3 as State;
    get.or_use states[r1] r3 into r4;
    cast r4.stcredits into r5 as u128;
    sub block.height r4.height into r6;
    cast r6 into r7 as u128;
    mul r5 r7 into r8;
    gt r8 0u128 into r9;
    branch.eq r9 false to end_then_0_2;
    get.or_use account[r1] 0u128 into r10;
    add r10 r8 into r11;
    set r11 into account[r1];
    get.or_use total_supply[0u8] 0u128 into r12;
    add r12 r8 into r13;
    set r13 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_3;
    position end_then_0_2;
    position end_otherwise_0_3;
    add r4.stcredits r2 into r14;
    cast r14 block.height into r15 as State;
    set r15 into states[r1];




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
    get states[r1] into r3;
    cast r3.stcredits into r4 as u128;
    sub block.height r3.height into r5;
    cast r5 into r6 as u128;
    mul r4 r6 into r7;
    gt r7 0u128 into r8;
    branch.eq r8 false to end_then_0_4;
    get.or_use account[r1] 0u128 into r9;
    add r9 r7 into r10;
    set r10 into account[r1];
    get.or_use total_supply[0u8] 0u128 into r11;
    add r11 r7 into r12;
    set r12 into total_supply[0u8];
    branch.eq true true to end_otherwise_0_5;
    position end_then_0_4;
    position end_otherwise_0_5;
    sub r3.stcredits r2 into r13;
    cast r13 block.height into r14 as State;
    gt r14.stcredits 0u64 into r15;
    branch.eq r15 false to end_then_0_6;
    set r14 into states[r1];
    branch.eq true true to end_otherwise_0_7;
    position end_then_0_6;
    remove states[r1];
    position end_otherwise_0_7;

