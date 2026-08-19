import type { Coord } from './rooms';
import type { ResourceType } from './resources';

export interface CreepActionLog {
	attack?: Coord | null;
	attacked?: Coord | null;
	build?: Coord | null;
	harvest?: Coord | null;
	heal?: Coord | null;
	healed?: Coord | null;
	rangedAttack?: Coord | null;
	rangedHeal?: Coord | null;
	rangedMassAttack?: {} | null;
	repair?: Coord | null;
	reserveController?: Coord | null;
	say?: { message: string; isPublic: boolean } | null;
	upgradeController?: Coord | null;
}

export interface PowerCreepActionLog {
	attack?: Coord | null;
	attacked?: Coord | null;
	healed?: Coord | null;
	power?: (Coord & { id: PowerConstant }) | null;
	say?: { message: string; isPublic: boolean } | null;
	spawned?: true | null;
}

export interface InvaderCoreActionLog {
	attackController?: Coord | null;
	reserveController?: Coord | null;
	transferEnergy?: Coord | null;
	upgradeController?: Coord | null;
}

export interface LabActionLog {
	reverseReaction?: { x1: number; y1: number; x2: number; y2: number } | null;
	runReaction?: { x1: number; y1: number; x2: number; y2: number } | null;
}

export interface LinkActionLog {
	transferEnergy?: Coord | null;
}

export interface TowerActionLog {
	attack?: Coord | null;
	heal?: Coord | null;
	repair?: Coord | null;
}

export interface FactoryActionLog {
	produce?: (Coord & { resourceType: ResourceType }) | null;
}
