import { SagaIterator } from "redux-saga";
import { call, spawn } from 'redux-saga/effects';
import { listenForLoginTrigger } from './sagas/auth-sagas';

export function* rootSaga(): SagaIterator {
	yield spawn(listenForLoginTrigger);
}
