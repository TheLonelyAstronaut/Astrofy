import { SagaIterator } from 'redux-saga';
import { spawn, call } from 'redux-saga/effects';
import {
	listenForLoginTrigger,
	listenForRegisterTrigger
} from './sagas/auth-sagas';
import {
	listenForGetCategoriesTrigger,
	listenForGetCategoryPageTrigger
} from './sagas/items-sagas';
import { listenForInitializationSaga } from './sagas/init-sagas';

export function* rootSaga(): SagaIterator {
	yield spawn(listenForLoginTrigger);
	yield spawn(listenForInitializationSaga);
	yield spawn(listenForGetCategoriesTrigger);
	yield spawn(listenForGetCategoryPageTrigger);
	yield spawn(listenForRegisterTrigger);
}
