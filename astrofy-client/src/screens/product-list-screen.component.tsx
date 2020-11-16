import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import DefaultTheme from '../theme';
import Animated, {Easing, Extrapolate} from 'react-native-reanimated';
import {EventRegister} from 'react-native-event-listeners'

const HEADER_HEIGHT = 250;
const TABS_HEADER_HEIGHT = 60;
const COLLAPSED_HEADER_HEIGHT = 40;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const STATUS_BAR = getStatusBarHeight();
const SEARCH_WIDTH = Dimensions.get('window').width - 70;
const SEARCH_HEIGHT = 65;
const SEARCH_CIRCLE_SIZE = 40;
const SEARCH_CIRCLE_DELTA = {
	VERTICAL: -70,
	HORIZONTAL: Dimensions.get('window').width - 145
};
const SEARCH_ICON = 35;
const SEARCH_WRAPPER_HORIZONTAL_PADDING = 20;

const tabsTransform = new Animated.Value(SCREEN_HEIGHT + TABS_HEADER_HEIGHT);
const tabHeaderTransform = new Animated.Value(SCREEN_HEIGHT);
const scrollY = new Animated.Value(0);

export const ProductListScreen: React.FC = () => {
	const [wasInitialized, setWasInitialized] = React.useState(false);

	const tabScreenBorderRadius = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT],
		outputRange: [40, 0],
		extrapolateLeft: Extrapolate.CLAMP
	});

	const tabBarTranslateY = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT + STATUS_BAR],
		outputRange: [
			STATUS_BAR + HEADER_HEIGHT,
			STATUS_BAR + COLLAPSED_HEADER_HEIGHT
		],
		extrapolateRight: Extrapolate.CLAMP
	});

	const scrollViewMarginTop = scrollY.interpolate({
		inputRange: [
			0,
			HEADER_HEIGHT + COLLAPSED_HEADER_HEIGHT + TABS_HEADER_HEIGHT - STATUS_BAR
		],
		outputRange: [0, TABS_HEADER_HEIGHT + COLLAPSED_HEADER_HEIGHT],
		extrapolateRight: Extrapolate.CLAMP,
		extrapolateLeft: Extrapolate.CLAMP
	});

	const backgroundColor = Animated.interpolateColors(scrollY, {
		inputRange: [
			HEADER_HEIGHT + STATUS_BAR + TABS_HEADER_HEIGHT,
			HEADER_HEIGHT + STATUS_BAR * 2 + TABS_HEADER_HEIGHT
		],
		outputColorRange: [DefaultTheme.PRIMARY_BACKGROUND, 'white']
	});

	const headerHeight = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT + TABS_HEADER_HEIGHT - STATUS_BAR],
		outputRange: [HEADER_HEIGHT, COLLAPSED_HEADER_HEIGHT],
		extrapolateRight: Extrapolate.CLAMP
	});

	const searchWidth = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 2],
		outputRange: [SEARCH_WIDTH, SEARCH_CIRCLE_SIZE],
		extrapolate: Extrapolate.CLAMP
	});

	const searchHeight = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 2],
		outputRange: [SEARCH_HEIGHT, SEARCH_CIRCLE_SIZE],
		extrapolate: Extrapolate.CLAMP
	});

	const searchVerticalDelta = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 2],
		outputRange: [0, SEARCH_CIRCLE_DELTA.VERTICAL],
		extrapolate: Extrapolate.CLAMP
	});

	const searchHorizontalDelta = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 2],
		outputRange: [0, SEARCH_CIRCLE_DELTA.HORIZONTAL],
		extrapolate: Extrapolate.CLAMP
	});

	const searchLogoSize = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 2],
		outputRange: [SEARCH_ICON, SEARCH_ICON / 2],
		extrapolate: Extrapolate.CLAMP
	});

	const searchHorizontalPadding = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 2],
		outputRange: [
			SEARCH_WRAPPER_HORIZONTAL_PADDING,
			SEARCH_WRAPPER_HORIZONTAL_PADDING / 1.8
		],
		extrapolate: Extrapolate.CLAMP
	});

	React.useEffect(() => {
		const id = EventRegister.addEventListener('APP_STARTED', () => {
			Animated.timing(tabsTransform, {
				toValue: 0,
				duration: 500,
				easing: Easing.out(Easing.ease)
			}).start();

			Animated.timing(tabHeaderTransform, {
				toValue: STATUS_BAR + HEADER_HEIGHT,
				duration: 500,
				easing: Easing.out(Easing.ease)
			}).start(() => setWasInitialized(true));
		}) as string;

		return () => {
			EventRegister.removeEventListener(id);
		};
	}, [wasInitialized]);

	return (
		<Animated.View
			// @ts-ignore
			style={[styles.container, { backgroundColor: backgroundColor }]}>
			<View
				style={{
					height: STATUS_BAR,
					backgroundColor: DefaultTheme.PRIMARY_BACKGROUND
				}}
			/>
			<Animated.View style={[styles.header, { height: headerHeight }]}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						height: COLLAPSED_HEADER_HEIGHT,
						justifyContent: 'space-between',
						marginTop: 5
					}}>
					<Animated.Text style={styles.pageTitle}>Product List</Animated.Text>
					<Pressable onPress={() => console.log('DRAWER')}>
						<Image
							source={require('../assets/openDrawer.png')}
							style={styles.openDrawer}
						/>
					</Pressable>
				</View>
				<Animated.View
					style={[
						styles.textInputWrapper,
						{
							width: searchWidth,
							height: searchHeight,
							transform: [
								{ translateY: searchVerticalDelta },
								{ translateX: searchHorizontalDelta }
							],
							paddingHorizontal: searchHorizontalPadding
						}
					]}>
					<Animated.Image
						source={require('../assets/search.png')}
						style={[
							styles.searchLogo,
							{ height: searchLogoSize, width: searchLogoSize }
						]}
					/>
				</Animated.View>
			</Animated.View>
			<Animated.View
				style={[
					styles.tabsHeader,
					{
						transform: [
							{
								translateY: wasInitialized
									? tabBarTranslateY
									: tabHeaderTransform
							}
						]
					}
				]}>
				<Text style={styles.tabLabel}>Custom Tabs</Text>
			</Animated.View>
			<Animated.ScrollView
				onScroll={Animated.event([
					{ nativeEvent: { contentOffset: { y: scrollY } } }
				])}
				scrollEventThrottle={16}
				style={[
					styles.tabsScreens,
					{
						transform: [{ translateY: tabsTransform }],
						height: SCREEN_HEIGHT - STATUS_BAR * 2,
						marginTop: scrollViewMarginTop
					}
				]}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: HEADER_HEIGHT + TABS_HEADER_HEIGHT
				}}>
				<Animated.View
					style={{
						backgroundColor: 'white',
						minHeight: SCREEN_HEIGHT,
						borderTopLeftRadius: tabScreenBorderRadius,
						borderTopRightRadius: tabScreenBorderRadius
					}}>
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
					<View style={{ height: 100, margin: 20, backgroundColor: 'blue' }} />
				</Animated.View>
			</Animated.ScrollView>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND
	},
	header: {
		height: HEADER_HEIGHT,
		position: 'absolute',
		width: Dimensions.get('window').width,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		marginTop: STATUS_BAR,
		zIndex: 3
	},
	tabs: {
		flexGrow: 1,
		minHeight: SCREEN_HEIGHT - STATUS_BAR
	},
	tabsHeader: {
		height: TABS_HEADER_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: '100%',
		transform: [{ translateY: STATUS_BAR * 2 + HEADER_HEIGHT }],
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND
	},
	tabsScreens: {
		flex: 1,
		height: SCREEN_HEIGHT - STATUS_BAR
	},
	tabLabel: {
		color: 'white',
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 14
	},
	pageTitle: {
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 26,
		color: 'white',
		marginLeft: 35
	},
	openDrawer: {
		height: 26,
		width: 26,
		resizeMode: 'contain',
		marginRight: 35
	},
	textInputWrapper: {
		marginHorizontal: 35,
		marginTop: 30,
		borderRadius: 35,
		height: 65,
		backgroundColor: DefaultTheme.SECONDARY_BACKGROUND,
		paddingHorizontal: SEARCH_WRAPPER_HORIZONTAL_PADDING,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	searchLogo: {
		height: SEARCH_ICON,
		width: SEARCH_ICON,
		resizeMode: 'contain'
	}
});
