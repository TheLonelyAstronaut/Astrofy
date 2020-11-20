import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { AUTH_LOGIN, AUTH_REGISTER } from '../actions/auth-actions';
import { AuthState } from '../../types/redux';
import { User } from '../../types/types';

import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const unpersistedAuthReducer: Reducer<AuthState> = createReducer<AuthState>({
	isFetching: false,
	error: undefined,
	user: {} as User,
	token: ''
})
	.handleAction(AUTH_LOGIN.STARTED, (state, action) => ({
		isFetching: true,
		error: undefined,
		user: {
			...state.user,
			username: action.payload.username
		},
		token: ''
	}))
	.handleAction(
		AUTH_LOGIN.COMPLETED,
		(state, action) => ({
			isFetching: false,
			error: undefined,
			user: action.payload.user,
			token: action.payload.token
		}),
		(state, action) => ({
			isFetching: false,
			user: {} as User,
			error: action.payload,
			token: ''
		})
	)
	.handleAction(AUTH_REGISTER.STARTED, (state) => ({
		...state,
		isFetching: true
	}));

export const authReducer = persistReducer(
	{
		storage: AsyncStorage,
		key: 'auth'
	},
	unpersistedAuthReducer
);
