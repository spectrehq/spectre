program spectre_multisig_v1.aleo {
    const ZERO_ADDRESS: address = aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc;

    struct Config {
        owner_count: u8,
        threshold: u8,
    }

    mapping config: u8 => Config; // 0u8 => config

    mapping owners: address => bool;

    // The initial owner.
    // Note: it should be set to the address of the deployer before deployment.
    const INITIAL_OWNER: address = ZERO_ADDRESS;

    /**
     * Initializes the multisig with the given owners and threshold.
     * @param all_owners List of owners. At most 5 owners are allowed. Zero address will be ignored.
     * @param owner_count Number of owners.
     * @param threshold Number of confirmations required to execute a transition.
     */
    async transition initialize(
        public all_owners: [address; 5],
        public owner_count: u8,
        public threshold: u8,
    ) -> Future {
        assert_eq(self.caller, INITIAL_OWNER);

        let count: u8 = 0u8;
        for i: u32 in 0u32..5u32 {
            let owner: address = all_owners[i];
            if (owner != ZERO_ADDRESS) {
                // Owner address cannot be the program itself.
                assert(owner != self.address);

                count += 1u8;
            }
        }

        // Owner count must match the number of owners.
        assert(owner_count == count);

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0 && threshold <= owner_count);

        return finalize_initialize(all_owners, owner_count, threshold);
    }

    async function finalize_initialize(
        all_owners: [address; 5],
        owner_count: u8,
        threshold: u8,
    ) {
        // Initialize only once.
        assert(!config.contains(0u8));

        for i: u32 in 0u32..5u32 {
            let owner: address = all_owners[i];
            if (owner != ZERO_ADDRESS) {
                // No duplicate owners allowed.
                assert(!owners.contains(owner));

                owners.set(owner, true);
            }
        }

        config.set(0u8, Config {
            owner_count,
            threshold,
        });
    }

    /**
     * Adds the owner `owner` to the multisig and updates the threshold to `threshold`.
     * This can only be done via a multisig transition.
     * @param owner New owner address.
     * @param threshold New threshold.
     */
    async transition add_owner_with_threshold(
        public owner: address,
        public threshold: u8,
    ) -> Future {
        // Owner address cannot be zero or the program itself.
        assert(owner != ZERO_ADDRESS && owner != self.address);

        return finalize_add_owner_with_threshold(owner, threshold);
    }

    async function finalize_add_owner_with_threshold(
        owner: address,
        threshold: u8,
    ) {
        // No duplicate owners allowed.
        assert(!owners.contains(owner));

        owners.set(owner, true);

        let owner_count: u8 = config.get(0u8).owner_count + 1;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0 && threshold <= owner_count);

        config.set(0u8, Config {
            owner_count,
            threshold,
        });
    }

    /**
     * Removes the owner `owner` from the multisig and updates the threshold to `threshold`.
     * This can only be done via a multisig transition.
     * @param owner Owner address to be removed.
     * @param threshold New threshold.
     */
    async transition remove_owner(
        public owner: address,
        public threshold: u8,
    ) {
        return finalize_remove_owner(owner, threshold);
    }

    async function finalize_remove_owner(
        owner: address,
        threshold: u8,
    ) {
        // Owner must exist.
        assert(owners.contains(owner));

        owners.remove(owner);

        let owner_count: u8 = config.get(0u8).owner_count - 1;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0 && threshold <= owner_count);

        config.set(0u8, Config {
            owner_count,
            threshold,
        });
    }

    /**
     * Replaces the owner `old_owner` in the multisig with `new_owner`.
     * This can only be done via a multisig transition.
     * @param old_owner Owner address to be replaced.
     * @param new_owner New owner address.
     */
    async transition swap_owner(
        public old_owner: address,
        public new_owner: address,
    ) -> Future {
        // Owner address cannot be zero or the program itself.
        assert(new_owner != ZERO_ADDRESS && new_owner != self.address);

        return finalize_swap_owner(old_owner, new_owner);
    }

    async function finalize_swap_owner(
        old_owner: address,
        new_owner: address,
    ) {
        // Owner must exist.
        assert(owners.contains(old_owner));
        // No duplicate owners allowed.
        assert(!owners.contains(new_owner));

        owners.remove(old_owner);
        owners.set(new_owner, true);
    }

    /**
     * Changes the threshold of the multisig to `threshold`.
     * This can only be done via a multisig transition.
     * @param threshold New threshold.
     */
    async transition change_threshold(
        public threshold: u8,
    ) -> Future {
        return finalize_change_threshold(threshold);
    }

    async function finalize_change_threshold(
        threshold: u8,
    ) {
        let owner_count: u8 = config.get(0u8).owner_count;

        // Threshold must be greater than 0 and less than or equal to the number of owners.
        assert(threshold > 0 && threshold <= owner_count);

        config.set(0u8, Config {
            owner_count,
            threshold,
        });
    }
}
