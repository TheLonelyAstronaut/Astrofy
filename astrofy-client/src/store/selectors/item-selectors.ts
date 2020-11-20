import { Selector, createSelector } from 'reselect';
import { ApplicationState, ShopDataState, TypeCell } from '../../types/redux';
import { ItemOutputSchema, ItemType } from '../../types/types';

const getShopDataRootState: Selector<
	ApplicationState,
	ShopDataState
> = createSelector(
	(state: ApplicationState) => state.shopData,
	(shopData: ShopDataState) => shopData
);

export const getCategories: Selector<
	ApplicationState,
	ItemType[]
> = createSelector(
	getShopDataRootState,
	(shopData: ShopDataState) => shopData.categories
);

export const getIsShopDataFetching: Selector<
	ApplicationState,
	boolean
> = createSelector(
	getShopDataRootState,
	(shopData: ShopDataState) => shopData.isFetching
);

export const getShopDataError: Selector<
	ApplicationState,
	Error | undefined
> = createSelector(
	getShopDataRootState,
	(shopData: ShopDataState) => shopData.error
);

export const getShopPageSize: Selector<
	ApplicationState,
	number
> = createSelector(
	getShopDataRootState,
	(shopData: ShopDataState) => shopData.pageSize
);

export const getItemsFromCategory = (
	category: ItemType
): Selector<ApplicationState, TypeCell> =>
	createSelector(
		getShopDataRootState,
		(shopData: ShopDataState) => shopData.items[category]
	);

export const getCategoryOffset = (
	category: ItemType
): Selector<ApplicationState, number> =>
	createSelector(
		getItemsFromCategory(category),
		(shopData: TypeCell) => shopData.offset
	);

export const getItemFromStore = (
	category: ItemType,
	id: string
): Selector<ApplicationState, ItemOutputSchema> =>
	createSelector(getItemsFromCategory(category), (shopData: TypeCell) => {
		let result = {} as ItemOutputSchema;

		shopData.data.forEach((item) => {
			if (item.id === parseInt(id, 10)) {
				result = item;
			}
		});

		return result;
	});
