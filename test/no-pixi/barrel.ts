import type { ServerConfig, User } from '../../dist/index';

declare const user: User;
user._id;
user.cpu;

declare const config: ServerConfig;
config.common.storage.db.users;
config.backend?.renderer.metadata;
