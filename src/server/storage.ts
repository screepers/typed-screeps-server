import {
	RawLeaderboard,
	RawMarketOrder,
	RawMarketStats,
	RawMarketTransaction,
	RawRoomFlags,
	RawRoomIntents,
	RawUserCode,
	RawUserConsole,
	RawUserIntents,
	RawUserMessage,
	RawUserMoney,
	RawUserNotification,
	RawUserResource,
} from '../objects/objects';
import { RawPowerCreep, RawRoomObject } from '../objects/raw_objects';
import { Room, RoomTerrain } from '../objects/rooms';
import { User } from '../objects/users';

/** LokiJS/Mongo-style query. Operators (`$and`, `$in`, `$ne`, …) and extra fields are allowed. */
export type DbQuery<T> = {
	[K in keyof T]?: unknown;
} & {
	[field: string]: unknown;
};

type UnwrapDbTypeOp<Type> =
	Type extends { $in: readonly (infer U)[] } ? U
	: Type extends { $eq: infer U } ? U
	: Type extends object ? never
	: Type;

/** Discriminant `type` value from a query, including `$and` / `$or` / `$in`. */
export type TypeFromDbQuery<Q> =
	Q extends { type: infer Type } ? UnwrapDbTypeOp<Type>
	: Q extends { $and: readonly (infer E)[] } ? TypeFromDbQuery<E>
	: Q extends { $or: readonly (infer E)[] } ? TypeFromDbQuery<E>
	: never;

/**
 * Narrow a collection document by query `type`, like `Room.find` + a structureType filter.
 * Falls back to `T` when the query has no usable `type` (or `T` is not a typed union).
 */
export type NarrowFromDbQuery<T, Q> =
	[TypeFromDbQuery<Q>] extends [never] ? T
	: [Extract<T, { type: TypeFromDbQuery<Q> }>] extends [never] ? T
	: Extract<T, { type: TypeFromDbQuery<Q> }>;

export interface DbUpdate<T> {
	$set?: Partial<T> & Record<string, unknown>;
	$merge?: Partial<T> & Record<string, unknown>;
	$inc?: Partial<Record<keyof T & string, number>> & Record<string, number>;
	$unset?: Record<string, unknown>;
	$addToSet?: Record<string, unknown>;
	$pull?: Record<string, unknown>;
}

export type DbBulkOp<T> =
	| { op: 'update'; id: string; update: DbUpdate<T> }
	| { op: 'insert'; data: Partial<T> }
	| { op: 'remove'; id: string };

export interface DbFindExOptions {
	sort?: Record<string, 1 | -1>;
	offset?: number;
	limit?: number;
}

/**
 * RPC wrapper around a LokiJS collection (`@screeps/common/lib/storage.js` `wrapCollection`).
 * Augment to add methods from storage replacements (e.g. screepsmod-mongo).
 */
export interface DbCollection<T> {
	find<const Q extends DbQuery<T>>(query: Q): Promise<NarrowFromDbQuery<T, Q>[]>;
	find(query?: DbQuery<T>): Promise<T[]>;
	findOne<const Q extends DbQuery<T>>(query: Q): Promise<NarrowFromDbQuery<T, Q> | null>;
	findOne(query?: DbQuery<T>): Promise<T | null>;
	by(field: string, value: unknown): Promise<T | undefined>;
	clear(): Promise<void>;
	count(query?: DbQuery<T>): Promise<number>;
	ensureIndex(property: string): Promise<void>;
	removeWhere(query: DbQuery<T>): Promise<unknown>;
	insert(docs: Partial<T>[]): Promise<T[]>;
	insert(doc: Partial<T>): Promise<T>;
	update(
		query: DbQuery<T>,
		update: DbUpdate<T>,
		params?: { upsert?: boolean }
	): Promise<{ modified?: number; inserted?: number }>;
	bulk(ops: DbBulkOp<T>[]): Promise<void>;
	findEx<const Q extends DbQuery<T>>(query: Q, opts: DbFindExOptions): Promise<NarrowFromDbQuery<T, Q>[]>;
}

/**
 * Collections created from `config.common.dbCollections`.
 * Augment to type collections added by mods.
 */
