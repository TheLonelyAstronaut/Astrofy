import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppStackComponent } from './navigation/app-navigator.component';
import { Provider as PaperProvider } from 'react-native-paper';
import { ApolloProvider } from '@apollo/client';
import { client, setAuthToken } from './api/networkWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from './store/store';
import { Provider } from 'react-redux';
import * as Constants from './globals';

const linking = {
	prefixes: [Constants.SERVER_ADDRESS],
	config: {
		screens: {
			Auth: 'login',
			Main: 'home',
			ItemList: 'item_list',
			AddItem: 'add_item',
			EditItem: 'edit_item'
		}
	}
}

export default function App() {
	const store = useStore();

	React.useEffect(() => {
		document.title = 'Astrofy Admin';

		// To lazy to do adaptive design for smartphones ( this is a client for web, cmon )
		document.getElementsByName('viewport')[0].setAttribute("content",
			"width=720, initial-scale=0, maximum-scale=1.0, minimum-scale=0.35, user-scalable=yes");
	}, []);

	if (!store) {
		return null;
	}else {
		const state = store.store.getState();
		setAuthToken(state.auth.token);
	}

	return (
		<ApolloProvider client={client}>
			<Provider store={store.store}>
				<PersistGate persistor={store.persistor}>
					<PaperProvider>
						<NavigationContainer linking={linking}>
							<StatusBar style="auto" />
							<AppStackComponent/>
						</NavigationContainer>
					</PaperProvider>
				</PersistGate>
			</Provider>
		</ApolloProvider>
	);
}
