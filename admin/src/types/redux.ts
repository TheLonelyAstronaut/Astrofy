import { authReducer } from '../store/reducers/auth-reducer';
import { User } from "./types";

export interface ApplicationState {
	auth: ReturnType<typeof authReducer>;
}

export interface AuthState {
	readonly user: User;
	readonly isFetching: boolean;
	readonly error?: Error;
	readonly token: string;
}
