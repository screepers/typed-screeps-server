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

export interface ServerEngine extends EventEmitter<EngineEvents> {
	registerCustomObjectPrototype: <TPrototype extends Record<string, any> = Record<string, any>>(
		objectType: string,
		name: string,
		opts: {
			properties?: Record<string, any>;
			prototypeExtender?: (
				prototype: TPrototype,
				scope: {
					runtimeData: any;
					intents: any;
					register: any;
					globals: any;
				},
				deps: { utils: typeof import('@screeps/engine/src/utils.js') }
			) => void;
			findConstant?: number;
			lookConstant?: string;
		}
	) => void;
}
