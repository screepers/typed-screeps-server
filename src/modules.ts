type User = import('./objects/users').User;
type UserId = import('./objects/users').UserId;
type Coord = import('./objects/rooms').Coord;
type _RoomPosition = import('./objects/rooms').RoomPosition;
type RoomName = import('./objects/rooms').RoomName;
type _Room = import('./objects/rooms').Room;

declare module '@screeps/backend/lib/utils.js' {
	export function roomNameFromXY(x: number, y: number): RoomName;
	export function roomNameToXY(name: RoomName): [x: number, y: number];
	export function translateModulesFromDb(modules: object): any;
	export function translateModulesToDb(modules: object): any;
	export function getUserWorldStatus(user: User): any;
	export function respawnUser(userId: UserId): Promise<void>;
	export function withHelp<T extends (...args: any[]) => void>(spec: [desc: string, fn: T]): T;
	export function generateCliHelp(prefix: string, obj: object): string;
	export function writePng(colors: any, width: number, height: number, filename: string): any;
	export function createTerrainColorsMap(terrain: any, zoomIn: any): {};
	export function writeTerrainToPng(terrain: any, filename: any, zoomIn: any): any;
	export function loadBot(name: string): any;
	export function reloadBotUsers(name: string): any;
	export function isBus(coord: number): boolean;
	export function isCenter(x: number, y: number): boolean;
	export function isVeryCenter(x: number, y: number): boolean;
	export function activateRoom(room: RoomName): any;
	export function getActiveRooms(): Promise<RoomName>;
	export function findFreePos(
		roomName: RoomName,
		distance: number,
		rect?: { x1: number; x2: number; y1: number; y2: number },
		exclude?: { x: number; y: number }
	): Promise<_RoomPosition>;
}

declare module '@screeps/common' {
	export const storage: import('./server/storage').ServerStorage;
	export const configManager: {
		load(): void;
		config: import('./server/server').ServerConfig;
	};
	// export const rpc: typeof import('lib/rpc');
	export function findPort(port: any): any;
	export function encodeTerrain(terrain: any): string;
	export function decodeTerrain(
		str: any,
		room: any
	): {
		room: any;
		x: number;
		y: number;
		type: string;
	}[];
	export function checkTerrain(terrain: Uint8Array | string, x: number, y: number, mask: any): boolean;
	export function getGametime(): Promise<number>;
	export function getDiff(oldData: any, newData: any): {};
	export function qSequence(collection: any, fn: any): any;
	export function roomNameToXY(name: RoomName): [x: number, y: number];
	export function getRoomNameFromXY(x: number, y: number): RoomName;
	export function calcWorldSize(rooms: _Room[]): number;
}

