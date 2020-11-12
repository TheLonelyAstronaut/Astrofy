import { combineReducers, Reducer } from "redux";
import { ApplicationState } from '../../../astrofy-admin/src/types/redux';
import { authReducer as auth } from "./reducers/auth-reducer";
import { connectRouter } from 'connected-react-router'
import { History } from 'history';

export const createConnectedReducer = (history: History<unknown>) => combineReducers<ApplicationState>({
	auth,
	router: connectRouter(history)
});
