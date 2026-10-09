import type { RoomName, RunnerRunResult, ServerEngine, User, UserId } from '../src';

declare const engine: ServerEngine;
declare const userId: UserId;
declare const room: RoomName;
declare const users: User[];
declare const rooms: RoomName[];
declare const runResult: RunnerRunResult;

engine.emit('mainLoopStage', 'start');
engine.emit('mainLoopStage', 'addUsersToQueue', users);
engine.emit('mainLoopStage', 'addRoomsToQueue', rooms);
engine.emit('mainLoopStage', 'finish');
engine.emit('runnerLoopStage', 'start');
engine.emit('runnerLoopStage', 'runUser', userId);
engine.emit('runnerLoopStage', 'saveResultStart', runResult);
engine.emit('runnerLoopStage', 'saveResultFinish', runResult);
engine.emit('runnerLoopStage', 'finish', userId);
engine.emit('runnerLoopStage', 'finish', undefined);
engine.emit('processorLoopStage', 'start');
engine.emit('processorLoopStage', 'getRoomData', room);
engine.emit('processorLoopStage', 'processRoom', room);
engine.emit('processorLoopStage', 'saveRoom', room);
engine.emit('processorLoopStage', 'finish', room);
engine.emit('processorLoopStage', 'finish', undefined);

// @ts-expect-error start takes no payload
engine.emit('runnerLoopStage', 'start', userId);
// @ts-expect-error runUser needs a user id
engine.emit('runnerLoopStage', 'runUser');
// @ts-expect-error saveRoom needs a room name
engine.emit('processorLoopStage', 'saveRoom');

engine.on('runnerLoopStage', (...args) => {
	const [stage, extra] = args;
	if (stage === 'runUser') {
		const id: UserId = extra;
		// @ts-expect-error user id is not a number
		const bad: number = extra;
		id;
		bad;
	}
	if (stage === 'saveResultStart' || stage === 'saveResultFinish') {
		const used: number | undefined = extra.usedTime;
		// @ts-expect-error run result is not a user id
		const id: UserId = extra;
		used;
		id;
	}
	if (stage === 'finish') {
		const id: UserId | undefined = extra;
		id;
	}
	if (stage === 'start') {
		const only: ['start'] = args;
		only;
	}
});

engine.on('processorLoopStage', (...args) => {
	const [stage, roomId] = args;
	if (stage === 'getRoomData' || stage === 'processRoom' || stage === 'saveRoom') {
		const id: RoomName = roomId;
		id;
	}
	if (stage === 'finish') {
		const id: RoomName | undefined = roomId;
		id;
	}
});

engine.on('mainLoopStage', (...args) => {
	const [stage, extra] = args;
	if (stage === 'addUsersToQueue') {
		const name: string | undefined = extra[0]?.username;
		name;
	}
	if (stage === 'addRoomsToQueue') {
		const name: RoomName = extra[0];
		name;
	}
	if (stage === 'waitForUsers') {
		const absent: undefined = extra;
		absent;
	}
});