declare module '@screeps/engine/src/utils.js' {
	export function getDriver(): import('./server/driver').ServerDriver;
	export function getRuntimeDriver(): any;
	export function fetchXYArguments(firstArg: any, secondArg: any, globals: any): any[];
	export function getDirection(dx: any, dy: any): any;
	export function getOffsetsByDirection(direction: any): number[] | undefined;
	export function calcCreepCost(body: any): number;
	export function checkConstructionSite(objects: any, structureType: any, x: number, y: number): any;
	export function getDiff(oldData: any, newData: any): {};
	export function encodeTerrain(terrain: any): string;
	export function decodeTerrain(items: any): {
		room: any;
		x: number;
		y: number;
		type: string;
	}[];
	export function decodeTerrainByRoom(items: any): {
		spatial: {};
	};
	export function checkTerrain(terrain: any, x: number, y: number, mask: any): boolean;
	export function checkControllerAvailability(
		type: any,
		roomObjects: any,
		roomController: any,
		offset: number
	): boolean;
	export function getRoomNameFromXY(x: number, y: number): string;
	export function roomNameToXY(name: any): number[];
	export function comparatorDistance(target: any): (a: any, b: any) => number;
	export function storeIntents(
		userId: any,
		userIntents: import('./objects/intents').UserIntents,
		userRuntimeData: any,
		customIntentTypes: any
	): {
		roomName: import('./objects/intents').RoomIntent;
		notify: import('./objects/intents').NotifyIntent;
		global: import('./objects/intents').GlobalIntent;
	};
	export function sendAttackingNotification(target: any, roomController: any): void;
	export function checkStructureAgainstController(object: any, roomObjects: any, roomController: any): boolean;
	export function defineGameObjectProperties<TRaw>(
		obj: object,
		dataFn: (id: string) => TRaw,
		properties: Record<string, (raw: TRaw, id: string) => unknown>,
		opts?: { enumerable?: boolean; canSet?: boolean }
	): void;
	export function isAtEdge(object: any): boolean;
	interface PathStep {
		x: number;
		y: number;
		dx: -1 | 0 | 1;
		dy: -1 | 0 | 1;
		direction: DirectionConstant;
	}
	export function serializePath(path: PathStep[]): string;
	export function deserializePath(path: string): PathStep[];
	export function calcResources(object: any): any;
	export function calcBodyEffectiveness(
		body: any,
		bodyPartType: any,
		methodName: any,
		basePower: any,
		withoutOldHits?: boolean
	): number;
	export function dist(a: Coord | { pos: Coord }, b: Coord | { pos: Coord }): number;
	export function calcRoomsDistance(room1: RoomName, room2: RoomName, continuous?: boolean): number;
	export function calcTerminalEnergyCost(amount: any, range: any): number;
	export function calcNeededGcl(gclLevel: number): number;
	export function calcTotalReactionsTime(mineral: any): any;
	export function capacityForResource(object: any, resourceType: any): any;
	export function calcReward(resourceDensities: any, targetDensity: any, itemsLimit: any): any;
	export function getReactionVariants(compound: any): string[][];
}

declare module '@screeps/engine/src/processor/common/fake-runtime.js' {
	type RawCreep = import('./objects/raw_objects').RawCreep;
	type RawRoomObject = import('./objects/raw_objects').RawRoomObject;

	/** `{x,y,room}` origin used by path helpers (raw objects, not player `RoomPosition`). */
	export interface PathOrigin {
		x: number;
		y: number;
		room: RoomName;
		user?: UserId;
	}

	/**
	 * Processor `scope` fields this module reads.
	 * `processor.js` unwraps terrain first, so `roomTerrain` is the encoded 2500-char string.
	 */
	export interface FakeRuntimeScope {
		roomObjects: Record<string, RawRoomObject>;
		roomTerrain: string;
		bulk: import('./bulk').BulkCollection<RawRoomObject>;
		gameTime: number;
	}

	/** Processor-side `RoomPosition` (`roomName`); not `objects/rooms` `{x,y,room}`. */
	export class RoomPosition {
		x: number;
		y: number;
		roomName: RoomName;
		constructor(x: number, y: number, roomName: RoomName);
		isEqualTo(p: { x: number; y: number; roomName: string }): boolean;
		getRangeTo(p: { x: number; y: number; roomName: string }): number;
		getDirectionTo(p: { x: number; y: number; roomName: string }): DirectionConstant | undefined;
		lookFor(type: LOOK_TERRAIN): Terrain | Terrain[];
		lookFor(type: LookConstant | string): Terrain | Terrain[] | null;
		sPackLocal(): string;
		static sUnpackLocal(packed: string, roomName: RoomName): RoomPosition;
	}

	/** Processor-side cost matrix; no `serialize` / `deserialize`. */
	export class CostMatrix {
		_bits: Uint8Array;
		constructor();
		set(xx: number, yy: number, val: number): void;
		get(xx: number, yy: number): number;
		clone(): CostMatrix;
	}

