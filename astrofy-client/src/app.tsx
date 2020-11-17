import React from 'react';
import { View, StyleSheet, StatusBar, Dimensions, LogBox } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Animated, { Easing } from 'react-native-reanimated';
import DefaultTheme from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationNavigation } from './navigation/app-navigation.component';
import { EventRegister } from 'react-native-event-listeners';

LogBox.ignoreAllLogs(true);

export const App: React.FC = () => {
	const splashOpacity = new Animated.Value(1);
	const imageTranslate = new Animated.Value(0);
	const [isSplashMounted, setIsSplashMounted] = React.useState(true);
	const [isLogoLoaded, setIsLogoLoaded] = React.useState(false);

	React.useEffect(() => {
		if(!isLogoLoaded) return;

		RNBootSplash.hide({ fade: false }).then(() => {
			Animated.timing(splashOpacity, {
				duration: 500,
				toValue: 0,
				easing: Easing.inOut(Easing.ease)
			}).start(() => {
				setIsSplashMounted(false);
			});

			EventRegister.emit('APP_STARTED');

			Animated.timing(imageTranslate, {
				duration: 300,
				toValue: -Dimensions.get('window').height,
				easing: Easing.sin
			}).start();
		});
	}, [splashOpacity, imageTranslate, isLogoLoaded]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle={'light-content'} />
			<NavigationContainer
				theme={{
					dark: true,
					colors: {
						primary: DefaultTheme.PRIMARY_BACKGROUND,
						background: DefaultTheme.PRIMARY_BACKGROUND,
						card: DefaultTheme.PRIMARY_BACKGROUND,
						text: DefaultTheme.PRIMARY_BACKGROUND,
						border: DefaultTheme.PRIMARY_BACKGROUND,
						notification: DefaultTheme.PRIMARY_BACKGROUND
					}
				}}>
				<ApplicationNavigation />
			</NavigationContainer>
			{isSplashMounted && (
				<Animated.View style={[styles.splashStyle, { opacity: splashOpacity }]}>
					<Animated.Image
						source={require('./assets/logo.png')}
						onLoadEnd={() => setIsLogoLoaded(true)}
						style={[
							styles.logo,
							{ transform: [{ translateY: imageTranslate }] }
						]}
					/>
				</Animated.View>
			)}
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
