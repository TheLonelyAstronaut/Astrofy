import { AnyAction, applyMiddleware, createStore as createReduxStore, Store, compose } from 'redux';
import { Persistor, persistStore } from 'redux-persist';
import { ApplicationState } from '../types/redux';
import createSagaMiddleware from 'redux-saga';
import { createConnectedReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { useEffect, useRef, useState } from 'react';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const createStore = async (): Promise<{ store: Store<ApplicationState>; persistor: Persistor }> => {
	const sagaMiddleware = createSagaMiddleware();

	const store: Store<ApplicationState> = createReduxStore(
		createConnectedReducer(history),
		compose(
			applyMiddleware(
				sagaMiddleware,
				routerMiddleware(history)
			)
		)
	);

	const persistor: Persistor = await new Promise((resolve) => {
		const p = persistStore(store, null, () => resolve(p));
	});

	await sagaMiddleware.run(rootSaga).toPromise();

	return { store, persistor };
};


export const useStore = (): { store: Store; persistor: Persistor } | undefined => {
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
