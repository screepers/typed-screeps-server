import type { UserIntents } from './intents';
import type { RoomName } from './rooms';
import type { UserId } from './users';
import type { _HasRawId, RawId } from '../types';

export interface RawUserMoney extends _HasRawId {
	_id: RawId<this>;
}

export interface RawUserResource extends _HasRawId {
	_id: RawId<this>;
}

export interface RawUserCode extends _HasRawId {
	_id: RawId<this>;
	user: UserId;
	modules: Record<string, string>;
	branch: string;
	activeWorld?: boolean;
	activeSim?: boolean;
	timestamp?: number | Date;
}

export interface RawUserConsole extends _HasRawId {
	_id: RawId<this>;
	user: UserId;
	expression: string;
	hidden?: boolean;
}

export interface RawUserMessage extends _HasRawId {
	_id: RawId<this>;
	user: UserId;
	respondent: UserId;
	date: Date;
	type: 'in' | 'out';
	text: string;
	unread: boolean;
	outMessage?: RawId<RawUserMessage>;
}

export interface RawUserNotification extends _HasRawId {
	_id: RawId<this>;
	user: UserId;
	message: string;
	date: number;
	count: number;
	type: 'msg' | 'error';
}

export interface RawUserIntents extends _HasRawId {
	_id: RawId<this>;
	user: UserId;
	intents: UserIntents;
}

export interface RawMarketOrder extends _HasRawId {
	_id: RawId<this>;
}

export interface RawIntershardOrder extends _HasRawId {
	_id: RawId<this>;
}

export interface RawMarketTransaction extends _HasRawId {
	_id: RawId<this>;
}

export interface RawMarketStats extends _HasRawId {
	_id: RawId<this>;
	resourceType: string;
	date: string;
	transactions: number;
	volume: number;
	avgPrice: number;
	stddevPrice: number;
}

export interface RawLeaderboard extends _HasRawId {
	_id: RawId<this>;
	[field: string]: unknown;
}

/** Packed per-user flag blob for a room (`data` is `name~color~…` records joined by `|`). */
export interface RawRoomFlags extends _HasRawId {
	_id: RawId<this>;
	user: UserId;
	room: RoomName;
	data: string;
}

export interface RawRoomIntents extends _HasRawId {
	_id: RawId<this>;
	room: RoomName;
	users: Record<
		string,
		{
			objects?: unknown;
			objectsManual?: unknown;
		}
	>;
}
