import { ObjectMetadata } from '@screeps/renderer';
import { EventEmitter } from '../event-emitter';
import { User } from '../objects/users';
import { RoomName } from '../objects/rooms';
import { IntentName, IntentTransform } from '../objects/intents';

export interface UserNotification {
	message: string;
	date: number; // From Date.getTime()
	count: number;
	type: 'msg' | 'error';
}

export interface BackendEvents {
	sendUserNotifications: (user: User, messages: UserNotification[]) => void;
	expressPreConfig: (app: import('express').Application) => void;
	expressPostConfig: (app: import('express').Application) => void;
}

export interface ServerBackend extends EventEmitter<BackendEvents> {
	welcomeText: string;
	router: import('express').Router;
	onGetRoomHistory(
		roomName: RoomName,
		baseTime: string,
		callback: (error?: string | Error | null, result?: string) => void
	): void;
	customObjectTypes: Record<string, { sidepanel: string }>;
	customIntentTypes: Record<IntentName, { [keyName: string]: IntentTransform }>;
	historyChunkSize: number;
	renderer: {
		resources: Record<string, string>;
		metadata: Record<string, ObjectMetadata>;
	};
	features?: { name: string; version: number; [key: string]: any }[];
}
