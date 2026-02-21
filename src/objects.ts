import { Id, RoomName, RoomPosition } from './types';

export interface User {
	_id: Id<User>;
	// TODO: incomplete
}

export type DepositType = 'biomass' | 'metal' | 'mist' | 'silicon';

export type MineralType = 'H' | 'O' | 'Z' | 'Z' | 'K' | 'U' | 'L' | 'X';

export interface Room {
	_id: Id<Room>;
	name: RoomName;
	status: 'normal' | 'out of borders';
	bus: boolean;
	openTime?: number;
	sourceKeepers: boolean;
	novice: null;
	respawnArea: null;
	depositType: DepositType;
	nextForceUpdateTime: number;
	powerBankTime: number;
}

export interface RoomObject {
	_id?: Id<RoomObject>;
	x: number;
	y: number;
	room: RoomName;
	type: string;
}

export interface PortalObject extends RoomObject {
	_id?: Id<PortalObject>;
	type: 'portal';
	destination: RoomPosition;
	unstableDate?: number;
	decayTime?: number;
}

export interface WallObject extends RoomObject {
	_id?: Id<WallObject>;
	type: 'constructedWall';
	newbieWall?: boolean;
	notifyWhenAttacked?: boolean;
	ticksToLive?: number;
	decayTime?: number | { timestamp: number };
	hits?: number;
	hitsMax?: number;
}
