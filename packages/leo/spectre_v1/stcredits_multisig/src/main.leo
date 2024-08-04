import staking_stcredits_v1.aleo;
import spectre_multisig_v1.aleo;

program staking_stcredits_multisig_v1.aleo {
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

    const ActionInitialize: u8 = 0u8;
    const ActionRegisterDelegator: u8 = 1u8;
    const ActionUnregisterDelegator: u8 = 2u8;
    const ActionUnbond: u8 = 3u8;
    const ActionResolveWithdrawalForce: u8 = 4u8;
    const ActionCache: u8 = 5u8;
    const ActionSetTreasury: u8 = 6u8;
    const ActionSetProtocolFee: u8 = 7u8;
    const ActionPause: u8 = 8u8;
    const ActionUnpause: u8 = 9u8;
    const ActionRescueTokens: u8 = 10u8;

    struct Initialize {
        action: u8,
    }

    struct RegisterDelegator {
        action: u8,
        delegator: address,
        validator: address,
    }

    struct UnregisterDelegator {
        action: u8,
        delegator: address,
    }

    struct Unbond {
        action: u8,
        delegator: address,
        amount: u64,
    }

    struct ResolveWithdrawalForce {
        action: u8,
        credits: u64,
        height: u32,
    }

    struct Cache {
        action: u8,
        start: u32,
    }

    struct SetTreasury {
        action: u8,
        treasury: address,
    }

    struct SetProtocolFee {
        action: u8,
        fee: u8,
    }

    struct Pause {
        action: u8,
    }

    struct Unpause {
        action: u8,
    }

    struct RescueTokens {
        action: u8,
        receiver: address,
        amount: u64,
    }

    async transition initialize(
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(Initialize {action: ActionInitialize});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/initialize();

        return finalize(f1, f2);
    }

    async transition register_delegator(
        public delegator: address,
        public validator: address,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(RegisterDelegator {action: ActionRegisterDelegator, delegator, validator});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/register_delegator(delegator, validator);

        return finalize(f1, f2);
    }

    async transition unregister_delegator(
        public delegator: address,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(UnregisterDelegator {action: ActionUnregisterDelegator, delegator});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/unregister_delegator(delegator);

        return finalize(f1, f2);
    }

    async transition unbond(
        public delegator: address,
        public amount: u64,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(Unbond {action: ActionUnbond, delegator, amount});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/unbond(delegator, amount);

        return finalize(f1, f2);
    }

    async transition resolve_withdrawal_force(
        public credits: u64,
        public height: u32,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(ResolveWithdrawalForce {action: ActionResolveWithdrawalForce, credits, height});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/resolve_withdrawal_force(credits, height);

        return finalize(f1, f2);
    }

    async transition cache(
        public start: u32,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(Cache {action: ActionCache, start});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/cache(start);

        return finalize(f1, f2);
    }

    async transition set_treasury(
        public treasury: address,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(SetTreasury {action: ActionSetTreasury, treasury});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/set_treasury(treasury);

        return finalize(f1, f2);
    }

    async transition set_protocol_fee(
        public fee: u8,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(SetProtocolFee {action: ActionSetProtocolFee, fee});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/set_protocol_fee(fee);

        return finalize(f1, f2);
    }

    async transition pause(
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(Pause {action: ActionPause});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/pause();

        return finalize(f1, f2);
    }

    async transition unpause(
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(Unpause {action: ActionUnpause});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/unpause();

        return finalize(f1, f2);
    }

    async transition rescue_tokens(
        public receiver: address,
        public amount: u64,
        public approvers: [address; 10],
    ) -> Future {
        let data_hash: field = BHP256::hash_to_field(RescueTokens {action: ActionRescueTokens, receiver, amount});
        let f1: Future = spectre_multisig_v1.aleo/execute_10(self.address as field, approvers, data_hash);

        let f2: Future = staking_stcredits_v1.aleo/rescue_tokens(receiver, amount);

        return finalize(f1, f2);
    }

    async function finalize(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }
}
