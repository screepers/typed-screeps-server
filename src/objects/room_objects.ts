import { Id } from '../types';
import { MineralType } from './resources';
import { RoomPosition } from './rooms';

export interface BaseObject {
	_id?: Id<BaseObject>;
	x: number;
	y: number;
	room: RoomName;
	type: string;
	effects?: EffectDeclaration[];
}

export interface CreepObject extends BaseObject {
	_id: Id<CreepObject>;
	type: 'creep';
	body: BodyPartDefinition[];
	user: UserId;
	ageTime: number;
	store: StoreDefinitionUnlimited;
	// id: Id<Creep>;
	// get name(): string;
	// get body(): BodyPart[];
	// get my(): boolean;
	// get owner(): { username: string };
	// get spawning(): any;
	// get ticksToLive(): number;
	// get carryCapacity(): number;
	// get carry(): any;
	// get store(): any;
	// get fatigue(): number;
	// get hits(): number;
	// get hitsMax(): number;
	// get saying(): string;
}

export interface PowerCreepObject extends BaseObject {
	_id: Id<PowerCreepObject>;
	type: 'powerCreep';
	ageTime: number;
	store: StoreDefinitionUnlimited;
}

export interface FlagObject extends BaseObject {
	_id: Id<FlagObject>;
	type: 'flag';
}

export interface MineralObject extends BaseObject {
	_id: Id<MineralObject>;
	type: 'mineral';
	mineralType: MineralType;
	mineralAmount: number;
}

export interface PortalObject extends BaseObject {
	_id?: Id<PortalObject>;
	type: 'portal';
	destination: RoomPosition;
	unstableDate?: number;
	decayTime?: number;
}

export interface NukeObject extends BaseObject {
	_id?: Id<NukeObject>;
	type: 'nuke';
	landTime: number;
}

export interface EffectDeclaration {
	effect: EffectConstant;
	power: EffectConstant;
	endTime: number;
	duration: number;
}

export interface BaseStructureObject extends BaseObject {
	hits?: number;
	hitsMax?: number;
}

export interface BaseOwnedStructureObject extends BaseStructureObject {
	user?: UserId;
}

export interface InvaderCoreObject extends BaseOwnedStructureObject {
	_id?: Id<InvaderCoreObject>;
	type: 'invaderCore';
	user: UserId;
	templateName: string;
	nextExpandTime: number;
	depositType: string;
	deployTime: number;
	strongholdId: string;
}

export interface StructureControllerObject extends BaseOwnedStructureObject {
	_id?: Id<StructureControllerObject>;
	type: 'controller';
}

export interface StructureRampartObject extends BaseOwnedStructureObject {
	_id?: Id<StructureRampartObject>;
	type: 'rampart';
	decayTime: number;
	nextDecayTime: number;
}

export interface StructureContainerObject extends BaseStructureObject {
	_id?: Id<StructureContainerObject>;
	type: 'container';
	decayTime: number;
	nextDecayTime: number;
	store: StoreDefinitionUnlimited;
}

export interface StructureWallObject extends BaseOwnedStructureObject {
	_id?: Id<StructureWallObject>;
	type: 'constructedWall';
	newbieWall?: boolean;
	notifyWhenAttacked?: boolean;
	ticksToLive?: number;
	decayTime?: number | { timestamp: number };
}

export interface StructureLabObject extends BaseOwnedStructureObject {
	type: 'lab';
}

export interface StructureTerminalObject extends BaseOwnedStructureObject {
	type: 'terminal';
	send: { targetRoomName: RoomName } | null;
}

export interface StructureObjects {
	StructureWallObject: StructureWallObject;
	StructureLabObject: StructureLabObject;
	StructureTerminalObject: StructureTerminalObject;
	StructureControllerObject: StructureControllerObject;
	StructureContainerObject: StructureContainerObject;
}

export type StructureObject = StructureObjects[keyof StructureObjects];

export interface RoomObjects extends StructureObjects {
	CreepObject: CreepObject;
	FlagObject: FlagObject;
	MineralObject: MineralObject;
	NukeObject: NukeObject;
	PowerCreepObject: PowerCreepObject;
	PortalObject: PortalObject;
	InvaderCoreObject: InvaderCoreObject;
}

export type RoomObject = RoomObjects[keyof RoomObjects];
