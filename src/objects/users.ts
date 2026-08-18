import type { _HasRawId, RawId } from '../types';

export type UserId = RawId<User>;

export interface User extends _HasRawId {
	_id: RawId<this>;
	gcl: number;
	username?: string;
	usernameLower?: string;
	cpu?: number;
	power?: number;
	rooms?: string[];
	shardAccess?: boolean;
	badge?: unknown;
}
