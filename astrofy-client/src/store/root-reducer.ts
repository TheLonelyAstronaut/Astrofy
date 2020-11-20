import { combineReducers } from 'redux';
import { authReducer as auth } from './reducers/auth-reducer';
import { shopDataReducer as shopData } from './reducers/shop-data-reducer';
import { ApplicationState } from '../types/redux';

export const rootReducer = combineReducers<ApplicationState>({
	auth,
	shopData
});
