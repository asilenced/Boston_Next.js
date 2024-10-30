module fullsail::vote_manager {
    use std::string::{Self, String};
    use std::coin::{Self, Coin};
    use std::vector;
    use aptos_framework::event;
    use aptos_framework::code;
    use aptos_framework::aptos_account;
    use aptos_framework::object::{Self, Object};
    use aptos_framework::smart_table::{Self, SmartTable};
    use aptos_framework::smart_vector::{Self, SmartVector};
    use aptos_framework::simple_map::{Self, SimpleMap};
    use aptos_framework::fungible_asset::{Self, FungibleAsset, Metadata};
    use aptos_framework::signer;
    use aptos_framework::primary_fungible_store;
    use fullsail::voting_escrow::VeCellanaToken;
    use fullsail::gauge::Gauge;
    use fullsail::liquidity_pool::LiquidityPool;
    use fullsail::rewards_pool::RewardsPool;
    use fullsail::package_manager;

    // --- friends modules ---
    friend fullsail::router;
    
    // --- errors ---
    const E_GAUGE_INACTIVE: u64 = 1;
    const E_NOT_OWNER: u64 = 2;
    const E_INVALID_COIN: u64 = 3;
    const E_VECTOR_LENGTH_MISMATCH: u64 = 4;
    const E_NOT_OPERATOR: u64 = 5;
    const E_GAUGE_NOT_EXISTS: u64 = 6;
    const E_REWARD_TOKEN_NOT_WHITELISTED: u64 = 7;
    const E_TOKENS_RECENTLY_VOTED: u64 = 8;
    const E_NO_VOTES_FOR_TOKEN: u64 = 9;
    const E_NFT_EXISTS: u64 = 10;
    const E_ALREADY_VOTED_THIS_EPOCH: u64 = 11;
    const E_RECENTLY_VOTED: u64 = 12;
    const E_NOT_GOVERNANCE: u64 = 13;
    const E_ZERO_TOTAL_WEIGHT: u64 = 14;
    const E_GAUGE_NOT_FOUND: u64 = 15;
    const E_GAUGE_ALREADY_ACTIVE: u64 = 16;

    // --- structs ---
    struct AdministrativeData has key {
        active_gauges: SmartTable<Object<Gauge>, bool>,
        active_gauges_list: SmartVector<Object<Gauge>>,
        pool_to_gauge: SmartTable<Object<LiquidityPool>, Object<Gauge>>,
        gauge_to_fees_pool: SmartTable<Object<Gauge>, Object<RewardsPool>>,
        gauge_to_incentive_pool: SmartTable<Object<Gauge>, Object<RewardsPool>>,
        operator: address,
        governance: address,
        pending_distribution_epoch: u64,
    }

    struct NullCoin {
        dummy_field: bool,
    }

    struct VeTokenVoteAccounting has key {
        votes_for_pools_by_ve_token: SmartTable<Object<VeCellanaToken>, SimpleMap<Object<LiquidityPool>, u64>>,
        last_voted_epoch: SmartTable<Object<VeCellanaToken>, u64>,
    }
    
    // --- events ---
    #[event]
    struct AbstainEvent has drop, store {
        owner: address,
        ve_token: Object<VeCellanaToken>,
    }

    #[event]
    struct AdvanceEpochEvent has drop, store {
        epoch: u64,
    }

    #[event]
    struct CreateGaugeEvent has drop, store {
        gauge: Object<Gauge>,
        creator: address,
        pool: Object<LiquidityPool>,
    }

    #[event]
    struct GaugeVoteAccounting has key {
        total_votes: u128,
        votes_for_gauges: SimpleMap<Object<Gauge>, u128>,
    }

    #[event]
    struct VoteEvent has drop, store {
        owner: address,
        ve_token: Object<VeCellanaToken>,
        pools: vector<Object<LiquidityPool>>,
        weights: vector<u64>,
    }

    #[event]
    struct WhitelistEvent has drop, store {
        tokens: vector<String>,
    }

    #[event]
    struct WhitelistRewardEvent has drop, store {
        tokens: vector<String>,
        is_wl: bool,
    }

    // init
    public entry fun initialize() {
        if (is_initialized()) {
            return
        };

        fullsail::cellana_token::initialize();
        fullsail::coin_wrapper::initialize();
        fullsail::liquidity_pool::initialize();
        fullsail::voting_escrow::initialize();
        fullsail::minter::initialize();
        fullsail::token_whitelist::initialize();

        let signer = fullsail::package_manager::get_signer();
        let object = object::create_object_from_account(&signer);
        let object_signer = object::generate_signer(&object);
        let object_signer_ref = &object_signer;

        fullsail::package_manager::add_address(string::utf8(b"VOTE_MANAGER"), signer::address_of(object_signer_ref));
        
        let admin_data = AdministrativeData{
            active_gauges: smart_table::new<Object<Gauge>, bool>(),
            active_gauges_list: smart_vector::new<Object<Gauge>>(),
            pool_to_gauge: smart_table::new<Object<LiquidityPool>, Object<Gauge>>(),
            gauge_to_fees_pool: smart_table::new<Object<Gauge>, Object<RewardsPool>>(),
            gauge_to_incentive_pool: smart_table::new<Object<Gauge>, Object<RewardsPool>>(),
            operator: @0xf2b948595bd7e12856942016544da14aca954dd182b3987466205a61843fb17c,
            governance: @0xf2b948595bd7e12856942016544da14aca954dd182b3987466205a61843fb17c,
            pending_distribution_epoch: fullsail::epoch::now(),
        };
        move_to<AdministrativeData>(object_signer_ref, admin_data);

        let gauge_vote_accounting = GaugeVoteAccounting{
            total_votes: 0,
            votes_for_gauges: simple_map::new<Object<Gauge>, u128>(),
        };     
        move_to<GaugeVoteAccounting>(object_signer_ref, gauge_vote_accounting);

        let ve_token_vote_accounting = VeTokenVoteAccounting{
            votes_for_pools_by_ve_token: smart_table::new<Object<VeCellanaToken>, SimpleMap<Object<LiquidityPool>, u64>>(),
            last_voted_epoch: smart_table::new<Object<VeCellanaToken>, u64>(),
        };
        move_to<VeTokenVoteAccounting>(object_signer_ref, ve_token_vote_accounting);
    }

    public fun is_initialized() : bool {
        fullsail::package_manager::address_exists(string::utf8(b"VOTE_MANAGER"))
    }

    public entry fun claim_rewards<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
        account: &signer, 
        ve_token: Object<VeCellanaToken>,
        liquidity_pool: Object<LiquidityPool>,
        amount: u64
        ) acquires AdministrativeData {
        let gauge = get_gauge(liquidity_pool);
        assert!(is_gauge_active(gauge), E_GAUGE_INACTIVE);

        let account_addr = signer::address_of(account);
        assert!(object::is_owner<VeCellanaToken>(ve_token, account_addr), E_NOT_OWNER);
        
        let ve_token_addr = object::object_address<VeCellanaToken>(&ve_token);
        let fees_pool = fees_pool(liquidity_pool);
        
        let rewards = fullsail::rewards_pool::claim_rewards(ve_token_addr, fees_pool, amount);
        let incentive_pool = incentive_pool(liquidity_pool);
        vector::append<fungible_asset::FungibleAsset>(&mut rewards, fullsail::rewards_pool::claim_rewards(ve_token_addr, incentive_pool, amount));
        
        let valid_coins = vector::empty<String>();
        add_valid_coin<T0>(&mut valid_coins);
        add_valid_coin<T1>(&mut valid_coins);
        add_valid_coin<T2>(&mut valid_coins);
        add_valid_coin<T3>(&mut valid_coins);
        add_valid_coin<T4>(&mut valid_coins);
        add_valid_coin<T5>(&mut valid_coins);
        add_valid_coin<T6>(&mut valid_coins);
        add_valid_coin<T7>(&mut valid_coins);
        add_valid_coin<T8>(&mut valid_coins);
        add_valid_coin<T9>(&mut valid_coins);
        add_valid_coin<T10>(&mut valid_coins);
        add_valid_coin<T11>(&mut valid_coins);
        add_valid_coin<T12>(&mut valid_coins);
        add_valid_coin<T13>(&mut valid_coins);
        add_valid_coin<T14>(&mut valid_coins);

        vector::reverse<FungibleAsset>(&mut rewards);
        let rewards_length = vector::length<FungibleAsset>(&rewards);
        while (rewards_length > 0) {
            let reward = vector::pop_back<FungibleAsset>(&mut rewards);
            if (fungible_asset::amount(&reward) == 0) {
                fungible_asset::destroy_zero(reward);
            } else {
                let metadata = fungible_asset::asset_metadata(&reward);
                if (fullsail::coin_wrapper::is_wrapper(metadata)) {
                    let original = fullsail::coin_wrapper::get_original(metadata);
                    let (found, index) = vector::index_of<String>(&valid_coins, &original);
                    assert!(found, E_INVALID_COIN);

                    if (index == 0) { unwrap_and_deposit<T0>(account_addr, reward); }
                    else if (index == 1) { unwrap_and_deposit<T1>(account_addr, reward); }
                    else if (index == 2) { unwrap_and_deposit<T2>(account_addr, reward); }
                    else if (index == 3) { unwrap_and_deposit<T3>(account_addr, reward); }
                    else if (index == 4) { unwrap_and_deposit<T4>(account_addr, reward); }
                    else if (index == 5) { unwrap_and_deposit<T5>(account_addr, reward); }
                    else if (index == 6) { unwrap_and_deposit<T6>(account_addr, reward); }
                    else if (index == 7) { unwrap_and_deposit<T7>(account_addr, reward); }
                    else if (index == 8) { unwrap_and_deposit<T8>(account_addr, reward); }
                    else if (index == 9) { unwrap_and_deposit<T9>(account_addr, reward); }
                    else if (index == 10) { unwrap_and_deposit<T10>(account_addr, reward); }
                    else if (index == 11) { unwrap_and_deposit<T11>(account_addr, reward); }
                    else if (index == 12) { unwrap_and_deposit<T12>(account_addr, reward); }
                    else if (index == 13) { unwrap_and_deposit<T13>(account_addr, reward); }
                    else {
                        assert!(index == 14, E_INVALID_COIN);
                        unwrap_and_deposit<T14>(account_addr, reward);
                    };
                } else {
                    primary_fungible_store::deposit(account_addr, reward);
                };
            };
            rewards_length = rewards_length - 1;
        };
        vector::destroy_empty<FungibleAsset>(rewards);
    }

    public fun claimable_rewards(ve_token: Object<VeCellanaToken>, liquidity_pool: Object<LiquidityPool>, amount: u64) : SimpleMap<String, u64> acquires AdministrativeData {
        let ve_token_address = object::object_address<fullsail::voting_escrow::VeCellanaToken>(&ve_token);
        
        let fees_pool = fees_pool(liquidity_pool);
        let (fee_metadata, fee_amounts) = simple_map::to_vec_pair<Object<Metadata>, u64>(fullsail::rewards_pool::claimable_rewards(ve_token_address, fees_pool, amount));
        
        let incentive_pool = incentive_pool(liquidity_pool);
        let (incentive_metadata, incentive_amounts) = simple_map::to_vec_pair<Object<Metadata>, u64>(fullsail::rewards_pool::claimable_rewards(ve_token_address, incentive_pool, amount));
        
        vector::append<Object<Metadata>>(&mut fee_metadata, incentive_metadata);
        vector::append<u64>(&mut fee_amounts, incentive_amounts);
        
        let combined_rewards = simple_map::new<String, u64>();
        
        vector::reverse<Object<Metadata>>(&mut fee_metadata);
        vector::reverse<u64>(&mut fee_amounts);
        
        let metadata_len = vector::length<Object<Metadata>>(&fee_metadata);
        assert!(metadata_len == vector::length<u64>(&fee_amounts), E_VECTOR_LENGTH_MISMATCH);
        
        while (metadata_len > 0) {
            let amount = vector::pop_back<u64>(&mut fee_amounts);
            if (amount > 0) {
                let coin_name = fullsail::coin_wrapper::get_original(vector::pop_back<Object<Metadata>>(&mut fee_metadata));
                if (simple_map::contains_key<String, u64>(&combined_rewards, &coin_name)) {
                    let current_amount = simple_map::borrow_mut<String, u64>(&mut combined_rewards, &coin_name);
                    *current_amount = *current_amount + amount;
                } else {
                    simple_map::add<String, u64>(&mut combined_rewards, coin_name, amount);
                };
            };
            metadata_len = metadata_len - 1;
        };
        vector::destroy_empty<Object<Metadata>>(fee_metadata);
        vector::destroy_empty<u64>(fee_amounts);
        combined_rewards
    }
    
    public entry fun whitelist_coin<T>(account: &signer) acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);
        
        fullsail::token_whitelist::whitelist_coin<T>();
        fullsail::coin_wrapper::create_fungible_asset<T>();
        
        let tokens = vector::empty<string::String>();
        vector::push_back<string::String>(&mut tokens, fullsail::coin_wrapper::format_coin<T>());
        
        let whitelist_event = WhitelistEvent{tokens: tokens};
        event::emit<WhitelistEvent>(whitelist_event);
    }

    public entry fun whitelist_native_fungible_assets(account: &signer, assets: vector<Object<Metadata>>) acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);
        
        fullsail::token_whitelist::whitelist_native_fungible_assets(assets);
        let tokens = vector::empty<String>();
        
        vector::reverse<Object<Metadata>>(&mut assets);
        
        let assets_len = vector::length<Object<Metadata>>(&assets);
        while (assets_len > 0) {
            vector::push_back<String>(&mut tokens, fullsail::coin_wrapper::format_fungible_asset(vector::pop_back<Object<Metadata>>(&mut assets)));
            assets_len = assets_len - 1;
        };
        vector::destroy_empty<Object<Metadata>>(assets);
        
        let whitelist_event = WhitelistEvent{tokens};
        event::emit<WhitelistEvent>(whitelist_event);
    }

    public entry fun claim_rebase(account: &signer, ve_token: Object<VeCellanaToken>) {
        fullsail::voting_escrow::claim_rebase(account, ve_token);
    }

    public fun claimable_rebase(ve_token: Object<VeCellanaToken>) : u64 {
        fullsail::voting_escrow::claimable_rebase(ve_token)
    }

    fun add_valid_coin<T>(coins: &mut vector<string::String>) {
        let coin_name = fullsail::coin_wrapper::format_coin<T>();
        if (coin_name != fullsail::coin_wrapper::format_coin<NullCoin>()) {
            vector::push_back<string::String>(coins, coin_name);
        };
    }

    public entry fun advance_epoch() acquires AdministrativeData, GaugeVoteAccounting {
        let current_epoch = fullsail::epoch::now();
        let last_distribution_epoch = pending_distribution_epoch();
        if (last_distribution_epoch == current_epoch) {
            return
        };

        borrow_global_mut<AdministrativeData>(vote_manager_address()).pending_distribution_epoch = current_epoch;
        
        let (minted_tokens, rebase_tokens) = fullsail::minter::mint();
        fullsail::voting_escrow::add_rebase(rebase_tokens, current_epoch - 1);

        let gauge_vote_accounting = borrow_global_mut<GaugeVoteAccounting>(vote_manager_address());
        let votes_for_gauges = &mut gauge_vote_accounting.votes_for_gauges;
        let admin_data = borrow_global<AdministrativeData>(vote_manager_address());
        let gauge_to_fees_pool = &admin_data.gauge_to_fees_pool;
        
        let gauge_objects = simple_map::keys<Object<Gauge>, u128>(votes_for_gauges);
        let gauge_objects_len = vector::length<Object<Gauge>>(&gauge_objects);
        while (gauge_objects_len > 0) {
            let gauge = vector::pop_back<Object<Gauge>>(&mut gauge_objects);
            let amount_to_extract = (((fungible_asset::amount(&minted_tokens) as u128) * *simple_map::borrow<Object<Gauge>, u128>(votes_for_gauges, &gauge) / gauge_vote_accounting.total_votes) as u64);
            let extracted_tokens = fungible_asset::extract(&mut minted_tokens, amount_to_extract);
            fullsail::gauge::add_rewards(gauge, extracted_tokens);
            simple_map::remove<Object<Gauge>, u128>(votes_for_gauges, &gauge);
            gauge_objects_len = gauge_objects_len - 1;
        };

        vector::destroy_empty<Object<Gauge>>(gauge_objects);
        let active_gauges = &admin_data.active_gauges_list;

        let i = 0;
        while (i < smart_vector::length<Object<Gauge>>(active_gauges)) {
            let gauge = *smart_vector::borrow<Object<Gauge>>(active_gauges, i);
            let (gauge_fees, claim_fees) = fullsail::gauge::claim_fees(gauge);

            if (fungible_asset::amount(&gauge_fees) > 0 || fungible_asset::amount(&claim_fees) > 0) {
                let rewards = vector::empty<FungibleAsset>();

                vector::push_back<FungibleAsset>(&mut rewards, gauge_fees);
                vector::push_back<FungibleAsset>(&mut rewards, claim_fees);
                fullsail::rewards_pool::add_rewards(*smart_table::borrow<Object<Gauge>, Object<RewardsPool>>(gauge_to_fees_pool, gauge), rewards, current_epoch);
            } else {
                fungible_asset::destroy_zero(gauge_fees);
                fungible_asset::destroy_zero(claim_fees);
            };
            i = i + 1;
        };
        if (fungible_asset::amount(&minted_tokens) > 0) {
            fullsail::cellana_token::burn(minted_tokens);
        } else {
            fungible_asset::destroy_zero(minted_tokens);
        };
        gauge_vote_accounting.total_votes = 0;
        let advance_epoch_event = AdvanceEpochEvent{epoch: current_epoch};
        event::emit<AdvanceEpochEvent>(advance_epoch_event);
    }

    public fun all_claimable_rewards(ve_token: Object<VeCellanaToken>, liquidity_pool: Object<LiquidityPool>, epoch_count: u64) : SimpleMap<u64, SimpleMap<String, u64>> acquires AdministrativeData {
        let all_rewards = simple_map::create<u64, SimpleMap<String, u64>>();
        let current_epoch = fullsail::epoch::now();
        let start_epoch = current_epoch - epoch_count;
        while (start_epoch < current_epoch) {
            let epoch_rewards = claimable_rewards(ve_token, liquidity_pool, start_epoch);
            if (simple_map::length<String, u64>(&epoch_rewards) > 0) {
                simple_map::add<u64, SimpleMap<String, u64>>(&mut all_rewards, start_epoch, epoch_rewards);
            };
            start_epoch = start_epoch + 1;
        };
        all_rewards
    }

    public fun all_current_votes() : (SimpleMap<Object<LiquidityPool>, u128>, u128) acquires GaugeVoteAccounting {
        let gauge_vote_accounting = borrow_global<GaugeVoteAccounting>(vote_manager_address());
        let votes_for_gauges = &gauge_vote_accounting.votes_for_gauges;
        let liquidity_pools = vector::empty<Object<LiquidityPool>>();
        let gauge_objects = simple_map::keys<Object<Gauge>, u128>(votes_for_gauges);

        vector::reverse<object::Object<fullsail::gauge::Gauge>>(&mut gauge_objects);

        let gauge_len = vector::length<Object<Gauge>>(&gauge_objects);
        while (gauge_len > 0) {
            vector::push_back<Object<LiquidityPool>>(
                &mut liquidity_pools, 
                fullsail::gauge::liquidity_pool(vector::pop_back<Object<Gauge>>(&mut gauge_objects))
            );
            gauge_len = gauge_len - 1;
        };
        vector::destroy_empty<Object<Gauge>>(gauge_objects);
        (simple_map::new_from<Object<LiquidityPool>, u128>(
            liquidity_pools, 
            simple_map::values<Object<Gauge>, u128>(votes_for_gauges)
        ), 
        gauge_vote_accounting.total_votes)
    }

    public entry fun batch_claim<T0, T1, T2, T3, T4, T5>(
        account: &signer,
        ve_tokens: vector<Object<VeCellanaToken>>,
        liquidity_pools: vector<Object<LiquidityPool>>,
        amount: u64
    ) acquires AdministrativeData {
        vector::reverse<Object<VeCellanaToken>>(&mut ve_tokens);
        let ve_token_count = vector::length<Object<VeCellanaToken>>(&ve_tokens);
        while (ve_token_count > 0) {
            vector::reverse<Object<LiquidityPool>>(&mut liquidity_pools);
            let pool_len = vector::length<Object<LiquidityPool>>(&liquidity_pools);
            while (pool_len > 0) {
                claim_rewards_all_6<T0, T1, T2, T3, T4, T5>(
                    account,
                    vector::pop_back<Object<VeCellanaToken>>(&mut ve_tokens),
                    vector::pop_back<Object<LiquidityPool>>(&mut liquidity_pools),
                    amount
                );
                pool_len = pool_len - 1;
            };
            vector::destroy_empty<Object<LiquidityPool>>(liquidity_pools);
            ve_token_count = ve_token_count - 1;
        };
        vector::destroy_empty<Object<VeCellanaToken>>(ve_tokens);
    }

    public fun can_vote(ve_token: Object<VeCellanaToken>): bool acquires VeTokenVoteAccounting {
        let last_vote_epoch = last_voted_epoch(ve_token);
        last_vote_epoch < fullsail::epoch::now()
    }

    public fun claim_emissions(account: &signer, liquidity_pool: Object<LiquidityPool>): FungibleAsset acquires AdministrativeData {
        let gauge = get_gauge(liquidity_pool);
        assert!(is_gauge_active(gauge), E_GAUGE_INACTIVE);
        fullsail::gauge::claim_rewards(account, gauge)
    }

    public entry fun claim_emissions_entry(account: &signer, liquidity_pool: Object<LiquidityPool>) acquires AdministrativeData {
        let emissions = claim_emissions(account, liquidity_pool);
        primary_fungible_store::deposit(signer::address_of(account), emissions);
    }

    public entry fun claim_emissions_multiple(account: &signer, liquidity_pools: vector<Object<LiquidityPool>>) acquires AdministrativeData {
        vector::reverse<Object<LiquidityPool>>(&mut liquidity_pools);
        let pool_count = vector::length<Object<LiquidityPool>>(&liquidity_pools);
        while (pool_count > 0) {
            claim_emissions_entry(
                account,
                vector::pop_back<Object<LiquidityPool>>(&mut liquidity_pools)
            );
            pool_count = pool_count - 1;
        };
        vector::destroy_empty<Object<LiquidityPool>>(liquidity_pools);
    }

    public entry fun claim_rewards_6<T0, T1, T2, T3, T4, T5>(account: &signer,ve_token: Object<VeCellanaToken>, liquidity_pool: Object<LiquidityPool>,amount: u64) acquires AdministrativeData {
        let gauge = get_gauge(liquidity_pool);
        assert!(is_gauge_active(gauge), E_GAUGE_INACTIVE);
        
        let account_addr = signer::address_of(account);
        assert!(object::is_owner<VeCellanaToken>(ve_token, account_addr), E_NOT_OWNER);
        
        let ve_token_addr = object::object_address<VeCellanaToken>(&ve_token);
        let fees_pool = fees_pool(liquidity_pool);
        let rewards = fullsail::rewards_pool::claim_rewards(ve_token_addr, fees_pool, amount);
        
        let incentive_pool = incentive_pool(liquidity_pool);
        vector::append(&mut rewards, fullsail::rewards_pool::claim_rewards(ve_token_addr, incentive_pool, amount));
        
        let valid_coins = vector::empty<string::String>();
        add_valid_coin<T0>(&mut valid_coins);
        add_valid_coin<T1>(&mut valid_coins);
        add_valid_coin<T2>(&mut valid_coins);
        add_valid_coin<T3>(&mut valid_coins);
        add_valid_coin<T4>(&mut valid_coins);
        add_valid_coin<T5>(&mut valid_coins);
        
        vector::reverse(&mut rewards);
        let reward_count = vector::length(&rewards);
        while (reward_count > 0) {
            let reward = vector::pop_back(&mut rewards);
            if (fungible_asset::amount(&reward) == 0) {
                fungible_asset::destroy_zero(reward);
            } else {
                let metadata = fungible_asset::asset_metadata(&reward);
                if (fullsail::coin_wrapper::is_wrapper(metadata)) {
                    let original_coin = fullsail::coin_wrapper::get_original(metadata);
                    let (found, index) = vector::index_of(&valid_coins, &original_coin);
                    assert!(found, E_INVALID_COIN);
                    if (index == 0) { unwrap_and_deposit<T0>(account_addr, reward); }
                    else if (index == 1) { unwrap_and_deposit<T1>(account_addr, reward); }
                    else if (index == 2) { unwrap_and_deposit<T2>(account_addr, reward); }
                    else if (index == 3) { unwrap_and_deposit<T3>(account_addr, reward); }
                    else if (index == 4) { unwrap_and_deposit<T4>(account_addr, reward); }
                    else {
                        assert!(index == 5, E_INVALID_COIN);
                        unwrap_and_deposit<T5>(account_addr, reward);
                    };
                } else {
                    primary_fungible_store::deposit(account_addr, reward);
                };
            };
            reward_count = reward_count - 1;
        };
        vector::destroy_empty(rewards);
    }

    public entry fun claim_rewards_all<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
        account: &signer,
        ve_token: Object<VeCellanaToken>,
        liquidity_pool: Object<LiquidityPool>,
        epoch_count: u64
    ) acquires AdministrativeData {
        let current_epoch = fullsail::epoch::now();
        let start_epoch = current_epoch - epoch_count;
        while (start_epoch < current_epoch) {
            claim_rewards<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(
                account,
                ve_token,
                liquidity_pool,
                start_epoch
            );
            start_epoch = start_epoch + 1;
        };
    }

    public entry fun claim_rewards_all_6<T0, T1, T2, T3, T4, T5>(
        account: &signer,
        ve_token: Object<VeCellanaToken>,
        liquidity_pool: Object<LiquidityPool>,
        epoch_count: u64
    ) acquires AdministrativeData {
        let current_epoch = fullsail::epoch::now();
        let start_epoch = current_epoch - epoch_count;
        while (start_epoch < current_epoch) {
            claim_rewards_6<T0, T1, T2, T3, T4, T5>(
                account,
                ve_token,
                liquidity_pool,
                start_epoch
            );
            start_epoch = start_epoch + 1;
        };
    }

    public fun claimable_emissions(account_address: address, liquidity_pool: Object<LiquidityPool>): u64 acquires AdministrativeData {
        let gauge = get_gauge(liquidity_pool);
        fullsail::gauge::claimable_rewards(account_address, gauge)
    }

    public fun claimable_emissions_multiple(account_address: address, liquidity_pools: vector<Object<LiquidityPool>>): vector<u64> acquires AdministrativeData {
        let claimable_amounts = vector[];
        vector::reverse(&mut liquidity_pools);
        let pool_count = vector::length(&liquidity_pools);
        while (pool_count > 0) {
            let gauge = get_gauge(vector::pop_back(&mut liquidity_pools));
            vector::push_back(&mut claimable_amounts, fullsail::gauge::claimable_rewards(account_address, gauge));
            pool_count = pool_count - 1;
        };
        vector::destroy_empty(liquidity_pools);
        claimable_amounts
    }

    public fun create_gauge(account: &signer, liquidity_pool: Object<LiquidityPool>): Object<Gauge> acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);
        let admin_data = borrow_global_mut<AdministrativeData>(vote_manager_address());
        let gauge = fullsail::gauge::create(liquidity_pool);

        smart_vector::push_back<Object<Gauge>>(&mut admin_data.active_gauges_list, gauge);
        smart_table::add<Object<Gauge>, bool>(&mut admin_data.active_gauges, gauge, true);
        smart_table::add<Object<LiquidityPool>, Object<Gauge>>(&mut admin_data.pool_to_gauge, liquidity_pool, gauge);
        smart_table::add<Object<Gauge>, Object<RewardsPool>>(&mut admin_data.gauge_to_fees_pool, gauge, fullsail::rewards_pool::create(fullsail::liquidity_pool::supported_inner_assets(liquidity_pool)));
        smart_table::add<Object<Gauge>, Object<RewardsPool>>(&mut admin_data.gauge_to_incentive_pool, gauge, fullsail::rewards_pool::create(fullsail::liquidity_pool::supported_inner_assets(liquidity_pool)));
        
        let create_gauge_event = CreateGaugeEvent{
            gauge: gauge,
            creator: signer::address_of(account),
            pool: liquidity_pool,
        };
        event::emit<CreateGaugeEvent>(create_gauge_event);
        gauge
    }

    public entry fun create_gauge_entry(account: &signer, liquidity_pool: Object<LiquidityPool>) acquires AdministrativeData {
        create_gauge(account, liquidity_pool);
    }

    public(friend) fun create_gauge_internal(liquidity_pool: Object<LiquidityPool>) acquires AdministrativeData {
        let admin_data = borrow_global_mut<AdministrativeData>(vote_manager_address());
        let gauge = fullsail::gauge::create(liquidity_pool);

        smart_table::add<Object<Gauge>, bool>(&mut admin_data.active_gauges, gauge, false);
        smart_table::add<Object<LiquidityPool>, Object<Gauge>>(&mut admin_data.pool_to_gauge, liquidity_pool, gauge);
        smart_table::add<Object<Gauge>, Object<RewardsPool>>(&mut admin_data.gauge_to_fees_pool, gauge, fullsail::rewards_pool::create(fullsail::liquidity_pool::supported_inner_assets(liquidity_pool)));
        smart_table::add<Object<Gauge>, Object<RewardsPool>>(&mut admin_data.gauge_to_incentive_pool, gauge, fullsail::rewards_pool::create(fullsail::liquidity_pool::supported_inner_assets(liquidity_pool)));
        
        let package_signer = package_manager::get_signer();
        let create_gauge_event = CreateGaugeEvent{
            gauge: gauge,
            creator: signer::address_of(&package_signer),
            pool: liquidity_pool,
        };
        event::emit<CreateGaugeEvent>(create_gauge_event);
    }

    public fun current_votes(liquidity_pool: Object<LiquidityPool>): (u128, u128) acquires AdministrativeData, GaugeVoteAccounting {
        let gauge_vote_accounting = borrow_global<GaugeVoteAccounting>(vote_manager_address());
        let gauge = get_gauge(liquidity_pool);
        (*simple_map::borrow<Object<Gauge>, u128>(&gauge_vote_accounting.votes_for_gauges, &gauge), gauge_vote_accounting.total_votes)
    }

    public entry fun disable_gauge(account: &signer, gauge: Object<Gauge>) acquires AdministrativeData, GaugeVoteAccounting {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);
        
        let admin_data = borrow_global_mut<AdministrativeData>(vote_manager_address());
        let (found, index) = smart_vector::index_of<Object<Gauge>>(&admin_data.active_gauges_list, &gauge);

        assert!(found, E_GAUGE_NOT_FOUND);
        
        smart_vector::remove<Object<Gauge>>(&mut admin_data.active_gauges_list, index);
        smart_table::upsert<Object<Gauge>, bool>(&mut admin_data.active_gauges, gauge, false);

        let gauge_vote_accounting = borrow_global_mut<GaugeVoteAccounting>(vote_manager_address());
        if (simple_map::contains_key<Object<Gauge>, u128>(&gauge_vote_accounting.votes_for_gauges, &gauge)) {
            let (_, gauge_votes) = simple_map::remove<Object<Gauge>, u128>(&mut gauge_vote_accounting.votes_for_gauges, &gauge);
            gauge_vote_accounting.total_votes = gauge_vote_accounting.total_votes - gauge_votes;
        };
    }

    public entry fun enable_gauge(account: &signer, gauge: Object<Gauge>) acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);

        let admin_data = borrow_global_mut<AdministrativeData>(vote_manager_address());
        assert!(!smart_vector::contains<Object<Gauge>>(&admin_data.active_gauges_list, &gauge), E_GAUGE_ALREADY_ACTIVE);

        smart_vector::push_back<Object<Gauge>>(&mut admin_data.active_gauges_list, gauge);
        smart_table::upsert<Object<Gauge>, bool>(&mut admin_data.active_gauges, gauge, true);
    }

    public fun fees_pool(liquidity_pool: Object<LiquidityPool>): Object<RewardsPool> acquires AdministrativeData {
        let gauge = get_gauge(liquidity_pool);
        *smart_table::borrow<Object<Gauge>, Object<RewardsPool>>(&borrow_global<AdministrativeData>(vote_manager_address()).gauge_to_fees_pool, gauge)
    }

    public fun gauge_exists(liquidity_pool: Object<LiquidityPool>): bool acquires AdministrativeData {
        smart_table::contains<Object<LiquidityPool>, Object<Gauge>>(&borrow_global<AdministrativeData>(vote_manager_address()).pool_to_gauge, liquidity_pool)
    }

    public fun get_gauge(liquidity_pool: Object<LiquidityPool>): Object<Gauge> acquires AdministrativeData {
        let pool_vector = vector::empty<Object<LiquidityPool>>();
        vector::push_back<Object<LiquidityPool>>(&mut pool_vector, liquidity_pool);

        let gauge_vector = get_gauges(pool_vector);
        *vector::borrow<Object<Gauge>>(&gauge_vector, 0)
    }

    public fun get_gauges(liquidity_pools: vector<Object<LiquidityPool>>): vector<Object<Gauge>> acquires AdministrativeData {
        let pool_to_gauge = &borrow_global<AdministrativeData>(vote_manager_address()).pool_to_gauge;
        let gauges = vector::empty<Object<Gauge>>();
        vector::reverse<Object<LiquidityPool>>(&mut liquidity_pools);
        let pool_count = vector::length<Object<LiquidityPool>>(&liquidity_pools);
        while (pool_count > 0) {
            vector::push_back<Object<Gauge>>(&mut gauges, *smart_table::borrow<Object<LiquidityPool>, Object<Gauge>>(pool_to_gauge, vector::pop_back<Object<LiquidityPool>>(&mut liquidity_pools)));
            pool_count = pool_count - 1;
        };
        vector::destroy_empty<Object<LiquidityPool>>(liquidity_pools);
        gauges
    }

    public fun governance(): address acquires AdministrativeData {
        borrow_global<AdministrativeData>(vote_manager_address()).governance
    }

    public fun incentive_pool(liquidity_pool: Object<LiquidityPool>): Object<RewardsPool> acquires AdministrativeData {
        let gauge = get_gauge(liquidity_pool);
        *smart_table::borrow<Object<Gauge>, Object<RewardsPool>>(&borrow_global<AdministrativeData>(vote_manager_address()).gauge_to_incentive_pool, gauge)
    }

    public fun incentivize(liquidity_pool: Object<LiquidityPool>, rewards: vector<FungibleAsset>) acquires AdministrativeData, GaugeVoteAccounting {
        assert!(gauge_exists(liquidity_pool), E_GAUGE_NOT_EXISTS);
        let reward_tokens = vector::empty<string::String>();
        let i = 0;
        while (i < vector::length(&rewards)) {
            let token_name = fullsail::coin_wrapper::get_original(fungible_asset::asset_metadata(vector::borrow(&rewards, i)));
            assert!(fullsail::token_whitelist::is_reward_token_whitelisted_on_pool(token_name, object::object_address(&liquidity_pool)) == true, E_REWARD_TOKEN_NOT_WHITELISTED);
            vector::push_back(&mut reward_tokens, token_name);
            i = i + 1;
        };
        advance_epoch();
        let incentive_pool = incentive_pool(liquidity_pool);
        fullsail::rewards_pool::add_rewards(incentive_pool, rewards, fullsail::epoch::now() + 1);
    }

    public fun incentivize_coin<CoinType>(liquidity_pool: Object<LiquidityPool>, reward_coin: Coin<CoinType>) acquires AdministrativeData, GaugeVoteAccounting {
        let rewards = vector::empty<FungibleAsset>();
        vector::push_back(&mut rewards, fullsail::coin_wrapper::wrap<CoinType>(reward_coin));
        incentivize(liquidity_pool, rewards);
    }

    public entry fun incentivize_coin_entry<CoinType>(
        account: &signer,
        liquidity_pool: Object<LiquidityPool>,
        amount: u64
    ) acquires AdministrativeData, GaugeVoteAccounting {
        incentivize_coin<CoinType>(liquidity_pool, coin::withdraw<CoinType>(account, amount));
    }

    public entry fun incentivize_entry(account: &signer, liquidity_pool: Object<LiquidityPool>, metadata_objects: vector<Object<Metadata>>, amounts: vector<u64>) acquires AdministrativeData, GaugeVoteAccounting {
        assert!(vector::length(&metadata_objects) == vector::length(&amounts), E_VECTOR_LENGTH_MISMATCH);
        let rewards = vector::empty<FungibleAsset>();
        vector::reverse(&mut metadata_objects);
        vector::reverse(&mut amounts);
        let metadata_count = vector::length(&metadata_objects);
        assert!(metadata_count == vector::length(&amounts), E_VECTOR_LENGTH_MISMATCH);
        while (metadata_count > 0) {
            vector::push_back(&mut rewards, primary_fungible_store::withdraw(
                account,
                vector::pop_back(&mut metadata_objects),
                vector::pop_back(&mut amounts)
            ));
            metadata_count = metadata_count - 1;
        };
        vector::destroy_empty(metadata_objects);
        vector::destroy_empty(amounts);
        incentivize(liquidity_pool, rewards);
    }

    public fun is_gauge_active(gauge: Object<Gauge>): bool acquires AdministrativeData {
        let default_value = false;
        *smart_table::borrow_with_default(
            &borrow_global<AdministrativeData>(vote_manager_address()).active_gauges,
            gauge,
            &default_value
        )
    }

    public fun last_voted_epoch(ve_token: Object<VeCellanaToken>): u64 acquires VeTokenVoteAccounting {
        let default_epoch = 0;
        *smart_table::borrow_with_default(
            &borrow_global<VeTokenVoteAccounting>(vote_manager_address()).last_voted_epoch,
            ve_token,
            &default_epoch
        )
    }

    public entry fun merge_ve_tokens(account: &signer, source_token: Object<VeCellanaToken>, target_token: Object<VeCellanaToken>) acquires VeTokenVoteAccounting {
        let source_last_voted = last_voted_epoch(source_token);
        let can_merge = if (source_last_voted < fullsail::epoch::now()) {
            let target_last_voted = last_voted_epoch(target_token);
            target_last_voted < fullsail::epoch::now()
        } else {
            false
        };
        assert!(can_merge, E_TOKENS_RECENTLY_VOTED);
        fullsail::voting_escrow::merge_ve_nft(account, source_token, target_token);
    }

    public entry fun migrate_all_pools(account: &signer) acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);
        let pool_addresses = fullsail::liquidity_pool::all_pool_addresses();
        let pool_count = vector::length<Object<LiquidityPool>>(&pool_addresses);
        let i = 0;
        while (i < pool_count) {
            whitelist_default_reward_pool(*vector::borrow<Object<LiquidityPool>>(&pool_addresses, i));
            i = i + 1;
        };
    }

    public fun operator(): address acquires AdministrativeData {
        borrow_global<AdministrativeData>(vote_manager_address()).operator
    }

    public fun pending_distribution_epoch(): u64 acquires AdministrativeData {
        borrow_global<AdministrativeData>(vote_manager_address()).pending_distribution_epoch
    }

    public entry fun poke(account: &signer, ve_token: Object<VeCellanaToken>) acquires AdministrativeData, GaugeVoteAccounting, VeTokenVoteAccounting {
        let votes_for_pools_by_ve_token = &borrow_global<VeTokenVoteAccounting>(vote_manager_address()).votes_for_pools_by_ve_token;
        assert!(smart_table::contains<Object<VeCellanaToken>, SimpleMap<Object<LiquidityPool>, u64>>(votes_for_pools_by_ve_token, ve_token), E_NO_VOTES_FOR_TOKEN);
        
        let vote_map = smart_table::borrow<Object<VeCellanaToken>, SimpleMap<Object<LiquidityPool>, u64>>(votes_for_pools_by_ve_token, ve_token);
        vote(account, ve_token, simple_map::keys<Object<LiquidityPool>, u64>(vote_map), simple_map::values<Object<LiquidityPool>, u64>(vote_map));
    }

    fun remove_ve_token_vote_records(ve_token_vote_accounting: &mut VeTokenVoteAccounting, ve_token: Object<VeCellanaToken>) {
        if (smart_table::contains<Object<VeCellanaToken>, SimpleMap<Object<LiquidityPool>, u64>>(&ve_token_vote_accounting.votes_for_pools_by_ve_token, ve_token)) {
            smart_table::remove<Object<VeCellanaToken>, SimpleMap<Object<LiquidityPool>, u64>>(&mut ve_token_vote_accounting.votes_for_pools_by_ve_token, ve_token);
        };
        fullsail::voting_escrow::unfreeze_token(ve_token);
    }

    public entry fun rescue_stuck_rewards(account_address: address, liquidity_pools: vector<Object<LiquidityPool>>, epoch_count: u64) acquires AdministrativeData, GaugeVoteAccounting {
        assert!(!fullsail::voting_escrow::nft_exists(account_address), E_NFT_EXISTS);

        let current_epoch = fullsail::epoch::now();
        vector::reverse<Object<LiquidityPool>>(&mut liquidity_pools);

        let pool_count = vector::length<Object<LiquidityPool>>(&liquidity_pools);
        while (pool_count > 0) {
            let liquidity_pool = vector::pop_back<Object<LiquidityPool>>(&mut liquidity_pools);
            let start_epoch = current_epoch - epoch_count;
            let rescued_rewards = vector::empty<FungibleAsset>();

            while (start_epoch < current_epoch) {
                let fees_pool = fees_pool(liquidity_pool);
                let incentive_pool = incentive_pool(liquidity_pool);
                vector::append<FungibleAsset>(&mut rescued_rewards, fullsail::rewards_pool::claim_rewards(account_address, fees_pool, start_epoch));
                vector::append<FungibleAsset>(&mut rescued_rewards, fullsail::rewards_pool::claim_rewards(account_address, incentive_pool, start_epoch));
                start_epoch = start_epoch + 1;
            };

            incentivize(liquidity_pool, rescued_rewards);
            pool_count = pool_count - 1;
        };
        vector::destroy_empty<Object<LiquidityPool>>(liquidity_pools);
    }

    public entry fun reset(account: &signer, ve_token: Object<VeCellanaToken>) acquires VeTokenVoteAccounting {
        assert!(object::is_owner<VeCellanaToken>(ve_token, signer::address_of(account)), E_NOT_OWNER);

        let ve_token_vote_accounting = borrow_global_mut<VeTokenVoteAccounting>(vote_manager_address());
        let last_voted_epoch = smart_table::borrow_mut_with_default<Object<VeCellanaToken>, u64>(&mut ve_token_vote_accounting.last_voted_epoch, ve_token, 0);
        
        let current_epoch = fullsail::epoch::now();
        assert!(current_epoch > *last_voted_epoch, E_ALREADY_VOTED_THIS_EPOCH);
        *last_voted_epoch = current_epoch;
        remove_ve_token_vote_records(ve_token_vote_accounting, ve_token);

        let abstain_event = AbstainEvent{
            owner: signer::address_of(account),
            ve_token: ve_token,
        };
        event::emit<AbstainEvent>(abstain_event);
    }

    public entry fun split_ve_tokens(account: &signer, ve_token: Object<VeCellanaToken>, split_amounts: vector<u64>) acquires VeTokenVoteAccounting {
        let last_vote_epoch = last_voted_epoch(ve_token);
        assert!(last_vote_epoch < fullsail::epoch::now(), E_RECENTLY_VOTED);
        fullsail::voting_escrow::split_ve_nft(account, ve_token, split_amounts);
    }

    public fun token_votes(ve_token: Object<VeCellanaToken>): (SimpleMap<Object<LiquidityPool>, u64>, u64) acquires VeTokenVoteAccounting {
        let ve_token_vote_accounting = borrow_global<VeTokenVoteAccounting>(vote_manager_address());
        let default_epoch = 0;
        let default_votes = simple_map::new<Object<LiquidityPool>, u64>();
        (
            *smart_table::borrow_with_default<Object<VeCellanaToken>, SimpleMap<Object<LiquidityPool>, u64>>(&ve_token_vote_accounting.votes_for_pools_by_ve_token, ve_token, &default_votes),
            *smart_table::borrow_with_default<Object<VeCellanaToken>, u64>(&ve_token_vote_accounting.last_voted_epoch, ve_token, &default_epoch)
        )
    }

    fun unwrap_and_deposit<T>(recipient: address, asset: FungibleAsset) {
        if (fungible_asset::amount(&asset) > 0) {
            aptos_account::deposit_coins<T>(recipient, fullsail::coin_wrapper::unwrap<T>(asset));
        } else {
            fungible_asset::destroy_zero(asset);
        };
    }

    public entry fun update_governance(account: &signer, new_governance: address) acquires AdministrativeData {
        let admin_data = borrow_global_mut<AdministrativeData>(vote_manager_address());
        assert!(admin_data.governance == signer::address_of(account), E_NOT_GOVERNANCE);
        admin_data.governance = new_governance;
    }

    public entry fun update_operator(account: &signer, new_operator: address) acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);
        borrow_global_mut<AdministrativeData>(vote_manager_address()).operator = new_operator;
    }

    public entry fun upgrade(account: &signer, metadata: vector<u8>, code: vector<vector<u8>>) acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).governance == signer::address_of(account), E_NOT_GOVERNANCE);
        let package_signer = fullsail::package_manager::get_signer();
        code::publish_package_txn(&package_signer, metadata, code);
    }

    public entry fun vote(
        account: &signer,
        ve_token: Object<VeCellanaToken>,
        liquidity_pools: vector<Object<LiquidityPool>>,
        weights: vector<u64>
    ) acquires AdministrativeData, GaugeVoteAccounting, VeTokenVoteAccounting {
        let total_weight = 0;
        vector::reverse<u64>(&mut weights);
        let weight_count = vector::length<u64>(&weights);
        while (weight_count > 0) {
            total_weight = total_weight + vector::pop_back<u64>(&mut weights);
            weight_count = weight_count - 1;
        };
        vector::destroy_empty<u64>(weights);
        assert!(total_weight > 0, E_ZERO_TOTAL_WEIGHT);

        advance_epoch();
        assert!(object::is_owner<VeCellanaToken>(ve_token, signer::address_of(account)), E_NOT_OWNER);

        let ve_token_vote_accounting = borrow_global_mut<VeTokenVoteAccounting>(vote_manager_address());
        let last_voted_epoch = smart_table::borrow_mut_with_default<Object<VeCellanaToken>, u64>(&mut ve_token_vote_accounting.last_voted_epoch, ve_token, 0);
        let current_epoch = fullsail::epoch::now();
        assert!(current_epoch > *last_voted_epoch, E_ALREADY_VOTED_THIS_EPOCH);
        *last_voted_epoch = current_epoch;

        remove_ve_token_vote_records(ve_token_vote_accounting, ve_token);
        fullsail::voting_escrow::freeze_token(ve_token);

        let gauge_vote_accounting = borrow_global_mut<GaugeVoteAccounting>(vote_manager_address());
        let admin_data = borrow_global<AdministrativeData>(vote_manager_address());

        vector::reverse<Object<LiquidityPool>>(&mut liquidity_pools);
        vector::reverse<u64>(&mut weights);
        let pool_count = vector::length<Object<LiquidityPool>>(&liquidity_pools);
        assert!(pool_count == vector::length<u64>(&weights), E_VECTOR_LENGTH_MISMATCH);

        while (pool_count > 0) {
            let liquidity_pool = vector::pop_back<Object<LiquidityPool>>(&mut liquidity_pools);
            let weight = vector::pop_back<u64>(&mut weights);
            if (weight > 0) {
                let gauge = *smart_table::borrow<Object<LiquidityPool>, Object<Gauge>>(&admin_data.pool_to_gauge, liquidity_pool);
                assert!(smart_table::contains<Object<Gauge>, bool>(&admin_data.active_gauges, gauge), E_GAUGE_INACTIVE);

                let voting_power = weight * fullsail::voting_escrow::get_voting_power(ve_token) / total_weight;
                let ve_token_address = object::object_address<VeCellanaToken>(&ve_token);

                fullsail::rewards_pool::increase_allocation(ve_token_address, *smart_table::borrow<Object<Gauge>, Object<RewardsPool>>(&admin_data.gauge_to_fees_pool, gauge), voting_power);
                fullsail::rewards_pool::increase_allocation(ve_token_address, *smart_table::borrow<Object<Gauge>, Object<RewardsPool>>(&admin_data.gauge_to_incentive_pool, gauge), voting_power);

                gauge_vote_accounting.total_votes = gauge_vote_accounting.total_votes + (voting_power as u128);
                let votes_for_gauges = &mut gauge_vote_accounting.votes_for_gauges;
                if (!simple_map::contains_key<Object<Gauge>, u128>(votes_for_gauges, &gauge)) {
                    simple_map::add<Object<Gauge>, u128>(votes_for_gauges, gauge, (voting_power as u128));
                } else {
                    let gauge_votes = simple_map::borrow_mut<Object<Gauge>, u128>(votes_for_gauges, &gauge);
                    *gauge_votes = *gauge_votes + (voting_power as u128);
                };

                simple_map::add<Object<LiquidityPool>, u64>(
                    smart_table::borrow_mut_with_default<Object<VeCellanaToken>, simple_map::SimpleMap<Object<LiquidityPool>, u64>>(
                        &mut ve_token_vote_accounting.votes_for_pools_by_ve_token,
                        ve_token,
                        simple_map::new<Object<LiquidityPool>, u64>()
                    ),
                    liquidity_pool,
                    voting_power
                );
            };
            pool_count = pool_count - 1;
        };
        vector::destroy_empty<Object<LiquidityPool>>(liquidity_pools);
        vector::destroy_empty<u64>(weights);

        let vote_event = VoteEvent{
            owner: signer::address_of(account),
            ve_token: ve_token,
            pools: liquidity_pools,
            weights: weights,
        };
        event::emit<VoteEvent>(vote_event);
    }

    public entry fun vote_batch(account: &signer, ve_tokens: vector<Object<VeCellanaToken>>, liquidity_pools: vector<Object<LiquidityPool>>, weights: vector<u64>) acquires AdministrativeData, GaugeVoteAccounting, VeTokenVoteAccounting {
        vector::reverse<Object<VeCellanaToken>>(&mut ve_tokens);

        let token_count = vector::length<Object<VeCellanaToken>>(&ve_tokens);
        while (token_count > 0) {
            vote(account, vector::pop_back<Object<VeCellanaToken>>(&mut ve_tokens), liquidity_pools, weights);
            token_count = token_count - 1;
        };

        vector::destroy_empty<Object<VeCellanaToken>>(ve_tokens);
    }

    public fun vote_manager_address(): address {
        fullsail::package_manager::get_address(string::utf8(b"VOTE_MANAGER"))
    }

    public(friend) fun whitelist_default_reward_pool(liquidity_pool: Object<LiquidityPool>) {
        let whitelisted_tokens = vector::empty<string::String>();
        vector::push_back<string::String>(&mut whitelisted_tokens, string::utf8(b"aptos_coin::AptosCoin"));
        vector::push_back<string::String>(&mut whitelisted_tokens, string::utf8(b"0x111ae3e5bc816a5e63c2da97d0aa3886519e0cd5e4b046659fa35796bd11542a::amapt_token::AmnisApt"));
        
        let supported_assets = fullsail::liquidity_pool::supported_inner_assets(liquidity_pool);
        let asset_count = vector::length<Object<Metadata>>(&supported_assets);
        let i = 0;
        while (i < asset_count) {
            vector::push_back<string::String>(&mut whitelisted_tokens, fullsail::coin_wrapper::get_original(*vector::borrow<Object<Metadata>>(&supported_assets, i)));
            i = i + 1;
        };
        
        let is_whitelisted = true;
        fullsail::token_whitelist::set_whitelist_reward_tokens(whitelisted_tokens, object::object_address<LiquidityPool>(&liquidity_pool), is_whitelisted);
        
        let whitelist_event = WhitelistRewardEvent{
            tokens: whitelisted_tokens,
            is_wl: is_whitelisted,
        };
        event::emit<WhitelistRewardEvent>(whitelist_event);
    }

    public entry fun whitelist_token_reward_pool_entry(account: &signer, liquidity_pool: Object<LiquidityPool>, tokens: vector<String>, is_whitelisted: bool) acquires AdministrativeData {
        assert!(borrow_global<AdministrativeData>(vote_manager_address()).operator == signer::address_of(account), E_NOT_OPERATOR);
        
        fullsail::token_whitelist::set_whitelist_reward_tokens(
            tokens,
            object::object_address<LiquidityPool>(&liquidity_pool),
            is_whitelisted
        );
        
        let whitelist_event = WhitelistRewardEvent {
            tokens: tokens,
            is_wl: is_whitelisted,
        };
        event::emit<WhitelistRewardEvent>(whitelist_event);
    }

}