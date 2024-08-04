import staking_delegator_v1.aleo;
import spectre_multisig_v1.aleo;

program staking_delegator_multisig_v1.aleo {
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

    const ActionBond: u8 = 0u8;

    struct ValidatorAmount {
        action: u8,
        validator: address,
        amount: u64,
    }

    async transition bond(
        public validator: address,
        public amount: u64,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(ValidatorAmount {action: ActionBond, validator, amount});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_delegator_v1.aleo/bond(validator, amount);

        return finalize(f1, f2);
    }

    async function finalize(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }
}
