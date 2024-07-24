import credits.aleo;
import multi_token_support_program.aleo;
import spectre_acl_manager_v1.aleo;

program staking_stcredits_v1.aleo {
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

    /************************* wrap/unwrap stcredits into/from mtsp *************************/
    // The stcredits can be wrapped/unwrapped into/from the mstp program.
    // When wrapped, the stcredits of the user will be locked in this program.
    // When unwrapped, the stcredits of the user will be unlocked from this program.
    // The wrapped stcredits in the mstp program can be used across various ZeFi protocols which support the mstp interface.

    async transition wrap_mtsp(public stcredits: u64) -> Future {
        // Mint stcredits in mtsp program.
        let f: Future = multi_token_support_program.aleo/mint_public(self.address as field, self.caller, stcredits as u128, 4294967295u32);

        return finalize_wrap_mtsp(f, self.caller, stcredits);
    }

    async function finalize_wrap_mtsp(f: Future, user: address, stcredits: u64) {
        f.await();

        // Lock user's stcredits into this program.
        Mapping::set(account, user, Mapping::get(account, user) - stcredits);
        Mapping::set(account, self.address, Mapping::get_or_use(account, self.address, 0u64) + stcredits);
    }

    async transition unwrap_mtsp(public stcredits: u64) -> Future {
        // Burn stcredits in mtsp program.
        let f: Future = multi_token_support_program.aleo/burn_public(self.address as field, self.caller, stcredits as u128);

        return finalize_unwrap_mtsp(f, self.caller, stcredits);
    }

    async function finalize_unwrap_mtsp(f: Future, user: address, stcredits: u64) {
        f.await();

        // Unlock user's stcredits from this program.
        Mapping::set(account, user, Mapping::get_or_use(account, user, 0u64) + stcredits);
        Mapping::set(account, self.address, Mapping::get(account, self.address) - stcredits);
    }

    /************************* Supply/Withdraw credits & Validator Staking *************************/

    const WITHDRAW_DELAY: u32 = 360u32; // should be consistent with the delay in the credtis.aleo

    const CACHE_BATCH_NUM: u32 = 10u32;

    const ZERO_ADDRESS: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

    struct Config {
        paused: bool,
        treasury: address,
        protocol_fee: u8,
    }

    mapping config: u8 => Config; // 0u8 => config

    struct State {
        withdraw: u64, // total withdrawal in credits
        pending_withdraw: u64, // total pending withdrawal in credits
        bonded: u64, // total bonded credits (it may have some lag)
        unbonding: u64, // total unbonding credits (it may have some lag)
        resolved_height: u32, // block height of the last resolved
    }

    mapping state: u8 => State; // 0u8 => state

    const CACHE_STATUS_INVALID: u8 = 0u8;
    const CACHE_STATUS_IN_PROGRESS: u8 = 1u8;
    const CACHE_STATUS_VALID: u8 = 2u8;

    struct CacheState {
        status: u8,
        height: u32, // the start height or finished height
        bonded: u64,
        unbonding: u64,
        next_index: u32, // the index of the next delegator for caching
    }

    mapping cache_state: u8 => CacheState; // 0u8 => cache state

    struct Withdraw {
        amount: u64, // credits
        pending: bool, // whether the withdraw is pending
        height: u32, // block height at which the withdraw can be claimed or the pending withdraw **may** be claimed
    }

    mapping withdraws: address => Withdraw; // user => withdraw

    struct Delegator {
        delegator: address,
        validator: address,
        bonded: u64, // the total bonded of the delegator at the time of last bond/unbond operation
    }

    mapping delegators_count: u8 => u32; // 0u8 => count of delegators

    mapping delegators: u32 => Delegator; // index => delegator

    mapping delegator_pos: address => u32; // delegator => index

    mapping validator_pos: address => u32; // validator => index

    struct RewardHistory {
        validator: address, // the validator of the delegator
        bonded: u64, // the total bonded of the delegator immediately before the bond/unbond operation occurred
        reward: u64, // the reward of the delegator between the last operation and its previous operation
        height: u32, // block height at which the bond/unbond operation of this delegator occurred
    }

    mapping reward_history_count: u8 => u32; // 0u8 => count of reward history

    mapping reward_history: u32 => RewardHistory; // index => reward history

    async transition initialize() -> Future {
        let f1: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        // Register stcredits token in mtsp program.
        // Admin is this program.
        let f2: Future = multi_token_support_program.aleo/register_token(
            self.address as field, // token_id, we use the address of this program
            8319383754638649716u128, // name, "stcredit" -> 0x7374637265646974 -> 8319383754638649716
            8319383754638649716u128, // symbol
            6u8, // decimals
            340282366920938463463374607431768211455u128, // max_supply, never reach
            false, // external_authorization_required
            self.address, // external_authorization_party
        );

        return finalize_initialize(f1, f2, self.caller);
    }

    async function finalize_initialize(f1: Future, f2: Future, admin: address) {
        f1.await();
        f2.await();

        // Ensure the program is not initialized.
        assert(!Mapping::contains(config, 0u8));

        // Initialize the config.
        Mapping::set(config, 0u8, Config {
            paused: true,
            treasury: admin,
            protocol_fee: 0u8, // 0%
        });
        // Initialize the state.
        Mapping::set(state, 0u8, State {
            withdraw: 0u64,
            pending_withdraw: 0u64,
            bonded: 0u64,
            unbonding: 0u64,
            resolved_height: 0u32,
        });
        // Initialize the cache state.
        Mapping::set(cache_state, 0u8, CacheState {
            status: CACHE_STATUS_INVALID,
            height: 0u32,
            bonded: 0u64,
            unbonding: 0u64,
            next_index: 0u32,
        });
        // Initialize the delegators count.
        Mapping::set(delegators_count, 0u8, 0u32);
        // Initialize the delegator rewards count.
        Mapping::set(reward_history_count, 0u8, 0u32);
    }

    /**
     * This function will be called by the delegator program to register itself as one delegator of the validator.
     */
    async transition register_delegator(public delegator: address, public validator: address) -> Future {
        // Ensure the delegator is the caller.
        assert_eq(delegator, self.caller);

        // Check `self.signer` to ensure the delegator is called by the signer.
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.signer);

        return finalize_register_delegator(f, delegator, validator);
    }

    async function finalize_register_delegator(f: Future, delegator: address, validator: address) {
        f.await();

        // Invalidate the cache state.
        Mapping::set(cache_state, 0u8, CacheState {status: CACHE_STATUS_INVALID, height: 0u32, bonded: 0u64, unbonding: 0u64, next_index: 0u32});

        // Check validator.
        let validator_state: committee_state = Mapping::get_or_use(
            credits.aleo/committee, validator,
            // If the validator is not in the committee, the default state is open with zero commission.
            committee_state {is_open: true, commission: 0u8},
        );
        assert(validator_state.is_open);

        // Ensure the delegator has neither bonding nor unbonding.
        assert(!Mapping::contains(credits.aleo/bonded, delegator));
        assert(!Mapping::contains(credits.aleo/unbonding, delegator));

        // Ensure the delegator/validator pair is not in the set.
        // One delegator/validator pair can only be registered once.
        assert(!Mapping::contains(delegator_pos, delegator));
        assert(!Mapping::contains(validator_pos, validator));

        // Add the delegator/validator pair.
        let count: u32 = Mapping::get(delegators_count, 0u8);
        Mapping::set(delegators_count, 0u8, count + 1u32);
        Mapping::set(delegators, count, Delegator {delegator, validator, bonded: 0u64});
        Mapping::set(delegator_pos, delegator, count);
        Mapping::set(validator_pos, validator, count);
    }

    /**
     * This function will be called by the operator to unregister the delegator.
     */
    async transition unregister_delegator(public delegator: address) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_unregister_delegator(f, delegator);
    }

    async function finalize_unregister_delegator(f: Future, delegator: address) {
        f.await();

        // Invalidate the cache state.
        Mapping::set(cache_state, 0u8, CacheState {status: CACHE_STATUS_INVALID, height: 0u32, bonded: 0u64, unbonding: 0u64, next_index: 0u32});

        let index: u32 = Mapping::get(delegator_pos, delegator);
        let validator: address = Mapping::get(delegators, index).validator;

        // Ensure the delegator has neither bonding nor unbonding.
        assert(!Mapping::contains(credits.aleo/bonded, delegator));
        assert(!Mapping::contains(credits.aleo/unbonding, delegator));

        let count: u32 = Mapping::get(delegators_count, 0u8);
        assert(count >= 1u32);

        // If the removed delegator is not the last one,
        // swap it with the last delegator.
        if (index != count - 1u32) {
            let last_delegator: Delegator = Mapping::get(delegators, count - 1u32);
            Mapping::set(delegators, index, last_delegator);
        }

        // Remove the delegator.
        Mapping::set(delegators_count, 0u8, count - 1u32);
        Mapping::remove(delegators, count - 1u32);
        Mapping::remove(delegator_pos, delegator);
        Mapping::remove(validator_pos, validator);
    }

    /**
     * This function will be called by the delegator program to bond credits to the validator.
     */
    async transition bond(public delegator: address, public validator: address, public amount: u64) -> Future {
        // Ensure the delegator is the caller.
        assert_eq(delegator, self.caller);

        // Check `self.signer` to ensure the delegator is called by the signer.
        let f1: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.signer);

        // Transfer `amount` credits to the `delegator` program.
        let f2: Future = credits.aleo/transfer_public(delegator, amount);

        return finalize_bond(f1, f2, delegator, validator, amount);
    }

    async function finalize_bond(f1: Future, f2: Future, delegator: address, validator: address, amount: u64) {
        f1.await();

        // Check whether paused.
        let cfg: Config = Mapping::get(config, 0u8);
        assert(!cfg.paused);

        // Check cache is finished and then invalidate it.
        assert_eq(Mapping::get(cache_state, 0u8).status, CACHE_STATUS_VALID);
        Mapping::set(cache_state, 0u8, CacheState {status: CACHE_STATUS_INVALID, height: 0u32, bonded: 0u64, unbonding: 0u64, next_index: 0u32});

        let state_: State = Mapping::get(state, 0u8);

        // Only allow bond `amount` credits when the actual liquidity is sufficient.
        let total_buffered: u64 = Mapping::get_or_use(credits.aleo/account, staking_stcredits_v1.aleo as address, 0u64);
        let total_withdraw: u64 = state_.withdraw;
        let total_pending_withdraw: u64 = state_.pending_withdraw;
        let total_bonded: u64 = state_.bonded;
        let total_unbonding: u64 = state_.unbonding;
        assert(total_buffered >= total_withdraw + amount);
        assert(total_buffered + total_unbonding >= total_withdraw + total_pending_withdraw + amount);

        // Transfer `amount` credits to the `delegator` program.
        f2.await();

        let index: u32 = Mapping::get(delegator_pos, delegator);
        let del: Delegator = Mapping::get(delegators, index);
        assert_eq(del.validator, validator);
        let last_bonded: u64 = del.bonded;

        // Get the current bonded.
        let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator: ZERO_ADDRESS, microcredits: 0u64});

        // Record the updated bonded credits.
        Mapping::set(delegators, index, Delegator {delegator, validator, bonded: bonded.microcredits + amount});

        // Reward = current bonded - last bonded
        let reward: u64 = bonded.microcredits > last_bonded ? bonded.microcredits.sub_wrapped(last_bonded) : 0u64;

        // Record delegator reward.
        {
            let history_count: u32 = Mapping::get(reward_history_count, 0u8);
            Mapping::set(reward_history, history_count, RewardHistory {
                validator,
                bonded: bonded.microcredits,
                reward,
                height: block.height,
            });
            Mapping::set(reward_history_count, 0u8, history_count + 1u32);
        }

        // Protocol fee.
        {
            let protocol_fee: u64 = reward * (cfg.protocol_fee as u64) / 100u64;

            if (protocol_fee > 0u64) {
                let total_pooled: u64 = total_buffered + total_bonded + total_unbonding - total_withdraw - total_pending_withdraw;

                let total_stcredits_supply: u64 = Mapping::get_or_use(total_supply, 0u8, 0u64);

                // Mint stcredits to the treasury.
                let stcredits: u64 = getStCreditsFromCredits(protocol_fee, total_pooled, total_stcredits_supply);
                let treasury: address = cfg.treasury;
                Mapping::set(account, treasury, Mapping::get_or_use(account, treasury, 0u64) + stcredits);
                Mapping::set(total_supply, 0u8, total_stcredits_supply + stcredits);
            }
        }
    }

    /**
     * This function will be called by the operator to unbond credits from the delegator/validator.
     * It will serve either for the users to withdraw credits or for rebalancing bonding between the validators.
     * The `amount` should be calculated offline.
     */
    async transition unbond(delegator: address, public amount: u64) -> Future {
        // Check the caller is the operator.
        let f1: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.caller);

        // Unbond `amount` credits of the delegator from the validator.
        let f2: Future = credits.aleo/unbond_public(delegator, amount);

        return finalize_unbond(f1, f2, delegator, amount);
    }

    async function finalize_unbond(f1: Future, f2: Future, delegator: address, amount: u64) {
        f1.await();

        // Check whether paused.
        let cfg: Config = Mapping::get(config, 0u8);
        assert(!cfg.paused);

        // Check cache is finished and then invalidate it.
        assert_eq(Mapping::get(cache_state, 0u8).status, CACHE_STATUS_VALID);
        Mapping::set(cache_state, 0u8, CacheState {status: CACHE_STATUS_INVALID, height: 0u32, bonded: 0u64, unbonding: 0u64, next_index: 0u32});

        let state_: State = Mapping::get(state, 0u8);

        let index: u32 = Mapping::get(delegator_pos, delegator);
        let del: Delegator = Mapping::get(delegators, index);
        let validator: address = del.validator;
        let last_bonded: u64 = del.bonded;

        // Get the current bonded.
        let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, bond_state {validator: ZERO_ADDRESS, microcredits: 0u64});

        // Record the updated bonded credits.
        Mapping::set(delegators, index, Delegator {delegator, validator, bonded: bonded.microcredits - amount});

        // Reward = current bonded - last bonded
        let reward: u64 = bonded.microcredits > last_bonded ? bonded.microcredits.sub_wrapped(last_bonded) : 0u64;

        // Record delegator reward.
        {
            let history_count: u32 = Mapping::get(reward_history_count, 0u8);
            Mapping::set(reward_history, history_count, RewardHistory {
                validator,
                bonded: bonded.microcredits,
                reward,
                height: block.height,
            });
            Mapping::set(reward_history_count, 0u8, history_count + 1u32);
        }

        // Protocol fee.
        {
            let protocol_fee: u64 = reward * (cfg.protocol_fee as u64) / 100u64;

            if (protocol_fee > 0u64) {
                let total_buffered: u64 = Mapping::get_or_use(credits.aleo/account, staking_stcredits_v1.aleo as address, 0u64);
                let total_bonded: u64 = state_.bonded;
                let total_unbonding: u64 = state_.unbonding;
                let total_withdraw: u64 = state_.withdraw;
                let total_pending_withdraw: u64 = state_.pending_withdraw;

                let total_pooled: u64 = total_buffered + total_bonded + total_unbonding - total_withdraw - total_pending_withdraw;

                let total_stcredits_supply: u64 = Mapping::get_or_use(total_supply, 0u8, 0u64);

                // Mint stcredits to the treasury.
                let stcredits: u64 = getStCreditsFromCredits(protocol_fee, total_pooled, total_stcredits_supply);
                let treasury: address = cfg.treasury;
                Mapping::set(account, treasury, Mapping::get_or_use(account, treasury, 0u64) + stcredits);
                Mapping::set(total_supply, 0u8, total_stcredits_supply + stcredits);
            }
        }

        // Unbond `amount` credits of the delegator from the validator.
        f2.await();
    }

    /**
     * This function can be called by anyone to claim unbonded credits from the delegator/validator.
     * It will fail if the unbonding does not exist or the unbonding height is not reached.
     */
    async transition claim_unbond(delegator: address) -> Future {
        let f: Future = credits.aleo/claim_unbond_public(delegator);

        return finalize_claim_unbond(f, delegator);
    }

    async function finalize_claim_unbond(f: Future, delegator: address) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Invalidate the cache state.
        Mapping::set(cache_state, 0u8, CacheState {status: CACHE_STATUS_INVALID, height: 0u32, bonded: 0u64, unbonding: 0u64, next_index: 0u32});

        // Ensure the delegator is in the set.
        assert(Mapping::contains(delegator_pos, delegator));
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

        let state_: State = Mapping::get(state, 0u8);

        let total_buffered: u64 = Mapping::get_or_use(credits.aleo/account, staking_stcredits_v1.aleo as address, 0u64);
        let total_withdraw: u64 = state_.withdraw;
        let total_pending_withdraw: u64 = state_.pending_withdraw;

        assert(total_buffered >= total_withdraw + total_pending_withdraw);

        Mapping::set(state, 0u8, State {
            withdraw: total_withdraw + total_pending_withdraw,
            pending_withdraw: 0u64,
            bonded: state_.bonded,
            unbonding: state_.unbonding,
            // Set the pending resolved height with the current block height.
            resolved_height: block.height,
        });
    }

    /**
     * This function can be called by the operator to resolve the pending withdrawals.
     * If `height` is zero, the current block height will be used.
     */
    async transition resolve_withdrawal_force(public credits: u64, public height: u32) -> Future {
        // Check the caller is the operator.
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.caller);

        return finalize_resolve_withdrawal_force(f, credits, height);
    }

    async function finalize_resolve_withdrawal_force(f: Future, credits: u64, height: u32) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        let state_: State = Mapping::get(state, 0u8);

        let total_buffered: u64 = Mapping::get_or_use(credits.aleo/account, staking_stcredits_v1.aleo as address, 0u64);
        let total_withdraw: u64 = state_.withdraw;
        let total_pending_withdraw: u64 = state_.pending_withdraw;

        assert(total_buffered >= total_withdraw + credits);

        // Check: last resolve height <= resolved height <= current height.
        let resolved_height: u32 = height > 0u32 ? height : block.height;
        assert(resolved_height >= state_.resolved_height && resolved_height <= block.height);

        Mapping::set(state, 0u8, State {
            withdraw: total_withdraw + credits,
            pending_withdraw: total_pending_withdraw - credits,
            bonded: state_.bonded,
            unbonding: state_.unbonding,
            // Set the pending resolved height with the specified height.
            resolved_height,
        });
    }

    /**
     * Supply credits by user, to mint stcredits.
     */
    async transition supply(public credits: u64) -> Future {
        assert(credits > 0u64);

        // Transfer credits to this program from the signer.
        let f1: Future = credits.aleo/transfer_public_as_signer(staking_stcredits_v1.aleo as address, credits);

        // The supplier must be the signer.
        return finalize_supply(f1, self.signer, credits);
    }

    async function finalize_supply(f1: Future, user: address, credits: u64) {
        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Check cache is finished and valid.
        assert_eq(Mapping::get(cache_state, 0u8).status, CACHE_STATUS_VALID);

        let state_: State = Mapping::get(state, 0u8);

        // Total buffered equals to credits balance of this program.
        let total_buffered: u64 = Mapping::get_or_use(credits.aleo/account, staking_stcredits_v1.aleo as address, 0u64);
        let total_bonded: u64 = state_.bonded;
        let total_unbonding: u64 = state_.unbonding;
        let total_withdraw: u64 = state_.withdraw;
        let total_pending_withdraw: u64 = state_.pending_withdraw;

        let total_pooled: u64 = total_buffered + total_bonded + total_unbonding - total_withdraw - total_pending_withdraw;

        let total_stcredits_supply: u64 = Mapping::get_or_use(total_supply, 0u8, 0u64);

        // Transfer credits to this program from the user.
        f1.await();

        // Mint stcredits
        let stcredits: u64 = getStCreditsFromCredits(credits, total_pooled, total_stcredits_supply);
        Mapping::set(account, user, Mapping::get_or_use(account, user, 0u64) + stcredits);
        Mapping::set(total_supply, 0u8, (total_stcredits_supply + stcredits));
    }

    /**
     * Withdraw credits by user, to burn stcredits.
     */
    async transition withdraw(public stcredits: u64) -> Future {
        return finalize_withdraw(self.caller, stcredits);
    }

    async function finalize_withdraw(user: address, stcredits: u64) {
        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Check cache is finished and valid.
        assert_eq(Mapping::get(cache_state, 0u8).status, CACHE_STATUS_VALID);

        let state_: State = Mapping::get(state, 0u8);

        // Total buffered equals to credits balance of this program.
        let total_buffered: u64 = Mapping::get_or_use(credits.aleo/account, staking_stcredits_v1.aleo as address, 0u64);
        let total_bonded: u64 = state_.bonded;
        let total_unbonding: u64 = state_.unbonding;
        let total_withdraw: u64 = state_.withdraw;
        let total_pending_withdraw: u64 = state_.pending_withdraw;

        let total_pooled: u64 = total_buffered + total_bonded + total_unbonding - total_withdraw - total_pending_withdraw;

        let total_stcredits_supply: u64 = Mapping::get_or_use(total_supply, 0u8, 0u64);

        // Calculate credits to withdraw.
        let credits: u64 = getCreditsFromStCredits(stcredits, total_pooled, total_stcredits_supply);

        // Burn stcredits.
        Mapping::set(account, user, Mapping::get_or_use(account, user, 0u64) - stcredits);
        Mapping::set(total_supply, 0u8, total_stcredits_supply - stcredits);

        // Update total withdraw and total pending withdraw.
        let liquidity: u64 = total_buffered > (total_withdraw + total_pending_withdraw) ? total_buffered.sub_wrapped(total_withdraw + total_pending_withdraw) : 0u64;
        let withdraw_credits: u64 = liquidity >= credits ? credits : liquidity;
        let pending_credits: u64 = credits - withdraw_credits;
        Mapping::set(state, 0u8, State {
            withdraw: total_withdraw + withdraw_credits,
            pending_withdraw: total_pending_withdraw + pending_credits,
            bonded: total_bonded,
            unbonding: total_unbonding,
            resolved_height: state_.resolved_height,
        });

        // Update user withdraw.
        let withdraw: Withdraw = Mapping::get_or_use(withdraws, user, Withdraw {amount: 0u64, pending: false, height: 0u32});
        Mapping::set(withdraws, user, Withdraw {
            amount: withdraw.amount + credits,
            pending: withdraw.pending || pending_credits > 0u64,
            // <withdraw.height> == <withdraw created height> + WITHDRAW_DELAY
            height: block.height + WITHDRAW_DELAY,
        });
    }

    /**
     * Claim credits by user.
     */
    async transition claim(public amount: u64) -> Future {
        // Transfer `amount` credits to the user.
        let f: Future = credits.aleo/transfer_public(self.caller, amount);

        return finalize_claim(f, self.caller, amount);
    }

    async function finalize_claim(f: Future, user: address, amount: u64) {
        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        let state_: State = Mapping::get(state, 0u8);

        let resolved_height: u32 = state_.resolved_height;

        let withdraw: Withdraw = Mapping::get(withdraws, user);
        // For non-pending withdraw, <withdraw.height> == <withdraw created height> + WITHDRAW_DELAY <= <current block height>.
        // For pending withdraw, <withdraw.height> - WITHDRAW_DELAY == <withdraw created height> <= <pending resolved height>
        assert(withdraw.height <= (!withdraw.pending ? block.height : resolved_height + WITHDRAW_DELAY));
        assert_eq(withdraw.amount, amount);

        Mapping::remove(withdraws, user);
        Mapping::set(state, 0u8, State {
            withdraw: state_.withdraw - amount, // may fail if overflow
            pending_withdraw: state_.pending_withdraw,
            bonded: state_.bonded,
            unbonding: state_.unbonding,
            resolved_height,
        });

        // Transfer `amount` credits to the user.
        f.await();
    }

    /**
     * This function should be called several times to cache the total bonded/unbonding state.
     * The number of calls should be equal to: `ceil(delegators_count / CACHE_BATCH_NUM)`.
     * `CACHE_BATCH_NUM` may be 1/2/... and the corresponding function is cache_1/cache_2/...
     */
    async transition cache(public start: u32) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_operator(self.caller);

        return finalize_cache(f, start);
    }

    async function finalize_cache(f: Future, start: u32) {
        f.await();

        // Check whether paused.
        assert(!Mapping::get(config, 0u8).paused);

        // Is new cache flow.
        let is_start: bool = start == 0u32;

        let cache: CacheState = Mapping::get(cache_state, 0u8);
        let status: u8 = is_start ? CACHE_STATUS_IN_PROGRESS : cache.status;
        let height: u32 = is_start ? block.height : cache.height;
        let total_bonded: u64 = is_start ? 0u64 : cache.bonded;
        let total_unbonding: u64 = is_start ? 0u64 : cache.unbonding;
        let next_index: u32 = is_start ? 0u32 : cache.next_index;

        // Check cache progress.
        assert_eq(status, CACHE_STATUS_IN_PROGRESS);
        assert_eq(start, next_index);

        // Get the total number of delegators.
        let count: u32 = Mapping::get(delegators_count, 0u8);

        // Cache total bonded and unbonding credits.

        let default_delegator: Delegator = Delegator {delegator: ZERO_ADDRESS, validator: ZERO_ADDRESS, bonded: 0u64};
        let default_bonded: bond_state = bond_state {validator: ZERO_ADDRESS, microcredits: 0u64};
        let default_unbonding: unbond_state = unbond_state {microcredits: 0u64, height: 0u32};

        assert(!Mapping::contains(credits.aleo/bonded, ZERO_ADDRESS) && !Mapping::contains(credits.aleo/unbonding, ZERO_ADDRESS));

        let index: u32 = start + 0u32;
        let delegator: address = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        let bonded: bond_state = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        let unbonding: unbond_state = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 1u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 2u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 3u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 4u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 5u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 6u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 7u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 8u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        index = start + 9u32;
        delegator = Mapping::get_or_use(delegators, index, default_delegator).delegator;
        bonded = Mapping::get_or_use(credits.aleo/bonded, delegator, default_bonded);
        unbonding = Mapping::get_or_use(credits.aleo/unbonding, delegator, default_unbonding);
        total_bonded = total_bonded + bonded.microcredits;
        total_unbonding = total_unbonding + unbonding.microcredits;

        // New next index.
        next_index = start + 10u32;

        // Whether caching is finished.
        let finished: bool = next_index >= count;

        // Update cache state.
        Mapping::set(cache_state, 0u8, CacheState {
            status: !finished ? CACHE_STATUS_IN_PROGRESS : CACHE_STATUS_VALID,
            height: !finished ? height : block.height,
            bonded: total_bonded,
            unbonding: total_unbonding,
            next_index: !finished ? next_index : 0u32, // new next_index
        });

        if (finished) {
            let state_: State = Mapping::get(state, 0u8);
            Mapping::set(state, 0u8, State {
                withdraw: state_.withdraw,
                pending_withdraw: state_.pending_withdraw,
                bonded: total_bonded,
                unbonding: total_unbonding,
                resolved_height: state_.resolved_height,
            });
        }
    }

    async transition set_treasury(public treasury: address) -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);
        return finalize_set_treasury(f, treasury);
    }

    async function finalize_set_treasury(f: Future, treasury: address) {
        f.await();

        let c: Config = Mapping::get(config, 0u8);
        Mapping::set(config, 0u8, Config { paused: c.paused, treasury, protocol_fee: c.protocol_fee });
    }

    async transition set_protocol_fee(public fee: u8) -> Future {
        assert(fee >= 0u8 && fee <= 100u8);
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);
        return finalize_set_protocol_fee(f, fee);
    }

    async function finalize_set_protocol_fee(f: Future, fee: u8) {
        f.await();

        let c: Config = Mapping::get(config, 0u8);
        Mapping::set(config, 0u8, Config { paused: c.paused, treasury: c.treasury, protocol_fee: fee });
    }

    async transition pause() -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_pause(f);
    }

    async function finalize_pause(f: Future) {
        f.await();

        let c: Config = Mapping::get(config, 0u8);
        Mapping::set(config, 0u8, Config { paused: true, treasury: c.treasury, protocol_fee: c.protocol_fee });
    }

    async transition unpause() -> Future {
        let f: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);

        return finalize_unpause(f);
    }

    async function finalize_unpause(f: Future) {
        f.await();

        let c: Config = Mapping::get(config, 0u8);
        Mapping::set(config, 0u8, Config { paused: false, treasury: c.treasury, protocol_fee: c.protocol_fee });
    }

    async transition rescue_tokens(public receiver: address, public amount: u64) -> Future {
        let f1: Future = spectre_acl_manager_v1.aleo/only_staking_admin(self.caller);
        let f2: Future = credits.aleo/transfer_public(receiver, amount);
        return finalize_rescue_tokens(f1, f2);
    }

    async function finalize_rescue_tokens(f1: Future, f2: Future) {
        f1.await();
        f2.await();
    }

    inline getStCreditsFromCredits(credits: u64, total_pooled_credits: u64, total_stcredits_supply: u64) -> u64 {
        let total_pooled_credits_: u64 = total_pooled_credits > 0u64 ? total_pooled_credits: 1u64;
        let total_stcredits_supply_: u64 = total_stcredits_supply > 0u64 ? total_stcredits_supply: 1u64;
        return (credits as u128 * total_stcredits_supply_ as u128 / total_pooled_credits_ as u128) as u64;
    }

    inline getCreditsFromStCredits(stcredits: u64, total_pooled_credits: u64, total_stcredits_supply: u64) -> u64 {
        let total_pooled_credits_: u64 = total_pooled_credits > 0u64 ? total_pooled_credits: 1u64;
        let total_stcredits_supply_: u64 = total_stcredits_supply > 0u64 ? total_stcredits_supply: 1u64;
        return (stcredits as u128 * total_pooled_credits_ as u128 / total_stcredits_supply_ as u128) as u64;
    }
}
