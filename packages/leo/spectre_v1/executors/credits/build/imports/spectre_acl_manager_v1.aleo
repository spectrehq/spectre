import spectre_access_control_v1.aleo;
program spectre_acl_manager_v1.aleo;




function only_pool_admin:
    input r0 as address.public;
    call spectre_access_control_v1.aleo/check_role 1u8 r0 into r1;
    async only_pool_admin r1 into r2;
    output r2 as spectre_acl_manager_v1.aleo/only_pool_admin.future;

finalize only_pool_admin:
    input r0 as spectre_access_control_v1.aleo/check_role.future;
    await r0;




function only_emergency_admin:
    input r0 as address.public;
    call spectre_access_control_v1.aleo/check_role 2u8 r0 into r1;
    async only_emergency_admin r1 into r2;
    output r2 as spectre_acl_manager_v1.aleo/only_emergency_admin.future;

finalize only_emergency_admin:
    input r0 as spectre_access_control_v1.aleo/check_role.future;
    await r0;




function only_risk_admin:
    input r0 as address.public;
    call spectre_access_control_v1.aleo/check_role 3u8 r0 into r1;
    async only_risk_admin r1 into r2;
    output r2 as spectre_acl_manager_v1.aleo/only_risk_admin.future;

finalize only_risk_admin:
    input r0 as spectre_access_control_v1.aleo/check_role.future;
    await r0;




function only_asset_listing_admin:
    input r0 as address.public;
    call spectre_access_control_v1.aleo/check_role 4u8 r0 into r1;
    async only_asset_listing_admin r1 into r2;
    output r2 as spectre_acl_manager_v1.aleo/only_asset_listing_admin.future;

finalize only_asset_listing_admin:
    input r0 as spectre_access_control_v1.aleo/check_role.future;
    await r0;

