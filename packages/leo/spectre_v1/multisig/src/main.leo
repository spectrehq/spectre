program spectre_multisig_v1.aleo {
    const ZERO_ADDRESS: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

    struct Multisig {
        owner_count: u8,
        threshold: u8,
        program_: address, // the program that created the multisig; add suffix `_` since `program` is a reserved keyword
    }

    mapping multisigs: field => Multisig; // multisig id => multisig config

    struct Pair {
        multisig: field,
        owner_: address, // add suffix `_` since `owner` is a reserved keyword
    }

    // multisig id (sentinel) => 0-th owner,
    // hash(0-th owner) => 1-th owner,
    // ...,
    // hash(n-th owner) => zero owner (sentinel).
    mapping owners: field => Pair;

    // owner (as field) (sentinel) => 0-th multisig,
    // hash(0-th multisig) => 1-th multisig,
    // ...,
    // hash(n-th multisig) => zero multisig (sentinel).
    mapping multisig_by_owner: field => Pair;

    struct InitialMultisig {
        all_owners: [address; 3],
        owner_count: u8,
        threshold: u8,
        salt_nonce: u16,
    }

    /**
     * Setup a new multisig with the given owners and threshold.
     * @param multisig Multisig ID. Must match the derived multisig ID.
     * @param all_owners List of owners. At most 3 owners are allowed. Non-zero addresses must be placed before zero addresses. Trailing zero address will be ignored.
     * @param owner_count Number of owners. Must match the number of non-zero addresses in `all_owners`.
     * @param threshold Number of confirmations required to execute a transition.
     * @param salt_nonce Salt nonce used to derive the multisig ID. Not used if the caller is a program.
     */
    async transition setup(
        public multisig: field,
        public all_owners: [address; 3],
        public owner_count: u8,
        public threshold: u8,
        public salt_nonce: u16,
    ) -> Future {
        let program_: address = self.caller != self.signer ? (self.caller as address): ZERO_ADDRESS;

        // If caller is a program, multisig id will be set to the program address (as field).
        // Otherwise, multisig id will be derived from the initial config.
        let multisig_derived: field = self.caller != self.signer ? (self.caller as field) : BHP256::hash_to_field(InitialMultisig {
            all_owners,
            owner_count,
            threshold,
            salt_nonce,
        });
        // Check the multisig id.
        assert_eq(multisig, multisig_derived);

        let count: u8 = 0u8;
        for i: u8 in 0u8..3u8 {
            let owner: address = all_owners[i];
            // Trailing zero address will be ignored.
            if (owner != ZERO_ADDRESS) {
                // Non-zero addresses must be placed before zero addresses.
                assert(i < owner_count);

                // Owner address cannot be the the program itself.
                assert(owner != self.address);

                count += 1u8;
            }
        }

        // Owner count must match the number of owners.
        assert(owner_count == count);

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        return finalize_setup(multisig, all_owners, owner_count, threshold, program_);
    }

    async function finalize_setup(
        multisig: field,
        all_owners: [address; 3],
        owner_count: u8,
        threshold: u8,
        program_: address,
    ) {
        // No duplicate multisig allowed.
        assert(!multisigs.contains(multisig));
        assert(!owners.contains(multisig));

        multisigs.set(multisig, Multisig {
            owner_count,
            threshold,
            program_,
        });

        // Initialize the starting sentinel.
        let current_owner_key: field = multisig;

        for i: u8 in 0u8..3u8 {
            let owner: address = all_owners[i];

            let pair: Pair = Pair {
                multisig,
                owner_: owner,
            };
            let key: field = BHP256::hash_to_field(pair);

            if (owner != ZERO_ADDRESS) {
                // No duplicate owners allowed.
                assert(key != current_owner_key);
                assert(!owners.contains(key));

                owners.set(current_owner_key, pair);

                // No duplicate `multisig_by_owner` allowed.
                assert(!multisig_by_owner.contains(key));

                multisig_by_owner.set(key, multisig_by_owner.get_or_use(owner as field, Pair {
                    multisig: 0field,
                    owner_: owner,
                }));
                multisig_by_owner.set(owner as field, pair);
            }

            current_owner_key = owner != ZERO_ADDRESS ? key : current_owner_key;
        }

        // Set the ending sentinel.
        owners.set(current_owner_key, Pair {
            multisig,
            owner_: ZERO_ADDRESS,
        });
    }

    /**
     * Adds the owner `owner` to the multisig and updates the threshold to `threshold`.
     * This can only be done via a multisig transition.
     * @param multisig Multisig address.
     * @param owner New owner address.
     * @param threshold New threshold.
     */
    async transition add_owner_with_threshold(
        public multisig: field,
        public owner: address,
        public threshold: u8,
    ) -> Future {
        // Owner address cannot be zero or the program itself.
        assert(owner != ZERO_ADDRESS && owner != self.address);

        return finalize_add_owner_with_threshold(multisig, owner, threshold);
    }

    async function finalize_add_owner_with_threshold(
        multisig: field,
        owner: address,
        threshold: u8,
    ) {
        let pair: Pair = Pair {
            multisig,
            owner_: owner,
        };
        let key: field = BHP256::hash_to_field(pair);

        // No duplicate owners allowed.
        assert(!owners.contains(key));

        // Push the new owner to the front of the linked list.
        owners.set(key, owners.get(multisig));
        owners.set(multisig, pair);
        multisig_by_owner.set(key, multisig_by_owner.get_or_use(owner as field, Pair {
            multisig: 0field,
            owner_: owner,
        }));
        multisig_by_owner.set(owner as field, pair);

        let cfg: Multisig = multisigs.get(multisig);
        let owner_count: u8 = cfg.owner_count + 1u8;
        let program_: address = cfg.program_;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        multisigs.set(multisig, Multisig {
            owner_count,
            threshold,
            program_,
        });
    }

    /**
     * Removes the owner `owner` from the multisig and updates the threshold to `threshold`.
     * This can only be done via a multisig transition.
     * @param multisig Multisig address.
     * @param owner Owner address to be removed.
     * @param prev_owner_key Key of owner that pointed to the owner to be removed in the linked list `owners`.
     * @param prev_multisig_key Key of multisig that pointed to the multisig to be removed in the linked list `multisig_by_owner`.
     * @param threshold New threshold.
     */
    async transition remove_owner(
        public multisig: field,
        public owner: address,
        public prev_owner_key: field,
        public prev_multisig_key: field,
        public threshold: u8,
    ) -> Future {
        // Owner address cannot be zero.
        assert(owner != ZERO_ADDRESS);

        return finalize_remove_owner(multisig, owner, prev_owner_key, prev_multisig_key, threshold);
    }

    async function finalize_remove_owner(
        multisig: field,
        owner: address,
        prev_owner_key: field,
        prev_multisig_key: field,
        threshold: u8,
    ) {
        let pair: Pair = owners.get(prev_owner_key);
        let pair2: Pair = multisig_by_owner.get(prev_multisig_key);

        let key: field = BHP256::hash_to_field(pair);

        // Owner must exist.
        assert(pair.multisig == multisig && pair.owner_ == owner);
        assert_eq(pair, pair2);
        assert(owners.contains(key));
        assert(multisig_by_owner.contains(key));

        // Remove the owner from the linked list.
        owners.set(prev_owner_key, owners.get(key));
        owners.remove(key);
        multisig_by_owner.set(prev_multisig_key, multisig_by_owner.get(key));
        multisig_by_owner.remove(key);

        let cfg: Multisig = multisigs.get(multisig);
        let owner_count: u8 = cfg.owner_count - 1u8;
        let program_: address = cfg.program_;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        multisigs.set(multisig, Multisig {
            owner_count,
            threshold,
            program_,
        });
    }

    /**
     * Replaces the owner `old_owner` in the multisig with `new_owner`.
     * This can only be done via a multisig transition.
     * @param multisig Multisig address.
     * @param prev_owner Owner that pointed to the owner to be replaced in the linked list.
     * @param old_owner Owner address to be replaced.
     * @param new_owner New owner address.
     * @param prev_owner_key Key of owner that pointed to the owner to be replaced in the linked list `owners`.
     * @param prev_multisig_key Key of multisig that pointed to the multisig of the old owner to be removed in the linked list `multisig_by_owner`.
     */
    async transition swap_owner(
        public multisig: field,
        public old_owner: address,
        public new_owner: address,
        public prev_owner_key: field,
        public prev_multisig_key: field,
    ) -> Future {
        // Owner address cannot be zero or the program itself.
        assert(new_owner != ZERO_ADDRESS && new_owner != self.address);
        assert(old_owner != ZERO_ADDRESS);

        return finalize_swap_owner(multisig, old_owner, new_owner, prev_owner_key, prev_multisig_key);
    }

    async function finalize_swap_owner(
        multisig: field,
        old_owner: address,
        new_owner: address,
        prev_owner_key: field,
        prev_multisig_key: field,
    ) {
        let old_pair: Pair = owners.get(prev_owner_key);
        let old_pair2: Pair = multisig_by_owner.get(prev_multisig_key);

        let old_key: field = BHP256::hash_to_field(old_pair);

        let new_pair: Pair = Pair {
            multisig,
            owner_: new_owner,
        };
        let new_key: field = BHP256::hash_to_field(new_pair);

        // Owner must exist.
        assert(old_pair.multisig == multisig && old_pair.owner_ == old_owner);
        assert_eq(old_pair, old_pair2);
        assert(owners.contains(old_key));
        assert(multisig_by_owner.contains(old_key));

        // No duplicate owners allowed.
        assert(!owners.contains(new_key));

        // Swap the owner.
        owners.set(new_key, owners.get(old_key));
        owners.set(prev_owner_key, new_pair);
        owners.remove(old_key);

        // Remove the multisig of the old owner from the linked list `multisig_by_owner`.
        multisig_by_owner.set(prev_multisig_key, multisig_by_owner.get(old_key));
        multisig_by_owner.remove(old_key);

        // Push the multisig of the new owner to the front of the linked list `multisig_by_owner`.
        multisig_by_owner.set(new_key, multisig_by_owner.get_or_use(new_owner as field, Pair {
            multisig: 0field,
            owner_: new_owner,
        }));
        multisig_by_owner.set(new_owner as field, new_pair);
    }

    /**
     * Changes the threshold of the multisig to `threshold`.
     * This can only be done via a multisig transition.
     * @param multisig Multisig address.
     * @param threshold New threshold.
     */
    async transition change_threshold(
        public multisig: field,
        public threshold: u8,
    ) -> Future {
        return finalize_change_threshold(multisig, threshold);
    }

    async function finalize_change_threshold(
        multisig: field,
        threshold: u8,
    ) {
        let cfg: Multisig = multisigs.get(multisig);
        let owner_count: u8 = cfg.owner_count;
        let program_: address = cfg.program_;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        multisigs.set(multisig, Multisig {
            owner_count,
            threshold,
            program_,
        });
    }

    mapping nonces: field => u128; // multisig id => nonce

    struct Approval {
        multisig: field,
        owner_: address, // add suffix `_` since `owner` is a reserved keyword
        executor: address, // executor program address
        data_hash: field, // data hash to approve
        nonce: u128,
    }

    mapping approved_hashes: field => bool; // hash(Approval) => true

    async transition approve_hash(
        public multisig: field,
        public executor: address,
        public data_hash: field,
        public nonce: u128,
    ) -> Future {
        let owner_: address = self.caller;

        let owner_key: field = BHP256::hash_to_field(Pair {
            multisig,
            owner_,
        });

        let approval_key: field = BHP256::hash_to_field(Approval {
            multisig,
            owner_,
            executor,
            data_hash,
            nonce,
        });

        return finalize_approve_hash(owner_key, approval_key);
    }

    async function finalize_approve_hash(
        owner_key: field,
        approval_key: field,
    ) {
        assert(owners.contains(owner_key));

        approved_hashes.set(approval_key, true);
    }

    async transition execute_10(
        public multisig: field,
        public approvers: [address; 10],
        public data_hash: field,
    ) -> Future {
        return finalize_execute_10(multisig, approvers, self.caller, data_hash, self.signer);
    }

    async function finalize_execute_10(
        multisig: field,
        approvers: [address; 10],
        executor: address,
        data_hash: field,
        signer: address,
    ) {
        let cfg: Multisig = multisigs.get(multisig);
        // If the multisig is bound to a program, the executor must be the program itself.
        assert(cfg.program_ == ZERO_ADDRESS || cfg.program_ == executor);

        // Get the current nonce.
        let nonce: u128 = nonces.get_or_use(multisig, 0u128);

        let approvals: u8 = 0u8;
        let last_owner: field = 0field;
        for i: u8 in 0u8..10u8 {
            let owner_: address = approvers[i];

            let owner_key: field = BHP256::hash_to_field(Pair {
                multisig,
                owner_,
            });

            let approval_key: field = BHP256::hash_to_field(Approval {
                multisig,
                owner_,
                executor,
                data_hash,
                nonce,
            });

            if (owner_ != ZERO_ADDRESS) {
                // Check approvers and approved hashes.
                assert(owners.contains(owner_key));
                assert(approved_hashes.contains(approval_key));

                // Owners must be unique.
                assert(owner_ as field > last_owner);
            }

            last_owner = owner_ != ZERO_ADDRESS ? owner_ as field : last_owner;

            approvals = owner_ != ZERO_ADDRESS ? approvals + 1u8 : approvals;
        }

        // The number of approvals must match threshold.
        assert_eq(cfg.threshold, approvals);

        // Increment the nonce.
        nonces.set(multisig, nonce + 1u128);
    }
}
