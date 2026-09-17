import * as fakeRuntime from '@screeps/engine/src/processor/common/fake-runtime.js';
import type { CreepMemoryMove, RawCreep, RoomName } from '../src';

declare const roomName: RoomName;
declare const creep: RawCreep;
declare const hostiles: RawCreep[];
declare const scope: fakeRuntime.FakeRuntimeScope;
declare const intents: fakeRuntime.FakeRuntimeIntents;

const pos = new fakeRuntime.RoomPosition(1, 2, roomName);
const _x: number = pos.x;
const _y: number = pos.y;
const _roomName: RoomName = pos.roomName;
_x;
_y;
_roomName;

const packed: string = pos.sPackLocal();
const unpacked: fakeRuntime.RoomPosition = fakeRuntime.RoomPosition.sUnpackLocal(packed, roomName);
unpacked;
const _equal: boolean = pos.isEqualTo(unpacked);
const _range: number = pos.getRangeTo(unpacked);
const _dir: DirectionConstant | undefined = pos.getDirectionTo(unpacked);
const _terrain: Terrain | Terrain[] = pos.lookFor(LOOK_TERRAIN);
const _lookNull: Terrain | Terrain[] | null = pos.lookFor(LOOK_CREEPS);
_equal;
_range;
_dir;
_terrain;
_lookNull;

// @ts-expect-error processor RoomPosition uses roomName, not the DB `room` field
pos.room;

const matrix = new fakeRuntime.CostMatrix();
matrix.set(1, 2, 255);
const _cost: number = matrix.get(1, 2);
const _clone: fakeRuntime.CostMatrix = matrix.clone();
const _bits: Uint8Array = matrix._bits;
_cost;
_clone;
_bits;
// @ts-expect-error processor CostMatrix has no serialize
matrix.serialize();

const origin: fakeRuntime.PathOrigin = { x: creep.x, y: creep.y, room: creep.room, user: creep.user };
const path: fakeRuntime.PathFinderResult = fakeRuntime.findPath(creep, pos, {}, scope);
const _pathPos: fakeRuntime.RoomPosition | undefined = path.path[0];
_pathPos;
fakeRuntime.findPath(origin, { pos, range: 1 }, { ignoreCreeps: true, ignoreRoads: true }, scope);
fakeRuntime.findPath(creep, [pos, { pos, range: 3 }], { flee: true }, scope);

const closest: RawCreep | null = fakeRuntime.findClosestByPath(creep, hostiles, { ignoreRoads: true }, scope);
fakeRuntime.findClosestByPath(creep, hostiles, null, scope);
closest;

const moveDir: DirectionConstant | 0 = fakeRuntime.moveTo(
	creep,
	{ x: 10, y: 10, room: roomName },
	{ range: 1, reusePath: 5 },
	scope
);
moveDir;
const fleeDir: DirectionConstant | 0 = fakeRuntime.flee(creep, hostiles, 3, {}, scope);
fleeDir;

const context: fakeRuntime.WalkContext = { scope, intents };
const walkDir: DirectionConstant | 0 | undefined = fakeRuntime.walkTo(
	creep,
	{ x: 5, y: 5, room: creep.room },
	{ range: 0, costCallback: (_room, cm) => cm },
	context
);
walkDir;
fakeRuntime.walkTo(creep, closest ?? origin, { costCallback: () => matrix }, context);

const _hasAttack: boolean = fakeRuntime.hasActiveBodyparts(creep, ATTACK);
_hasAttack;
fakeRuntime.hasActiveBodyparts({ body: [{ hits: 0, type: HEAL }] }, HEAL);
fakeRuntime.hasActiveBodyparts({}, WORK);
// @ts-expect-error body part type is BodyPartConstant
fakeRuntime.hasActiveBodyparts({ body: [{ hits: 1, type: 'not-a-part' }] }, ATTACK);

const memory: CreepMemoryMove = { dest: packed, path: packed, time: 1, lastMove: 1 };
creep.memory_move = memory;
creep.memory_move = null;
memory;

intents.set(creep._id, 'move', { direction: TOP });
// @ts-expect-error pretick move payloads omit id
intents.set(creep._id, 'move', { id: creep._id, direction: TOP });
