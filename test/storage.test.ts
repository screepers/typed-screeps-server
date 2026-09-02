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
	UserId,
} from '../src';

declare const config: ServerConfig;
declare const sandbox: CliSandbox;
declare const roomName: RoomName;
declare const userId: UserId;

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
	const projectedUsers = await config.common.storage.db.users.find({}, { username: 1, badge: 1, score: 1, rank: 1 });
	type _assertProjectedUsers =
		Exact<(typeof projectedUsers)[number], Pick<User, '_id' | 'username' | 'badge'>> extends true ? true : never;
	const _assertProjectedUsers: _assertProjectedUsers = true;
	_assertProjectedUsers;
	const projectedUser = await config.common.storage.db.users.findOne(
		{ username: 'User1' },
		{ username: true, badge: true, gcl: true, power: true }
	);
	type _assertProjectedUser =
		Exact<typeof projectedUser, Pick<User, '_id' | 'username' | 'badge' | 'gcl' | 'power'> | null> extends true ? true
		:	never;
	const _assertProjectedUser: _assertProjectedUser = true;
	_assertProjectedUser;
	const projectedCreeps = await config.common.storage.db['rooms.objects'].find({ type: 'creep' }, { type: 1, name: 1 });
	type _assertProjectedCreeps =
		Exact<(typeof projectedCreeps)[number], Pick<RawCreep, '_id' | 'type' | 'name'>> extends true ? true : never;
	const _assertProjectedCreeps: _assertProjectedCreeps = true;
	_assertProjectedCreeps;
	const roomsById = await config.common.storage.db.rooms.find({}, { _id: true });
	type _assertRoomsById = Exact<(typeof roomsById)[number], Pick<Room, '_id'>> extends true ? true : never;
	const _assertRoomsById: _assertRoomsById = true;
	_assertRoomsById;
	const usersWithoutId = await config.common.storage.db.users.find({}, { _id: 0, username: 1 });
	type _assertUsersWithoutId =
		Exact<(typeof usersWithoutId)[number], Pick<User, 'username'>> extends true ? true : never;
	const _assertUsersWithoutId: _assertUsersWithoutId = true;
	_assertUsersWithoutId;
	const emptyProjection: User[] = await config.common.storage.db.users.find({}, {});
	emptyProjection;
	// @ts-expect-error `gcl` was not included in the projection
	projectedUsers[0].gcl;
	await config.common.storage.db.users.update({ username: 'User1' }, { $set: { cpu: 100 } });
	const inserted: User = await config.common.storage.db.users.insert({ username: 'Bot', gcl: 0 });
	inserted;
	const bot: User = await config.common.storage.db.users.insert({
		username: 'Bot',
		cpu: 100,
		cpuAvailable: 10000,
		gcl: 0,
		active: 10000,
		badge: { type: 1, color1: '#000', color2: '#000', color3: '#000', flip: false, param: 0 },
	});
	bot;
	const insertedSource = await config.common.storage.db['rooms.objects'].insert({
		type: 'source',
		room: roomName,
		x: 10,
		y: 40,
		energy: 1000,
	});
	type _assertInsertedSource = Exact<typeof insertedSource, RawSource> extends true ? true : never;
	const _assertInsertedSource: _assertInsertedSource = true;
	_assertInsertedSource;
	insertedSource.energy;
	// @ts-expect-error `type: 'creep'` does not return sources
	const _insertedNotSource: RawSource = await config.common.storage.db['rooms.objects'].insert({
		type: 'creep',
		room: roomName,
		x: 1,
		y: 1,
	});
	_insertedNotSource;
	async function addRoomObject<const Type extends RawRoomObject['type']>(
		type: Type,
		attrs?: Partial<Omit<Extract<RawRoomObject, { type: Type }>, 'type'>>
	) {
		return config.common.storage.db['rooms.objects'].insert({ type, room: roomName, x: 0, y: 0, ...attrs });
	}
	const addedSource = await addRoomObject('source', { energy: 1000, energyCapacity: 1000 });
	type _assertAddedSource = Exact<typeof addedSource, RawSource> extends true ? true : never;
	const _assertAddedSource: _assertAddedSource = true;
	_assertAddedSource;
	await config.common.storage.env.get(config.common.storage.env.keys.GAMETIME);
	await config.common.storage.env.hmget(config.common.storage.env.keys.MEMORY_SEGMENTS + userId, [0, 1]);
	await config.common.storage.pubsub.subscribe(config.common.storage.pubsub.keys.ROOMS_DONE, (_gameTime) => {});
	const queue = config.common.storage.queue;
	const queued: string = await queue.fetch('usersIvm');
	queued;
	const added: true = await queue.add('usersIvm', 'id');
	added;
	const multi: true = await queue.addMulti('usersIvm', ['a', 'b']);
	multi;
	await queue.markDone('usersIvm', 'id');
	await queue.whenAllDone('usersIvm');
	await queue.reset('usersIvm');
	const roomQueued: RoomName = await queue.fetch('rooms');
	roomQueued;
	// @ts-expect-error `'users'` is a driver alias, not a storage queue
	queue.fetch('users');
	// @ts-expect-error storage queue takes the name first
	queue.whenAllDone();
}

_dbUsage;

config.common.bots.simplebot;
config.common.dbCollections;
config.common.system.sanitizeUserIntents({});
config.common.strongholds.templates.bunker1;

if (config.cli) {
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
}

if (config.storage) {
	config.storage.dbOptions;
	config.storage.getDb();
	config.storage.loadDb();
	config.storage.socketListener;
	// @ts-expect-error config.storage is the process EventEmitter, not the client
	config.storage.db;
}
// @ts-expect-error unknown collection
config.common.storage.db.notACollection;
