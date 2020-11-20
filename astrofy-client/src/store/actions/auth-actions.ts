import { createAction } from 'typesafe-redux-helpers';
import { User } from '../../types/types';

export interface LoginPayload {
	username: string;
	password: string;
}

export interface RegisterPayload {
	username: string;
	password: string;
	email: string;
	address: string;
	birthDate: string;
}

export const AUTH_LOGIN = {
	TRIGGER: createAction(
		'[Auth Login] Trigger',
		(payload: LoginPayload) => payload
	),
	STARTED: createAction(
		'[Auth Login] Started',
		(payload: LoginPayload) => payload
	),
	COMPLETED: createAction(
		'[Auth Login] Completed',
		(payload: { user: User; token: string }) => payload
	)
};

export const AUTH_REGISTER = {
	TRIGGER: createAction(
		'[Auth Register] Trigger',
		(payload: RegisterPayload) => payload
	),
	STARTED: createAction('[Auth Register] Started'),
	COMPLETED: createAction(
		'[Auth Register] Completed',
		(payload: { user: User; token: string }) => payload
	)
};

export const AUTH_LOGOUT = createAction('[Auth Logout] Logout');
