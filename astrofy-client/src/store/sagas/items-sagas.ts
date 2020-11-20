import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as ACTIONS from '../actions/item-actions';
import {
	getCategories,
	getAllItemsFromDatabase
} from '../../api/networkWorker';

export function* getCategoriesSaga(): SagaIterator {
	yield put(ACTIONS.LOADING_SHOP_DATA.STARTED());

	console.log('HERE?')

	try {
		const serverResponse = yield call(getCategories);

		yield put(
			ACTIONS.FETCH_CATEGORIES.COMPLETED(serverResponse.data.getCategories)
		);
	} catch (err) {
		console.error(err);
	} finally {
		yield put(ACTIONS.LOADING_SHOP_DATA.COMPLETED());
	}
}

export function* getCategoryPageSaga(
	action: ReturnType<typeof ACTIONS.GET_CATEGORY_PAGE.TRIGGER>
): SagaIterator {
	yield put(ACTIONS.LOADING_SHOP_DATA.STARTED());

	try {
		const serverResponse = yield call(
			getAllItemsFromDatabase,
			action.payload.category,
			action.payload.offset
		);

		yield put(
			ACTIONS.GET_CATEGORY_PAGE.COMPLETED({
				data: serverResponse.data.getAllItemsFromDatabase,
				category: action.payload.category,
				offset: action.payload.offset
			})
		);
	} catch (err) {
		console.error(err);
	} finally {
		yield put(ACTIONS.LOADING_SHOP_DATA.COMPLETED());
	}
}

export function* listenForGetCategoriesTrigger(): SagaIterator {
	yield takeLatest(ACTIONS.FETCH_CATEGORIES.TRIGGER, getCategoriesSaga);
}

export function* listenForGetCategoryPageTrigger(): SagaIterator {
	yield takeLatest(ACTIONS.GET_CATEGORY_PAGE.TRIGGER, getCategoryPageSaga);
}
