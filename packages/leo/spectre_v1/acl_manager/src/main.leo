import spectre_access_control_v1.aleo;

program spectre_acl_manager_v1.aleo {
    const STAKING_ADMIN_ROLE: u8 = 1u8;
    const STAKING_OPERATOR_ROLE: u8 = 2u8;
    const POOL_ADMIN_ROLE: u8 = 3u8;
    const EMERGENCY_ADMIN_ROLE: u8 = 4u8;
    const RISK_ADMIN_ROLE: u8 = 5u8;
    const ASSET_LISTING_ADMIN_ROLE: u8 = 6u8;

    async transition only_staking_admin(public admin: address) -> Future {
        let f: Future = spectre_access_control_v1.aleo/check_role(STAKING_ADMIN_ROLE, admin);
        return finalize_only_staking_admin(f);
    }

    async function finalize_only_staking_admin(f: Future) {
        f.await();
    }

    async transition only_staking_operator(public operator: address) -> Future {
        let f: Future = spectre_access_control_v1.aleo/check_role(STAKING_OPERATOR_ROLE, operator);
        return finalize_only_staking_operator(f);
    }

    async function finalize_only_staking_operator(f: Future) {
        f.await();
    }

    async transition only_pool_admin(public admin: address) -> Future {
        let f: Future = spectre_access_control_v1.aleo/check_role(POOL_ADMIN_ROLE, admin);
        return finalize_only_pool_admin(f);
    }

    async function finalize_only_pool_admin(f: Future) {
        f.await();
    }

    async transition only_emergency_admin(public admin: address) -> Future {
        let f: Future = spectre_access_control_v1.aleo/check_role(EMERGENCY_ADMIN_ROLE, admin);
        return finalize_only_emergency_admin(f);
    }

    async function finalize_only_emergency_admin(f: Future) {
        f.await();
    }

    async transition only_risk_admin(public admin: address) -> Future {
        let f: Future = spectre_access_control_v1.aleo/check_role(RISK_ADMIN_ROLE, admin);
        return finalize_only_risk_admin(f);
    }

    async function finalize_only_risk_admin(f: Future) {
        f.await();
    }

    async transition only_asset_listing_admin(public admin: address) -> Future {
        let f: Future = spectre_access_control_v1.aleo/check_role(ASSET_LISTING_ADMIN_ROLE, admin);
        return finalize_only_asset_listing_admin(f);
    }

    async function finalize_only_asset_listing_admin(f: Future) {
        f.await();
    }
}
