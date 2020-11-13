import { combineReducers } from "redux";
import { ApplicationState } from '../../../astrofy-admin/src/types/redux';
import { authReducer as auth } from "./reducers/auth-reducer";
import { connectRouter } from 'connected-react-router'
import { History } from 'history';
import { shopDataReducer as shopData } from "./reducers/shop-data-reducer";

export const createConnectedReducer = (history: History<unknown>) => combineReducers<ApplicationState>({
	auth,
	shopData,
	router: connectRouter(history)
});