export interface ServerDb {
	'leaderboard.power': DbCollection<RawLeaderboard>;
	'leaderboard.seasons': DbCollection<RawLeaderboard>;
	'leaderboard.world': DbCollection<RawLeaderboard>;
	'users.intents': DbCollection<RawUserIntents>;
	'market.orders': DbCollection<RawMarketOrder>;
	'market.stats': DbCollection<RawMarketStats>;
	rooms: DbCollection<Room>;
	'rooms.objects': DbCollection<RawRoomObject>;
	'rooms.flags': DbCollection<RawRoomFlags>;
	'rooms.intents': DbCollection<RawRoomIntents>;
	'rooms.terrain': DbCollection<RoomTerrain>;
	transactions: DbCollection<RawMarketTransaction>;
	users: DbCollection<User>;
	'users.code': DbCollection<RawUserCode>;
	'users.console': DbCollection<RawUserConsole>;
	'users.messages': DbCollection<RawUserMessage>;
	'users.money': DbCollection<RawUserMoney>;
	'users.notifications': DbCollection<RawUserNotification>;
	'users.resources': DbCollection<RawUserResource>;
	'users.power_creeps': DbCollection<RawPowerCreep>;
}

/** Prefix/key names on `storage.env.keys`. */
export interface StorageEnvKeys {
	ACCESSIBLE_ROOMS: 'accessibleRooms';
	ROOM_STATUS_DATA: 'roomStatusData';
	MEMORY: 'memory:';
	GAMETIME: 'gameTime';
	MAP_VIEW: 'mapView:';
	TERRAIN_DATA: 'terrainData';
	SCRIPT_CACHED_DATA: 'scriptCachedData:';
	USER_ONLINE: 'userOnline:';
	MAIN_LOOP_PAUSED: 'mainLoopPaused';
	ROOM_HISTORY: 'roomHistory:';
	ROOM_VISUAL: 'roomVisual:';
	MEMORY_SEGMENTS: 'memorySegments:';
	PUBLIC_MEMORY_SEGMENTS: 'publicMemorySegments:';
	ROOM_EVENT_LOG: 'roomEventLog:';
	ACTIVE_ROOMS: 'activeRooms';
	MAIN_LOOP_MIN_DURATION: 'tickRate';
}

export interface StorageEnv {
	keys: StorageEnvKeys;
	get(key: string): Promise<any>;
	mget(keys: string[]): Promise<any[]>;
	set(key: string, value: any): Promise<any>;
	setex(key: string, seconds: number, value: any): Promise<void>;
	expire(key: string, seconds: number): Promise<void>;
	ttl(key: string): Promise<number>;
	del(key: string): Promise<number>;
	hmget(name: string, fields: string[]): Promise<any[]>;
	hmset(name: string, data: object): Promise<any>;
	hget(name: string, field: string | number): Promise<any>;
	hset(name: string, field: string | number, value: any): Promise<any>;
	sadd(name: string, data: any): Promise<any>;
	smembers(name: string): Promise<any>;
}

export interface StoragePubsubKeys {
	QUEUE_DONE: 'queueDone:';
	RUNTIME_RESTART: 'runtimeRestart';
	TICK_STARTED: 'tickStarted';
	ROOMS_DONE: 'roomsDone';
}

export interface StoragePubsub {
	keys: StoragePubsubKeys;
	publish(channel: string, data?: any): Promise<any>;
	subscribe(channel: string, cb: (data: any) => void): void;
}

export interface StorageQueue {
	fetch(name: string): Promise<any>;
	add(name: string, id: any): Promise<any>;
	addMulti(name: string, ids: any[]): Promise<any>;
	markDone(name: string, id: any): Promise<any>;
	whenAllDone(name: string): Promise<any>;
	reset(name: string): Promise<any>;
}

/**
 * `@screeps/common` storage client (`config.common.storage` and CLI `sandbox.storage`).
 */
export interface ServerStorage {
	db: ServerDb;
	env: StorageEnv;
	pubsub: StoragePubsub;
	queue: StorageQueue;
	resetAllData(): Promise<void>;
}
