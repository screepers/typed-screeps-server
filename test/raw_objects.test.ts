import {
	AnyId,
	GameOf,
	RawCreep,
	RawMineral,
	RawOf,
	RawRoomObject,
	RawStructure,
	RawStructureContainer,
} from '../src/objects/raw_objects';
import { RoomName } from '../src/objects/rooms';
import { IntentId } from '../src/objects/intents';
import { MarketOrder } from '../src/objects/objects';
import { Draft, RawId } from '../src/types';

const _repairId: RawId<RawStructure> = '' as RawId<RawStructureContainer>;
_repairId;

type _creepGame = GameOf<RawCreep>;

const _creepIntent: IntentId = '' as RawId<RawCreep>;
const _gameCreep: IntentId = '' as Id<Creep>;
_creepIntent;
_gameCreep;

const _raw: RawRoomObject = {} as RawCreep;
_raw;

type _assertCreepGame = _creepGame extends { id: Id<Creep> } ? true : never;
type _assertRawOfGame = RawOf<Creep> extends RawCreep ? true : never;
type _assertRawOfRaw = RawOf<RawCreep> extends RawCreep ? true : never;
type _assertAnyIdFromRaw = AnyId<RawCreep> extends RawId<RawCreep> | Id<Creep> ? true : never;
type _assertAnyIdFromGame = AnyId<Creep> extends RawId<RawCreep> | Id<Creep> ? true : never;
type _assertIntentId = Id<Creep> extends IntentId ? true : never;
type _assertAnyIdMarketOrder = AnyId<MarketOrder> extends RawId<MarketOrder> ? true : never;
type _assertRawOrderIsAnyId = RawId<MarketOrder> extends AnyId<MarketOrder> ? true : never;

const _draft: Draft<RawMineral> = {
	type: 'mineral',
	x: 0,
	y: 0,
	room: 'W1N1' as RoomName,
	mineralType: 'H',
	mineralAmount: 100,
	density: 1,
};
_draft;
type _assertDraftOmitsId = '_id' extends keyof Draft<RawMineral> ? never : true;
