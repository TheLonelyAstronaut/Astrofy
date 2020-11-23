import { SagaIterator } from 'redux-saga';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import * as ACTIONS from '../actions/item-actions';
import {
	getCategories,
	getAllItemsFromDatabase,
	addItemToCart,
	removeItemFromCart
} from '../../api/networkWorker';
import { getCart } from '../selectors/item-selectors';
import { ItemOutputSchema } from '../../types/types';
import {SET_CART} from "../actions/item-actions";
import {showMessage} from "react-native-flash-message";
import DefaultTheme from "../../theme";

export function* getCategoriesSaga(): SagaIterator {
	yield put(ACTIONS.LOADING_SHOP_DATA.STARTED());

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

export function* addToCartSaga(
	action: ReturnType<typeof ACTIONS.ADD_TO_CART.TRIGGER>
): SagaIterator {
	try {
		const currentState = yield select(getCart);
		if (
			currentState.filter(
				(item: ItemOutputSchema) => item.id === action.payload.id
			).length
		) {
			return;
		}

		const serverResponse = yield call(addItemToCart, action.payload.id);

		yield put(SET_CART(serverResponse.data.addItemToBasket.items));

		showMessage({
			animated: true,
			duration: 2000,
			backgroundColor: DefaultTheme.DARK_PRIMARY,
			message: 'Cart',
			description: 'Added to cart'
		});
	} catch (err) {
		console.error(err);
	}
}

export function* removeFromCart(
	action: ReturnType<typeof ACTIONS.REMOVE_FROM_CART.TRIGGER>
): SagaIterator {
	try {
		const currentState = yield select(getCart);
		if (
			!currentState.filter(
				(item: ItemOutputSchema) => item.id === action.payload.id
			).length
		) {
			return;
		}

		const serverResponse = yield call(removeItemFromCart, action.payload.id);

		console.log(serverResponse.data.removeItemFromBasket.items);

		yield put(SET_CART(serverResponse.data.removeItemFromBasket.items));

		showMessage({
			animated: true,
			duration: 2000,
			backgroundColor: DefaultTheme.DARK_PRIMARY,
			message: 'Cart',
			description: 'Removed from cart'
		});
	} catch (err) {
		console.error(err);
	}
}

export function* listenForGetCategoriesTrigger(): SagaIterator {
	yield takeLatest(ACTIONS.FETCH_CATEGORIES.TRIGGER, getCategoriesSaga);
}

export function* listenForGetCategoryPageTrigger(): SagaIterator {
	yield takeLatest(ACTIONS.GET_CATEGORY_PAGE.TRIGGER, getCategoryPageSaga);
}

export function* listenForAddToCartTrigger(): SagaIterator {
	yield takeLatest(ACTIONS.ADD_TO_CART.TRIGGER, addToCartSaga);
}

export function* listenForRemoveFromCartTrigger(): SagaIterator {
	yield takeLatest(ACTIONS.REMOVE_FROM_CART.TRIGGER, removeFromCart);
}
