// Generated by dts-bundle-generator v9.5.1

export declare const ZERO_ADDRESS = "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc";
export declare const DEFAULT_ADMIN_ROLE = 0;
export declare const STAKING_ADMIN_ROLE = 1;
export declare const STAKING_OPERATOR_ROLE = 2;
export declare const POOL_ADMIN_ROLE = 3;
export declare const EMERGENCY_ADMIN_ROLE = 4;
export declare const RISK_ADMIN_ROLE = 5;
export declare const ASSET_LISTING_ADMIN_ROLE = 6;
export declare const STCREDITS_CACHE_BATCH_NUM = 10n;
export declare const START_INVITE_CODE = 10000n;
export declare const EMPTY_INVITE_CODE = 0n;
export declare const VERSION = "v1";
export declare const PREFIX = "spectre";
export declare const ACCESS_CONTROL_PROGRAM: () => string;
export declare const ACL_MANAGER_PROGRAM: () => string;
export declare const STCREDITS_PROGRAM: () => string;
export declare const STCREDITS_POINTS_PROGRAM: () => string;
export declare function delegatorProgramName(index: number): string;
export interface Configuration {
	programSuffix: string;
	programs: {
		accessControl: string;
		aclManager: string;
		stcredits: string;
		stcreditsPoints: string;
		delegator: string;
	};
}
export declare function initialize(cfg: Configuration): void;
export declare function bool(s: string): boolean;
export declare function boolStr(b: boolean): string;
export declare function i8(s: string): bigint;
export declare function i8Str(i: bigint): string;
export declare function i16(s: string): bigint;
export declare function i16Str(i: bigint): string;
export declare function i32(s: string): bigint;
export declare function i32Str(i: bigint): string;
export declare function i64(s: string): bigint;
export declare function i64Str(i: bigint): string;
export declare function i128(s: string): bigint;
export declare function i128Str(i: bigint): string;
export declare function u8(s: string): bigint;
export declare function u8Str(i: bigint | number): string;
export declare function u16(s: string): bigint;
export declare function u16Str(i: bigint | number): string;
export declare function u32(s: string): bigint;
export declare function u32Str(i: bigint | number): string;
export declare function u64(s: string): bigint;
export declare function u64Str(i: bigint | number): string;
export declare function u128(s: string): bigint;
export declare function u128Str(i: bigint | number): string;
export declare function field(s: string): bigint;
export declare function fieldStr(i: bigint | number): string;
export declare function group(s: string): bigint;
export declare function groupStr(i: bigint | number): string;
export declare function scalar(s: string): bigint;
export declare function scalarStr(i: bigint | number): string;
export declare class ProgramBase {
	private getMappingValueString;
	constructor(getMappingValueString: (mapping: string, key: string) => Promise<string>);
	protected getMappingValueOrNull(mapping: string, key: string): Promise<string | null>;
	protected getMappingValue(mapping: string, key: string): Promise<string>;
	protected getMappingValueOrDefault(mapping: string, key: string, defaultValue: string): Promise<string>;
}
export type Literal = string | boolean | bigint;
/** Parses a string into a literal.
 * Assume the literal is legitimate.
 * Reference: snarkVM/console/program/src/data/literal/parse.rs
 * @param literal
 */
export declare function parseLiteral(literal: string): Literal;
export type Plaintext = Record<string, unknown> | Array<unknown> | Literal;
/**
 * Parses a string into a plaintext.
 * Assume the plaintext is legitimate.
 * Reference: snarkVM/console/program/src/data/plaintext/parse.rs
 * @param plaintext
 */
