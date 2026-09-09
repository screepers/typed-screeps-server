import { EventEmitter } from '../event-emitter';
import { RawUserNotification } from '../objects/objects';
import { User } from '../objects/users';
import { RoomName } from '../objects/rooms';
import { IntentName, IntentTransform } from '../objects/intents';

export interface UserNotification extends Pick<RawUserNotification, 'message' | 'date' | 'count' | 'type'> {}

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
		/** Full `ObjectMetadata` is on the `typed-screeps-server/renderer` subpath. */
		metadata: Record<string, object>;
	};
	features?: { name: string; version: string | number; [key: string]: any }[];
}
