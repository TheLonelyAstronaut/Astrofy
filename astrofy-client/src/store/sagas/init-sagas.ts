import { SagaIterator } from 'redux-saga';
import { call, select, takeLatest, put } from 'redux-saga/effects';
import { getCategoriesSaga, getCategoryPageSaga } from './items-sagas';
import { getCategories } from '../selectors/item-selectors';
import { getAuthToken } from '../selectors/auth-selectors';
import { INIT_APPLICATION } from '../actions/init-actions';
import * as ACTIONS from '../actions/item-actions';
import { EventRegister } from 'react-native-event-listeners';
import { getCart, setAuthToken } from '../../api/networkWorker';

export function* initializationSaga(): SagaIterator {
	try {
		yield call(getCategoriesSaga);
		const categories = yield select(getCategories);
		const token = yield select(getAuthToken);

		if (token) {
			setAuthToken(token);
			const cart = yield call(getCart);

			yield put(ACTIONS.SET_CART(cart.data.getUserInfo.basket));
		}

		for (const category of categories) {
			yield call(getCategoryPageSaga, {
				payload: {
					category: category,
					offset: 0
				}
			} as ReturnType<typeof ACTIONS.GET_CATEGORY_PAGE.TRIGGER>);
		}

		EventRegister.emit('INIT_SAGA_FINISHED');
	} catch (err) {
		console.error(err);
	}
}

export function* listenForInitializationSaga(): SagaIterator {
	yield takeLatest(INIT_APPLICATION.actionType, initializationSaga);
}
