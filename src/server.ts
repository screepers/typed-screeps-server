import { ServerBackend } from './backend';
import { CliSandbox } from './cli';
import { ServerCommon } from './common';
import { ServerEngine } from './engine';

export type Cronjob = [number, () => void];

export interface ServerConfig {
	backend: ServerBackend;
	common: ServerCommon;
	engine: ServerEngine;
	cli: CliSandbox;
	cronjobs: Record<string, Cronjob>;
}
