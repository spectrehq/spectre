import credits.aleo;
import spectre_acl_manager_v1.aleo;
import staking_stcredits_v1.aleo;

program staking_delegator_v1.aleo {
    transition get_address() -> address {
        return self.address;
    }

    async transition bond(public validator: address, public amount: u64) -> Future {
        let f1: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.caller);

        let f2: Future = staking_stcredits_v1.aleo/bond(self.address, validator, amount);

        let f3: Future = credits.aleo/bond_public(validator, staking_stcredits_v1.aleo as address, amount);

        return finalize_bond(f1, f2, f3);
    }

    async function finalize_bond(f1: Future, f2: Future, f3: Future) {
        f1.await();
        f2.await();
        f3.await();
    }
}
