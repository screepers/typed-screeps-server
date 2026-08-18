import { _HasRawId, Draft, RawId } from './types';

export interface BulkCollection<T extends _HasRawId> {
	update(id: RawId<T> | T, data: Partial<T>): void;
	insert(data: Draft<T>, id?: RawId<T>): number;
	remove(id: RawId<T>): void;
	inc(id: RawId<T>, key: keyof T, amount: number): void;
	addToSet(id: RawId<T>, key: keyof T, value: T): void;
	pull(id: RawId<T>, key: keyof T, value: T): void;
	execute(): any;
}
