import credits.aleo;
import spectre_acl_manager_v1.aleo;
import spectre_stcredits_v1.aleo;

program spectre_delegator_v1.aleo {
    async transition register(public validator_index: u32, public validator: address) -> Future {
        let f1: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.caller);

        let f2: Future = spectre_stcredits_v1.aleo/register_delegator(validator_index, validator, spectre_delegator_v1.aleo as address);

        return finalize_register(f1, f2);
    }

    async function finalize_register(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }

    async transition bond(public validator_index: u32, public validator: address, public amount: u64) -> Future {
        let f1: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.caller);

        let f2: Future = spectre_stcredits_v1.aleo/bond(validator_index, validator, spectre_delegator_v1.aleo as address, amount);

        let f3: Future = credits.aleo/bond_public(validator, spectre_stcredits_v1.aleo as address, amount);

        return finalize_bond(f1, f2, f3);
    }

    async function finalize_bond(f1: Future, f2: Future, f3: Future) {
        f1.await();
        f2.await();
        f3.await();
    }
}
