import { EventEmitter } from './event-emitter';
import { RoomName } from './types';

export type UserSandbox = {
	run: (code: string) => Promise<string>;
	set: (name: string, value: any) => Promise<any>;
	get: (name: string) => Promise<any>;
	getIsolate: () => import('isolated-vm').Isolate;
	getContext: () => import('isolated-vm').Context;
	getGlobal: () => any;
};

export interface EngineEvents {
	saveRoomHistory: (roomId: RoomName, baseTime: number, result: any) => void;
	init: (processType: 'main' | 'processor' | 'runner') => void;
	playerSandbox: (sandbox: UserSandbox, userId: string) => void;
}

export interface ServerEngine extends EventEmitter<EngineEvents> {}
