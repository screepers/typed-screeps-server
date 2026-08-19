import { IntentBuilder, IntentData, IntentId, IntentType, NotifyIntent } from '../src/objects/intents';
import { RawMarketOrder } from '../src/objects/objects';
import {
	AnyId,
	RawConstructionSite,
	RawCreep,
	RawPowerCreep,
	RawRoomObject,
	RawSource,
	RawStructureLab,
	RawStructurePowerSpawn,
} from '../src/objects/raw_objects';
import { RoomName } from '../src/objects/rooms';
import { RawId } from '../src/types';

declare const intents: IntentBuilder;
declare const creepId: RawId<RawCreep>;
declare const powerCreepId: RawId<RawPowerCreep>;
declare const gameCreepId: AnyId<RawCreep>;
declare const sourceId: RawId<RawSource>;
declare const siteId: RawId<RawConstructionSite>;
declare const labId: RawId<RawStructureLab>;
declare const powerSpawnId: RawId<RawStructurePowerSpawn>;
declare const orderId: RawId<RawMarketOrder>;
declare const roomName: RoomName;
declare const unknownKey: string;

const _cpu: number = intents.cpu;
_cpu;

// IntentId: special buckets + raw/game object ids (`runtime.js` list keys)
const _roomId: IntentId = 'room';
const _notifyId: IntentId = 'notify';
const _globalId: IntentId = 'global';
const _rawObjectId: IntentId = creepId;
const _gameObjectId: IntentId = gameCreepId;
const _objectId: AnyId<RawRoomObject> = gameCreepId;
_roomId;
_notifyId;
_globalId;
_rawObjectId;
_gameObjectId;
_objectId;

// @ts-expect-error plain strings are not intent keys
const _plainString: IntentId = 'not-a-key';
_plainString;
// @ts-expect-error list is keyed by IntentId, not string
const _indexedByString = intents.list[unknownKey];
_indexedByString;

// set(id, name, data) — object bucket, single payload
const _set: void = intents.set(creepId, 'move', { id: powerCreepId, direction: TOP });
intents.set(gameCreepId, 'harvest', { id: sourceId });
intents.set(creepId, 'say', { message: 'hi', isPublic: false });
intents.set(creepId, 'suicide', {});
intents.set(creepId, 'notifyWhenAttacked', { enabled: true });
_set;

// @ts-expect-error unknown intent name
intents.set(creepId, 'notAnIntent', {});
// @ts-expect-error move requires direction
intents.set(creepId, 'move', { id: creepId });
// @ts-expect-error harvest id is a string
intents.set(creepId, 'harvest', { id: 1 });
// @ts-expect-error harvest id is not a plain string
intents.set(creepId, 'harvest', { id: 'source' });

// push(name, data, maxLen?) — top-level array (`Game.notify`)
const _push: boolean = intents.push('notify', { message: 'under attack', groupInterval: 0 }, 20);
intents.push('notify', { message: 'hi', groupInterval: 5 });
_push;

const _notify: NotifyIntent[] | undefined = intents.list.notify;
const _notifyItem: NotifyIntent | undefined = _notify?.[0];
_notifyItem;

// @ts-expect-error notify is an array of payloads, not a named-intent map
intents.list.notify!.notify;
// @ts-expect-error notify payload is not an order
intents.push('notify', { orderId: 'order' }, 20);
// @ts-expect-error maxLen is a number
intents.push('notify', { message: 'hi', groupInterval: 0 }, '20');

// pushByName('room', name, data) — room bucket, arrays
const _flag: IntentData<'createFlag'> = {
	roomName,
	x: 10,
	y: 10,
	name: 'Flag1',
	color: COLOR_RED,
	secondaryColor: COLOR_WHITE,
};
const _pushRoom: boolean = intents.pushByName('room', 'createFlag', _flag);
intents.pushByName('room', 'createConstructionSite', {
	roomName,
	x: 1,
	y: 2,
	structureType: STRUCTURE_SPAWN,
	name: 'Spawn1',
});
intents.pushByName('room', 'destroyStructure', { roomName, id: labId });
intents.pushByName('room', 'removeFlag', { roomName, name: 'Flag1' });
intents.pushByName('room', 'removeConstructionSite', { roomName, id: siteId });
_pushRoom;

const _roomFlags: IntentType['createFlag'][] | undefined = intents.list.room?.createFlag;
_roomFlags?.[0].roomName;

// @ts-expect-error room createFlag is an array
const _singleFlag: IntentType['createFlag'] = intents.list.room!.createFlag!;
_singleFlag;
// @ts-expect-error deal is a global intent
intents.list.room!.deal;
// @ts-expect-error missing createFlag fields
intents.pushByName('room', 'createFlag', { roomName, x: 0, y: 0 });
// @ts-expect-error room names are branded
intents.pushByName('room', 'removeFlag', { roomName: 'W1N1', name: 'Flag1' });

// pushByName('global', name, data, maxLen?) — global bucket, arrays
const _pushGlobal: boolean = intents.pushByName(
	'global',
	'deal',
	{ orderId, amount: 100, targetRoomName: roomName },
	10
);
intents.pushByName(
	'global',
	'createOrder',
	{ type: ORDER_BUY, resourceType: RESOURCE_ENERGY, price: 1, totalAmount: 1000, roomName },
	50
);
intents.pushByName('global', 'cancelOrder', { orderId }, 50);
intents.pushByName('global', 'spawnPowerCreep', { id: powerSpawnId, name: 'PC1' }, 50);
_pushGlobal;

const _deals: IntentType['deal'][] | undefined = intents.list.global?.deal;
_deals?.[0].orderId;

// @ts-expect-error global deal is an array
const _singleDeal: IntentType['deal'] = intents.list.global!.deal!;
_singleDeal;
// @ts-expect-error createFlag is a room intent
intents.list.global!.createFlag;

// set() object bucket — single payloads, not arrays
const _move: IntentType['move'] | undefined = intents.list[creepId]?.move;
_move?.direction;
const _gameMove: IntentType['move'] | undefined = intents.list[gameCreepId]?.move;
_gameMove;

// @ts-expect-error object intents are single payloads
intents.list[creepId]!.move![0];

// remove(id, name)
const _removed: boolean = intents.remove(creepId, 'move');
intents.remove(gameCreepId, 'activateSafeMode');
_removed;

// @ts-expect-error unknown intent name
intents.remove(creepId, 'notAnIntent');
