export type NamedQueue<Names extends object> = {
	fetch<N extends keyof Names & string>(name: N): Promise<Names[N] & string>;
	add<N extends keyof Names & string>(name: N, id: Names[N] & string): Promise<true>;
	addMulti<N extends keyof Names & string>(name: N, ids: (Names[N] & string)[]): Promise<true>;
	markDone<N extends keyof Names & string>(name: N, id: Names[N] & string): Promise<true>;
	whenAllDone(name: keyof Names & string): Promise<true>;
	reset(name: keyof Names & string): Promise<true>;
};

export type BoundQueue<T extends string = string> = {
	fetch(): Promise<T>;
	add(id: T): Promise<true>;
	// short-circuits to q.when() so it gets a void return type
	addMulti(ids: T[]): Promise<true | void>;
	markDone(id: T): Promise<true>;
	whenAllDone(): Promise<true>;
	reset(): Promise<true>;
};
