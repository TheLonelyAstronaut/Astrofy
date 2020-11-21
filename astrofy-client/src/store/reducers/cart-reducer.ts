import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import {
	ADD_TO_CART,
	REMOVE_FROM_CART,
	SET_CART
} from '../actions/item-actions';
import { Cart } from '../../types/redux';

export const cartReducer: Reducer<Cart> = createReducer<Cart>({
	data: [],
	isFetching: false
})
	.handleAction(ADD_TO_CART.COMPLETED, (state, action) => {
		const newData = [...state.data];
		newData.unshift(action.payload);

		return {
			...state,
			data: newData
		};
	})
	.handleAction(REMOVE_FROM_CART.COMPLETED, (state, action) => {
		const newData = state.data.filter((item) => item.id !== action.payload.id);

		return {
			...state,
			data: newData
		};
	})
	.handleAction(SET_CART, (state, action) => ({
		...state,
		data: action.payload
	}));
