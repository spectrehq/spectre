program spectre_multisig_v1.aleo {
    const ZERO_ADDRESS: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

    struct Config {
        owner_count: u8,
        threshold: u8,
    }

    mapping config: u8 => Config; // 0u8 => config

    mapping multisigs: address => Config; // multisig address => config

    struct Pair {
        multisig: address,
        owner_: address, // because 'owner' is a reserved keyword
    }

    // multisig address (sentinel) => 0-th owner,
    // hash(0-th owner) => 1-th owner,
    // ...,
    // hash(n-th owner) => zero owner (sentinel).
    mapping owners: address => Pair;

    // owner (sentinel) => 0-th multisig,
    // hash(0-th multisig) => 1-th multisig,
    // ...,
    // hash(n-th multisig) => zero multisig (sentinel).
    mapping multisig_by_owner: address => Pair;

    struct InitialConfig {
        all_owners: [address; 3],
        owner_count: u8,
        threshold: u8,
        salt_nonce: u16,
    }

    /**
     * Create a multisig account with the given owners and threshold.
     * @param multisig Multisig address. Must match the derived multisig address.
     * @param all_owners List of owners. At most 3 owners are allowed. Non-zero addresses must be placed before zero addresses. Trailing zero address will be ignored.
     * @param owner_count Number of owners. Must match the number of non-zero addresses in `all_owners`.
     * @param threshold Number of confirmations required to execute a transition.
     * @param salt_nonce Salt nonce used to derive the multisig address.
     */
    async transition create(
        public multisig: address,
        public all_owners: [address; 3],
        public owner_count: u8,
        public threshold: u8,
        public salt_nonce: u16,
    ) -> Future {
        // Check the multisig address.
        assert_eq(multisig, BHP256::hash_to_address(InitialConfig {
            all_owners,
            owner_count,
            threshold,
            salt_nonce,
        }));

        let count: u8 = 0u8;
        for i: u8 in 0u8..3u8 {
            let owner: address = all_owners[i];
            // Trailing zero address will be ignored.
            if (owner != ZERO_ADDRESS) {
                // Non-zero addresses must be placed before zero addresses.
                assert(i < owner_count);

                // Owner address cannot be the multisig address or the program itself.
                assert(owner != multisig && owner != self.address);

                count += 1u8;
            }
        }

        // Owner count must match the number of owners.
        assert(owner_count == count);

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        return finalize_create(multisig, all_owners, owner_count, threshold);
    }

    async function finalize_create(
        multisig: address,
        all_owners: [address; 3],
        owner_count: u8,
        threshold: u8,
    ) {
        // No duplicate multisig accounts allowed.
        assert(!multisigs.contains(multisig));
        assert(!owners.contains(multisig));

        multisigs.set(multisig, Config {
            owner_count,
            threshold,
        });

        // Initialize the starting sentinel.
        let current_owner_key: address = multisig;

        for i: u8 in 0u8..3u8 {
            let owner: address = all_owners[i];

            let pair: Pair = Pair {
                multisig,
                owner_: owner,
            };
            let key: address = BHP256::hash_to_address(pair);

            if (owner != ZERO_ADDRESS) {
                // No duplicate owners allowed.
                assert(key != current_owner_key);
                assert(!owners.contains(key));

                owners.set(current_owner_key, pair);

                // No duplicate `multisig_by_owner` allowed.
                assert(!multisig_by_owner.contains(key));

                multisig_by_owner.set(key, multisig_by_owner.get_or_use(owner, Pair {
                    multisig: ZERO_ADDRESS,
                    owner_: owner,
                }));
                multisig_by_owner.set(owner, pair);
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
        public multisig: address,
        public owner: address,
        public threshold: u8,
    ) -> Future {
        // Owner address cannot be zero, the multisig address or the program itself.
        assert(owner != ZERO_ADDRESS && owner != multisig && owner != self.address);

        return finalize_add_owner_with_threshold(multisig, owner, threshold);
    }

    async function finalize_add_owner_with_threshold(
        multisig: address,
        owner: address,
        threshold: u8,
    ) {
        let pair: Pair = Pair {
            multisig,
            owner_: owner,
        };
        let key: address = BHP256::hash_to_address(pair);

        // No duplicate owners allowed.
        assert(!owners.contains(key));

        // Push the new owner to the front of the linked list.
        owners.set(key, owners.get(multisig));
        owners.set(multisig, pair);
        multisig_by_owner.set(key, multisig_by_owner.get_or_use(owner, Pair {
            multisig: ZERO_ADDRESS,
            owner_: owner,
        }));
        multisig_by_owner.set(owner, pair);

        let owner_count: u8 = multisigs.get(multisig).owner_count + 1u8;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        multisigs.set(multisig, Config {
            owner_count,
            threshold,
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
        public multisig: address,
        public owner: address,
        public prev_owner_key: address,
        public prev_multisig_key: address,
        public threshold: u8,
    ) -> Future {
        // Owner address cannot be zero, or the multisig address.
        assert(owner != ZERO_ADDRESS && owner != multisig);

        return finalize_remove_owner(multisig, owner, prev_owner_key, prev_multisig_key, threshold);
    }

    async function finalize_remove_owner(
        multisig: address,
        owner: address,
        prev_owner_key: address,
        prev_multisig_key: address,
        threshold: u8,
    ) {
        let pair: Pair = owners.get(prev_owner_key);
        let pair2: Pair = multisig_by_owner.get(prev_multisig_key);

        let key: address = BHP256::hash_to_address(pair);

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

        let owner_count: u8 = multisigs.get(multisig).owner_count - 1u8;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        multisigs.set(multisig, Config {
            owner_count,
            threshold,
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
        public multisig: address,
        public old_owner: address,
        public new_owner: address,
        public prev_owner_key: address,
        public prev_multisig_key: address,
    ) -> Future {
        // Owner address cannot be zero, the multisig address or the program itself.
        assert(new_owner != ZERO_ADDRESS && new_owner != multisig && new_owner != self.address);
        assert(old_owner != ZERO_ADDRESS && old_owner != multisig);

        return finalize_swap_owner(multisig, old_owner, new_owner, prev_owner_key, prev_multisig_key);
    }

    async function finalize_swap_owner(
        multisig: address,
        old_owner: address,
        new_owner: address,
        prev_owner_key: address,
        prev_multisig_key: address,
    ) {
        let old_pair: Pair = owners.get(prev_owner_key);
        let old_pair2: Pair = multisig_by_owner.get(prev_multisig_key);

        let old_key: address = BHP256::hash_to_address(old_pair);

        let new_pair: Pair = Pair {
            multisig,
            owner_: new_owner,
        };
        let new_key: address = BHP256::hash_to_address(new_pair);

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
        multisig_by_owner.set(new_key, multisig_by_owner.get_or_use(new_owner, Pair {
            multisig: ZERO_ADDRESS,
            owner_: new_owner,
        }));
        multisig_by_owner.set(new_owner, new_pair);
    }

    /**
     * Changes the threshold of the multisig to `threshold`.
     * This can only be done via a multisig transition.
     * @param multisig Multisig address.
     * @param threshold New threshold.
     */
    async transition change_threshold(
        public multisig: address,
        public threshold: u8,
    ) -> Future {
        return finalize_change_threshold(multisig, threshold);
    }

    async function finalize_change_threshold(
        multisig: address,
        threshold: u8,
    ) {
        let owner_count: u8 = multisigs.get(multisig).owner_count;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0u8 && threshold <= owner_count);

        multisigs.set(multisig, Config {
            owner_count,
            threshold,
        });
    }
}