export declare function parsePlaintext(plaintext: string): Plaintext;
export declare function importAleo(): Promise<typeof import("@aleohq/sdk")>;
export declare function bhp256HashToField(plaintext: string): Promise<string>;
export declare function programAddress(programId: string): Promise<string>;
export interface CommitteeState {
	is_open: boolean;
	commission: bigint;
}
export interface BondState {
	validator: string;
	microcredits: bigint;
}
export interface UnbondState {
	microcredits: bigint;
	height: bigint;
}
export declare class CreditsProgram extends ProgramBase {
	/**
	 * Get the state of the committee for an **active** validator.
	 * @param validator
	 * @returns The committee state or null if the validator is not in the committee.
	 */
	getCommitteeState(validator: string): Promise<CommitteeState | null>;
	/**
	 * Get the total number of **active** validators in the committee.
	 */
	getCommitteeValidatorsCount(): Promise<bigint>;
	/**
	 * Get the total number of delegators (not including validators).
	 */
	getDelegatorsCount(): Promise<bigint>;
	/**
	 * Get the total amount of microcredits that are prebonded and bonded to a validator.
	 * Note: It includes both prebonded and bonded microcredits. However, it does not contain unbonding microcredits.
	 * @param validator
	 */
	getDelegated(validator: string): Promise<bigint>;
	/**
	 * Get the bond state of the staker.
	 * @param staker The staker (validator or delegator)
	 */
	getBonded(staker: string): Promise<BondState | null>;
	/**
	 * Get the unbonding state of the staker.
	 * @param staker The staker (validator or delegator)
	 */
	getUnbonding(staker: string): Promise<UnbondState | null>;
	/**
	 * Get the withdrawal address of the staker.
	 * @param staker The staker (validator or delegator)
	 */
	getWithdrawAddress(staker: string): Promise<string | null>;
	/**
	 * Get the public microcredits balance of the account.
	 * @param account
	 */
	getPublicBalance(account: string): Promise<bigint>;
}
export declare class AccessControlProgram extends ProgramBase {
	isInitialized(): Promise<boolean>;
	hasRole(role: number, account: string): Promise<boolean>;
	isRoleAdmin(role: number, adminRoleOrAccount: number | string): Promise<boolean>;
}
export interface Approval {
	approver: string;
	spender: string;
}
export interface Config {
	paused: boolean;
	treasury: string;
	protocol_fee: bigint;
}
export interface State {
	withdraw: bigint;
	pending_withdraw: bigint;
	bonded: bigint;
	unbonding: bigint;
	resolved_height: bigint;
}
export declare enum CacheStatus {
	INVALID = 0,
	IN_PROGRESS = 1,
	VALID = 2
}
export interface CacheState {
	status: CacheStatus;
	height: bigint;
	bonded: bigint;
	unbonding: bigint;
	next_index: bigint;
}
export interface Withdraw {
	amount: bigint;
	pending: boolean;
	height: bigint;
}
export interface Delegator {
	delegator: string;
	validator: string;
	bonded: bigint;
}
export declare class StCreditsProgram extends ProgramBase {
	credits: CreditsProgram;
	constructor(getMappingValueString: (mapping: string, key: string) => Promise<string>, credits: CreditsProgram);
	getTotalSupply(): Promise<bigint>;
	getPublicBalance(account: string): Promise<bigint>;
	getApproval(approver: string, spender: string): Promise<bigint>;
	getConfig(): Promise<Config | null>;
	isInitialized(): Promise<boolean>;
	isPaused(): Promise<boolean>;
	getState(): Promise<State>;
	getCacheState(): Promise<CacheState>;
	getWithdraw(account: string): Promise<Withdraw | null>;
	isWithdrawClaimable(withdraw: Withdraw, totalWithdraw: bigint, resolvedHeight: bigint, currentHeight: bigint): boolean;
	getDelegatorsCount(): Promise<bigint>;
	getDelegator(index: number | bigint): Promise<Delegator | null>;
	getDelegatorIndex(delegator: string): Promise<bigint | null>;
	getValidatorIndex(validator: string): Promise<bigint | null>;
	hasDelegator(delegator: string): Promise<boolean>;
	hasValidator(validator: string): Promise<boolean>;
	getDelegatorByValidator(validator: string): Promise<Delegator | null>;
	getTotalBuffered(): Promise<bigint>;
	getTotalPooled(totalBuffered: bigint, totalBonded: bigint, totalUnbonding: bigint, totalWithdraw: bigint, totalPendingWithdraw: bigint): bigint;
	getStCreditsFromCredits(credits: bigint, totalPooledCredits: bigint, totalStCreditsSupply: bigint): bigint;
	getCreditsFromStCredits(stCredits: bigint, totalPooledCredits: bigint, totalStCreditsSupply: bigint): bigint;
}
export interface StCreditsPointsState {
	stcredits: bigint;
	height: bigint;
	inviter: string;
	inviter_of_inviter: string;
}
export declare class StCreditsPointsProgram extends ProgramBase {
	/**
	 * Whether the program is paused.
	 */
	isPaused(): Promise<boolean>;
	/**
	 * Get the total supply of points.
	 */
	getTotalSupply(): Promise<bigint>;
	/**
	 * Get the balance of points for an account.
	 * @param account
	 */
	getBalance(account: string): Promise<bigint>;
	/**
	 * Get the state of an account.
	 * @param account
	 */
	getState(account: string): Promise<StCreditsPointsState | null>;
	/**
	 * Get the inviter by the invite code.
	 * @param code
	 */
	getInviterByCode(code: number | bigint): Promise<string | null>;
	/**
	 * Get the invite code by the inviter.
	 * @param inviter
	 */
	getInviteCode(inviter: string): Promise<bigint>;
	/**
	 * Get the invite code counter.
	 */
	getInviteCodeCounter(): Promise<bigint>;
}

export {};
