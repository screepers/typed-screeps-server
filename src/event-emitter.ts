export type EventEmitter<
	Events extends {
		[K in keyof Events]: (...args: any[]) => void;
	}
> = Omit<import('events').EventEmitter, 'on' | 'once' | 'emit'> & {
	on<K extends keyof Events>(event: K, listener: Events[K]): any;
	once<K extends keyof Events>(event: K, listener: Events[K]): any;
	emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): boolean;
};
