import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest, select, delay } from 'redux-saga/effects';
import { AUTH_LOGIN, AUTH_LOGOUT } from '../actions/auth-actions';
import { User } from '../../types/types';
import { logout, setAuthToken, login } from '../../api/networkWorker';
import {history} from "../store";

export function* getUserAuthDataSaga(action: ReturnType<typeof AUTH_LOGIN.TRIGGER>): SagaIterator {
	yield put(AUTH_LOGIN.STARTED(action.payload));

	try{
		const serverResponse = yield call(login, action.payload.username, action.payload.password);
		const fetchedResponse = serverResponse.data.login;
		setAuthToken(fetchedResponse.token);

		yield put(AUTH_LOGIN.COMPLETED({
			user: fetchedResponse.user,
			token: fetchedResponse.token
		}));

		history.replace('/home');
	}catch(err) {
		yield put(AUTH_LOGIN.COMPLETED.failed(new Error(err)));
		alert(err.message);
	}
}

export function* logoutUserSaga(): SagaIterator {
	yield put(AUTH_LOGIN.COMPLETED({ user: {} as User, token: ""}));
	history.replace('/login');
	yield call(logout);
}

export function* listenForLoginTrigger(): SagaIterator {
	yield takeLatest(AUTH_LOGIN.TRIGGER, getUserAuthDataSaga);
	yield takeLatest(AUTH_LOGOUT.actionType, logoutUserSaga);
}
