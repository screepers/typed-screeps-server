import {
	StructureControllerObject,
	CreepObject,
	StructureLabObject,
	PowerCreepObject,
	RoomObject,
	StructureObject,
} from './room_objects';
import { Id, Nullable } from '../types';

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
	heal: { id: Id<CreepObject>; x: number; y: number };
	launchNuke: { x: number; y: number; roomName: RoomName };
	move: { id: Id<CreepObject | PowerCreepObject>; direction: number };
	notifyWhenAttacked: { enabled: boolean };
	observeRoom: { roomName: RoomName };
	pickup: { id: string };
	processPower: {};
	produce: { resourceType: string; amount: number };
	pull: { id: Id<CreepObject> };
	rangedAttack: { id: Id<CreepObject> };
	rangedHeal: { id: Id<CreepObject> };
	rangedMassAttack: {};
	recycleCreep: { id: Id<CreepObject> };
	renew: { id: string };
	renewCreep: { id: Id<CreepObject> };
	reverseReaction: { lab1: Id<StructureLabObject>; lab2: Id<StructureLabObject> };
	runReaction: { lab1: Id<StructureLabObject>; lab2: Id<StructureLabObject> };
	remove: {};
	repair: { id: Id<StructureObject>; x: number; y: number };
	reserveController: { id: string };
	say: { message: UserString; isPublic: boolean };
	send: { targetRoomName: string; resourceType: string; amount: number; description: UserString };
	setColor: { color: number; secondaryColor: number };
	setPosition: { x: number; y: number; roomName: string };
	setPublic: { isPublic: boolean };
	setSpawnDirections: { directions: number[] };
	signController: { id: Id<StructureControllerObject>; sign: UserString };
	suicide: {};
	transfer: { id: Id<RoomObject>; amount: number; resourceType: string };
	unboostCreep: { id: Id<CreepObject> };
	unclaim: {};
	upgradeController: { id: string };
	usePower: { power: number; id: string };
	withdraw: { id: Id<RoomObject>; amount: number; resourceType: string };
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

export type IntentId = 'room' | 'notify' | Id<RoomObject>;
export type IntentData<Type extends IntentName> = IntentType[Type];

export interface IntentBuilder {
	list: Record<IntentId, Record<IntentName, IntentType>>;
	cpu: number;
	set<Name extends IntentName>(id: IntentId, name: Name, data: IntentData<Name>): void;
	push<Name extends IntentName>(name: Name, data: IntentData<Name>, maxLen?: number): boolean;
	pushByName<Name extends IntentName>(id: IntentId, name: Name, data: IntentData<Name>, maxLen?: number): boolean;
	remove<Name extends IntentName>(id: IntentId, name: Name): boolean;
}

export type UserIntents = Nullable<IntentType>;
