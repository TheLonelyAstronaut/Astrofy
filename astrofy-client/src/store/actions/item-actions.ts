import { createAction } from 'typesafe-redux-helpers';
import { ItemType, ItemOutputSchema, ItemInputSchema } from '../../types/types';

export const FETCH_CATEGORIES = {
	TRIGGER: createAction('[Fetch Categories] Trigger'),
	COMPLETED: createAction(
		'[Fetch Categories] Completed',
		(payload: ItemType[]) => payload
	)
};

export const LOADING_SHOP_DATA = {
	STARTED: createAction('[Loading Shop Data] Started'),
	COMPLETED: createAction('[Loading Shop Data] Completed')
};

export const GET_CATEGORY_PAGE = {
	TRIGGER: createAction(
		'[Get Category Page] Trigger',
		(payload: { category: ItemType; offset: number }) => payload
	),
	COMPLETED: createAction(
		'[Get Category Page] Completed',
		(payload: {
			data: { totalCount: number; items: ItemOutputSchema[] };
			category: ItemType;
			offset: number;
		}) => payload
	)
};

export const SEARCH_ITEM = {
	TRIGGER: createAction('[Search Item] Trigger', (query: string) => query),
	COMPLETED: createAction(
		'[Search Item] Completed',
		(payload: ItemOutputSchema[]) => payload
	)
};

export const ADD_ITEM = {
	TRIGGER: createAction('[Add Item] Trigger', (item: ItemInputSchema) => item),
	COMPLETED: createAction(
		'[Add Item] Completed',
		(item: ItemOutputSchema) => item
	)
};

export const UPDATE_ITEM = {
	TRIGGER: createAction(
		'[Update Item] Trigger',
		(payload: { item: ItemInputSchema; id: number }) => payload
	),
	COMPLETED: createAction(
		'[Update Item] Completed',
		(item: ItemOutputSchema) => item
	)
};

export const ADD_TO_BOOKMARKS = createAction(
	'[Add To Bookmarks]',
	(query: ItemOutputSchema) => query
);

export const REMOVE_FROM_BOOKMARKS = createAction(
	'[Remove From Bookmarks]',
	(query: ItemOutputSchema) => query
);

export const ADD_TO_CART = {
	TRIGGER: createAction(
		'[Add To Cart] Trigger',
		(payload: ItemOutputSchema) => payload
	),
	COMPLETED: createAction(
		'[Add To Cart] Completed',
		(payload: ItemOutputSchema) => payload
	)
};

export const REMOVE_FROM_CART = {
	TRIGGER: createAction(
		'[Remove From Cart] Trigger',
		(payload: ItemOutputSchema) => payload
	),
	COMPLETED: createAction(
		'[Remove From Cart] Completed',
		(payload: ItemOutputSchema) => payload
	)
};

export const SET_CART = createAction(
	'[Set Cart]',
	(payload: ItemOutputSchema[]) => payload
);
