import type { BoundQueue } from '../queue';
import type { StorageQueueName, StorageQueueNames } from './storage';

type _ServerDriver = typeof import('@screeps/driver');
export interface ServerDriver extends _ServerDriver {}

/** `driver.queue.create` accepts storage names plus `'users'` (remapped to `usersIvm`). */
export type DriverQueueName = StorageQueueName | 'users';

export type DriverQueueItem<N extends DriverQueueName> =
	N extends 'users' ? StorageQueueNames['usersIvm'] : StorageQueueNames[Extract<N, StorageQueueName>];

/**
 * Bound queue from `driver.queue.create(name)` (`driver/lib/queue.js`).
 * Unlike `StorageQueue`, methods close over `name`.
 */
export interface DriverQueue<T extends string = string> extends BoundQueue<T> {}
