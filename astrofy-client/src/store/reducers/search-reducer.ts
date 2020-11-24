import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import { SEARCH_ITEMS } from '../actions/item-actions';
import { Search } from '../../types/redux';

export const searchReducer: Reducer<Search> = createReducer<Search>({
	data: []
}).handleAction(SEARCH_ITEMS.COMPLETED, (state, action) => {
	return {
		data: action.payload
	};
});
