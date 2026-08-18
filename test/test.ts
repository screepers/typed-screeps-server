import { ServerConfig } from '../src/server/server';
import { EventEmitter } from '../src/event-emitter';
import { BackendEvents } from '../src/server/backend';

const server: ServerConfig = null;

server.backend.on('sendUserNotifications', (user, messages) => {
	user;
	//^? (parameter) user: User
	messages;
	//^? (parameter) messages: UserNotification[]
});

server.backend.on('expressPreConfig', (app) => {
	app;
	//^? (parameter) app: e.Application
});
