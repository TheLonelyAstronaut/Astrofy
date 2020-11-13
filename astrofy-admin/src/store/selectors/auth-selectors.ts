import { Selector, createSelector } from 'reselect';
import { ApplicationState, AuthState } from '../../types/redux';
import { User } from '../../types/types';

const getUserRootState: Selector<ApplicationState, AuthState> = createSelector(
	(state: ApplicationState) => state.auth,
	(user: AuthState) => user
);

export const getUserObject: Selector<ApplicationState, User> = createSelector(
	getUserRootState,
	(user: AuthState) => user.user
);

export const getAuthToken: Selector<ApplicationState, string> = createSelector(
	getUserRootState,
	(user: AuthState) => user.token
);

export const getIsUserFetching: Selector<ApplicationState, boolean> = createSelector(
	getUserRootState,
	(user: AuthState) => user.isFetching
);

export const getAuthError: Selector<ApplicationState, Error | undefined> = createSelector(
	getUserRootState,
	(user: AuthState) => user.error
);
