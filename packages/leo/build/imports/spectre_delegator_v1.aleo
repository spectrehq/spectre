import spectre_access_control_v1.aleo;
import spectre_acl_manager_v1.aleo;
import credits.aleo;
import spectre_stcredits_v1.aleo;
program spectre_delegator_v1.aleo;


struct metadata:
    name as u128;
    symbol as u64;
    decimals as u8;




function register:
    input r0 as u32.public;
    input r1 as address.public;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.caller into r2;
    call spectre_stcredits_v1.aleo/register_delegator r0 r1 into r3;
    async register r2 r3 into r4;
    output r4 as spectre_delegator_v1.aleo/register.future;

finalize register:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as spectre_stcredits_v1.aleo/register_delegator.future;
    await r0;
    await r1;




function bond:
    input r0 as u32.public;
    input r1 as address.public;
    input r2 as u64.public;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.caller into r3;
    cast spectre_stcredits_v1.aleo into r4 as address;
    call credits.aleo/bond_public r1 r4 r2 into r5;
    call spectre_stcredits_v1.aleo/notify_bond r0 r1 r2 into r6;
    async bond r3 r5 r6 into r7;
    output r7 as spectre_delegator_v1.aleo/bond.future;

finalize bond:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as credits.aleo/bond_public.future;
    input r2 as spectre_stcredits_v1.aleo/notify_bond.future;
    await r0;
    await r1;
    await r2;

