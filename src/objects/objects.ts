import { Id } from '../types';

export interface UserMoney {
	_id: Id<UserMoney>;
}

export interface UserResource {
	_id: Id<UserResource>;
}

export interface MarketOrder {
	_id: Id<MarketOrder>;
}

export interface IntershardOrder {
	_id: Id<IntershardOrder>;
}

export interface MarketTransaction {
	_id: Id<MarketTransaction>;
}
