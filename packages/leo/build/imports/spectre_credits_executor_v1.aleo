import spectre_access_control_v1.aleo;
import spectre_acl_manager_v1.aleo;
import credits.aleo;
import spectre_pool_v1.aleo;
program spectre_credits_executor_v1.aleo;


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



function supply:
    input r0 as u64.public;
    input r1 as address.public;
    cast spectre_credits_executor_v1.aleo into r2 as address;
    call credits.aleo/transfer_public_as_signer r2 r0 into r3;
    cast spectre_test_token.aleo into r4 as address;
    call spectre_pool_v1.aleo/supply r4 r0 r1 into r5;
    async supply r3 r5 into r6;
    output r6 as spectre_credits_executor_v1.aleo/supply.future;

finalize supply:
    input r0 as credits.aleo/transfer_public_as_signer.future;
    input r1 as spectre_pool_v1.aleo/supply.future;
    await r0;
    await r1;




function withdraw:
    input r0 as u64.public;
    input r1 as address.public;
    call credits.aleo/transfer_public r1 r0 into r2;
    cast spectre_test_token.aleo into r3 as address;
    call spectre_pool_v1.aleo/withdraw r3 r0 r1 into r4;
    async withdraw r2 r4 into r5;
    output r5 as spectre_credits_executor_v1.aleo/withdraw.future;

finalize withdraw:
    input r0 as credits.aleo/transfer_public.future;
    input r1 as spectre_pool_v1.aleo/withdraw.future;
    await r0;
    await r1;




function rescue_tokens:
    input r0 as address.public;
    input r1 as u64.public;
    call spectre_acl_manager_v1.aleo/only_pool_admin self.caller into r2;
    call credits.aleo/transfer_public r0 r1 into r3;
    async rescue_tokens r2 r3 into r4;
    output r4 as spectre_credits_executor_v1.aleo/rescue_tokens.future;

finalize rescue_tokens:
    input r0 as spectre_acl_manager_v1.aleo/only_pool_admin.future;
    input r1 as credits.aleo/transfer_public.future;
    await r0;
    await r1;

