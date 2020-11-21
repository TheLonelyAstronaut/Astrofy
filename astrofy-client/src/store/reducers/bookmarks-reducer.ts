import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import {
	ADD_TO_BOOKMARKS,
	REMOVE_FROM_BOOKMARKS
} from '../actions/item-actions';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bookmarks } from '../../types/redux';

const unpersistedBookmarksReducer: Reducer<Bookmarks> = createReducer<
	Bookmarks
>({
	bookmarks: []
})
	.handleAction(ADD_TO_BOOKMARKS, (state, action) => {
		const newState = { ...state };
		const toFind = { ...state };

		if (
			toFind.bookmarks.filter((item) => item.id === action.payload.id).length
		) {
			return newState;
		} else {
			newState.bookmarks = [action.payload, ...state.bookmarks];
			console.log(newState);

			return newState;
		}
	})
	.handleAction(REMOVE_FROM_BOOKMARKS, (state, action) => {
		const newState = { ...state };
		const toFind = { ...state };

		if (
			toFind.bookmarks.filter((item) => item.id === action.payload.id).length
		) {
			newState.bookmarks = newState.bookmarks.filter(
				(item) => item.id !== action.payload.id
			);
			console.log(newState);

			return newState;
		} else {
			return newState;
		}
	});

export const bookmarksReducer = persistReducer(
	{
		storage: AsyncStorage,
		key: 'bookmarks'
	},
	unpersistedBookmarksReducer
);
