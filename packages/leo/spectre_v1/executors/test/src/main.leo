import spectre_acl_manager_v1.aleo;
import spectre_test_token.aleo;
import spectre_pool_v1.aleo;

program spectre_test_token_executor_v1.aleo {
    async transition supply(public amount: u64, public on_behalf_of: address) -> Future {
        // Transfer tokens from the caller to the executor.
        // Note: The caller must have approved the executor to transfer tokens on its behalf.
        let f1: Future = spectre_test_token.aleo/transfer_from_public(self.caller, spectre_test_token_executor_v1.aleo as address, amount);

        let f2: Future = spectre_pool_v1.aleo/supply(spectre_test_token.aleo as address, amount, on_behalf_of);

        return finalize_supply(f1, f2);
    }

    async function finalize_supply(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }

    async transition withdraw(public amount: u64, public to: address) -> Future {
        let f1: Future = spectre_test_token.aleo/transfer_public(to, amount);

        let f2: Future = spectre_pool_v1.aleo/withdraw(spectre_test_token.aleo as address, amount, to);

        return finalize_withdraw(f1, f2);
    }

    async function finalize_withdraw(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }

    async transition rescue_tokens(public receiver: address, public amount: u64) -> Future {
        let f1: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.caller);
        let f2: Future = spectre_test_token.aleo/transfer_public(receiver, amount);
        return finalize_rescue_tokens(f1, f2);
    }

    async function finalize_rescue_tokens(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }
}
