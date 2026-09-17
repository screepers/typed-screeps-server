import type { _HasRawId, Exact, RawId } from '../types';
import type {
	CreepActionLog,
	FactoryActionLog,
	InvaderCoreActionLog,
	LabActionLog,
	LinkActionLog,
	PowerCreepActionLog,
	TowerActionLog,
} from './action_log';
import type { DepositType, MineralType, ResourceStore, ResourceStoreCapacity, ResourceType } from './resources';
import type { RoomName, RoomPosition } from './rooms';
import type { UserId } from './users';

export interface RawEffectDeclaration {
	effect?: EffectConstant | PowerConstant;
	power?: EffectConstant | PowerConstant;
	level?: number;
	endTime: number;
	duration?: number;
}

export interface RawSpawning {
	name: string;
	needTime?: number;
	spawnTime: number;
	directions?: DirectionConstant[];
}

export interface RawControllerReservation {
	user: UserId;
	endTime: number;
}

export interface RawControllerSign {
	user: UserId;
	text: string;
	time: number;
	datetime: number;
}

export interface RawPowerCreepPower {
	level: number;
	cooldownTime?: number;
}

export interface RawObject extends _HasRawId {
	x: number;
	y: number;
	room: RoomName;
	type: string;
	effects?: RawEffectDeclaration[] | null;
	notifyWhenAttacked?: boolean;
	strongholdId?: string;
	userNotActive?: boolean;
	temp?: boolean;
}

export interface RawCreep extends RawObject {
	type: 'creep';
	name: string;
	body: BodyPartDefinition[];
	user: UserId;
	hits: number;
	hitsMax: number;
	fatigue: number;
	spawning: boolean;
	store: ResourceStore;
	storeCapacity: number;
	ageTime?: number;
	actionLog?: CreepActionLog;
	tutorial?: boolean;
	interRoom?: RoomPosition | null;
	userSummoned?: boolean;
	tombstoneDecay?: number;
	/** Set by invader generation; processor replaces this with `ageTime`. */
	ticksToLive?: number;
	/** Packed path cache written by processor `fake-runtime` `moveTo` / `walkTo`. */
	memory_move?: CreepMemoryMove | null;
}

/** Stored on NPC creeps by `@screeps/engine/src/processor/common/fake-runtime.js`. */
export interface CreepMemoryMove {
	dest?: string | null;
	path?: string | null;
	time?: number | null;
	lastMove?: number | null;
}

export interface RawPowerCreep extends RawObject {
	type: 'powerCreep';
	name: string;
	className: PowerClassConstant;
	user: UserId;
	level: number;
	hits?: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacity: number;
	powers: Partial<Record<PowerConstant, RawPowerCreepPower>>;
	ageTime?: number;
	actionLog?: PowerCreepActionLog;
	interRoom?: RoomPosition | null;
	/** Wall-clock ms; `null` while spawned in a room. */
	spawnCooldownTime?: number | null;
	deleteTime?: number | null;
	shard?: string | null;
}

export interface RawFlag extends RawObject {
	type: 'flag';
	name: string;
	user: UserId;
	color: ColorConstant;
	secondaryColor: ColorConstant;
}

export interface RawMineral extends RawObject {
	type: 'mineral';
	mineralType: MineralType;
	mineralAmount: number;
	density: number;
	nextRegenerationTime?: number | null;
}

export interface RawPortal extends RawObject {
	type: 'portal';
	destination: RoomPosition | { shard: string; room: RoomName };
	unstableDate?: number | null;
	decayTime?: number | null;
}

export interface RawNuke extends RawObject {
	type: 'nuke';
	landTime: number;
	launchRoomName: RoomName;
}

export interface RawSource extends RawObject {
	type: 'source';
	energy: number;
	energyCapacity: number;
	nextRegenerationTime?: number | null;
	/** Written by map generation; processor uses `nextRegenerationTime`. */
	ticksToRegeneration?: number;
	invaderHarvested?: number;
}

export interface RawDeposit extends RawObject {
	type: 'deposit';
	depositType: DepositType;
	harvested: number;
	decayTime: number;
	cooldownTime?: number;
}

export interface RawResource extends RawObject, ResourceStore {
	type: 'energy';
	resourceType: ResourceType;
}

