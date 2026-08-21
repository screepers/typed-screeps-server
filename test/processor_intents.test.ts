import {
	AnyId,
	IntentBuilder,
	RawCreep,
	RawId,
	RawOf,
	RawOwnedStructure,
	RawStructure,
	RoomObjectPair,
	ServerConfig,
} from '../src';

interface RawReactor extends RawOwnedStructure {
	type: 'reactor';
}
interface Reactor {
	id: Id<Reactor>;
}
declare module '../src/objects/raw_objects' {
	interface RawStructureObjects {
		RawReactor: RoomObjectPair<RawReactor, Reactor>;
	}
}

declare const config: ServerConfig;
declare const intents: IntentBuilder;
declare const creepId: RawId<RawCreep>;
declare const reactor: Reactor;

const _reactorIsStructure: RawStructure = {} as RawReactor;
_reactorIsStructure;
const _reactorIntentId: AnyId<RawStructure> = '' as AnyId<RawReactor>;
_reactorIntentId;

if (config.engine) {
	config.engine.on(
		'preProcessObjectIntents',
		function (object, userId, objectIntents, roomObjects, roomTerrain, gameTime, roomInfo, bulk, bulkUsers) {
			object;
			userId;
			roomTerrain;
			gameTime;
			roomInfo;
			bulk;
			bulkUsers;

			if (
				objectIntents.withdraw &&
				objectIntents.withdraw.id &&
				objectIntents.withdraw.resourceType == config.common.constants.RESOURCE_THORIUM
			) {
				const target = roomObjects[objectIntents.withdraw.id];
				if (target.type == 'reactor') {
					target;
					// ^?
					objectIntents.withdraw = null;
				}
			}
		}
	);
}

type _assertRawOfReactor = [RawOf<Reactor>] extends [never] ? never
:	RawOf<Reactor> extends RawReactor ? true
:	never;
const _rawOfReactor: _assertRawOfReactor = true;
_rawOfReactor;

const _rawReactor: RawReactor = {} as RawOf<Reactor>;
_rawReactor;

intents.set(creepId, 'withdraw', {
	id: reactor.id as RawOf<Reactor>['_id'],
	amount: 1,
	resourceType: RESOURCE_ENERGY,
});
