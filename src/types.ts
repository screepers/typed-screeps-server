import { Room } from './objects';

declare namespace Tag {
	const OpaqueTagSymbol: unique symbol;

	class OpaqueTag<T> {
		private [OpaqueTagSymbol]: T;
	}
}

export interface _HasSId {
	_id?: Id<this>;
}

export type Id<T extends _HasSId> = string & Tag.OpaqueTag<T>;
export type fromId<T> = T extends Id<infer R> ? R : never;

export type RoomName = string & Tag.OpaqueTag<Room>;

export interface RoomPosition {
	room: RoomName;
	x: number;
	y: number;
}

export interface RoomTerrain {
	_id: Id<RoomTerrain>;
	room: RoomName;
	terrain: string;
}
