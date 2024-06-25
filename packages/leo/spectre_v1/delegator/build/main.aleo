import spectre_access_control_v1.aleo;
import spectre_acl_manager_v1.aleo;
import credits.aleo;
import spectre_stcredits_v1.aleo;
program spectre_delegator_v1.aleo;


struct metadata:
    name as u128;
    symbol as u64;
    decimals as u8;




function bond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as u64.public;
    call spectre_acl_manager_v1.aleo/only_staking_operator self.caller into r3;
    cast spectre_delegator_v1.aleo into r4 as address;
    call spectre_stcredits_v1.aleo/bond r0 r1 r4 r2 into r5;
    cast spectre_stcredits_v1.aleo into r6 as address;
    call credits.aleo/bond_public r1 r6 r2 into r7;
    async bond r3 r5 r7 into r8;
    output r8 as spectre_delegator_v1.aleo/bond.future;

finalize bond:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_operator.future;
    input r1 as spectre_stcredits_v1.aleo/bond.future;
    input r2 as credits.aleo/bond_public.future;
    await r0;
    await r1;
    await r2;




function register:
    input r0 as u32.public;
    input r1 as address.public;
    call spectre_acl_manager_v1.aleo/only_staking_admin self.caller into r2;
    cast spectre_delegator_v1.aleo into r3 as address;
    call spectre_stcredits_v1.aleo/register_delegator r0 r1 r3 into r4;
    async register r2 r4 into r5;
    output r5 as spectre_delegator_v1.aleo/register.future;

finalize register:
    input r0 as spectre_acl_manager_v1.aleo/only_staking_admin.future;
    input r1 as spectre_stcredits_v1.aleo/register_delegator.future;
    await r0;
    await r1;

