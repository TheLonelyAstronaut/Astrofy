import React from 'react';
import { View, StyleSheet, StatusBar, Dimensions, LogBox } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Animated, { Easing } from 'react-native-reanimated';
import DefaultTheme from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationNavigation } from './navigation/app-navigation.component';
import { EventRegister } from 'react-native-event-listeners';
import { client } from './api/networkWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { useStore } from './store/store';
import { INIT_APPLICATION } from './store/actions/init-actions';
import { navigationRef } from './global';
import FlashMessage from 'react-native-flash-message';

LogBox.ignoreAllLogs(true);

const splashOpacity = new Animated.Value(1);
const imageTranslate = new Animated.Value(0);

export const App: React.FC = () => {
	const [isSplashMounted, setIsSplashMounted] = React.useState(true);
	const [isAppLoaded, setIsAppLoaded] = React.useState(false);
	const store = useStore();

	const removeSplash = React.useCallback(() => {
		setIsAppLoaded(true);

		RNBootSplash.hide({ fade: false }).then(() => {
			Animated.timing(splashOpacity, {
				duration: 500,
				toValue: 0,
				easing: Easing.inOut(Easing.ease)
			}).start(() => {
				setIsSplashMounted(false);
				console.log(isAppLoaded);
			});

			EventRegister.emit('APP_STARTED');

			Animated.timing(imageTranslate, {
				duration: 300,
				toValue: -Dimensions.get('window').height,
				easing: Easing.sin
			}).start();
		});
	}, [setIsAppLoaded, isAppLoaded]);

	React.useEffect(() => {
		const id = EventRegister.addEventListener(
			'INIT_SAGA_FINISHED',
			removeSplash
		) as string;

		return () => {
			EventRegister.removeEventListener(id);
		};
	}, [removeSplash]);

	React.useEffect(() => {
		if (store?.store) {
			store.store.dispatch(INIT_APPLICATION());
		}
	}, [store]);

	if (!store) {
		return null;
	}

	return (
		<View style={styles.container}>
			<ApolloProvider client={client}>
				<Provider store={store.store}>
					<PersistGate persistor={store.persistor}>
						<StatusBar barStyle={'light-content'} />
						<NavigationContainer
							ref={navigationRef}
							theme={{
								dark: true,
								colors: {
									primary: 'transparent',
									background: 'transparent',
									card: 'transparent',
									text: DefaultTheme.PRIMARY_BACKGROUND,
									border: DefaultTheme.PRIMARY_BACKGROUND,
									notification: DefaultTheme.PRIMARY_BACKGROUND
								}
							}}>
							{isAppLoaded && <ApplicationNavigation />}
						</NavigationContainer>
						{isSplashMounted && (
							<Animated.View
								style={[styles.splashStyle, { opacity: splashOpacity }]}>
								<Animated.Image
									source={require('./assets/logo.png')}
									style={[
										styles.logo,
										{ transform: [{ translateY: imageTranslate }] }
									]}
								/>
							</Animated.View>
						)}
						<FlashMessage position={'bottom'} />
					</PersistGate>
				</Provider>
			</ApolloProvider>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	splashStyle: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'contain'
	}
});
