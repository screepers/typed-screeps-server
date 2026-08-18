export type Exact<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

export interface _HasRawId {
	_id: RawId<this>;
}

export type RawId<T extends _HasRawId> = string & Tag.OpaqueTag<T>;
export type fromRawId<T> = T extends RawId<infer R> ? R : never;

export type Draft<T extends _HasRawId> = Omit<T, '_id'>;

export type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};
