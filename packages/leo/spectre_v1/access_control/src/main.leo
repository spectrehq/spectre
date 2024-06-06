program spectre_access_control_v1.aleo {
    struct grant {
        account: address,
        role: u8,
    }

    mapping grants: field => bool; // hash(grant) => true

    mapping role_admins: u8 => u8; // role => admin role

    const DEFAULT_ADMIN_ROLE: u8 = 0u8;

    inline hash(role: u8, account: address) -> field {
        return BHP256::hash_to_field(grant {account, role});
    }

    async transition check_role(role: u8, account: address) -> Future {
        return finalize_check_role(role, account);
    }

    async function finalize_check_role(role: u8, account: address) {
        assert(Mapping::contains(grants, hash(role, account)));
    }

    async transition check_role_admin(role: u8, account: address) -> Future {
        return finalize_check_role_admin(role, account);
    }

    async function finalize_check_role_admin(role: u8, account: address) {
        let admin_role: u8 = Mapping::get_or_use(role_admins, role, DEFAULT_ADMIN_ROLE);
        assert(Mapping::contains(grants, hash(admin_role, account)));
    }

    async transition grant_role(role: u8, account: address) -> Future {
        return finalize_grant_role(role, account, self.caller);
    }

    async function finalize_grant_role(role: u8, account: address, caller: address) {
        let admin_role: u8 = Mapping::get_or_use(role_admins, role, DEFAULT_ADMIN_ROLE);
        assert(Mapping::contains(grants, hash(admin_role, caller)));
    }
}
