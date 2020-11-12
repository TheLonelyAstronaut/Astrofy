import React, { useEffect } from 'react';
import logo from './logo.svg';
import { ApolloProvider } from '@apollo/client';
import { client, setAuthToken } from './api/networkWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from './store/store';
import { Provider } from 'react-redux';
import { AppNavigator } from './navigation/app-navigator.component';
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#2c3e50',
		},
		secondary: {
			main: '#34495e',
		},
	},
});

function App() {
	const store = useStore();

	if(!store) {
		return null;
	}else {
		const state = store?.store.getState();
		setAuthToken(state.auth.token);

		//Clear local storage
		//store.persistor.persist();
		//store.persistor.purge();
	}

	return (
		<MuiThemeProvider theme={theme}>
			<ApolloProvider client={client}>
				<Provider store={store.store}>
					<PersistGate persistor={store.persistor}>
						<AppNavigator/>
					</PersistGate>
				</Provider>
			</ApolloProvider>
		</MuiThemeProvider>
	);
}

export default App;
