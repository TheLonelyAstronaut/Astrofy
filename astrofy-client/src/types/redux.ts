import { authReducer } from '../store/reducers/auth-reducer';
import { ItemType, User, ItemOutputSchema } from './types';
import { shopDataReducer } from '../store/reducers/shop-data-reducer';
import { bookmarksReducer } from '../store/reducers/bookmarks-reducer';
import { cartReducer } from '../store/reducers/cart-reducer';

export interface ApplicationState {
	auth: ReturnType<typeof authReducer>;
	shopData: ReturnType<typeof shopDataReducer>;
	bookmarks: ReturnType<typeof bookmarksReducer>;
	cart: ReturnType<typeof cartReducer>;
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

export interface Bookmarks {
	bookmarks: ItemOutputSchema[];
}

export interface Cart {
	isFetching: boolean;
	data: ItemOutputSchema[];
}
