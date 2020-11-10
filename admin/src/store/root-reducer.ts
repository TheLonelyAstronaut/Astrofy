import { combineReducers, Reducer } from "redux";
import { ApplicationState } from '../types/redux';
import { authReducer as auth } from "./reducers/auth-reducer";

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
	auth
});