export interface RawConstructionSite extends RawObject {
	type: 'constructionSite';
	structureType: BuildableStructureConstant;
	user: UserId;
	progress: number;
	progressTotal: number;
	name?: string;
}

export interface RawTombstone extends RawObject {
	type: 'tombstone';
	store: ResourceStore;
	user?: UserId;
	deathTime: number;
	decayTime: number;
	creepId?: string;
	creepName?: string;
	creepTicksToLive?: number;
	creepBody?: BodyPartConstant[];
	creepSaying?: string;
	powerCreepId?: string;
	powerCreepName?: string;
	powerCreepTicksToLive?: number;
	powerCreepClassName?: PowerClassConstant;
	powerCreepLevel?: number;
	powerCreepPowers?: Partial<Record<PowerConstant, { level: number }>>;
	powerCreepSaying?: string;
}

export interface RawRuinStructure {
	id: string;
	type: string;
	hits: number;
	hitsMax?: number;
	user?: UserId;
}

export interface RawRuin extends RawObject {
	type: 'ruin';
	store: ResourceStore;
	structure: RawRuinStructure;
	destroyTime: number;
	decayTime: number;
	user?: UserId;
}

export interface RawOwnedStructure extends RawObject {
	user: UserId;
}

export interface RawStructureInvaderCore extends RawOwnedStructure {
	type: 'invaderCore';
	level: number;
	hits: number;
	hitsMax: number;
	templateName?: string;
	strongholdBehavior?: string;
	nextExpandTime?: number;
	depositType?: DepositType;
	deployTime?: number | null;
	strongholdId?: string;
	decayTime?: number;
	spawning?: RawSpawning | null;
	store?: ResourceStore;
	actionLog?: InvaderCoreActionLog;
}

export interface RawStructureController extends RawObject {
	type: 'controller';
	level: number;
	hits?: number;
	hitsMax?: number;
	user?: UserId | null;
	progress?: number;
	downgradeTime?: number | null;
	upgradeBlocked?: number | null;
	reservation?: RawControllerReservation | null;
	safeMode?: number | null;
	safeModeCooldown?: number | null;
	safeModeAvailable?: number;
	sign?: RawControllerSign | null;
	hardSign?: RawControllerSign;
	isPowerEnabled?: boolean;
	bindUser?: UserId;
	tutorial?: boolean;
}

export interface RawStructureRampart extends RawOwnedStructure {
	type: 'rampart';
	hits: number;
	hitsMax: number;
	isPublic?: boolean;
	nextDecayTime?: number;
	decayTime?: number;
	hitsTarget?: number;
}

export interface RawStructureContainer extends RawObject {
	type: 'container';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacity: number;
	nextDecayTime?: number;
	decayTime?: number;
}

export interface RawStructureWall extends RawObject {
	type: 'constructedWall';
	hits: number;
	hitsMax: number;
	user?: UserId;
	newbieWall?: boolean;
	ticksToLive?: number | null;
	decayTime?: number | { timestamp: number };
}

export interface RawStructureLab extends RawOwnedStructure {
	type: 'lab';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacity?: number | null;
	storeCapacityResource?: ResourceStoreCapacity;
	cooldownTime?: number;
	/** Written at construction; processor uses `cooldownTime`. */
	cooldown?: number;
	/** Written at construction; mineral is stored in `store`. */
	mineralAmount?: number;
	actionLog?: LabActionLog;
}

export interface RawStructureSpawn extends RawOwnedStructure {
	type: 'spawn';
	hits: number;
	hitsMax: number;
	name?: string;
	store: ResourceStore;
	storeCapacityResource: ResourceStoreCapacity;
	spawning?: RawSpawning | null;
	off?: boolean;
	tutorial?: boolean;
}

export interface RawStructureExtension extends RawOwnedStructure {
	type: 'extension';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacityResource: ResourceStoreCapacity;
	off?: boolean;
}

export interface RawStructurePowerSpawn extends RawOwnedStructure {
	type: 'powerSpawn';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacityResource: ResourceStoreCapacity;
}

export interface RawStructurePowerBank extends RawObject {
	type: 'powerBank';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	decayTime?: number;
	nextDecayTime?: number;
}

export interface RawStructureTerminal extends RawOwnedStructure {
	type: 'terminal';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacity: number;
	cooldownTime?: number;
	send?: {
		resourceType: ResourceType;
		amount: number;
		targetRoomName: RoomName;
		description?: string;
	} | null;
}

