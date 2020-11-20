import { authReducer } from '../store/reducers/auth-reducer';
import { ItemType, User, ItemOutputSchema } from './types';
import { shopDataReducer } from '../store/reducers/shop-data-reducer';

export interface ApplicationState {
	auth: ReturnType<typeof authReducer>;
	shopData: ReturnType<typeof shopDataReducer>;
}

export interface AuthState {
	readonly user: User;
	readonly isFetching: boolean;
	readonly error?: Error;
	readonly token: string;
}

export interface ShopDataState {
	readonly pageSize: number;
	readonly isFetching: boolean;
	readonly error?: Error;
	readonly categories: ItemType[];
	readonly items: ItemsRedux;
	readonly search: TypeCell;
}

export interface ItemsRedux {
	[ItemType: string]: TypeCell;
}

export interface TypeCell {
	offset: number;
	data: ItemOutputSchema[];
	totalCount: number;
}
