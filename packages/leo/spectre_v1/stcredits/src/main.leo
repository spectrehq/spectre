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
            name: 110909517301300533074857324275280078190u128, // "SpectreTestToken" -> 0x5370656374726554657374546f6b656e -> 110909517301300533074857324275280078190
            symbol: 357896115028u64, // "STEST" -> 0x5354455354 -> 357896115028
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

    const WITHDRAW_DELAY: u32 = 360u32; // should be consistent with the delay in the staking contract

    const MAX_VALIDATORS: u32 = 20u32;

    const CACHE_BATCH_NUM: u32 = 5u32;

    const RESOLVE_WITHDRAWAL_BATCH_NUM: u32 = 2u32;

    const TOTAL_WITHDRAW_KEY: u8 = 0u8; // total withdrawal in credits
    const TOTAL_PENDING_WITHDRAW_KEY: u8 = 1u8; // total pending withdrawal in credits
    const CACHE_HEIGHT_KEY: u8 = 2u8; // cache at block height
    const CACHE_NEXT_INDEX_KEY: u8 = 3u8; // cache at next index
    const CACHED_TOTAL_BONDED_KEY: u8 = 4u8; // cached total bonded credits
    const CACHED_TOTAL_UNBONDING_KEY: u8 = 5u8; // cached total unbonding credits
    const DELEGATION_LOWER_BOUND_KEY: u8 = 6u8; // delegation lower bound in credits
    const REWARD_DISTRIBUTION_LOWER_BOUND_KEY: u8 = 7u8; // reward distribution lower bound in credits

    mapping state: u8 => field; // index key => value

    struct Withdraw {
        amount: field, // credits
        height: u32, // block height at which the withdraw can be claimed
    }

    struct PendingWithdraw {
        amount: field, // credits
        index: field, // index in queue
    }

    struct QueueStartEnd {
        start: field,
        end: field,
    }

    mapping withdraws: address => Withdraw; // user => withdraw

    mapping pending_withdraws: address => PendingWithdraw; // user => pending withdraw

    mapping pending_queue: field => address; // index => user

    mapping pending_queue_start_end: u8 => QueueStartEnd; // 0u8 => (start, end)

    mapping validators_count: u8 => u32; // 0u8 => count of validators

    mapping validators: u32 => address; // index => validator

    mapping delegators: address => bool; // delegator => true

    mapping validator_delegators: address => address; // selected legitimate validators and their delegators we assign to

    async transition add_validator(public validator: address) -> Future {
        return finalize_add_validator(validator);
    }

    async function finalize_add_validator(validator: address) {
        // Ensure caching is not active in the current block.
        assert(block.height != Mapping::get(state, CACHE_HEIGHT_KEY) as u32);

        let validator_state: committee_state = Mapping::get_or_use(
            credits.aleo/committee, validator,
            // If the validator is not in the committee, the default state is open with zero commission.
            // TODO: change `microcredits` to `commission`
            committee_state {is_open: true, microcredits: 0u64},
        );
        assert(validator_state.is_open);

        // Ensure the validator is not in the set.
        assert(!Mapping::contains(validator_delegators, validator));

        // Add the validator to the validators set,
        // and use the zero address as the delegator.
        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);
        Mapping::set(validators, count, validator);
        Mapping::set(validators_count, 0u8, count + 1u32);
        Mapping::set(validator_delegators, validator, aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc);
    }

    async transition remove_validator(public validator_index: u32, public validator: address) -> Future {
        return finalize_remove_validator(validator_index, validator);
    }

    async function finalize_remove_validator(validator_index: u32, validator: address) {
        // Ensure caching is not active in the current block.
        assert(block.height != Mapping::get(state, CACHE_HEIGHT_KEY) as u32);

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);

        let delegator: address = Mapping::get(validator_delegators, validator);
        assert(Mapping::contains(delegators, delegator));
        // Ensure we have neither bonding nor unboning in the validator.
        {
            let bond: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
            let unbonding: unbond_state = Mapping::get_or_use(credits.aleo/unbonding, delegator, unbond_state {microcredits: 0u64, height: 0u32});
            assert(bond.microcredits == 0u64 && unbonding.microcredits == 0u64);
        }

        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);
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
        let f: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.signer);

        return finalize_register_delegator(f, validator_index, validator, delegator);
    }

    async function finalize_register_delegator(f: Future, validator_index: u32, validator: address, delegator: address) {
        f.await();

        // Ensure caching is not active in the current block.
        assert(block.height != Mapping::get(state, CACHE_HEIGHT_KEY) as u32);

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
        let f1: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.signer);

        // Transfer `amount` credits to the `delegator` program.
        let f2: Future = credits.aleo/transfer_public(delegator, amount);

        return finalize_bond(f1, f2, validator_index, validator, self.caller, amount);
    }

    async function finalize_bond(f1: Future, f2: Future, validator_index: u32, validator: address, delegator: address, amount: u64) {
        f1.await();
        f2.await();

        // Ensure caching is not active in the current block.
        assert(block.height != Mapping::get(state, CACHE_HEIGHT_KEY) as u32);

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);
        assert_eq(Mapping::get(validator_delegators, validator), delegator);

        // Only allow bond `amount` credits when the actual liquidity is sufficient.
        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_withdraw: field = Mapping::get_or_use(state, TOTAL_WITHDRAW_KEY, 0field);
        let total_pending_withdraw: field = Mapping::get_or_use(state, TOTAL_PENDING_WITHDRAW_KEY, 0field);
        assert(amount as field <= total_buffered - total_withdraw - total_pending_withdraw);
    }

    /**
     * This function will be called by the mediator to unbond credits from the validator.
     * It will serve either for the users to withdraw credits or for rebalancing bonding between the validators.
     * The `amount` should be calculated offline.
     */
    async transition unbond(public validator_index: u32, public validator: address, delegator: address, public amount: u64) -> Future {
        // Check the caller is the mediator.
        let f1: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.caller);

        // TODO: add delegator
        // let f2: Future = credits.aleo/unbond_public(delegator, amount);
        let f2: Future = credits.aleo/unbond_public(amount);

        return finalize_unbond(f1, f2, validator_index, validator, delegator, amount);
    }

    async function finalize_unbond(f1: Future, f2: Future, validator_index: u32, validator: address, delegator: address, amount: u64) {
        f1.await();
        f2.await();

        // Ensure caching is not active in the current block.
        assert(block.height != Mapping::get(state, CACHE_HEIGHT_KEY) as u32);

        // Ensure the validator is in the set.
        assert_eq(Mapping::get(validators, validator_index), validator);
        assert_eq(Mapping::get(validator_delegators, validator), delegator);
    }

    /**
     * This function can be called by anyone to claim unbonded credits from the validator.
     */
    async transition claim_unbond(public validator_index: u32, public validator: address, delegator: address) -> Future {
        // TODO: add delegator
        // let f: Future = credits.aleo/claim_unbond_public(delegator);
        let f: Future = credits.aleo/claim_unbond_public();

        return finalize_claim_unbond(f, validator_index, validator, delegator);
    }

    async function finalize_claim_unbond(f: Future, validator_index: u32, validator: address, delegator: address) {
        f.await();

        // Ensure caching is not active in the current block.
        assert(block.height != Mapping::get(state, CACHE_HEIGHT_KEY) as u32);

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
        for i: u32 in 0u32..RESOLVE_WITHDRAWAL_BATCH_NUM {
            let start_end: QueueStartEnd = Mapping::get_or_use(pending_queue_start_end, 0u8, QueueStartEnd {start: 0field, end: 0field});
            if (start_end.end - start_end.start <= 0field) {
                return;
            }

            let index: field = start_end.start;
            let user: address = Mapping::get(pending_queue, index);
            let pending: PendingWithdraw = Mapping::get(pending_withdraws, user);
            assert(pending.index == index);
            assert(pending.amount > 0field);

            let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
            let total_withdraw: field = Mapping::get_or_use(state, TOTAL_WITHDRAW_KEY, 0field);
            let liquidity: field = total_buffered - total_withdraw;
            if (liquidity < pending.amount) {
                return;
            }

            // Pop the pending withdraw from the queue.
            Mapping::set(pending_queue_start_end, 0u8, QueueStartEnd {start: start_end.start + 1field, end: start_end.end});
            Mapping::remove(pending_queue, index);
            Mapping::remove(pending_withdraws, user);

            // Merge the pending withdraw to the withdraw if exists.
            let withdraw: Withdraw = Mapping::get_or_use(withdraws, user, Withdraw {amount: 0field, height: 0u32});
            Mapping::set(withdraws, user, Withdraw {amount: withdraw.amount + pending.amount, height: block.height + WITHDRAW_DELAY});

            // Update the total withdraw and total pending withdraw.
            Mapping::set(state, TOTAL_PENDING_WITHDRAW_KEY, Mapping::get_or_use(state, TOTAL_PENDING_WITHDRAW_KEY, 0field) - pending.amount);
            Mapping::set(state, TOTAL_WITHDRAW_KEY, total_withdraw + pending.amount);
        }
    }

    /**
     * Supply credits by user, to mint stcredits.
     */
    async transition supply(public credits: u64) -> Future {
        assert(credits > 0u64);

        let f1: Future = credits.aleo/transfer_public_as_signer(spectre_stcredits_v1.aleo as address, credits);

        return finalize_supply(f1, self.caller, credits as field);
    }

    async function finalize_supply(f1: Future, user: address, credits: field) {
        f1.await();

        // Ensure caching is active and finished in the current block.
        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);
        assert_eq(block.height, Mapping::get(state, CACHE_HEIGHT_KEY) as u32);
        assert_eq(count, Mapping::get(state, CACHE_NEXT_INDEX_KEY) as u32);

        let total_bonded: field = Mapping::get(state, CACHED_TOTAL_BONDED_KEY);
        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_unbonding: field = Mapping::get(state, CACHED_TOTAL_UNBONDING_KEY);
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
        return finalize_withdraw(self.caller, stcredits as field);
    }

    async function finalize_withdraw(user: address, stcredits: field) {
        // Ensure caching is active and finished in the current block.
        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);
        assert_eq(block.height, Mapping::get(state, CACHE_HEIGHT_KEY) as u32);
        assert_eq(count, Mapping::get(state, CACHE_NEXT_INDEX_KEY) as u32);

        let total_bonded: field = Mapping::get(state, CACHED_TOTAL_BONDED_KEY);
        // Total buffered equals to credits balance of this program.
        let total_buffered: field = Mapping::get_or_use(credits.aleo/account, spectre_stcredits_v1.aleo as address, 0u64) as field;
        let total_unbonding: field = Mapping::get(state, CACHED_TOTAL_UNBONDING_KEY);
        let total_withdraw: field = Mapping::get(state, TOTAL_WITHDRAW_KEY);
        let total_pending_withdraw: field = Mapping::get(state, TOTAL_PENDING_WITHDRAW_KEY);

        let total_pooled: field = total_bonded + total_buffered + total_unbonding - total_withdraw - total_pending_withdraw;

        let total_stcredits_supply: field = Mapping::get_or_use(total_supply, 0u8, 0u64) as field;

        // Calculate credits to withdraw.
        let credits: field = getCreditsFromStCredits(stcredits, total_pooled, total_stcredits_supply);

        // Burn stcredits
        Mapping::set(account, user, Mapping::get_or_use(account, user, 0u64) - stcredits as u64);
        Mapping::set(total_supply, 0u8, (total_stcredits_supply - stcredits) as u64);

        let liquidity: field = total_buffered - total_withdraw;

        let has_withdraw: bool = Mapping::contains(withdraws, user);
        if (!has_withdraw) {
            if (liquidity >= credits) {
                Mapping::set(state, TOTAL_WITHDRAW_KEY, total_withdraw + credits);
                Mapping::set(withdraws, user, Withdraw {amount: credits, height: block.height + WITHDRAW_DELAY});
                // Done.
                return;
            } else {
                Mapping::set(state, TOTAL_WITHDRAW_KEY, total_withdraw + liquidity);
            }
        }

        // Calculate credits of pending withdraw.
        let pending_credits: field = !has_withdraw ? credits - liquidity : credits;

        let start_end: QueueStartEnd = Mapping::get_or_use(pending_queue_start_end, 0u8, QueueStartEnd {start: 0field, end: 0field});

        if (!Mapping::contains(pending_withdraws, user)) { // no pending withdraw for user
            // Push to the end of the queue.
            Mapping::set(pending_queue, start_end.end, user);
            Mapping::set(pending_queue_start_end, 0u8, QueueStartEnd {start: start_end.start, end: start_end.end + 1field});
            Mapping::set(pending_withdraws, user, PendingWithdraw {amount: pending_credits, index: start_end.end});
        } else { // has pending withdraw for user
            let pending: PendingWithdraw = Mapping::get(pending_withdraws, user);
            assert(pending.index >= start_end.start && pending.index < start_end.end);
            let last_index: field = start_end.end - 1field;
            if (pending.index != last_index) { // user is not at the end of the queue
                // Swap the user to the end of the queue.
                let last_user: address = Mapping::get(pending_queue, last_index);
                let last_pending: PendingWithdraw = Mapping::get(pending_withdraws, last_user);
                Mapping::set(pending_queue, pending.index, last_user);
                Mapping::set(pending_queue, last_index, user);
                Mapping::set(pending_withdraws, last_user, PendingWithdraw {amount: last_pending.amount, index: pending.index});
            }
            // Add amount to existing pending withdraw.
            Mapping::set(pending_withdraws, user, PendingWithdraw {amount: pending.amount + pending_credits, index: last_index});
        }

        Mapping::set(state, TOTAL_PENDING_WITHDRAW_KEY, Mapping::get_or_use(state, TOTAL_PENDING_WITHDRAW_KEY, 0field) + pending_credits);
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

        let withdraw: Withdraw = Mapping::get(withdraws, user);
        assert(withdraw.height <= block.height);
        assert_eq(withdraw.amount, amount);

        Mapping::remove(withdraws, user);
    }

    async transition cache_total_bonded_unbonding(public start: u32, public num: u32) -> Future {
        return finalize_cache_total_bonded_unbonding(start, num);
    }

    async function finalize_cache_total_bonded_unbonding(start: u32, num: u32) {
        if (start == 0u32) { // new cache flow
            Mapping::set(state, CACHE_HEIGHT_KEY, block.height as field);
            Mapping::set(state, CACHE_NEXT_INDEX_KEY, 0field);
            Mapping::set(state, CACHED_TOTAL_BONDED_KEY, 0field);
            Mapping::set(state, CACHED_TOTAL_UNBONDING_KEY, 0field);
        }

        assert_eq(block.height, Mapping::get(state, CACHE_HEIGHT_KEY) as u32);
        assert_eq(start, Mapping::get(state, CACHE_NEXT_INDEX_KEY) as u32);

        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);
        assert(start + num <= count);
        assert(num <= CACHE_BATCH_NUM);

        Mapping::set(state, CACHE_NEXT_INDEX_KEY, (start + num) as field);

        for i: u32 in 0u32..CACHE_BATCH_NUM {
            let index: u32 = start + i;
            if index < count {
                let validator: address = Mapping::get(validators, index);
                let delegator: address = Mapping::get(validator_delegators, validator);

                let bond: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
                Mapping::set(state, CACHED_TOTAL_BONDED_KEY, bond.microcredits as field + Mapping::get(state, CACHED_TOTAL_BONDED_KEY));

                let unbonding: unbond_state = Mapping::get_or_use(credits.aleo/unbonding, delegator, unbond_state {microcredits: 0u64, height: 0u32});
                Mapping::set(state, CACHED_TOTAL_UNBONDING_KEY, unbonding.microcredits as field + Mapping::get(state, CACHED_TOTAL_UNBONDING_KEY));
            }
        }
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