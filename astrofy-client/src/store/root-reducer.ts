import { combineReducers } from 'redux';
import { authReducer as auth } from './reducers/auth-reducer';
import { shopDataReducer as shopData } from './reducers/shop-data-reducer';
import { ApplicationState } from '../types/redux';
import { bookmarksReducer as bookmarks } from './reducers/bookmarks-reducer';
import { cartReducer as cart } from './reducers/cart-reducer';
import { searchReducer as search } from './reducers/search-reducer';

export const rootReducer = combineReducers<ApplicationState>({
	auth,
	shopData,
	bookmarks,
	cart,
	search
});
