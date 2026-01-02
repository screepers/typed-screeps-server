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
