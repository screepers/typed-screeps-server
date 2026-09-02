import { BulkCollection } from '../bulk';
import { ServerDriver } from './driver';
import { EventEmitter } from '../event-emitter';
import { IntentName, IntentTransform, UserIntents } from '../objects/intents';
import { GameOf, RawObject, RawRoomObject } from '../objects/raw_objects';
import type { RawId } from '../types';
import type { Scope } from './scope';
import { Room, RoomName, RoomTerrain } from '../objects/rooms';
import { User, UserId } from '../objects/users';

export type UserSandbox = {
	run: (code: string) => Promise<string>;
	set: (name: string, value: any) => Promise<any>;
	get: (name: string) => Promise<any>;
	getIsolate: () => import('isolated-vm').Isolate;
	getContext: () => import('isolated-vm').Context;
	getGlobal: () => any;
};

export interface EventLogEntry {}

export type EventLog = EventLogEntry[];

export interface MapView {
	w: [];
	r: [];
	pb: [];
	p: [];
	s: [];
	c: [];
	m: [];
	k: [];
}

export interface EngineEvents {
	saveRoomHistory: (roomId: RoomName, baseTime: number, result: any) => void;
	init: (processType: 'main' | 'processor' | 'runner') => void;
	playerSandbox: (sandbox: UserSandbox, userId: UserId) => void;
	processorLoopStage:
		| ((stage: 'start') => void)
		| ((stage: 'getRoomData', roomId: RoomName) => void)
		| ((stage: 'processRoom', roomId: string) => void)
		| ((stage: 'finish', roomId: string) => void);
	preProcessObjectIntents<T extends RawRoomObject>(
		object: T,
		userId: UserId,
		objectIntents: UserIntents,
		roomObjects: Record<RawId<RawRoomObject>, RawRoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RawRoomObject>,
		bulkUsers: BulkCollection<User>
	): void;
	processObjectIntents<T extends RawRoomObject>(
		object: T,
		userId: UserId,
		objectIntents: UserIntents,
		roomObjects: Record<RawId<RawRoomObject>, RawRoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RawRoomObject>,
		bulkUsers: BulkCollection<User>
	): void;
	processObject<T extends RawRoomObject>(
		object: T,
		roomObjects: Record<RawId<RawRoomObject>, RawRoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RawRoomObject>,
		bulkUsers: BulkCollection<User>
	): void;
	postProcessObject<T extends RawRoomObject>(
		object: T,
		roomObjects: Record<RawId<RawRoomObject>, RawRoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RawRoomObject>,
		bulkUsers: BulkCollection<User>,
		eventLog: EventLog,
		mapView: MapView
	): void;
	processRoom(
		roomId: string,
		roomInfo: Room,
		roomObjects: Record<RawId<RawRoomObject>, RawRoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		bulk: BulkCollection<RawRoomObject>,
		bulkUsers: BulkCollection<User>,
		eventLog: EventLog
	): void;
}

export type RawPropertyGetters<TRaw extends RawObject> = Record<string, (raw: TRaw, id: string) => unknown>;

export interface RegisterCustomObjectPrototypeOptions<
	TRaw extends RawRoomObject = RawRoomObject,
	TGame extends GameOf<TRaw> = GameOf<TRaw>,
> {
	parent?: string;
	properties?: RawPropertyGetters<TRaw>;
	prototypeExtender?: (
		prototype: TGame,
		scope: Scope,
		deps: { utils: typeof import('@screeps/engine/src/utils.js') }
	) => void;
	findConstant?: number;
	lookConstant?: string;
}

export interface ServerEngine extends EventEmitter<EngineEvents> {
	driver: ServerDriver;
	customIntentTypes: Record<IntentName, { [keyName: string]: IntentTransform }>;
	registerCustomObjectPrototype: <TRaw extends RawRoomObject, TGame extends GameOf<TRaw> = GameOf<TRaw>>(
		objectType: TRaw['type'],
		name: string,
		opts: RegisterCustomObjectPrototypeOptions<TRaw, TGame>
	) => void;
	mainLoopMinDuration: number;
	mainLoopResetInterval: number;
	mainLoopCustomStage(): Promise<any>;
	cpuMaxPerTick: number;
	cpuBucketSize: number;
	historyChunkSize: number;
	useSigintTimeout: boolean;
	reportMemoryUsageInterval: number;
	enableInspector: boolean;
}
