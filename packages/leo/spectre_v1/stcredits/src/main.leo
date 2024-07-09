import credits.aleo;
import spectre_acl_manager_v1.aleo;

program spectre_stcredits_v1.aleo {
    /************************* stCredits Token *************************/

    struct metadata {
        name: u128, // 16 bytes -> 16 characters with ASCII encoding
        symbol: u64, // 8 bytes -> 8 characters with ASCII encoding
        decimals: u8,
    }

    mapping total_supply: u8 => u64; // 0u8 => total_supply

    mapping account: address => u64;

    record token {
        owner: address,
        amount: u64,
    }

    struct approval {
        approver: address,
        spender: address,
    }

    mapping approvals: field => u64;

    transition get_metadata() -> metadata {
        return metadata {
            name: 8319383754638649716u128, // "stcredit" -> 0x7374637265646974 -> 8319383754638649716
            symbol: 8319383754638649716u64, // "stcredit" -> 0x7374637265646974 -> 8319383754638649716
            decimals: 6u8,
        };
    }

    /* Approve & Transfer from */

    async transition approve_public(public spender: address, public amount: u64) -> Future {
        return finalize_approve_public(BHP256::hash_to_field(approval {approver: self.caller, spender}), amount);
    }

    async function finalize_approve_public(hash: field, amount: u64) {
        // If approvals for approval field exists, the approved amount is increased.
        // Otherwise, the approved allowance is created.
        let approval_amount : u64 = Mapping::get_or_use(approvals, hash, 0u64);
        Mapping::set(approvals, hash, approval_amount + amount);
    }

    async transition unapprove_public(public spender: address, public amount: u64) -> Future {
        return finalize_unapprove_public(BHP256::hash_to_field(approval {approver: self.caller, spender}), amount);
    }

    async function finalize_unapprove_public(hash: field, amount: u64) {
        let approval_amount : u64 = Mapping::get(approvals, hash);
        Mapping::set(approvals, hash, approval_amount - amount);
    }

    async transition transfer_from_public(public approver: address, public receiver: address, public amount: u64) -> Future {
        return finalize_transfer_from_public(BHP256::hash_to_field(approval {approver, spender: self.caller}), approver, receiver, amount);
    }

    async function finalize_transfer_from_public(hash: field, approver: address, receiver: address, amount: u64) {
        // Decrease the approved amount.
        let approval_amount : u64 = Mapping::get(approvals, hash);
        Mapping::set(approvals, hash, approval_amount - amount);
        // Decrements `account[approver]` by `amount`.
        // If `account[approver] - amount` underflows, `transfer_from_public` is reverted.
        let approver_amount: u64 = Mapping::get(account, approver);
        Mapping::set(account, approver, approver_amount - amount);
        // Increments `account[receiver]` by `amount`.
        // If `account[receiver]` does not exist, it will be created.
        // If `account[receiver] + amount` overflows, `transfer_from_public` is reverted.
        let receiver_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
        Mapping::set(account, receiver, receiver_amount + amount);
    }

    /* Transfer */

    async transition transfer_public(public receiver: address, public amount: u64) -> Future {
        // Transfer the tokens publicly, by invoking the computation on-chain.
        return finalize_transfer_public(self.caller, receiver, amount);
    }

    async function finalize_transfer_public(public sender: address, public receiver: address, public amount: u64) {
        // Decrements `account[sender]` by `amount`.
        // If `account[sender]` does not exist, it will be created.
        // If `account[sender] - amount` underflows, `transfer_public` is reverted.
        let sender_amount: u64 = Mapping::get_or_use(account, sender, 0u64);
        Mapping::set(account, sender, sender_amount - amount);
        // Increments `account[receiver]` by `amount`.
        // If `account[receiver]` does not exist, it will be created.
        // If `account[receiver] + amount` overflows, `transfer_public` is reverted.
        let receiver_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
        Mapping::set(account, receiver, receiver_amount + amount);
    }

    // The function `transfer_private` sends the specified token amount to the token receiver from the specified token record.
    transition transfer_private(sender: token, receiver: address, amount: u64) -> (token, token) {
        // Checks the given token record has sufficient balance.
        // This `sub` operation is safe, and the proof will fail if an overflow occurs.
        // `difference` holds the change amount to be returned to sender.
        let difference: u64 = sender.amount - amount;

        // Produce a token record with the change amount for the sender.
        let remaining: token = token {
            owner: sender.owner,
            amount: difference,
        };

        // Produce a token record for the specified receiver.
        let transferred: token = token {
            owner: receiver,
            amount: amount,
        };

        // Output the sender's change record and the receiver's record.
        return (remaining, transferred);
    }

    // The function `transfer_private_to_public` turns a specified token amount from a token record into public tokens for the specified receiver.
    // This function preserves privacy for the sender's record, however it publicly reveals the token receiver and the token amount.
    async transition transfer_private_to_public(sender: token, public receiver: address, public amount: u64) -> (token, Future) {
        // Checks the given token record has a sufficient token amount.
        // This `sub` operation is safe, and the proof will fail if an underflow occurs.
        // `difference` holds the change amount for the caller.
        let difference: u64 = sender.amount - amount;

        // Produces a token record with the change amount for the caller.
        let remaining: token = token {
            owner: sender.owner,
            amount: difference,
        };

        // Output the sender's change record.
        // Increment the token amount publicly for the token receiver.
        return (remaining, finalize_transfer_private_to_public(receiver, amount));
    }

    async function finalize_transfer_private_to_public(public receiver: address, public amount: u64) {
        // Increments `account[receiver]` by `amount`.
        // If `account[receiver]` does not exist, it will be created.
        // If `account[receiver] + amount` overflows, `transfer_private_to_public` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
        Mapping::set(account, receiver, current_amount + amount);
    }

    // The function `transfer_public_to_private` turns a specified token amount from `account` into a token record for the specified receiver.
    // This function preserves privacy for the receiver's record, however it publicly reveals the caller and the specified token amount.
    async transition transfer_public_to_private(public receiver: address, public amount: u64) -> (token, Future) {
        // Produces a token record for the token receiver.
        let transferred: token = token {
            owner: receiver,
            amount: amount,
        };

        // Output the receiver's record.
        // Decrement the token amount of the caller publicly.
        return (transferred, finalize_transfer_public_to_private(self.caller, amount));
    }

    async function finalize_transfer_public_to_private(public sender: address, public amount: u64) {
        // Decrements `account[sender]` by `amount`.
        // If `account[sender]` does not exist, it will be created.
        // If `account[sender] - amount` underflows, `transfer_public_to_private` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account, sender, 0u64);
        Mapping::set(account, sender, current_amount - amount);
    }

    /************************* Supply/Withdraw credits & Validator Staking *************************/

    const WITHDRAW_DELAY: u32 = 360u32; // should be consistent with the delay in the credtis.aleo

    const CACHE_BATCH_NUM: u32 = 10u32;

    struct Config {
        initialized: bool,
        treasury: address,
        paused: bool,
    }

    mapping config: u8 => Config; // 0u8 => config

    const TOTAL_WITHDRAW_KEY: u8 = 0u8; // total withdrawal in credits
    const TOTAL_PENDING_WITHDRAW_KEY: u8 = 1u8; // total pending withdrawal in credits
    const TOTAL_BONDED_KEY: u8 = 2u8; // total bonded credits (it may have some lag)
    const TOTAL_UNBONDING_KEY: u8 = 3u8; // total unbonding credits (it may have some lag)
    const PROTOCOL_FEE_KEY: u8 = 4u8; // protocol fee in percents.

    mapping state: u8 => field; // index key => value

    const CACHE_STATE_INVALID: u8 = 0u8;
    const CACHE_STATE_IN_PROGRESS: u8 = 1u8;
    const CACHE_STATE_VALID: u8 = 2u8;

    struct CacheState {
        state: u8,
        height: u32, // the start height or finished height
        total_bonded: field,
        total_unbonding: field,
        next_index: u32, // the index of the next validator for caching
    }

    mapping cache_state: u8 => CacheState; // 0u8 => cache state

    struct Withdraw {
        amount: field, // credits
        pending: bool, // whether the withdraw is pending
        height: u32, // block height at which the withdraw can be claimed or the pending withdraw **may** be claimed
    }

    mapping withdraws: address => Withdraw; // user => withdraw

    mapping pending_resolved: u8 => u32; // 0u8 => block height of the last resolved

    mapping validators_count: u8 => u32; // 0u8 => count of validators

    mapping validators: u32 => address; // index => validator

    mapping delegators: address => bool; // delegator => true

    mapping validator_delegators: address => address; // selected legitimate validators and their delegators we assign to

    mapping validator_bonded: address => u64; // validator => bonded credits

    async transition initialize() -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_initialize(f, self.caller);
    }

    async function finalize_initialize(f: Future, admin: address) {
        f.await();

        // Ensure the program is not initialized.
        assert(!Mapping::get_or_use(config, 0u8, Config {
            initialized: false,
            treasury: aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc,
            paused: false,
        }).initialized);

        // Initialize the config.
        Mapping::set(config, 0u8, Config {initialized: true, treasury: admin, paused: true});
        // Initialize the state.
        Mapping::set(state, TOTAL_WITHDRAW_KEY, 0field);
        Mapping::set(state, TOTAL_PENDING_WITHDRAW_KEY, 0field);
        Mapping::set(state, TOTAL_BONDED_KEY, 0field);
        Mapping::set(state, TOTAL_UNBONDING_KEY, 0field);
        Mapping::set(state, PROTOCOL_FEE_KEY, 0field); // 0%
        // Initialize the cache state.
        Mapping::set(cache_state, 0u8, CacheState {state: CACHE_STATE_INVALID, height: 0u32, total_bonded: 0field, total_unbonding: 0field, next_index: 0u32});
        // Initialize the pending resolved.
        Mapping::set(pending_resolved, 0u8, 0u32);
        // Initialize the validators count.
        Mapping::set(validators_count, 0u8, 0u32);
    }

    async transition add_validator(public validator: address) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_add_validator(f, validator);
    }

    async function finalize_add_validator(f: Future, validator: address) {
        f.await();

        // Invalidate the cache state.
        Mapping::set(cache_state, 0u8, CacheState {state: CACHE_STATE_INVALID, height: 0u32, total_bonded: 0field, total_unbonding: 0field, next_index: 0u32});

        let validator_state: committee_state = Mapping::get_or_use(
            credits.aleo/committee, validator,
            // If the validator is not in the committee, the default state is open with zero commission.
            committee_state {is_open: true, commission: 0u8},
        );
        assert(validator_state.is_open);

        // Ensure the validator is not in the set.
        assert(!Mapping::contains(validator_delegators, validator));

        // Add the validator to the validators set,
        // and use the zero address as the delegator.
        let count: u32 = Mapping::get(validators_count, 0u8);
        Mapping::set(validators_count, 0u8, count + 1u32);
        Mapping::set(validators, count, validator);
        Mapping::set(validator_delegators, validator, aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc);
    }

    async transition remove_validator(public validator_index: u32, public validator: address) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_remove_validator(f, validator_index, validator);
    }

    async function finalize_remove_validator(f: Future, validator_index: u32, validator: address) {
        f.await();

        // Invalidate the cache state.
        Mapping::set(cache_state, 0u8, CacheState {state: CACHE_STATE_INVALID, height: 0u32, total_bonded: 0field, total_unbonding: 0field, next_index: 0u32});

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);

        let delegator: address = Mapping::get(validator_delegators, validator);
        assert(Mapping::contains(delegators, delegator) || delegator == aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc);
        // Ensure we have neither bonding nor unbonding in the validator.
        {
            let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
            assert(bonded.validator == validator);
            let unbonding: unbond_state = Mapping::get_or_use(credits.aleo/unbonding, delegator, unbond_state {microcredits: 0u64, height: 0u32});
            assert(bonded.microcredits == 0u64 && unbonding.microcredits == 0u64);
        }

        let count: u32 = Mapping::get(validators_count, 0u8);
        assert(count >= 1u32);

        // If the removed validator is not the last one,
        // swap it with the last validator.
        if (validator_index != count - 1u32) {
            let last_validator: address = Mapping::get(validators, count - 1u32);
            Mapping::set(validators, validator_index, last_validator);
        }

        // Remove the validator.
        Mapping::set(validators_count, 0u8, count - 1u32);
        Mapping::remove(validators, count - 1u32);
        Mapping::remove(validator_delegators, validator);
        Mapping::remove(delegators, delegator);
    }

    /**
     * This function will be called by the delegator program to register itself as one delegator of the validator.
     */
    async transition register_delegator(public validator_index: u32, public validator: address, public delegator: address) -> Future {
        // Ensure the delegator is the caller.
        assert_eq(delegator, self.caller);

        // Check `self.signer` to ensure the delegator is called by the signer.
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.signer);

        return finalize_register_delegator(f, validator_index, validator, delegator);
    }

    async function finalize_register_delegator(f: Future, validator_index: u32, validator: address, delegator: address) {
        f.await();

        // Invalidate the cache state.
        Mapping::set(cache_state, 0u8, CacheState {state: CACHE_STATE_INVALID, height: 0u32, total_bonded: 0field, total_unbonding: 0field, next_index: 0u32});

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);
        // Ensure the delegator has not been set.
        assert_eq(Mapping::get(validator_delegators, validator), aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc);
        // Ensure one delegator can only be registered once.
        assert(!Mapping::contains(delegators, delegator));

        Mapping::set(validator_delegators, validator, delegator);
        Mapping::set(delegators, delegator, true);
    }

    /**
     * This function will be called by the delegator program to bond credits to the validator.
     */
    async transition bond(public validator_index: u32, public validator: address, public delegator: address, public amount: u64) -> Future {
        // Ensure the delegator is the caller.
        assert_eq(delegator, self.caller);

        // Check `self.signer` to ensure the delegator is called by the signer.
        let f1: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.signer);

        // Transfer `amount` credits to the `delegator` program.
        let f2: Future = credits.aleo/transfer_public(delegator, amount);

        return finalize_bond(f1, f2, validator_index, validator, self.caller, amount);
    }

    async function finalize_bond(f1: Future, f2: Future, validator_index: u32, validator: address, delegator: address, amount: u64) {
        f1.await();
        f2.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Check cache is finished and then invalidate it.
        assert_eq(Mapping::get(cache_state, 0u8).state, CACHE_STATE_VALID);
        Mapping::set(cache_state, 0u8, CacheState {state: CACHE_STATE_INVALID, height: 0u32, total_bonded: 0field, total_unbonding: 0field, next_index: 0u32});

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);
        assert_eq(Mapping::get(validator_delegators, validator), delegator);

        // Only allow bond `amount` credits when the actual liquidity is sufficient.
        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_withdraw: field = Mapping::get(state, TOTAL_WITHDRAW_KEY);
        let total_pending_withdraw: field = Mapping::get(state, TOTAL_PENDING_WITHDRAW_KEY);
        assert(amount as field <= total_buffered - total_withdraw - total_pending_withdraw);

        // Protocol fee.
        {
            let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
            assert(bonded.validator == validator);
            let last_bonded: u64 = Mapping::get_or_use(validator_bonded, validator, 0u64);

            let reward: u64 = bonded.microcredits - last_bonded;
            let protocol_fee: field = reward as field * Mapping::get(state, PROTOCOL_FEE_KEY) / 100field;

            if (protocol_fee > 0field) {
                let total_bonded: field = Mapping::get(state, TOTAL_BONDED_KEY);
                let total_unbonding: field = Mapping::get(state, TOTAL_UNBONDING_KEY);

                let total_pooled: field = total_bonded + total_buffered + total_unbonding - total_withdraw - total_pending_withdraw;

                let total_stcredits_supply: field = Mapping::get_or_use(total_supply, 0u8, 0u64) as field;

                // Mint stcredits
                let stcredits: field = getStCreditsFromCredits(protocol_fee, total_pooled, total_stcredits_supply);
                let treasury: address = Mapping::get(config, 0u8).treasury;
                Mapping::set(account, treasury, Mapping::get_or_use(account, treasury, 0u64) + stcredits as u64);
                Mapping::set(total_supply, 0u8, (total_stcredits_supply + stcredits) as u64);
            }

            // Record the updated bonded credits.
            Mapping::set(validator_bonded, validator, bonded.microcredits + amount);
        }
    }

    /**
     * This function will be called by the operator to unbond credits from the validator.
     * It will serve either for the users to withdraw credits or for rebalancing bonding between the validators.
     * The `amount` should be calculated offline.
     */
    async transition unbond(public validator_index: u32, public validator: address, delegator: address, public amount: u64) -> Future {
        // Check the caller is the operator.
        let f1: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.caller);

        let f2: Future = credits.aleo/unbond_public(delegator, amount);

        return finalize_unbond(f1, f2, validator_index, validator, delegator, amount);
    }

    async function finalize_unbond(f1: Future, f2: Future, validator_index: u32, validator: address, delegator: address, amount: u64) {
        f1.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Check cache is finished and then invalidate it.
        assert_eq(Mapping::get(cache_state, 0u8).state, CACHE_STATE_VALID);
        Mapping::set(cache_state, 0u8, CacheState {state: CACHE_STATE_INVALID, height: 0u32, total_bonded: 0field, total_unbonding: 0field, next_index: 0u32});

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);
        assert_eq(Mapping::get(validator_delegators, validator), delegator);

        // Protocol fee.
        {
            let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
            assert(bonded.validator == validator);
            let last_bonded: u64 = Mapping::get_or_use(validator_bonded, validator, 0u64);

            let reward: u64 = bonded.microcredits - last_bonded;
            let protocol_fee: field = reward as field * Mapping::get(state, PROTOCOL_FEE_KEY) / 100field;

            if (protocol_fee > 0field) {
                let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
                let total_bonded: field = Mapping::get(state, TOTAL_BONDED_KEY);
                let total_unbonding: field = Mapping::get(state, TOTAL_UNBONDING_KEY);
                let total_withdraw: field = Mapping::get(state, TOTAL_WITHDRAW_KEY);
                let total_pending_withdraw: field = Mapping::get(state, TOTAL_PENDING_WITHDRAW_KEY);

                let total_pooled: field = total_bonded + total_buffered + total_unbonding - total_withdraw - total_pending_withdraw;

                let total_stcredits_supply: field = Mapping::get_or_use(total_supply, 0u8, 0u64) as field;

                // Mint stcredits
                let stcredits: field = getStCreditsFromCredits(protocol_fee, total_pooled, total_stcredits_supply);
                let treasury: address = Mapping::get(config, 0u8).treasury;
                Mapping::set(account, treasury, Mapping::get_or_use(account, treasury, 0u64) + stcredits as u64);
                Mapping::set(total_supply, 0u8, (total_stcredits_supply + stcredits) as u64);
            }
        }

        // Wait for `credits.aleo/unbond_public` finished.
        f2.await();

        // Record the updated bonded credits.
        let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
        Mapping::set(validator_bonded, validator, bonded.microcredits);
    }

    /**
     * This function can be called by anyone to claim unbonded credits from the validator.
     * It will fail if the unbonding does not exist or the unbonding height is not reached.
     */
    async transition claim_unbond(public validator_index: u32, public validator: address, delegator: address) -> Future {
        let f: Future = credits.aleo/claim_unbond_public(delegator);

        return finalize_claim_unbond(f, validator_index, validator, delegator);
    }

    async function finalize_claim_unbond(f: Future, validator_index: u32, validator: address, delegator: address) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Invalidate the cache state.
        Mapping::set(cache_state, 0u8, CacheState {state: CACHE_STATE_INVALID, height: 0u32, total_bonded: 0field, total_unbonding: 0field, next_index: 0u32});

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);
        assert_eq(Mapping::get(validator_delegators, validator), delegator);
    }

    /**
     * This function can be called by anyone to resolve the pending withdrawals.
     */
    async transition resolve_withdrawal() -> Future {
        return finalize_resolve_withdrawal();
    }

    async function finalize_resolve_withdrawal() {
        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_withdraw: field = Mapping::get(state, TOTAL_WITHDRAW_KEY);
        let total_pending_withdraw: field = Mapping::get(state, TOTAL_PENDING_WITHDRAW_KEY);

        assert(total_buffered >= total_withdraw + total_pending_withdraw);

        Mapping::set(state, TOTAL_WITHDRAW_KEY, total_withdraw + total_pending_withdraw);
        Mapping::set(state, TOTAL_PENDING_WITHDRAW_KEY, 0field);

        // Set the pending resolved height with the current block height.
        Mapping::set(pending_resolved, 0u8, block.height);
    }

    /**
     * This function can be called by the operator to resolve the pending withdrawals.
     */
    async transition resolve_withdrawal_force(public credits: u64, public height: u32) -> Future {
        // Check the caller is the operator.
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.caller);

        return finalize_resolve_withdrawal_force(f, credits as field, height);
    }

    async function finalize_resolve_withdrawal_force(f: Future, credits: field, height: u32) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_withdraw: field = Mapping::get(state, TOTAL_WITHDRAW_KEY);
        let total_pending_withdraw: field = Mapping::get(state, TOTAL_PENDING_WITHDRAW_KEY);

        assert(total_buffered >= total_withdraw + credits);

        Mapping::set(state, TOTAL_WITHDRAW_KEY, total_withdraw + credits);
        Mapping::set(state, TOTAL_PENDING_WITHDRAW_KEY, total_pending_withdraw - credits);

        // Check: last resolve height <= resolved height <= current height.
        let resolved_height: u32 = height > 0u32 ? height : block.height;
        assert(resolved_height >= Mapping::get(pending_resolved, 0u8) && resolved_height <= block.height);

        // Set the pending resolved height with the specified height.
        Mapping::set(pending_resolved, 0u8, resolved_height);
    }

    /**
     * Supply credits by user, to mint stcredits.
     */
    async transition supply(public credits: u64) -> Future {
        assert(credits > 0u64);

        let f1: Future = credits.aleo/transfer_public_as_signer(spectre_stcredits_v1.aleo as address, credits);

        return finalize_supply(f1, self.signer, credits as field);
    }

    async function finalize_supply(f1: Future, user: address, credits: field) {
        f1.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Check cache is finished and valid.
        assert_eq(Mapping::get(cache_state, 0u8).state, CACHE_STATE_VALID);

        // Total buffered equals to credits balance of this program.
        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_bonded: field = Mapping::get(state, TOTAL_BONDED_KEY);
        let total_unbonding: field = Mapping::get(state, TOTAL_UNBONDING_KEY);
        let total_withdraw: field = Mapping::get(state, TOTAL_WITHDRAW_KEY);
        let total_pending_withdraw: field = Mapping::get(state, TOTAL_PENDING_WITHDRAW_KEY);

        let total_pooled: field = total_bonded + total_buffered + total_unbonding - total_withdraw - total_pending_withdraw;

        let total_stcredits_supply: field = Mapping::get_or_use(total_supply, 0u8, 0u64) as field;

        // Mint stcredits
        let stcredits: field = getStCreditsFromCredits(credits, total_pooled, total_stcredits_supply);
        Mapping::set(account, user, Mapping::get_or_use(account, user, 0u64) + stcredits as u64);
        Mapping::set(total_supply, 0u8, (total_stcredits_supply + stcredits) as u64);
    }

    /**
     * Withdraw credits by user, to burn stcredits.
     */
    async transition withdraw(public stcredits: u64) -> Future {
        return finalize_withdraw(self.signer, stcredits as field);
    }

    async function finalize_withdraw(user: address, stcredits: field) {
        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Check cache is finished and valid.
        assert_eq(Mapping::get(cache_state, 0u8).state, CACHE_STATE_VALID);

        // Total buffered equals to credits balance of this program.
        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_bonded: field = Mapping::get(state, TOTAL_BONDED_KEY);
        let total_unbonding: field = Mapping::get(state, TOTAL_UNBONDING_KEY);
        let total_withdraw: field = Mapping::get(state, TOTAL_WITHDRAW_KEY);
        let total_pending_withdraw: field = Mapping::get(state, TOTAL_PENDING_WITHDRAW_KEY);

        let total_pooled: field = total_bonded + total_buffered + total_unbonding - total_withdraw - total_pending_withdraw;

        let total_stcredits_supply: field = Mapping::get_or_use(total_supply, 0u8, 0u64) as field;

        // Calculate credits to withdraw.
        let credits: field = getCreditsFromStCredits(stcredits, total_pooled, total_stcredits_supply);

        // Burn stcredits.
        Mapping::set(account, user, Mapping::get_or_use(account, user, 0u64) - stcredits as u64);
        Mapping::set(total_supply, 0u8, (total_stcredits_supply - stcredits) as u64);

        // Update total withdraw and total pending withdraw.
        let liquidity: field = total_buffered > total_withdraw + total_pending_withdraw ? total_buffered - total_withdraw - total_pending_withdraw : 0field;
        let withdraw_credits: field = liquidity >= credits ? credits : liquidity;
        let pending_credits: field = credits - withdraw_credits;
        Mapping::set(state, TOTAL_WITHDRAW_KEY, total_withdraw + withdraw_credits);
        Mapping::set(state, TOTAL_PENDING_WITHDRAW_KEY, total_pending_withdraw + pending_credits);

        // Update user withdraw.
        let withdraw: Withdraw = Mapping::get_or_use(withdraws, user, Withdraw {amount: 0field, pending: false, height: 0u32});
        Mapping::set(withdraws, user, Withdraw {
            amount: withdraw.amount + credits,
            pending: withdraw.pending || pending_credits > 0field,
            height: block.height + WITHDRAW_DELAY,
        });
    }

    /**
     * Claim credits by user.
     */
    async transition claim(public amount: u64) -> Future {
        let f: Future = credits.aleo/transfer_public(self.caller, amount);

        return finalize_claim(f, self.caller, amount as field);
    }

    async function finalize_claim(f: Future, user: address, amount: field) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        let resolved_height: u32 = Mapping::get(pending_resolved, 0u8);

        let withdraw: Withdraw = Mapping::get(withdraws, user);
        assert(withdraw.height <= (!withdraw.pending ? block.height : resolved_height));
        assert_eq(withdraw.amount, amount);

        Mapping::remove(withdraws, user);
        Mapping::set(state, TOTAL_WITHDRAW_KEY, Mapping::get(state, TOTAL_WITHDRAW_KEY) - amount);
    }

    /**
     * This function should be called several times to cache the total bonded/unbonding state.
     * The number of calls should be equal to: `ceil(validators_count / CACHE_BATCH_NUM)`.
     */
    async transition cache_total_bonded_unbonding(public start: u32) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.signer);

        return finalize_cache_total_bonded_unbonding(f, start);
    }

    async function finalize_cache_total_bonded_unbonding(f: Future, start: u32) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // If new cache flow.
        if (start == 0u32) {
            Mapping::set(cache_state, 0u8, CacheState {
                state: CACHE_STATE_IN_PROGRESS,
                height: block.height,
                total_bonded: 0field,
                total_unbonding: 0field,
                next_index: 0u32,
            });
        }

        // Check cache progress.
        {
            let cache: CacheState = Mapping::get(cache_state, 0u8);
            assert_eq(cache.state, CACHE_STATE_IN_PROGRESS);
            assert_eq(start, cache.next_index);
        }

        // Get the total number of validators.
        let count: u32 = Mapping::get(validators_count, 0u8);

        // Cache total bonded and unbonding credits.
        for i: u32 in 0u32..CACHE_BATCH_NUM {
            let index: u32 = start + i;

            let validator: address = Mapping::get_or_use(validators, index, aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc);
            let delegator: address = Mapping::get_or_use(validator_delegators, validator, aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc);

            let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
            assert(bonded.validator == validator);
            let unbonding: unbond_state = Mapping::get_or_use(credits.aleo/unbonding, delegator, unbond_state {microcredits: 0u64, height: 0u32});

            let update: bool = index < count && delegator != aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

            let cache: CacheState = Mapping::get(cache_state, 0u8);
            Mapping::set(cache_state, 0u8, CacheState {
                state: CACHE_STATE_IN_PROGRESS,
                height: cache.height,
                total_bonded: update ? cache.total_bonded + bonded.microcredits as field : cache.total_bonded,
                total_unbonding: update ? cache.total_unbonding + unbonding.microcredits as field : cache.total_unbonding,
                next_index: cache.next_index,
            });
        }

        // Update cache state.
        {
            let next_index: u32 = start + CACHE_BATCH_NUM;

            let cache: CacheState = Mapping::get(cache_state, 0u8);
            Mapping::set(cache_state, 0u8, CacheState {
                state: next_index < count ? CACHE_STATE_IN_PROGRESS : CACHE_STATE_VALID,
                height: next_index < count ? cache.height : block.height,
                total_bonded: cache.total_bonded,
                total_unbonding: cache.total_unbonding,
                next_index: next_index < count ? next_index : 0u32, // new next_index
            });

            // If caching is finished.
            if (next_index >= count) {
                Mapping::set(state, TOTAL_BONDED_KEY, cache.total_bonded);
                Mapping::set(state, TOTAL_UNBONDING_KEY, cache.total_unbonding);
            }
        }
    }

    async transition set_treasury(public treasury: address) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);
        return finalize_set_treasury(f, treasury);
    }

    async function finalize_set_treasury(f: Future, treasury: address) {
        f.await();

        let c: Config = Mapping::get(config, 0u8);
        Mapping::set(config, 0u8, Config { initialized: c.initialized, treasury, paused: c.paused });
    }

    async transition set_protocol_fee(public fee: field) -> Future {
        assert(fee > 0field && fee <= 100field);
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);
        return finalize_set_protocol_fee(f, fee);
    }

    async function finalize_set_protocol_fee(f: Future, fee: field) {
        f.await();
        Mapping::set(state, PROTOCOL_FEE_KEY, fee);
    }

    async transition pause() -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_pause(f);
    }

    async function finalize_pause(f: Future) {
        f.await();

        let c: Config = Mapping::get(config, 0u8);
        Mapping::set(config, 0u8, Config { initialized: c.initialized, treasury: c.treasury, paused: true });
    }

    async transition unpause() -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_unpause(f);
    }

    async function finalize_unpause(f: Future) {
        f.await();

        let c: Config = Mapping::get(config, 0u8);
        Mapping::set(config, 0u8, Config { initialized: c.initialized, treasury: c.treasury, paused: false });
    }

    inline getStCreditsFromCredits(credits: field, total_pooled_credits: field, total_stcredits_supply: field) -> field {
        let total_pooled_credits_: field = total_pooled_credits > 0field ? total_pooled_credits: 1field;
        let total_stcredits_supply_: field = total_stcredits_supply > 0field ? total_stcredits_supply: 1field;
        return credits * total_stcredits_supply_ / total_pooled_credits_;
    }

    inline getCreditsFromStCredits(stcredits: field, total_pooled_credits: field, total_stcredits_supply: field) -> field {
        let total_pooled_credits_: field = total_pooled_credits > 0field ? total_pooled_credits: 1field;
        let total_stcredits_supply_: field = total_stcredits_supply > 0field ? total_stcredits_supply: 1field;
        return stcredits * total_pooled_credits_ / total_stcredits_supply_;
    }
}
