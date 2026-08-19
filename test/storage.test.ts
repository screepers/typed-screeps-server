import { Exact } from '../src/types';
import { CliSandbox, ServerCli } from '../src/server/cli';
import { ServerCommon } from '../src/server/common';
import { ServerConfig } from '../src/server/server';
import {
	DbCollection,
	RawCreep,
	RawRoomObject,
	RawSource,
	RawStructureController,
	RawStructureExtension,
	RawStructureSpawn,
	Room,
	RoomName,
	ServerStorage,
	User,
} from '../src';

declare const config: ServerConfig;
declare const sandbox: CliSandbox;
declare const roomName: RoomName;

const _storage: ServerStorage = config.common.storage;
_storage;

const _cliStorage: ServerStorage = sandbox.storage;
_cliStorage;

type _sameStorage = Exact<ServerCommon['storage'], CliSandbox['storage']> extends true ? true : never;
const _sameStorage: _sameStorage = true;
_sameStorage;

const _users: DbCollection<User> = config.common.storage.db.users;
_users;
const _rooms: DbCollection<Room> = config.common.storage.db.rooms;
_rooms;
const _objects: DbCollection<RawRoomObject> = config.common.storage.db['rooms.objects'];
_objects;

async function _dbUsage() {
	const user: User | null = await config.common.storage.db.users.findOne({ username: 'User1' });
	user;
	const objects: RawRoomObject[] = await sandbox.storage.db['rooms.objects'].find({ room: roomName });
	objects;
	const creeps: RawCreep[] = await config.common.storage.db['rooms.objects'].find({ type: 'creep' });
	creeps;
	const controller: RawStructureController | null = await config.common.storage.db['rooms.objects'].findOne({
		type: 'controller',
	});
	controller;
	const andController: RawStructureController[] = await config.common.storage.db['rooms.objects'].find({
		$and: [{ room: roomName }, { type: 'controller' }],
	});
	andController;
	const energyStructures: (RawStructureSpawn | RawStructureExtension)[] = await config.common.storage.db[
		'rooms.objects'
	].find({ type: { $in: ['spawn', 'extension'] } });
	energyStructures;
	// @ts-expect-error `type: 'creep'` does not return sources
	const _notSources: RawSource[] = await config.common.storage.db['rooms.objects'].find({ type: 'creep' });
	_notSources;
	await config.common.storage.db.users.update({ username: 'User1' }, { $set: { cpu: 100 } });
	const inserted: User = await config.common.storage.db.users.insert({ username: 'Bot', gcl: 0 });
	inserted;
	await config.common.storage.env.get(config.common.storage.env.keys.GAMETIME);
	await config.common.storage.pubsub.subscribe(config.common.storage.pubsub.keys.ROOMS_DONE, (_gameTime) => {});
}

_dbUsage;

config.common.bots.simplebot;
config.common.dbCollections;
config.common.system.sanitizeUserIntents({});
config.common.strongholds.templates.bunker1;

config.cli.on('cliSandbox', (cliSandbox) => {
	cliSandbox.print('hi');
	cliSandbox.bots.spawn('simplebot', roomName);
	cliSandbox.map.generateRoom(roomName);
	cliSandbox.system.pauseSimulation();
	cliSandbox.strongholds.expand(roomName);
	cliSandbox.help(cliSandbox.storage);
});

// @ts-expect-error config.cli is the EventEmitter, not the sandbox
config.cli.print;
// @ts-expect-error unknown collection
config.common.storage.db.notACollection;