export interface RawStructureLink extends RawOwnedStructure {
	type: 'link';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacityResource: ResourceStoreCapacity;
	cooldown?: number;
	actionLog?: LinkActionLog;
}

export interface RawStructureTower extends RawOwnedStructure {
	type: 'tower';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacityResource: ResourceStoreCapacity;
	actionLog?: TowerActionLog;
}

export interface RawStructureStorage extends RawOwnedStructure {
	type: 'storage';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacity: number;
}

export interface RawStructureRoad extends RawObject {
	type: 'road';
	hits: number;
	hitsMax: number;
	nextDecayTime?: number;
	decayTime?: number;
}

export interface RawStructureExtractor extends RawOwnedStructure {
	type: 'extractor';
	hits: number;
	hitsMax: number;
	cooldown?: number;
}

export interface RawStructureObserver extends RawOwnedStructure {
	type: 'observer';
	hits: number;
	hitsMax: number;
	observeRoom?: RoomName | null;
}

export interface RawStructureNuker extends RawOwnedStructure {
	type: 'nuker';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacityResource: ResourceStoreCapacity;
	cooldownTime?: number;
}

export interface RawStructureFactory extends RawOwnedStructure {
	type: 'factory';
	hits: number;
	hitsMax: number;
	store: ResourceStore;
	storeCapacity: number;
	level?: number;
	cooldownTime?: number;
	/** Written at construction; processor uses `cooldownTime`. */
	cooldown?: number;
	actionLog?: FactoryActionLog;
}

export interface RawStructureKeeperLair extends RawObject {
	type: 'keeperLair';
	nextSpawnTime?: number | null;
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
	RawStructureSpawn: RoomObjectPair<RawStructureSpawn, StructureSpawn>;
	RawStructureExtension: RoomObjectPair<RawStructureExtension, StructureExtension>;
	RawStructurePowerSpawn: RoomObjectPair<RawStructurePowerSpawn, StructurePowerSpawn>;
	RawStructurePowerBank: RoomObjectPair<RawStructurePowerBank, StructurePowerBank>;
	RawStructureLink: RoomObjectPair<RawStructureLink, StructureLink>;
	RawStructureTower: RoomObjectPair<RawStructureTower, StructureTower>;
	RawStructureStorage: RoomObjectPair<RawStructureStorage, StructureStorage>;
	RawStructureRoad: RoomObjectPair<RawStructureRoad, StructureRoad>;
	RawStructureExtractor: RoomObjectPair<RawStructureExtractor, StructureExtractor>;
	RawStructureObserver: RoomObjectPair<RawStructureObserver, StructureObserver>;
	RawStructureNuker: RoomObjectPair<RawStructureNuker, StructureNuker>;
	RawStructureFactory: RoomObjectPair<RawStructureFactory, StructureFactory>;
	RawStructureKeeperLair: RoomObjectPair<RawStructureKeeperLair, StructureKeeperLair>;
	RawStructureInvaderCore: RoomObjectPair<RawStructureInvaderCore, StructureInvaderCore>;
	RawStructurePortal: RoomObjectPair<RawPortal, StructurePortal>;
}

export type RawStructure = RawStructureObjects[keyof RawStructureObjects]['raw'];
export type GameStructure = RawStructureObjects[keyof RawStructureObjects]['game'];

export interface RoomObjects extends RawStructureObjects {
	RawCreep: RoomObjectPair<RawCreep, Creep>;
	RawPowerCreep: RoomObjectPair<RawPowerCreep, PowerCreep>;
	RawFlag: RoomObjectPair<RawFlag, Flag>;
	RawMineral: RoomObjectPair<RawMineral, Mineral>;
	RawNuke: RoomObjectPair<RawNuke, Nuke>;
	RawSource: RoomObjectPair<RawSource, Source>;
	RawDeposit: RoomObjectPair<RawDeposit, Deposit>;
	RawResource: RoomObjectPair<RawResource, Resource>;
	RawConstructionSite: RoomObjectPair<RawConstructionSite, ConstructionSite>;
	RawTombstone: RoomObjectPair<RawTombstone, Tombstone>;
	RawRuin: RoomObjectPair<RawRuin, Ruin>;
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
