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

export interface RunnerRunResult {
	error?: string;
	username?: string;
	type?: 'done' | 'error';
	usedTime?: number;
	usedCleanTime?: number;
	usedDirtyTime?: number;
	memory?: { data?: string };
	console?: { log?: any; results?: any };
	memorySegments?: Record<string, string>;
	intents?: any;
	intentsList?: any;
	intentsCpu?: number;
	interShardSegment?: any;
	visual?: Record<string, string>;
	activeSegments?: number[];
	activeForeignSegment?: { username: string; id?: number; user_id?: string } | null;
	defaultPublicSegment?: number | null;
	publicSegments?: string;
}

export type MainLoopStage =
	| 'start'
	| 'getUsers'
	| 'addUsersToQueue'
	| 'waitForUsers'
	| 'getRooms'
	| 'addRoomsToQueue'
	| 'waitForRooms'
	| 'commit1'
	| 'global'
	| 'commit2'
	| 'incrementGameTime'
	| 'notifyRoomsDone'
	| 'custom'
	| 'finish';

export type RunnerLoopStage = 'start' | 'runUser' | 'saveResultStart' | 'saveResultFinish' | 'finish';

export type ProcessorLoopStage = 'start' | 'getRoomData' | 'processRoom' | 'saveRoom' | 'finish';

export interface EngineEvents {
	saveRoomHistory: (roomId: RoomName, baseTime: number, result: any) => void;
	init: (processType: 'main' | 'processor' | 'runner') => void;
	playerSandbox: (sandbox: UserSandbox, userId: UserId) => void;
	mainLoopStage: (
		...args:
			| [stage: Exclude<MainLoopStage, 'addUsersToQueue' | 'addRoomsToQueue'>]
			| [stage: 'addUsersToQueue', users: User[]]
			| [stage: 'addRoomsToQueue', rooms: RoomName[]]
	) => void;
	runnerLoopStage: (
		...args:
			| [stage: 'start']
			| [stage: 'runUser', userId: UserId]
			| [stage: 'saveResultStart', runResult: RunnerRunResult]
			| [stage: 'saveResultFinish', runResult: RunnerRunResult]
			| [stage: 'finish', userId: UserId | undefined]
	) => void;
	processorLoopStage: (
		...args:
			| [stage: 'start']
			| [stage: 'getRoomData', roomId: RoomName]
			| [stage: 'processRoom', roomId: RoomName]
			| [stage: 'saveRoom', roomId: RoomName]
			| [stage: 'finish', roomId: RoomName | undefined]
	) => void;
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
