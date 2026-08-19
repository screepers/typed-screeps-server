import {
	AnyId,
	GameOf,
	RawCreep,
	RawMineral,
	RawOf,
	RawPortal,
	RawResource,
	RawRoomObject,
	RawStructure,
	RawStructureContainer,
	RawStructureFactory,
	RawStructureLink,
	RawStructureSpawn,
} from '../src/objects/raw_objects';
import { RoomName } from '../src/objects/rooms';
import { IntentId } from '../src/objects/intents';
import { RawMarketOrder } from '../src/objects/objects';
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
type _assertAnyIdMarketOrder = AnyId<RawMarketOrder> extends RawId<RawMarketOrder> ? true : never;
type _assertRawOrderIsAnyId = RawId<RawMarketOrder> extends AnyId<RawMarketOrder> ? true : never;

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

type _assertFactoryGame = GameOf<RawStructureFactory> extends StructureFactory ? true : never;
type _assertLinkGame = GameOf<RawStructureLink> extends StructureLink ? true : never;
type _assertPortalGame = GameOf<RawPortal> extends StructurePortal ? true : never;
type _assertRawOfFactory = RawOf<StructureFactory> extends RawStructureFactory ? true : never;
type _assertRawOfLink = RawOf<StructureLink> extends RawStructureLink ? true : never;
type _assertRawOfPortal = RawOf<StructurePortal> extends RawPortal ? true : never;
type _assertFactoryIsStructure = RawStructureFactory extends RawStructure ? true : never;
type _assertLinkIsStructure = RawStructureLink extends RawStructure ? true : never;
type _assertPortalIsStructure = RawPortal extends RawStructure ? true : never;

const _spawnDraft: Draft<RawStructureSpawn> = {
	type: 'spawn',
	x: 25,
	y: 25,
	room: 'W1N1' as RoomName,
	notifyWhenAttacked: true,
	name: 'Spawn1',
	user: '' as RawStructureSpawn['user'],
	store: { energy: 0 },
	storeCapacityResource: { energy: 300 },
	hits: 5000,
	hitsMax: 5000,
};
_spawnDraft;

const _droppedEnergy: Draft<RawResource> = {
	type: 'energy',
	x: 10,
	y: 10,
	room: 'W1N1' as RoomName,
	resourceType: RESOURCE_ENERGY,
	energy: 50,
};
_droppedEnergy;
