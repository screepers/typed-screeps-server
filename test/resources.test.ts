import type {
	CommodityType,
	CompoundType,
	DepositType,
	MarketResourceType,
	MineralType,
	ResourceStore,
	ResourceType,
} from '../src/objects/resources';
import type { Coord, RoomPosition } from '../src/objects/rooms';
import type { ServerConfig } from '../src/server/server';

type _mineralIsResource = MineralType extends ResourceType ? true : never;
type _depositIsResource = DepositType extends ResourceType ? true : never;
type _compoundIsResource = CompoundType extends ResourceType ? true : never;
type _commodityIsResource = CommodityType extends ResourceType ? true : never;
type _screepsResourceFits = ResourceConstant extends ResourceType ? true : never;
type _screepsMarketFits = MarketResourceConstant extends MarketResourceType ? true : never;
type _ghodiumIsNotMineral = 'G' extends MineralType ? never : true;
type _coordOnRoomPosition = RoomPosition extends Coord ? true : never;

const _mineralIsResource: _mineralIsResource = true;
_mineralIsResource;
const _depositIsResource: _depositIsResource = true;
_depositIsResource;
const _compoundIsResource: _compoundIsResource = true;
_compoundIsResource;
const _commodityIsResource: _commodityIsResource = true;
_commodityIsResource;
const _screepsResourceFits: _screepsResourceFits = true;
_screepsResourceFits;
const _screepsMarketFits: _screepsMarketFits = true;
_screepsMarketFits;
const _ghodiumIsNotMineral: _ghodiumIsNotMineral = true;
_ghodiumIsNotMineral;
const _coordOnRoomPosition: _coordOnRoomPosition = true;
_coordOnRoomPosition;

declare module '../src/objects/resources' {
	interface Resources {
		thorium: 'thorium';
	}
}

declare module '../src/server/common' {
	interface ServerConstants {
		RESOURCE_THORIUM: 'thorium';
	}
}

declare const config: ServerConfig;

const _energy: ResourceType = 'energy';
_energy;
const _mineral: ResourceType = 'H';
_mineral;
const _deposit: ResourceType = 'silicon';
_deposit;
const _compound: ResourceType = 'XUH2O';
_compound;
const _pixel: MarketResourceType = 'pixel';
_pixel;
const _thorium: ResourceType = 'thorium';
_thorium;
const _thoriumConst: 'thorium' = config.common.constants.RESOURCE_THORIUM;
_thoriumConst;
const _all: ResourceType[] = config.common.constants.RESOURCES_ALL;
_all;

const _store: ResourceStore = { energy: 50, thorium: 10, H: 1 };
_store;

const _pos: Coord = { x: 1, y: 2 };
_pos;
