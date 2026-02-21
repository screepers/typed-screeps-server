declare module '@screeps/backend/lib/utils.js' {
	export function roomNameFromXY(x: number, y: number): string;
	export function roomNameToXY(name: string): [x: number, y: number];
	export function translateModulesFromDb(modules: object): any;
	export function translateModulesToDb(modules: object): any;
	export function getUserWorldStatus(user: import('./objects').User): any;
	export function respawnUser(userId: string): Promise<void>;
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
	export function activateRoom(room: import('./types').RoomName): any;
	export function getActiveRooms(): any;
	export function findFreePos(
		roomName: import('./types').RoomName,
		distance: number,
		rect?: { x1: number; x2: number; y1: number; y2: number },
		exclude?: { x: number; y: number }
	): Promise<import('./types').RoomPosition>;
}

declare module '@screeps/common' {
	// export const configManager: typeof import('lib/config-manager');
	// export const storage: typeof import('lib/storage');
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
	export function roomNameToXY(name: import('./types').RoomName): [x: number, y: number];
	export function getRoomNameFromXY(x: number, y: number): import('./types').RoomName;
	export function calcWorldSize(rooms: import('./objects').Room[]): number;
}

declare module '@screeps/engine/src/utils.js' {
	export function getDriver(): any;
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
		userIntents: any,
		userRuntimeData: any,
		customIntentTypes: any
	): {
		notify: any;
		global: any;
	};
	export function sendAttackingNotification(target: any, roomController: any): void;
	export function checkStructureAgainstController(object: any, roomObjects: any, roomController: any): boolean;
	export function defineGameObjectProperties<TPrototype extends Record<string, any>>(
		obj: TPrototype,
		dataFn: (id: string) => any,
		properties: Record<string, (obj: TPrototype) => any>,
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
	export function dist(
		a: { pos: import('./types').RoomPosition } | import('./types').RoomPosition,
		b: { pos: import('./types').RoomPosition } | import('./types').RoomPosition
	): number;
	export function calcRoomsDistance(
		room1: import('./types').RoomName,
		room2: import('./types').RoomName,
		continuous?: boolean
	): number;
	export function calcTerminalEnergyCost(amount: any, range: any): number;
	export function calcNeededGcl(gclLevel: number): number;
	export function calcTotalReactionsTime(mineral: any): any;
	export function capacityForResource(object: any, resourceType: any): any;
	export function calcReward(resourceDensities: any, targetDensity: any, itemsLimit: any): any;
	export function getReactionVariants(compound: any): string[][];
}
