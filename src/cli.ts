import { EventEmitter } from './event-emitter';
import { MineralType } from './resources';
import { RoomName } from './types';

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

export interface CliEvents {
	cliSandbox: (sandbox: CliSandbox) => void;
}

export interface CliSandbox extends EventEmitter<CliEvents> {
	print: (...args: any[]) => void;
	system: SystemCli;
	storage: {};
	map: MapCli;
	bots: {};
	strongholds: {};
}
