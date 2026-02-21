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
