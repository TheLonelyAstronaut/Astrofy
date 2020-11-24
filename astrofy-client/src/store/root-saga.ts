import { SagaIterator } from 'redux-saga';
import { spawn } from 'redux-saga/effects';
import {
	listenForLoginTrigger,
	listenForRegisterTrigger
} from './sagas/auth-sagas';
import {
	listenForGetCategoriesTrigger,
	listenForGetCategoryPageTrigger,
	listenForAddToCartTrigger,
	listenForRemoveFromCartTrigger,
	listenForSearchItemsTrigger
} from './sagas/items-sagas';
import { listenForInitializationSaga } from './sagas/init-sagas';

export function* rootSaga(): SagaIterator {
	yield spawn(listenForLoginTrigger);
	yield spawn(listenForInitializationSaga);
	yield spawn(listenForGetCategoriesTrigger);
	yield spawn(listenForGetCategoryPageTrigger);
	yield spawn(listenForRegisterTrigger);
	yield spawn(listenForAddToCartTrigger);
	yield spawn(listenForRemoveFromCartTrigger);
	yield spawn(listenForSearchItemsTrigger);
}
