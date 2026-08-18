import {
	AnyId,
	RawCreep,
	RawPowerCreep,
	RawRoomObject,
	RawStructure,
	RawStructureController,
	RawStructureLab,
} from './raw_objects';
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
	createConstructionSite: { roomName: string; x: number; y: number; structureType: string; name: UserString };
	createFlag: {
		roomName: string;
		x: number;
		y: number;
		name: UserString;
		color: number;
		secondaryColor: number;
	};
	destroyStructure: { roomName: string; id: string };
	removeConstructionSite: { roomName: string; id: string };
	removeFlag: { roomName: string; name: UserString };
	cancelOrder: { orderId: string };
	changeOrderPrice: { orderId: string; newPrice: Price };
	createOrder: { type: string; resourceType: string; price: Price; totalAmount: number; roomName: string };
	createPowerCreep: { name: UserString; className: string };
	deal: { orderId: string; amount: number; targetRoomName: string };
	deletePowerCreep: { id: string; cancel: boolean };
	extendOrder: { orderId: string; addAmount: number };
	renamePowerCreep: { id: string; name: UserString };
	spawnPowerCreep: { id: string; name: UserString };
	suicidePowerCreep: { id: string };
	upgradePowerCreep: { id: string; power: number };
	activateSafeMode: {};
	attack: { id: string; x: number; y: number };
	attackController: { id: string };
	boostCreep: { id: string; bodyPartsCount: number };
	build: { id: string; x: number; y: number };
	cancelSpawning: {};
	claimController: { id: string };
	createCreep: { name: UserString; body: BodyPartConstant[]; energyStructures: string[]; directions: number[] };
	destroy: {};
	dismantle: { id: string };
	drop: { amount: number; resourceType: string };
	enableRoom: { id: string };
	generateSafeMode: { id: string };
	harvest: { id: string };
	heal: { id: RawId<RawCreep>; x: number; y: number };
	launchNuke: { x: number; y: number; roomName: RoomName };
	move: { id: RawId<RawCreep> | RawId<RawPowerCreep>; direction: number };
	notifyWhenAttacked: { enabled: boolean };
	observeRoom: { roomName: RoomName };
	pickup: { id: string };
	processPower: {};
	produce: { resourceType: string; amount: number };
	pull: { id: RawId<RawCreep> };
	rangedAttack: { id: RawId<RawCreep> };
	rangedHeal: { id: RawId<RawCreep> };
	rangedMassAttack: {};
	recycleCreep: { id: RawId<RawCreep> };
	renew: { id: string };
	renewCreep: { id: RawId<RawCreep> };
	reverseReaction: { lab1: RawId<RawStructureLab>; lab2: RawId<RawStructureLab> };
	runReaction: { lab1: RawId<RawStructureLab>; lab2: RawId<RawStructureLab> };
	remove: {};
	repair: { id: RawId<RawStructure>; x: number; y: number };
	reserveController: { id: string };
	say: { message: UserString; isPublic: boolean };
	send: { targetRoomName: string; resourceType: string; amount: number; description: UserString };
	setColor: { color: number; secondaryColor: number };
	setPosition: { x: number; y: number; roomName: string };
	setPublic: { isPublic: boolean };
	setSpawnDirections: { directions: number[] };
	signController: { id: RawId<RawStructureController>; sign: UserString };
	suicide: {};
	transfer: { id: RawId<RawRoomObject>; amount: number; resourceType: string };
	unboostCreep: { id: RawId<RawCreep> };
	unclaim: {};
	upgradeController: { id: string };
	usePower: { power: number; id: string };
	withdraw: { id: RawId<RawRoomObject>; amount: number; resourceType: string };
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
	list: Record<string, Partial<Nullable<IntentType>>>;
	cpu: number;
	set<Name extends IntentName>(id: IntentId, name: Name, data: IntentData<Name>): void;
	push<Name extends IntentName>(name: Name, data: IntentData<Name>, maxLen?: number): boolean;
	pushByName<Name extends IntentName>(id: IntentId, name: Name, data: IntentData<Name>, maxLen?: number): boolean;
	remove<Name extends IntentName>(id: IntentId, name: IntentName): boolean;
}

export type UserIntents = Nullable<IntentType>;
