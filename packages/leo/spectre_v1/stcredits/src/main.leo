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

    const CACHE_BATCH_COUNT: u32 = 4u32;

    const TOTAL_BUFFERED_KEY: u8 = 0u8; // total buffered credits in this program address
    const RESERVED_FUNDS_KEY: u8 = 1u8; // reserved funds in credits
    const DELEGATION_LOWER_BOUND_KEY: u8 = 2u8; // delegation lower bound in credits
    const REWARD_DISTRIBUTION_LOWER_BOUND_KEY: u8 = 3u8; // reward distribution lower bound in credits
    const CACHE_HEIGHT_KEY: u8 = 4u8; // cache at block height
    const CACHE_NEXT_INDEX_KEY: u8 = 5u8; // cache at next index
    const CACHED_TOTAL_BONDED_KEY: u8 = 6u8; // cached total bonded credits

    mapping state: u8 => field; // index key => value

    struct WithdrawRequest {
        amount: field, // credits
        height: u32,
        validator: address,
    }

    struct UserRequest {
        user: address,
        index: u32,
    }

    mapping user_requests_counts: address => u32; // user => count of user requests

    mapping user_requests: field => WithdrawRequest; // hash(user, index) => request

    mapping validator_requests_count: u8 => u32; // 0u8 => count of validator requests

    mapping validator_requests: u32 => WithdrawRequest;

    mapping validators_count: u8 => u32; // 0u8 => count of validators

    mapping validators: u32 => address; // index => validator

    mapping validator_delegators: address => address; // selected legitimate validators and their delegators we assign to

    async transition add_validator(public validator: address) -> Future {
        return finalize_add_validator(validator);
    }

    async function finalize_add_validator(validator: address) {
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
        assert_eq(Mapping::get(validators, validator_index), validator);
        assert(Mapping::contains(validator_delegators, validator));

        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);
        assert(count >= 1u32);
        // If the removed validator is not the last one,
        // swap it with the last validator.
        if (validator_index != count - 1u32) {
            let last_validator: address = Mapping::get(validators, count - 1u32);
            Mapping::set(validators, validator_index, last_validator);
        }
        Mapping::set(validators_count, 0u8, count - 1u32);

        Mapping::remove(validator_delegators, validator);
    }

    async transition register_delegator(public validator_index: u32, public validator: address) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.signer);

        return finalize_register_delegator(f, validator_index, validator, self.caller);
    }

    async function finalize_register_delegator(f: Future, validator_index: u32, validator: address, delegator: address) {
        f.await();

        assert_eq(Mapping::get(validators, validator_index), validator);
        assert_eq(Mapping::get(validator_delegators, validator), aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc);

        Mapping::set(validator_delegators, validator, delegator);
    }

    async transition notify_bond(public validator_index: u32, public validator: address, public amount: u64) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_pool_admin(self.signer);

        return finalize_notify_bond(f, validator_index, validator, self.caller, amount);
    }

    async function finalize_notify_bond(f: Future, validator_index: u32, validator: address, delegator: address, amount: u64) {
        f.await();

        assert_eq(Mapping::get(validators, validator_index), validator);
        assert_eq(Mapping::get(validator_delegators, validator), delegator);
    }

    async transition supply(public amount: u64) -> Future {
        assert(amount > 0u64);

        let f1: Future = credits.aleo/transfer_public_as_signer(spectre_stcredits_v1.aleo as address, amount);

        return finalize_supply(f1, self.caller, amount as field);
    }

    async function finalize_supply(f1: Future, supplier: address, amount: field) {
        f1.await();

        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);

        assert_eq(block.height, Mapping::get(state, CACHE_HEIGHT_KEY) as u32);
        assert_eq(count, Mapping::get(state, CACHE_NEXT_INDEX_KEY) as u32);

        let total_bonded: field = Mapping::get(state, CACHED_TOTAL_BONDED_KEY);
        let total_buffered: field = Mapping::get(state, TOTAL_BUFFERED_KEY);
        let reserved_funds: field = Mapping::get(state, RESERVED_FUNDS_KEY);

        let total_pooled: field = total_bonded + total_buffered
        // TODO
        - reserved_funds;

        let total_stcredits_supply: field = Mapping::get_or_use(total_supply, 0u8, 0u64) as field;

        // Mint stcredits
        let amount_to_mint: field = getStCreditsFromCredits(amount, total_pooled, total_stcredits_supply);
        Mapping::set(account, supplier, Mapping::get_or_use(account, supplier, 0u64) + amount_to_mint as u64);
        Mapping::set(total_supply, 0u8, (total_stcredits_supply + amount_to_mint) as u64);

        Mapping::set(state, TOTAL_BUFFERED_KEY, total_buffered + amount);
    }

    async transition cache_validators_bonded(public start: u32, public end: u32) -> Future {
        return finalize_cache_validators_bonded(start, end);
    }

    async function finalize_cache_validators_bonded(start: u32, end: u32) {
        if (start == 0u32) {
            Mapping::set(state, CACHE_HEIGHT_KEY, block.height as field);
            Mapping::set(state, CACHE_NEXT_INDEX_KEY, 0field);
            Mapping::set(state, CACHED_TOTAL_BONDED_KEY, 0field);
        }

        assert_eq(block.height, Mapping::get(state, CACHE_HEIGHT_KEY) as u32);
        assert_eq(start, Mapping::get(state, CACHE_NEXT_INDEX_KEY) as u32);
        assert_eq(end - start, CACHE_BATCH_COUNT);

        Mapping::set(state, CACHE_NEXT_INDEX_KEY, end as field);

        let count: u32 = Mapping::get_or_use(validators_count, 0u8, 0u32);

        for i: u32 in 0u32..CACHE_BATCH_COUNT {
            let index: u32 = start + i;
            if index < count {
                let validator: address = Mapping::get(validators, index);
                let delegator: address = Mapping::get(validator_delegators, validator);
                let bond: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator, microcredits: 0u64});
                Mapping::set(state, CACHED_TOTAL_BONDED_KEY, bond.microcredits as field + Mapping::get(state, CACHED_TOTAL_BONDED_KEY));
            }
        }
    }

    inline getStCreditsFromCredits(credits: field, total_pooled_credits: field, total_stcredits_supply: field) -> field {
        let total_pooled_credits_: field = total_pooled_credits > 0field ? total_pooled_credits: 1field;
        let total_stcredits_supply_: field = total_stcredits_supply > 0field ? total_stcredits_supply: 1field;
        return credits * total_stcredits_supply_ / total_pooled_credits_;
    }
}
