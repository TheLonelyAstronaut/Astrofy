import { SagaIterator } from "redux-saga";
import { spawn } from 'redux-saga/effects';
import { listenForLoginTrigger } from './sagas/auth-sagas';
import {
	listenForGetCategoriesTrigger,
	listenForGetCategoryPageTrigger,
	listenForAddItemTrigger,
	listenForUpdateItemSaga
} from "./sagas/items-sagas";

export function* rootSaga(): SagaIterator {
	yield spawn(listenForLoginTrigger);
	yield spawn(listenForGetCategoriesTrigger);
	yield spawn(listenForGetCategoryPageTrigger);
	yield spawn(listenForAddItemTrigger);
	yield spawn(listenForUpdateItemSaga);
}
