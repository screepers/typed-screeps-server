import { RawMarketOrder } from './objects';
import {
	AnyId,
	RawConstructionSite,
	RawCreep,
	RawDeposit,
	RawResource,
	RawMineral,
	RawPowerCreep,
	RawRoomObject,
	RawRuin,
	RawSource,
	RawStructure,
	RawStructureController,
	RawStructureExtension,
	RawStructureLab,
	RawStructurePowerBank,
	RawStructurePowerSpawn,
	RawStructureSpawn,
	RawTombstone,
} from './raw_objects';
import { MarketResourceType, ResourceType } from './resources';
import { RoomName } from './rooms';
import { Nullable, RawId } from '../types';

export interface UserRuntimeData {
	userObjects: Record<string, any>;
	roomObjects: Record<string, any>;
}

export type IntentTransform =
	| 'string'
	| 'number'
	| 'boolean'
	| 'price'
	| 'string[]'
	| 'number[]'
	| 'bodypart[]'
	| 'userString'
	| 'userText';
export type UserText = string; // 0..100
export type UserString = string; // 0..1000
export type Price = number;

export interface IntentType {
	notify: { message: UserText; groupInterval: number };
	createConstructionSite: {
		roomName: RoomName;
		x: number;
		y: number;
		structureType: BuildableStructureConstant;
		name: UserString;
	};
	createFlag: {
		roomName: RoomName;
		x: number;
		y: number;
		name: UserString;
		color: ColorConstant;
		secondaryColor: ColorConstant;
	};
	destroyStructure: { roomName: RoomName; id: RawId<RawStructure> };
	removeConstructionSite: { roomName: RoomName; id: RawId<RawConstructionSite> };
	removeFlag: { roomName: RoomName; name: UserString };
	cancelOrder: { orderId: RawId<RawMarketOrder> };
	changeOrderPrice: { orderId: RawId<RawMarketOrder>; newPrice: Price };
	createOrder: {
		type: ORDER_BUY | ORDER_SELL;
		resourceType: MarketResourceType;
		price: Price;
		totalAmount: number;
		roomName: RoomName;
	};
	createPowerCreep: { name: UserString; className: PowerClassConstant };
	deal: { orderId: RawId<RawMarketOrder>; amount: number; targetRoomName: RoomName };
	deletePowerCreep: { id: RawId<RawPowerCreep>; cancel: boolean };
	extendOrder: { orderId: RawId<RawMarketOrder>; addAmount: number };
	renamePowerCreep: { id: RawId<RawPowerCreep>; name: UserString };
	spawnPowerCreep: { id: RawId<RawStructurePowerSpawn>; name: UserString };
	suicidePowerCreep: { id: RawId<RawPowerCreep> };
	upgradePowerCreep: { id: RawId<RawPowerCreep>; power: PowerConstant };
	activateSafeMode: {};
	attack: { id: RawId<RawStructure> | RawId<RawCreep> | RawId<RawPowerCreep>; x: number; y: number };
	attackController: { id: RawId<RawStructureController> };
	boostCreep: { id: RawId<RawCreep>; bodyPartsCount: number };
	build: { id: RawId<RawConstructionSite>; x: number; y: number };
	cancelSpawning: {};
	claimController: { id: RawId<RawStructureController> };
	createCreep: {
		name: UserString;
		body: BodyPartConstant[];
		energyStructures: (RawId<RawStructureSpawn> | RawId<RawStructureExtension>)[];
		directions: DirectionConstant[];
	};
	destroy: {};
	dismantle: { id: RawId<RawStructure> };
	drop: { amount: number; resourceType: ResourceType };
	enableRoom: { id: RawId<RawStructureController> };
	generateSafeMode: { id: RawId<RawStructureController> };
	harvest: { id: RawId<RawSource> | RawId<RawMineral> | RawId<RawDeposit> };
	heal: { id: RawId<RawCreep> | RawId<RawPowerCreep>; x: number; y: number };
	launchNuke: { x: number; y: number; roomName: RoomName };
	move: { id: RawId<RawCreep> | RawId<RawPowerCreep>; direction: DirectionConstant };
	notifyWhenAttacked: { enabled: boolean };
	observeRoom: { roomName: RoomName };
	pickup: { id: RawId<RawResource> };
	processPower: {};
	produce: { resourceType: ResourceType; amount: number };
	pull: { id: RawId<RawCreep> };
	rangedAttack: { id: RawId<RawStructure> | RawId<RawCreep> | RawId<RawPowerCreep> };
	rangedHeal: { id: RawId<RawCreep> | RawId<RawPowerCreep> };
	rangedMassAttack: {};
	recycleCreep: { id: RawId<RawCreep> };
	renew: { id: RawId<RawStructurePowerSpawn> | RawId<RawStructurePowerBank> };
	renewCreep: { id: RawId<RawCreep> };
	reverseReaction: { lab1: RawId<RawStructureLab>; lab2: RawId<RawStructureLab> };
	runReaction: { lab1: RawId<RawStructureLab>; lab2: RawId<RawStructureLab> };
	remove: {};
	repair: { id: RawId<RawStructure>; x: number; y: number };
	reserveController: { id: RawId<RawStructureController> };
	say: { message: UserString; isPublic: boolean };
	send: { targetRoomName: RoomName; resourceType: ResourceType; amount: number; description: UserString };
	setColor: { color: ColorConstant; secondaryColor: ColorConstant };
	setPosition: { x: number; y: number; roomName: RoomName };
	setPublic: { isPublic: boolean };
	setSpawnDirections: { directions: DirectionConstant[] };
	signController: { id: RawId<RawStructureController>; sign: UserString };
	suicide: {};
	transfer: {
		id: RawId<RawStructure> | RawId<RawCreep> | RawId<RawPowerCreep>;
		amount: number;
		resourceType: ResourceType;
	};
	unboostCreep: { id: RawId<RawCreep> };
	unclaim: {};
	upgradeController: { id: RawId<RawStructureController> };
	usePower: { power: PowerConstant; id?: RawId<RawPowerCreep> };
	withdraw: {
		id: RawId<RawStructure> | RawId<RawTombstone> | RawId<RawRuin>;
		amount: number;
		resourceType: ResourceType;
	};
}

