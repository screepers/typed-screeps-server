export interface DepositResources {
	biomass: 'biomass';
	metal: 'metal';
	mist: 'mist';
	silicon: 'silicon';
}
export type DepositType = DepositResources[keyof DepositResources];

export interface MineralResources {
	H: 'H';
	O: 'O';
	Z: 'Z';
	K: 'K';
	U: 'U';
	L: 'L';
	X: 'X';
}
export type MineralType = MineralResources[keyof MineralResources];

export interface CompoundResources {
	G: 'G';
	OH: 'OH';
	ZK: 'ZK';
	UL: 'UL';
	UH: 'UH';
	UO: 'UO';
	KH: 'KH';
	KO: 'KO';
	LH: 'LH';
	LO: 'LO';
	ZH: 'ZH';
	ZO: 'ZO';
	GH: 'GH';
	GO: 'GO';
	UH2O: 'UH2O';
	UHO2: 'UHO2';
	KH2O: 'KH2O';
	KHO2: 'KHO2';
	LH2O: 'LH2O';
	LHO2: 'LHO2';
	ZH2O: 'ZH2O';
	ZHO2: 'ZHO2';
	GH2O: 'GH2O';
	GHO2: 'GHO2';
	XUH2O: 'XUH2O';
	XUHO2: 'XUHO2';
	XKH2O: 'XKH2O';
	XKHO2: 'XKHO2';
	XLH2O: 'XLH2O';
	XLHO2: 'XLHO2';
	XZH2O: 'XZH2O';
	XZHO2: 'XZHO2';
	XGH2O: 'XGH2O';
	XGHO2: 'XGHO2';
}
export type CompoundType = CompoundResources[keyof CompoundResources];

export interface CommodityResources {
	utrium_bar: 'utrium_bar';
	lemergium_bar: 'lemergium_bar';
	zynthium_bar: 'zynthium_bar';
	keanium_bar: 'keanium_bar';
	ghodium_melt: 'ghodium_melt';
	oxidant: 'oxidant';
	reductant: 'reductant';
	purifier: 'purifier';
	battery: 'battery';
	composite: 'composite';
	crystal: 'crystal';
	liquid: 'liquid';
	wire: 'wire';
	switch: 'switch';
	transistor: 'transistor';
	microchip: 'microchip';
	circuit: 'circuit';
	device: 'device';
	cell: 'cell';
	phlegm: 'phlegm';
	tissue: 'tissue';
	muscle: 'muscle';
	organoid: 'organoid';
	organism: 'organism';
	alloy: 'alloy';
	tube: 'tube';
	fixtures: 'fixtures';
	frame: 'frame';
	hydraulics: 'hydraulics';
	machine: 'machine';
	condensate: 'condensate';
	concentrate: 'concentrate';
	extract: 'extract';
	spirit: 'spirit';
	emanation: 'emanation';
	essence: 'essence';
}
export type CommodityType = CommodityResources[keyof CommodityResources];

export interface IntershardResources {
	token: 'token';
	cpuUnlock: 'cpuUnlock';
	pixel: 'pixel';
	accessKey: 'accessKey';
}
export type IntershardResourceType = IntershardResources[keyof IntershardResources];

/** Room-object store resources. Augment to add mod resources (`thorium: 'thorium'`). */
export interface Resources extends MineralResources, DepositResources, CompoundResources, CommodityResources {
	energy: 'energy';
	power: 'power';
	ops: 'ops';
}
export type ResourceType = Resources[keyof Resources];

export type MarketResourceType = ResourceType | IntershardResourceType;

/** Resource amounts on a `rooms.objects` document (`store.energy`, `store.H`, …). */
export type ResourceStore = Partial<Record<ResourceType, number>>;

/** Per-resource capacity (`storeCapacityResource.energy`). Labs may `$unset` a key with `null`. */
export type ResourceStoreCapacity = Partial<Record<ResourceType, number | null>>;