	export interface PathOpts {
		ignoreDestructibleStructures?: boolean;
		ignoreCreeps?: boolean;
		ignoreRoads?: boolean;
		reusePath?: number;
		range?: number;
		flee?: boolean;
		maxRooms?: number;
		plainCost?: number;
		swampCost?: number;
		maxOps?: number;
		maxCost?: number;
		heuristicWeight?: number;
		costCallback?: (roomName: RoomName, costMatrix: CostMatrix) => CostMatrix | void;
	}

	export type PathGoal =
		| RoomPosition
		| { pos: RoomPosition; range: number }
		| (RoomPosition | { pos: RoomPosition; range: number })[];

	export interface PathFinderResult {
		path: RoomPosition[];
		ops: number;
		cost: number;
		incomplete: boolean;
	}

	/** Pretick `intents.set`; object id is the list key, so `move` payloads omit `id`. */
	export interface FakeRuntimeIntents {
		set(id: import('./types').RawId<RawCreep>, name: 'move', data: { direction: DirectionConstant }): void;
	}

	export interface WalkContext {
		scope: FakeRuntimeScope;
		intents: FakeRuntimeIntents;
	}

	export function findPath(
		source: PathOrigin,
		target: PathGoal,
		opts: PathOpts | null | undefined,
		scope: FakeRuntimeScope
	): PathFinderResult;
	export function findClosestByPath<T extends PathOrigin>(
		fromPos: PathOrigin,
		objects: T[],
		opts: PathOpts | null | undefined,
		scope: FakeRuntimeScope
	): T | null;
	export function moveTo(
		creep: RawCreep,
		target: PathOrigin,
		opts: PathOpts | null | undefined,
		scope: FakeRuntimeScope
	): DirectionConstant | 0;
	export function walkTo(
		creep: RawCreep,
		target: PathOrigin,
		opts: PathOpts | null | undefined,
		context: WalkContext
	): DirectionConstant | 0 | undefined;
	export function flee(
		creep: PathOrigin,
		hostiles: PathOrigin[],
		range: number,
		opts: PathOpts | null | undefined,
		scope: FakeRuntimeScope
	): DirectionConstant | 0;
	export function hasActiveBodyparts(
		creep: { body?: Pick<BodyPartDefinition, 'hits' | 'type'>[] },
		part: BodyPartConstant
	): boolean;
}

declare module '@screeps/driver/history' {
	export function saveTick(roomId: RoomName, gameTime: number, data: any): any;
	export function upload(roomId: RoomName, baseTime: number): any;
}

declare module '@screeps/driver/queue' {
	export function create<N extends import('./server/driver').DriverQueueName>(
		name: N,
		_usage?: 'read' | 'write'
	): import('./server/driver').DriverQueue<import('./server/driver').DriverQueueItem<N>>;
	export function resetAll(): Promise<true[]>;
	/**
	 * Subscribes to `queueDone:${name}`. Does not remap `'users'` → `'usersIvm'`;
	 * `whenAllDone` publishes the storage name, so pass `usersIvm` not `users`.
	 */
	export function createDoneListener(name: import('./server/storage').StorageQueueName, fn: (data: any) => void): void;
}

