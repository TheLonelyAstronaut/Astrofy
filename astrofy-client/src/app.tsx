import React from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Animated, { Easing } from 'react-native-reanimated';
import DefaultTheme from './theme';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationNavigation } from './navigation/app-navigation.component';
import { EventRegister } from 'react-native-event-listeners';

export const App: React.FC = () => {
	const splashOpacity = new Animated.Value(1);
	const imageTranslate = new Animated.Value(0);
	const splashStyleAnimated = { opacity: splashOpacity };
	const imageStyleAnimated = { transform: [{ translateY: imageTranslate }] };
	const [isSplashMounted, setIsSplashMounted] = React.useState(true);

	React.useEffect(() => {
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
	}, [splashOpacity, imageTranslate]);

	return (
		<View style={styles.container}>
			<StatusBar barStyle={'light-content'} />
			{isSplashMounted && (
				<Animated.View style={[styles.splashStyle, splashStyleAnimated]}>
					<Animated.Image
						source={require('./assets/logo.png')}
						style={[styles.logo, imageStyleAnimated]}
					/>
				</Animated.View>
			)}
			<NavigationContainer>
				<ApplicationNavigation />
			</NavigationContainer>
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
