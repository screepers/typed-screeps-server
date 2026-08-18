import type { _HasRawId, RawId } from '../types';

export interface UserMoney extends _HasRawId {
	_id: RawId<this>;
}

export interface UserResource extends _HasRawId {
	_id: RawId<this>;
}

export interface MarketOrder extends _HasRawId {
	_id: RawId<this>;
}

export interface IntershardOrder extends _HasRawId {
	_id: RawId<this>;
}

export interface MarketTransaction extends _HasRawId {
	_id: RawId<this>;
}
