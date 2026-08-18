import type { _HasRawId, Exact, RawId } from '../types';
import { MineralType } from './resources';
import { RoomName, RoomPosition } from './rooms';
import { UserId } from './users';

export interface RawObject extends _HasRawId {
	x: number;
	y: number;
	room: RoomName;
	type: string;
	effects?: RawEffectDeclaration[];
}

export interface RawCreep extends RawObject {
	type: 'creep';
	body: BodyPartDefinition[];
	user: UserId;
	ageTime: number;
	store: StoreDefinitionUnlimited;
}

export interface RawPowerCreep extends RawObject {
	type: 'powerCreep';
	ageTime: number;
	store: StoreDefinitionUnlimited;
}

export interface RawFlag extends RawObject {
	type: 'flag';
}

export interface RawMineral extends RawObject {
	type: 'mineral';
	mineralType: MineralType;
	mineralAmount: number;
	density: number;
}

export interface RawPortal extends RawObject {
	type: 'portal';
	destination: RoomPosition;
	unstableDate?: number;
	decayTime?: number;
}

export interface RawNuke extends RawObject {
	type: 'nuke';
	landTime: number;
	launchRoomName?: RoomName | string;
}

export interface RawEffectDeclaration {
	effect: EffectConstant;
	power: EffectConstant;
	endTime: number;
	duration: number;
}

export interface RawStructureBase extends RawObject {
	hits?: number;
	hitsMax?: number;
}

export interface RawOwnedStructure extends RawStructureBase {
	user?: UserId;
}

export interface RawStructureInvaderCore extends RawOwnedStructure {
	type: 'invaderCore';
	user: UserId;
	templateName: string;
	nextExpandTime: number;
	depositType: string;
	deployTime: number;
	strongholdId: string;
}

export interface RawStructureController extends RawOwnedStructure {
	type: 'controller';
}

export interface RawStructureRampart extends RawOwnedStructure {
	type: 'rampart';
	decayTime: number;
	nextDecayTime: number;
}

export interface RawStructureContainer extends RawStructureBase {
	type: 'container';
	decayTime: number;
	nextDecayTime: number;
	store: StoreDefinitionUnlimited;
}

export interface RawStructureWall extends RawOwnedStructure {
	type: 'constructedWall';
	newbieWall?: boolean;
	notifyWhenAttacked?: boolean;
	ticksToLive?: number;
	decayTime?: number | { timestamp: number };
}

export interface RawStructureLab extends RawOwnedStructure {
	type: 'lab';
}

export interface RawStructureTerminal extends RawOwnedStructure {
	type: 'terminal';
	send: { targetRoomName: RoomName } | null;
}

export type RoomObjectPair<Raw extends RawObject, Game> = {
	raw: Raw;
	game: Game;
};

export interface RawStructureObjects {
	RawStructureController: RoomObjectPair<RawStructureController, StructureController>;
	RawStructureContainer: RoomObjectPair<RawStructureContainer, StructureContainer>;
	RawStructureWall: RoomObjectPair<RawStructureWall, StructureWall>;
	RawStructureLab: RoomObjectPair<RawStructureLab, StructureLab>;
	RawStructureTerminal: RoomObjectPair<RawStructureTerminal, StructureTerminal>;
	RawStructureRampart: RoomObjectPair<RawStructureRampart, StructureRampart>;
}

export type RawStructure = RawStructureObjects[keyof RawStructureObjects]['raw'];
export type GameStructure = RawStructureObjects[keyof RawStructureObjects]['game'];

export interface RoomObjects extends RawStructureObjects {
	RawCreep: RoomObjectPair<RawCreep, Creep>;
	RawPowerCreep: RoomObjectPair<RawPowerCreep, PowerCreep>;
	RawFlag: RoomObjectPair<RawFlag, Flag>;
	RawMineral: RoomObjectPair<RawMineral, Mineral>;
	RawNuke: RoomObjectPair<RawNuke, Nuke>;
	RawPortal: RoomObjectPair<RawPortal, RoomObject>;
	RawStructureInvaderCore: RoomObjectPair<RawStructureInvaderCore, StructureInvaderCore>;
}

export type RawRoomObject = RoomObjects[keyof RoomObjects]['raw'];

export type GameOf<Raw extends RawRoomObject> = {
	[K in keyof RoomObjects]: RoomObjects[K]['raw'] extends Raw ? RoomObjects[K]['game'] : never;
}[keyof RoomObjects];

export type GameRoomObject = GameOf<RawRoomObject>;

type RawPairOf<T> =
	T extends RawRoomObject ? T
	:	{
			[K in keyof RoomObjects]: Exact<RoomObjects[K]['game'], T> extends true ? RoomObjects[K]['raw'] : never;
		}[keyof RoomObjects];

/** Game → raw pair. `_id` also carries the game `Id` so `obj.id as RawOf<G>['_id']` is a valid trans-type. */
export type RawOf<T> =
	T extends RawRoomObject ? T
	: T extends _HasId ? RawPairOf<T> & { _id: RawPairOf<T>['_id'] & Id<T> }
	: RawPairOf<T>;

/** `_id` or sandbox `id` for the same entity (intent keys, cross-layer references). */
export type AnyId<T extends _HasRawId | GameRoomObject> =
	T extends RawRoomObject | GameRoomObject ?
		| RawId<RawPairOf<T>>
		| {
				[K in keyof RoomObjects]: RoomObjects[K]['raw'] extends RawPairOf<T> ?
					RoomObjects[K]['game'] extends _HasId ?
						Id<RoomObjects[K]['game']>
					:	never
				:	never;
		  }[keyof RoomObjects]
	:	RawId<Extract<T, _HasRawId>>;
