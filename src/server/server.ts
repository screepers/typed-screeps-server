import { ServerBackend } from './backend';
import { ServerCli } from './cli';
import { ServerCommon } from './common';
import { ServerEngine } from './engine';

export type Cronjob = [number, (param: { utils: typeof import('@screeps/backend/lib/utils.js') }) => void];

export interface ServerConfig {
	backend: ServerBackend;
	common: ServerCommon;
	engine: ServerEngine;
	cli: ServerCli;
	cronjobs: Record<string, Cronjob>;
}
