import { IntentTransform } from '../objects/intents';
import { ServerStorage } from './storage';

export interface StrongholdTemplateStructure {
	type: string;
	dx: number;
	dy: number;
	level?: number;
	strongholdBehavior?: string;
}

export interface StrongholdTemplate {
	description: string;
	rewardLevel: number;
	structures: StrongholdTemplateStructure[];
}

/** `config.common.strongholds` — templates/rewards from `@screeps/common/lib/strongholds.js`. */
export interface CommonStrongholds {
	templates: Record<string, StrongholdTemplate>;
	coreRewards: Record<string, string[]>;
	coreAmounts: number[];
	coreDensities: number[];
	containerRewards: Record<string, number>;
	containerAmounts: number[];
}

/** `config.common.system` — intent sanitizers from `@screeps/common/lib/system.js`. */
export interface CommonSystem {
	sanitizeUserIntents(input: object, customIntentTypes?: Record<string, Record<string, IntentTransform>>): object;
	sanitizeUserRoomIntents(
		input: object,
		result: object,
		customIntentTypes?: Record<string, Record<string, IntentTransform>>,
		groupingField?: string
	): void;
}

/**
 * `config.common`. `storage` is the same object as `@screeps/common`.storage and CLI `sandbox.storage`.
 */
export interface ServerCommon {
	constants: Record<string, any>;
	storage: ServerStorage;
	bots: { [name: string]: string };
	strongholds: CommonStrongholds;
	system: CommonSystem;
	dbCollections: string[];
}
