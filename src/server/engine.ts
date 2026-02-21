import { BulkCollection } from '../bulk';
import { ServerDriver } from './driver';
import { EventEmitter } from '../event-emitter';
import { IntentName, IntentTransform, UserIntents } from '../objects/intents';
import { RoomObject } from '../objects/room_objects';
import { Id } from '../types';
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

export interface EngineEvents {
	saveRoomHistory: (roomId: RoomName, baseTime: number, result: any) => void;
	init: (processType: 'main' | 'processor' | 'runner') => void;
	playerSandbox: (sandbox: UserSandbox, userId: UserId) => void;
	processorLoopStage:
		| ((stage: 'start') => void)
		| ((stage: 'getRoomData', roomId: RoomName) => void)
		| ((stage: 'processRoom', roomId: string) => void)
		| ((stage: 'finish', roomId: string) => void);
	preProcessObjectIntents<T extends RoomObject>(
		object: T,
		userId: UserId,
		objectIntents: UserIntents,
		roomObjects: Record<Id<RoomObject>, RoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RoomObject>,
		bulkUsers: BulkCollection<User>
	): void;
	processObjectIntents<T extends RoomObject>(
		object: T,
		userId: UserId,
		objectIntents: UserIntents,
		roomObjects: Record<Id<RoomObject>, RoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RoomObject>,
		bulkUsers: BulkCollection<User>
	): void;
	processObject<T extends RoomObject>(
		object: T,
		roomObjects: Record<Id<RoomObject>, RoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RoomObject>,
		bulkUsers: BulkCollection<User>
	): void;
	postProcessObject<T extends RoomObject>(
		object: T,
		roomObjects: Record<Id<RoomObject>, RoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		roomInfo: Room,
		bulk: BulkCollection<RoomObject>,
		bulkUsers: BulkCollection<User>,
		eventLog: EventLog,
		mapView: MapView
	): void;
	processRoom(
		roomId: string,
		roomInfo: Room,
		roomObjects: Record<Id<RoomObject>, RoomObject>,
		roomTerrain: RoomTerrain,
		gameTime: number,
		bulk: BulkCollection<RoomObject>,
		bulkUsers: BulkCollection<User>,
		eventLog: EventLog
	): void;
}

export interface ServerEngine extends EventEmitter<EngineEvents> {
	driver: ServerDriver;
	customIntentTypes: Record<IntentName, { [keyName: string]: IntentTransform }>;
	registerCustomObjectPrototype: <TPrototype extends Record<string, any> = Record<string, any>>(
		objectType: string,
		name: string,
		opts: {
			parent?: string;
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
