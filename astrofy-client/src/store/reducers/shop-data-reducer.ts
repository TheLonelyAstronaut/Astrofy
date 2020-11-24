import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import { ShopDataState, ItemsRedux, TypeCell } from '../../types/redux';
import * as ACTIONS from '../actions/item-actions';

export const shopDataReducer: Reducer<ShopDataState> = createReducer<
	ShopDataState
>({
	pageSize: 20,
	isFetching: false,
	error: undefined,
	categories: [],
	items: {} as ItemsRedux,
	search: {} as TypeCell
})
	.handleAction(ACTIONS.LOADING_SHOP_DATA.STARTED, (state, action) => ({
		...state,
		isFetching: true
	}))
	.handleAction(ACTIONS.LOADING_SHOP_DATA.COMPLETED, (state, action) => ({
		...state,
		isFetching: false
	}))
	.handleAction(ACTIONS.FETCH_CATEGORIES.COMPLETED, (state, action) => ({
		...state,
		categories: action.payload
	}))
	.handleAction(ACTIONS.GET_CATEGORY_PAGE.COMPLETED, (state, action) => {
		const newState = { ...state };

		if (!newState.items[action.payload.category]) {
			newState.items[action.payload.category] = {
				offset: action.payload.offset,
				data: action.payload.data.items,
				totalCount: action.payload.data.totalCount
			};
		} else {
			const newItems = [...newState.items[action.payload.category].data];

			action.payload.data.items.forEach((newItem) => {
				const results = newState.items[action.payload.category].data.filter(
					(oldItem) => oldItem.id === newItem.id
				);

				if (!results.length) {
					newItems.push(newItem);
				}
			});

			newState.items[action.payload.category] = {
				offset: action.payload.offset,
				data: newItems,
				totalCount: action.payload.data.totalCount
			};
		}

		return newState;
	})
	.handleAction(ACTIONS.ADD_ITEM.COMPLETED, (state, action) => {
		const newState = { ...state };

		if (!newState.items[action.payload.category]) {
			newState.items[action.payload.category] = {
				offset: 1,
				data: [action.payload],
				totalCount: 1
			};
		} else {
			newState.items[action.payload.category] = {
				offset: newState.items[action.payload.category].offset,
				data: [action.payload, ...newState.items[action.payload.category].data],
				totalCount: newState.items[action.payload.category].totalCount + 1
			};
		}

		return newState;
	})
	.handleAction(ACTIONS.UPDATE_ITEM.COMPLETED, (state, action) => {
		const newState = { ...state };
		newState.items[action.payload.category].data = [];

		state.items[action.payload.category].data.forEach((item) => {
			if (item.id === action.payload.id) {
				newState.items[action.payload.category].data.push(action.payload);
			} else {
				newState.items[action.payload.category].data.push(item);
			}
		});

		return newState;
	});
