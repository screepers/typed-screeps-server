import type { _HasRawId, RawId } from '../types';

export type UserId = RawId<User>;

/** Vanilla badge shape (`backend/lib/cli/bots.js` `genRandomBadge`). */
export interface UserBadge {
	type: number;
	color1: string;
	color2: string;
	color3: string;
	flip: boolean;
	param: number;
}

export interface User extends _HasRawId {
	_id: RawId<this>;
	gcl: number;
	cpu: number;
	cpuAvailable: number;
	registeredDate: Date;
	/** Steam create omits this; `/register/set-username` writes it later. */
	username?: string;
	usernameLower?: string;
	lastUsedCpu?: number;
	lastUsedDirtyTime?: number;
	active?: number;
	activeSegments?: number[];
	defaultPublicSegment?: number;
	activeForeignSegment?: {
		username: string;
		id?: number;
		user_id?: string;
	};
	power?: number;
	powerExperimentations?: number;
	powerExperimentationTime?: number;
	rooms?: string[];
	shardAccess?: boolean;
	badge?: UserBadge;
	bot?: string;
	email?: string;
	credits?: number;
	steam?: {
		id: string;
		displayName?: string;
		ownership?: any;
		steamProfileLinkHidden?: boolean;
	};
	notifyPrefs?: {
		disabled?: boolean;
		disabledOnMessages?: boolean;
		sendOnline?: boolean;
		interval?: number;
		errorsInterval?: number;
	};
}
