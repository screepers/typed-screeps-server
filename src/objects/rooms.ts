import type { _HasRawId, RawId } from '../types';
import { DepositType } from './resources';

export type RoomName = string & Tag.OpaqueTag<Room>;

export interface Room extends _HasRawId {
	_id: RawId<this>;
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
	active: boolean;
}

export interface RoomPosition {
	room: RoomName;
	x: number;
	y: number;
}

export interface RoomTerrain extends _HasRawId {
	_id: RawId<this>;
	room: RoomName;
	terrain: string;
}
