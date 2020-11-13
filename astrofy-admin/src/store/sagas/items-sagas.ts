import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as ACTIONS from '../actions/item-actions';
import { getCategories, getAllItemsFromDatabase, addItem, updateItem } from "../../api/networkWorker";
import { history } from "../store";

export function* getCategoriesSaga(): SagaIterator {
	yield put(ACTIONS.LOADING_SHOP_DATA.STARTED());

	try {
		const serverResponse = yield call(getCategories);

		yield put(ACTIONS.FETCH_CATEGORIES.COMPLETED(serverResponse.data.getCategories))
	} catch (err) {
		console.error(err);
	} finally {
		yield put(ACTIONS.LOADING_SHOP_DATA.COMPLETED());
	}
}

export function* getCategoryPageSaga(action: ReturnType<typeof ACTIONS.GET_CATEGORY_PAGE.TRIGGER>): SagaIterator {
	yield put(ACTIONS.LOADING_SHOP_DATA.STARTED());

	try {
		const serverResponse = yield call(getAllItemsFromDatabase, action.payload.category, action.payload.offset);

		yield put(ACTIONS.GET_CATEGORY_PAGE.COMPLETED({
			data: serverResponse.data.getAllItemsFromDatabase,
			category: action.payload.category,
			offset: action.payload.offset
		}));
	} catch (err) {
		console.error(err);
	} finally {
		yield put(ACTIONS.LOADING_SHOP_DATA.COMPLETED());
	}
}

export function* addItemSaga(action: ReturnType<typeof ACTIONS.ADD_ITEM.TRIGGER>): SagaIterator {
	yield put(ACTIONS.LOADING_SHOP_DATA.STARTED());

	try {
		const serverResponse = yield call(addItem, action.payload);

		console.log(serverResponse);
		yield put(ACTIONS.ADD_ITEM.COMPLETED(serverResponse.data.addItem));
		history.push('/home');
	} catch (err) {
		console.error(err);
	} finally {
		yield put(ACTIONS.LOADING_SHOP_DATA.COMPLETED());
	}
}

export function* updateItemSaga(action: ReturnType<typeof ACTIONS.UPDATE_ITEM.TRIGGER>): SagaIterator {
	yield put(ACTIONS.LOADING_SHOP_DATA.STARTED());

	try {
		const serverResponse = yield call(updateItem, action.payload.item, action.payload.id);

		yield put(ACTIONS.UPDATE_ITEM.COMPLETED(serverResponse.data.updateItem));
		history.push('/home');
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

export function* listenForAddItemTrigger(): SagaIterator {
	yield takeLatest(ACTIONS.ADD_ITEM.TRIGGER, addItemSaga);
}

export function* listenForUpdateItemSaga(): SagaIterator {
	yield takeLatest(ACTIONS.UPDATE_ITEM.TRIGGER, updateItemSaga);
}
