import { EventEmitter } from './event-emitter';
import { User } from './objects';

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
	features?: Array<{ name: string; version: number }>;
	router: import('express').Router;
	customObjectTypes: Record<string, { sidepanel: string }>;
}
