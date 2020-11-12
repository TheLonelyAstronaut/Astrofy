import { authReducer } from '../store/reducers/auth-reducer';
import { User, ItemType } from "./types";
import { RouterState } from 'connected-react-router';

export interface ApplicationState {
	auth: ReturnType<typeof authReducer>;
	router: RouterState
}

export interface AuthState {
	readonly user: User;
	readonly isFetching: boolean;
	readonly error?: Error;
	readonly token: string;
}

export interface ItemsRedux {
	[ItemType: string] : {
		data: number
	}
}
