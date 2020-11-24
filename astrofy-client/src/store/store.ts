import { applyMiddleware, createStore as createReduxStore, Store } from 'redux';
import { Persistor, persistStore } from 'redux-persist';
import { ApplicationState } from '../types/redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { useEffect, useRef, useState } from 'react';

export const createStore = async (): Promise<{
	store: Store<ApplicationState>;
	persistor: Persistor;
}> => {
	const sagaMiddleware = createSagaMiddleware();

	const store: Store<ApplicationState> = createReduxStore(
		rootReducer,
		applyMiddleware(sagaMiddleware)
	);

	const persistor: Persistor = await new Promise((resolve) => {
		const p = persistStore(store, null, () => resolve(p));
	});

	await sagaMiddleware.run(rootSaga).toPromise();

	return { store, persistor };
};

export const useStore = ():
	| { store: Store; persistor: Persistor }
	| undefined => {
	const [, setIsReady] = useState(false);
	const store = useRef<{ store: Store; persistor: Persistor }>();

	useEffect(() => {
		(async () => {
			store.current = await createStore();
			setIsReady(true);
		})();
	}, []);

	return store.current;
};
