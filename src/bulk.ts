import { _HasSId, Id } from './types';

export interface BulkCollection<T extends _HasSId> {
	update(id: Id<T> | T, data: Partial<T>): void;
	insert(data: T | Omit<T, '_id'>, id?: Id<T>): number;
	remove(id: Id<T>): void;
	inc(id: Id<T>, key: keyof T, amount: number): void;
	addToSet(id: Id<T>, key: keyof T, value: T): void;
	pull(id: Id<T>, key: keyof T, value: T): void;
	execute(): any;
}
