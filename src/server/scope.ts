import { IntentBuilder } from '../objects/intents';
import { RawObject } from '../objects/raw_objects';
import { User, UserId } from '../objects/users';

/** Runtime data for the player sandbox (`game.init` / `custom-prototypes.js`). */
export interface RuntimeData {
	roomObjects: Record<string, RawObject>;
	users: Record<UserId, User>;
	user: User;
	time: number;
	cpu: number;
	[key: string]: unknown;
}

/** Object register built in `game.js`. @see `@screeps/engine/src/game/game.js` */
export interface Register {
	wrapFn<T extends (...args: never[]) => unknown>(fn: T): T;
	assertTargetObject(obj: unknown): void;
	deprecated(msg: string): void;
	customObjects: Record<string, _HasId>;
	creeps: Record<string, _HasId>;
	structures: Record<string, _HasId>;
	[key: string]: unknown;
}

/** Sandbox globals; augment in mods for custom constructors (`Reactor`, `Gift`, …). */
export interface Globals {
	RoomObject: RoomObjectConstructor;
	Structure: StructureConstructor;
	Creep: CreepConstructor;
	Store: new (raw: unknown) => Store<ResourceConstant, false>;
	console: { log(...args: unknown[]): void };
	[name: string]: unknown;
}

/** Scope passed to `prototypeExtender`. @see `@screeps/engine/src/game/custom-prototypes.js` */
export interface Scope {
	runtimeData: RuntimeData;
	intents: IntentBuilder;
	register: Register;
	globals: Globals;
}