declare module '@screeps/driver' {
	export const customObjectPrototypes: any[];
	export const pathFinder: {
		make: (_globals: any) => void;
		search: (origin: any, goal: any, options: any) => any;
	};
	export function connect(processType: any): any;
	export function getAllUsers(): any;
	export function saveUserMemory(userId: any, memory: any): any;
	export function saveUserMemorySegments(userId: UserId, segments: any): any;
	export function getAllRoomsNames(): Promise<RoomName[]>;
	export function activateRoom(room: RoomName): any;
	export function saveUserIntents(userId: any, intents: any): any;
	export function getRoomIntents(roomId: RoomName): Promise<import('./objects/objects').RawRoomIntents | null>;
	export function getRoomObjects(
		roomId: RoomName
	): Promise<{ objects: Record<string, import('./objects/raw_objects').RawRoomObject>; users: Record<string, User> }>;
	export function getRoomFlags(roomId: RoomName): Promise<import('./objects/objects').RawRoomFlags[]>;
	export function getRoomTerrain(roomId: RoomName): Promise<Record<string, import('./objects/rooms').RoomTerrain>>;
	export function bulkObjectsWrite(): import('./bulk').BulkCollection<import('./objects/raw_objects').RawRoomObject>;
	export function bulkFlagsWrite(): import('./bulk').BulkCollection<import('./objects/objects').RawRoomFlags>;
	export function bulkUsersWrite(): import('./bulk').BulkCollection<import('./objects/users').User>;
	export function bulkRoomsWrite(): import('./bulk').BulkCollection<_Room>;
	export function bulkTransactionsWrite(): import('./bulk').BulkCollection<
		import('./objects/objects').RawMarketTransaction
	>;
	export function bulkMarketOrders(): import('./bulk').BulkCollection<import('./objects/objects').RawMarketOrder>;
	export function bulkMarketIntershardOrders(): import('./bulk').BulkCollection<
		import('./objects/objects').RawIntershardOrder
	>;
	export function bulkUsersMoney(): import('./bulk').BulkCollection<import('./objects/objects').RawUserMoney>;
	export function bulkUsersResources(): import('./bulk').BulkCollection<import('./objects/objects').RawUserResource>;
	export function bulkUsersPowerCreeps(): import('./bulk').BulkCollection<
		import('./objects/raw_objects').RawPowerCreep
	>;
	export function clearRoomIntents(roomId: RoomName): any;
	export function clearGlobalIntents(): any;
	export function mapById(array: any, fn: any): any;
	export function notifyTickStarted(): Promise<void>;
	export function notifyRoomsDone(gameTime: number): any;
	export function sendConsoleMessages(userId: UserId, messages: any): any;
	export function sendConsoleError(userId: UserId, error: any): any;
	export function getGameTime(): Promise<number>;
	export function incrementGameTime(): Promise<number>;
	export function getRoomInfo(roomId: RoomName): Promise<_Room>;
	export function saveRoomInfo(roomId: RoomName, roomInfo: Partial<_Room>): Promise<void>;
	export function getInterRoom(): Promise<
		[
			gameTime: number,
			creeps: import('./objects/raw_objects').RawCreep[],
			accessibleRooms: _Room[],
			roomObjects: import('./objects/raw_objects').RawRoomObject[],
			userData: {
				orders: import('./objects/objects').RawMarketOrder[];
				users: User[];
				userPowerCreeps: import('./objects/raw_objects').RawPowerCreep[];
				userIntents: import('./objects/intents').UserIntents;
				shardName: string;
			},
		]
	>;
	export function setRoomStatus(roomId: RoomName, status: _Room['status']): Promise<void>;
	export function sendNotification(userId: UserId, message: string): Promise<void>;
	export function getRoomStatsUpdater(room: RoomName): {
		inc(name: keyof _Room, userId: UserId, amount: number): void;
	};
	export function roomsStatsSave(): Promise<void>;
	export function updateAccessibleRoomsList(): Promise<void>;
	export function updateRoomStatusData(): Promise<void>;
	export function saveIdleTime(name: any, time: any): Promise<void>;
	export function mapViewSave(roomId: RoomName, mapView: any): Promise<void>;
	export function commitDbBulk(): Promise<void>;
	export function getWorldSize(): number;
	export function addRoomToUser(roomId: RoomName, user: User, bulk: import('./bulk').BulkCollection<User>): void;
	export function removeRoomFromUser(roomId: RoomName, user: User, bulk: import('./bulk').BulkCollection<User>): void;
	export function bufferFromBase64(base64: string): Buffer;
	export function startLoop(name: any, fn: any): void;
	export function saveRoomEventLog(roomId: RoomName, eventLog: any): any;
	export const makeRuntime: (userId: UserId) => Promise<any>;
	export const history: typeof import('@screeps/driver/history');
	export const config: import('./server/engine').ServerEngine;
	export const queue: typeof import('@screeps/driver/queue');
	export function getAllTerrainData(): any;
}
