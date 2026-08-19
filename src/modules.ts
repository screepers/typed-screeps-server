type User = import('./objects/users').User;
type UserId = import('./objects/users').UserId;
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
	// export const configManager: typeof import('lib/config-manager');
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
	export function dist(a: { pos: _RoomPosition } | _RoomPosition, b: { pos: _RoomPosition } | _RoomPosition): number;
	export function calcRoomsDistance(room1: RoomName, room2: RoomName, continuous?: boolean): number;
	export function calcTerminalEnergyCost(amount: any, range: any): number;
	export function calcNeededGcl(gclLevel: number): number;
	export function calcTotalReactionsTime(mineral: any): any;
	export function capacityForResource(object: any, resourceType: any): any;
	export function calcReward(resourceDensities: any, targetDensity: any, itemsLimit: any): any;
	export function getReactionVariants(compound: any): string[][];
}

declare module '@screeps/driver/history' {
	export function saveTick(roomId: RoomName, gameTime: number, data: any): any;
	export function upload(roomId: RoomName, baseTime: number): any;
}

declare module '@screeps/driver/queue' {
	export function create(name: string): any;
	export function resetAll(): any;
	export function createDoneListener(name: any, fn: any): void;
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
	export function getRoomIntents(roomId: RoomName): import('./objects/intents').RoomIntent;
	export function getRoomObjects(roomId: RoomName): import('./objects/raw_objects').RawRoomObject[];
	export function getRoomFlags(roomId: RoomName): import('./objects/objects').RawRoomFlags[];
	export function getRoomTerrain(roomId: RoomName): import('./objects/rooms').RoomTerrain;
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
	export function incrementGameTime(): Promise<void>;
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
	// namespace engine {}
	export function getAllTerrainData(): any;
	// import queue = require('@screeps/driver/queue');
	// export { engine as config, queue, unknown as constants, unknown as strongholds, unknown as system };
}
