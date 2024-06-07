program spectre_pool_v1.aleo;

struct ReserveConfiguration:
    ltv as u16;
    liquidation_threshold as u16;
    liquidation_bonus as u16;
    decimals as u8;
    is_active as boolean;
    is_frozen as boolean;
    borrowing_enabled as boolean;
    is_paused as boolean;
    borrowing_in_isolation_mode as boolean;
    siloed_borrowing_enabled as boolean;
    reserve_factor as u16;
    borrow_cap as u64;
    supply_cap as u64;
    liquidation_protocol_fee as u16;
    emode_category as u8;
    debt_ceiling as u64;


function main:
