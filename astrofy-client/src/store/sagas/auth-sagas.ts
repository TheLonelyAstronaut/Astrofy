import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';
import {
	AUTH_LOGIN,
	AUTH_LOGOUT,
	AUTH_REGISTER
} from '../actions/auth-actions';
import { User } from '../../types/types';
import { logout, setAuthToken, login, register } from '../../api/networkWorker';
import { Navigation } from '../../global';
import { showMessage } from 'react-native-flash-message';

export function* getUserAuthDataSaga(
	action: ReturnType<typeof AUTH_LOGIN.TRIGGER>
): SagaIterator {
	yield put(AUTH_LOGIN.STARTED(action.payload));

	try {
		const serverResponse = yield call(
			login,
			action.payload.username,
			action.payload.password
		);
		const fetchedResponse = serverResponse.data.login;
		setAuthToken(fetchedResponse.token);

		yield put(
			AUTH_LOGIN.COMPLETED({
				user: fetchedResponse.user,
				token: fetchedResponse.token
			})
		);

		Navigation.navigate('Home');
	} catch (err) {
		yield put(AUTH_LOGIN.COMPLETED.failed(new Error(err)));
		console.error(err.message);
		showMessage({
			animated: true,
			duration: 2000,
			backgroundColor: '#e74c3c',
			message: 'Auth Failed',
			description: 'Invalid data, check your input'
		});
	}
}

export function* registerSaga(
	action: ReturnType<typeof AUTH_REGISTER.TRIGGER>
): SagaIterator {
	try {
		yield put(AUTH_REGISTER.STARTED());

		const serverResponse = yield call(register, action.payload);
		const fetchedResponse = serverResponse.data.register;
		setAuthToken(fetchedResponse.token);

		yield put(
			AUTH_LOGIN.COMPLETED({
				user: fetchedResponse.user,
				token: fetchedResponse.token
			})
		);

		Navigation.navigate('Home');
	} catch (err) {
		yield put(AUTH_LOGIN.COMPLETED.failed(new Error(err)));
		console.error(err.message);
		showMessage({
			animated: true,
			duration: 2000,
			backgroundColor: '#e74c3c',
			message: 'Auth Failed',
			description: err.message
		});
	}
}

export function* logoutUserSaga(): SagaIterator {
	Navigation.navigate('Auth');
	yield put(AUTH_LOGIN.COMPLETED({ user: {} as User, token: '' }));
	yield call(logout);
}

export function* listenForLoginTrigger(): SagaIterator {
	yield takeLatest(AUTH_LOGIN.TRIGGER, getUserAuthDataSaga);
	yield takeLatest(AUTH_LOGOUT.actionType, logoutUserSaga);
}

export function* listenForRegisterTrigger(): SagaIterator {
	yield takeLatest(AUTH_REGISTER.TRIGGER, registerSaga);
}
