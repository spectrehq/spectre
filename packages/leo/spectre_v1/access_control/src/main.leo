program spectre_access_control_v1.aleo {
    struct grant {
        account: address,
        role: u8,
    }

    mapping grants: field => bool; // hash(grant) => true

    mapping role_admins: u8 => u8; // role => admin role

    mapping initialized: u8 => bool; // 0u8 => initialized

    const DEFAULT_ADMIN_ROLE: u8 = 0u8;

    // The initial admin.
    // Note: it should be set to the address of the deployer before deployment.
    const INITIAL_ADMIN: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

    async transition initialize() -> Future {
        assert_eq(self.caller, INITIAL_ADMIN);

        return finalize_initialize(self.caller);
    }

    async function finalize_initialize(caller: address) {
        // Initialize only once.
        assert(!Mapping::contains(initialized, 0u8));
        Mapping::set(initialized, 0u8, true);

        // Grant the default admin role to the caller.
        Mapping::set(grants, hash(DEFAULT_ADMIN_ROLE, caller), true);
    }

    inline hash(role: u8, account: address) -> field {
        return BHP256::hash_to_field(grant {account, role});
    }

    async transition only_role(public role: u8) -> Future {
        return finalize_check_role(role, self.caller);
    }

    async transition check_role(public role: u8, public account: address) -> Future {
        return finalize_check_role(role, account);
    }

    async function finalize_check_role(role: u8, account: address) {
        assert(Mapping::contains(grants, hash(role, account)));
    }

    async transition check_role_admin(public role: u8, public account: address) -> Future {
        return finalize_check_role_admin(role, account);
    }

    async function finalize_check_role_admin(role: u8, account: address) {
        let admin_role: u8 = Mapping::get_or_use(role_admins, role, DEFAULT_ADMIN_ROLE);
        assert(Mapping::contains(grants, hash(admin_role, account)));
    }

    async transition set_role_admin(public role: u8, public admin_role: u8) -> Future {
        return finalize_set_role_admin(role, admin_role, self.caller);
    }

    async function finalize_set_role_admin(role: u8, admin_role: u8, caller: address) {
        assert(Mapping::contains(grants, hash(DEFAULT_ADMIN_ROLE, caller)));

        let previous_admin_role: u8 = Mapping::get_or_use(role_admins, role, DEFAULT_ADMIN_ROLE);
        if (previous_admin_role != admin_role) {
            Mapping::set(role_admins, role, admin_role);
        }
    }

    async transition grant_role(public role: u8, public account: address) -> Future {
        return finalize_grant_role(role, account, self.caller);
    }

    async function finalize_grant_role(role: u8, account: address, caller: address) {
        let admin_role: u8 = Mapping::get_or_use(role_admins, role, DEFAULT_ADMIN_ROLE);
        assert(Mapping::contains(grants, hash(admin_role, caller)));

        let hash: field = hash(role, account);
        if (!Mapping::contains(grants, hash)) {
            Mapping::set(grants, hash, true);
        }
    }

    async transition revoke_role(public role: u8, public account: address) -> Future {
        return finalize_revoke_role(role, account, self.caller);
    }

    async function finalize_revoke_role(role: u8, account: address, caller: address) {
        let admin_role: u8 = Mapping::get_or_use(role_admins, role, DEFAULT_ADMIN_ROLE);
        assert(Mapping::contains(grants, hash(admin_role, caller)));

        let hash: field = hash(role, account);
        if (Mapping::contains(grants, hash)) {
            Mapping::remove(grants, hash);
        }
    }

    async transition renounce_role(public role: u8, public account: address) -> Future {
        assert_eq(account, self.caller);

        return finalize_renounce_role(role, account);
    }

    async function finalize_renounce_role(role: u8, account: address) {
        let hash: field = hash(role, account);
        if (Mapping::contains(grants, hash)) {
            Mapping::remove(grants, hash);
        }
    }
}
