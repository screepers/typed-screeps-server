import { Id } from '../types';

export type UserId = Id<User>;

export interface User {
	_id: UserId;
	gcl: number;
	// TODO: incomplete
}
