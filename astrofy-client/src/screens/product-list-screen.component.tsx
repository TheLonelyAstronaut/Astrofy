import React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import DefaultTheme from '../theme';
import Animated, {Easing, Extrapolate} from 'react-native-reanimated';
import {EventRegister} from 'react-native-event-listeners';
import {
	COLLAPSED_HEADER_HEIGHT,
	HEADER_HEIGHT,
	SCREEN_HEIGHT,
	SEARCH_CIRCLE_DELTA,
	SEARCH_CIRCLE_SIZE,
	SEARCH_HEIGHT,
	SEARCH_ICON,
	SEARCH_WIDTH,
	SEARCH_WRAPPER_HORIZONTAL_PADDING,
	STATUS_BAR,
	TABS_HEADER_HEIGHT,
	TABS_MARGIN
} from '../global';
import {HomeTabsNavigator} from '../navigation/home-tabs.component';
import {getCategories} from '../api/mock-api';
import {ItemType} from "../types/types";

const tabsTransform = new Animated.Value(SCREEN_HEIGHT + TABS_HEADER_HEIGHT);
const tabHeaderTransform = new Animated.Value(SCREEN_HEIGHT);
const scrollY = new Animated.Value(0);
const categories = getCategories();
const COLLAPSED_POSITION =
	HEADER_HEIGHT + TABS_MARGIN - COLLAPSED_HEADER_HEIGHT - 50;
let isBarHidden = false;
let isListGliding = false;

export interface ListRef {
	key: string;
	value: any;
}

type Offsets = {
	[ItemType: string]: number;
};

const listOffsets: Offsets = {};
const listRefs: ListRef[] = [];
let currentTab = categories[0];
let syncStarted = false;

export const ProductListScreen: React.FC = () => {
	const [wasInitialized, setWasInitialized] = React.useState(false);

	const tabBarTranslateY = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT - STATUS_BAR],
		outputRange: [HEADER_HEIGHT, COLLAPSED_HEADER_HEIGHT],
		extrapolateRight: Extrapolate.CLAMP
	});

	const headerHeight = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT],
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
		inputRange: [0, HEADER_HEIGHT / 1.5],
		outputRange: [0, SEARCH_CIRCLE_DELTA.VERTICAL],
		extrapolate: Extrapolate.CLAMP
	});

	const searchTextOpacity = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 3],
		outputRange: [1, 0],
		extrapolate: Extrapolate.CLAMP
	});

	const searchHorizontalDelta = scrollY.interpolate({
		inputRange: [0, HEADER_HEIGHT / 1.5],
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
				toValue: HEADER_HEIGHT,
				duration: 500,
				easing: Easing.out(Easing.ease)
			}).start(() => setWasInitialized(true));
		}) as string;

		return () => {
			EventRegister.removeEventListener(id);
		};
	}, [wasInitialized]);

	////
	const onGetRef = (list: ListRef) => {
		if (list.value) {
			const found = listRefs.find((e) => e.key === list.key);

			// console.log(Object.keys(list.value), list.value.getNode().scrollTo);

			if (!found) {
				listRefs.push(list);
			}
		}
	};

	const synchronizeScrollOffset = () => {
		const scrollValue = listOffsets[currentTab];

		if (!isListGliding) {
			/*let destination = 0;

			if (!isBarHidden) destination = COLLAPSED_POSITION;

			listRefs.forEach((list) => {
				if (list.key === currentTab) {
					list.value.getNode().scrollTo({
						x: 0,
						y: destination,
						animated: true
					});
				}
			});

			listOffsets[currentTab] = destination;*/
		}

		listRefs.forEach((list) => {
			if (list.key !== currentTab) {
				if (scrollValue < COLLAPSED_POSITION && scrollValue >= 0) {
					if (list.value) {
						list.value.getNode().scrollTo({
							x: 0,
							y: scrollValue,
							animated: false
						});

						listOffsets[list.key] = scrollValue;
					}
				} else if (scrollValue >= COLLAPSED_POSITION) {
					if (
						listOffsets[list.key] < COLLAPSED_POSITION ||
						listOffsets[list.key] == null
					) {
						if (list.value) {

							list.value.getNode().scrollTo({
								x: 0,
								y: COLLAPSED_POSITION,
								animated: false
							});

							listOffsets[list.key] = COLLAPSED_POSITION;
						}
					}
				}
			}
		});
	};

	const onMomentumScrollStart = () => {
		isListGliding = true;
		console.log('GLIDING');
	};

	const onMomentumScrollEnd = () => {
		const scrollValue = listOffsets[currentTab];
		isListGliding = false;

		if (scrollValue < COLLAPSED_POSITION && scrollValue > 0) {
			let wasSyncTriggered = false;

			listRefs.forEach((list) => {
				if (list.key === currentTab) {
					list.value.getNode().scrollTo({
						x: 0,
						y: isBarHidden ? 0 : COLLAPSED_POSITION,
						animated: true
					});

					listOffsets[currentTab] = isBarHidden ? 0 : COLLAPSED_POSITION;
					setTimeout(synchronizeScrollOffset, 400);
					wasSyncTriggered = true;
				}
			});

			if (!wasSyncTriggered) synchronizeScrollOffset();
		} else {
			synchronizeScrollOffset();
		}
	};

	const onScrollEndDrag = () => {
		synchronizeScrollOffset();
	};

	Animated.useCode(() => {
		return Animated.call([scrollY], (scrollY) => {
			listOffsets[currentTab] = scrollY[0];
			//console.log(scrollY[0]);
			if (scrollY[0] >= 0 && scrollY[0] < COLLAPSED_POSITION) {
				isBarHidden = false;
			} else {
				isBarHidden = true;
			}
		});
	}, [scrollY, currentTab]);
	////

	return (
		<Animated.View style={[styles.container]}>
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
						justifyContent: 'space-between'
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
					<Animated.Text
						style={{
							fontFamily: DefaultTheme.fonts.bold,
							color: 'white',
							fontSize: 18,
							marginLeft: 15,
							opacity: searchTextOpacity
						}}>
						Search...
					</Animated.Text>
				</Animated.View>
			</Animated.View>
			<HomeTabsNavigator
				scrollY={scrollY}
				tabsTransform={tabsTransform}
				barTranslate={wasInitialized ? tabBarTranslateY : tabHeaderTransform}
				onScrollEndDrag={onScrollEndDrag}
				onMomentumScrollEnd={onMomentumScrollEnd}
				onMomentumScrollStart={onMomentumScrollStart}
				onGetRef={onGetRef}
				setCurrent={(key: string) => (currentTab = key as ItemType)}
			/>
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
		borderRadius: 20,
		height: 65,
		backgroundColor: DefaultTheme.SECONDARY_BACKGROUND,
		paddingHorizontal: SEARCH_WRAPPER_HORIZONTAL_PADDING,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		elevation: 4,
		shadowOpacity: 0.1,
		shadowOffset: { height: 2, width: 1 },
		shadowColor: '#000000',
		shadowRadius: 3
	},
	searchLogo: {
		height: SEARCH_ICON,
		width: SEARCH_ICON,
		resizeMode: 'contain'
	}
});
