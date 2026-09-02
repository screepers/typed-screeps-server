import { RoomName, ServerStorage } from '../src';
import * as common from '@screeps/common';
import * as driver from '@screeps/driver';

const _storage: ServerStorage = common.configManager.config.common.storage;
_storage;

async function _driverUsage() {
	const usersQueue = driver.queue.create('users', 'write');
	const fetched: string = await usersQueue.fetch();
	fetched;
	const roomsQueue = driver.queue.create('rooms');
	const roomId: RoomName = await roomsQueue.fetch();
	roomId;
	// @ts-expect-error unknown queue
	driver.queue.create('notAQueue');
	// @ts-expect-error `'users'` is remapped; the pubsub channel is `usersIvm`
	driver.queue.createDoneListener('users', () => {});
	const added: true | void = await usersQueue.addMulti(['a', 'b']);
	added;
	await usersQueue.add('c');
	await usersQueue.markDone('c');
	const done: true = await usersQueue.whenAllDone();
	done;
	const reset: true = await usersQueue.reset();
	reset;
	// @ts-expect-error bound queue methods do not take a name
	usersQueue.whenAllDone('users');
	await driver.config.mainLoopCustomStage();
	const gameTime = await driver.incrementGameTime();
	await driver.notifyRoomsDone(gameTime);
}

_driverUsage;