export type IntentName = keyof IntentType;

export interface GlobalIntents {
	createOrder: 'createOrder';
	cancelOrder: 'cancelOrder';
	changeOrderPrice: 'changeOrderPrice';
	extendOrder: 'extendOrder';
	deal: 'deal';
	spawnPowerCreep: 'spawnPowerCreep';
	suicidePowerCreep: 'suicidePowerCreep';
	deletePowerCreep: 'deletePowerCreep';
	upgradePowerCreep: 'upgradePowerCreep';
	renamePowerCreep: 'renamePowerCreep';
	createPowerCreep: 'createPowerCreep';
}
export type GlobalIntent = IntentType[keyof GlobalIntents];

export interface RoomIntents {
	createConstructionSite: 'createConstructionSite';
	removeConstructionSite: 'removeConstructionSite';
	createFlag: 'createFlag';
	removeFlag: 'removeFlag';
	destroyStructure: 'destroyStructure';
}
export type RoomIntent = IntentType[keyof RoomIntents];

export type NotifyIntent = IntentType['notify'];

export type IntentId = 'room' | 'notify' | 'global' | AnyId<RawRoomObject>;
export type IntentData<Type extends IntentName> = IntentType[Type];

export interface IntentBuilder {
	list: {
		[K in IntentId]?: K extends 'notify' ? NotifyIntent[]
		: K extends 'room' ? { [N in keyof RoomIntents]?: IntentType[N][] }
		: K extends 'global' ? { [N in keyof GlobalIntents]?: IntentType[N][] }
		: Partial<IntentType>;
	};
	cpu: number;
	set<Name extends IntentName>(id: IntentId, name: Name, data: IntentData<Name>): void;
	push<Name extends IntentName>(name: Name, data: IntentData<Name>, maxLen?: number): boolean;
	pushByName<Name extends IntentName>(id: IntentId, name: Name, data: IntentData<Name>, maxLen?: number): boolean;
	remove<Name extends IntentName>(id: IntentId, name: IntentName): boolean;
}

export type UserIntents = Nullable<IntentType>;
