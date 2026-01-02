export type RoomName = string;

export interface RoomPosition {
	room: RoomName;
	x: number;
	y: number;
}

export interface RoomTerrain {
	_id: string;
	room: RoomName;
	terrain: string;
}
