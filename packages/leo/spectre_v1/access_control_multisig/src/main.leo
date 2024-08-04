import spectre_access_control_v1.aleo;
import spectre_multisig_v1.aleo;

program spectre_ac_multisig_v1.aleo {
    async transition setup(
        public all_owners: [address; 3],
        public owner_count: u8,
        public threshold: u8,
    ) -> Future {
        let f: Future = spectre_multisig_v1.aleo/setup(
            self.address as field,
            all_owners,
            owner_count,
            threshold,
            0u16, // not used
        );

        return finalize_setup(f);
    }

    async function finalize_setup(f: Future) {
        f.await();
    }

    const ActionSetRoleAdmin: u8 = 0u8;
    const ActionGrantRole: u8 = 1u8;
    const ActionRevokeRole: u8 = 2u8;
    const ActionRenounceRole: u8 = 3u8;

    struct RoleAdminRole {
        action: u8,
        role: u8,
        admin_role: u8,
    }

    struct RoleAccount {
        action: u8,
        role: u8,
        account: address,
    }

    async transition set_role_admin(
        public role: u8,
        public admin_role: u8,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(RoleAdminRole {action: ActionSetRoleAdmin, role, admin_role});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = spectre_access_control_v1.aleo/set_role_admin(role, admin_role);

        return finalize(f1, f2);
    }

    async transition grant_role(
        public role: u8,
        public account: address,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(RoleAccount {action: ActionGrantRole, role, account});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = spectre_access_control_v1.aleo/grant_role(role, account);

        return finalize(f1, f2);
    }

    async transition revoke_role(
        public role: u8,
        public account: address,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(RoleAccount {action: ActionRevokeRole, role, account});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = spectre_access_control_v1.aleo/revoke_role(role, account);

        return finalize(f1, f2);
    }

    async transition renounce_role(
        public role: u8,
        public account: address,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(RoleAccount {action: ActionRenounceRole, role, account});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = spectre_access_control_v1.aleo/renounce_role(role, account);

        return finalize(f1, f2);
    }

    async function finalize(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }
}
