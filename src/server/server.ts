import { ServerBackend } from './backend';
import { ServerCli } from './cli';
import { ServerCommon } from './common';
import { ServerEngine } from './engine';
import { LokiStorage } from './storage';

export type Cronjob = [number, (param: { utils: typeof import('@screeps/backend/lib/utils.js') }) => void];

/**
 * Mod `config` object (`common.configManager.config`).
 *
 * `common` is created in every process. The rest are process-specific and absent
 * elsewhere: `backend` / `cli` / `cronjobs` in the backend process, `engine` in
 * engine processes (main / runner / processor), `storage` in the storage process.
 * Official mods guard with `if (config.engine)`, `if (config.backend)`, etc.
 */
export interface ServerConfig {
	// Available in all processes
	common: ServerCommon;

	// Available in the engine processes
	engine?: ServerEngine;

	// Available in the backend process
	backend?: ServerBackend;
	cli?: ServerCli;
	cronjobs?: Record<string, Cronjob>;

	// Available in the storage process
	storage?: LokiStorage;
}
