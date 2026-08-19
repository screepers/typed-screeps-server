import { EventEmitter } from '../event-emitter';
import { MineralType } from '../objects/resources';
import { RoomName } from '../objects/rooms';
import { ServerStorage } from './storage';

export interface CommonCli {
	_help: string;
}

export interface SystemCli extends CommonCli {
	resetAllData(): Promise<void>;
	sendServerMessage(msg: string): Promise<void>;
	pauseSimulation(): Promise<void>;
	resumeSimulation(): Promise<void>;
	runCronjob(cron: string): Promise<void>;
	getTickDuration(): Promise<number>;
	setTickDuration(duration: number): Promise<void>;
}

export interface MapGenerateRoomOptions {
	/**
	 * An object with exit coordinates arrays, e.g. {top: [20,21,23], right: [], bottom: [27,28,29,40,41]}, default is random
	 */
	exits?: Partial<Record<'top' | 'right' | 'bottom' | 'left', number[]>>;
	/**
	 * The type of generated landscape, a number from 1 to 28, default is random
	 */
	terrainType?: number;
	/**
	 * The type of generated swamp configuration, a number from 0 to 14, default is random
	 */
	swampType?: number;
	/** The amount of sources in the room, default is random from 1 to 2 */
	sources?: number;
	/** The type of the mineral deposit in this room or false if no mineral, default is random type */
	mineral?: MineralType;
	/** Whether this room should have the controller, default is true */
	controller?: boolean;
	/** Whether this room should have source keeper lairs, default is false` */
	keeperLairs?: boolean;
}

export interface MapCli extends CommonCli {
	generateRoom(name: RoomName, opts?: MapGenerateRoomOptions): Promise<void>;
	openRoom(name: RoomName, timestamp?: number): Promise<void>;
	closeRoom(name: RoomName): Promise<void>;
	removeRoom(name: RoomName): Promise<void>;
	updateRoomImageAssets(roomName: RoomName): Promise<void>;
	updateTerrainData(): Promise<void>;
}

export interface BotSpawnOptions {
	username?: string;
	cpu?: number;
	gcl?: number;
	x?: number;
	y?: number;
}

export interface BotsCli extends CommonCli {
	spawn(botAiName: string, roomName: RoomName, opts?: BotSpawnOptions): Promise<string>;
	reload(botAiName: string): Promise<string>;
	removeUser(username: string): Promise<string>;
}

export interface StrongholdSpawnOptions {
	templateName?: string;
	x?: number;
	y?: number;
	user?: string;
	deployTime?: number;
}

export interface StrongholdsCli extends CommonCli {
	spawn(roomName: RoomName, opts?: StrongholdSpawnOptions): Promise<unknown>;
	expand(roomName: RoomName): Promise<string>;
}

export interface CliEvents {
	cliSandbox: (sandbox: CliSandbox) => void;
}

/**
 * `config.cli` — EventEmitter that creates the sandbox. Distinct from {@link CliSandbox}.
 */
export interface ServerCli extends EventEmitter<CliEvents> {
	greeting: string;
	createSandbox(outputCallback: (data: string, isResult?: boolean) => void): CliSandbox;
	connectionListener(socket: import('net').Socket): void;
}

/**
 * VM context for CLI commands (`print`, `storage`, `map`, `bots`, `strongholds`, `system`).
 * `storage` is `common.storage`, same object as `config.common.storage`.
 */
export interface CliSandbox {
	print: (...args: any[]) => void;
	help: (object?: unknown) => string;
	system: SystemCli;
	storage: ServerStorage;
	map: MapCli;
	bots: BotsCli;
	strongholds: StrongholdsCli;
}
