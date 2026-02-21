declare namespace Tag {
	const OpaqueTagSymbol: unique symbol;

	class OpaqueTag<T> {
		private [OpaqueTagSymbol]: T;
	}
}

export interface _HasSId {
	_id?: Id<this>;
}

export type Id<T extends _HasSId> = string & Tag.OpaqueTag<T>;
export type fromId<T> = T extends Id<infer R> ? R : never;

export type Nullable<T> = {
	[K in keyof T]: T[K] | null;
};
