// Admin Utils mod

import { EventEmitter } from './event-emitter';
import { RoomName } from './objects/rooms';

export interface AdminUtilsEvents {
	/**
	 * @param config The `serverConfig` block from config.yml
	 */
	config: (config: Record<string, any>) => void;
	/**
	 * Emitted when a specific config key is updated.
	 * @param value The new value for the config key
	 */
	[K: `config:update:${string}`]: (value: any) => void;
}

declare module '.' {
	interface ServerConfig {
		utils?: ConfigAdminUtils & EventEmitter<AdminUtilsEvents>;
	}
}

/** AdminUtils mod */
export interface ConfigAdminUtils {
	/**
	 * The `serverConfig` block from config.yml
	 */
	config: Record<string, any>;
	addNPCTerminals(interval?: number): Promise<string>;
	removeNPCTerminals(): Promise<string>;
	removeBots(): Promise<string>;
	setSocketUpdateRate(value: number): Promise<string>;
	getSocketUpdateRate(): Promise<string>;
	setShardName(name: string): Promise<string>;
	reloadConfig(): Promise<string>;
}

/** AutoSpawn service */
export interface ConfigAdminUtils {
	spawnBot(botAIName: string, room: RoomName, opts?: { auto: boolean }): Promise<string>;
}

/** GCL-to-CPU service */
export interface ConfigAdminUtils {
	getCPULimit(user: string): Promise<string>;
	setCPULimit(user: string): Promise<string>;
	resetCPULimit(user: string): Promise<string>;
	enableGCLToCPU(maxCPU: number, baseCPU: number, stepCPU: number): Promise<string>;
	disableGCLToCPU(): Promise<string>;
}

/** ImportMap service */
export interface ConfigAdminUtils {
	importMap(urlOrMapId: string): Promise<string>;
	importMapFile(filePath: string): Promise<string>;
}

/** Stats service */
export interface ConfigAdminUtils {
	getStats(): Promise<any>;
}

/** Warpath service */
export interface ConfigAdminUtils {
	warpath: {
		getCurrentBattles(gameTime: number, interval?: number, start?: number): Promise<string>;
	};
}

/** Whitelist service */
export interface ConfigAdminUtils {
	getWhitelist(): Promise<string>;
	addWhitelistUser(user: string): Promise<string>;
	removeWhitelistUser(user: string): Promise<string>;
}
