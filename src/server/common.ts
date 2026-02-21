export interface ServerCommon {
	constants: Record<string, any>;
	storage: {
		db: any;
		env: {
			get(key: string): Promise<string>;
			set(key: string, value: any): Promise<void>;
			keys: Record<string, string>;
		};
		pubsub: any;
		resetAllData(): Promise<void>;
	};
	bots: { [name: string]: string };
}
