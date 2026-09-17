import type * as engineUtils from '@screeps/engine/src/utils.js';
import type { Coord, RoomPosition } from '../src/objects/rooms';

declare const dist: typeof engineUtils.dist;
declare const coord: Coord;
declare const pos: RoomPosition;
declare const withPos: { pos: Coord };

const _coordDist: number = dist(coord, { x: 49, y: 25 });
_coordDist;
const _posDist: number = dist(pos, pos);
_posDist;
const _wrappedDist: number = dist(withPos, withPos);
_wrappedDist;
