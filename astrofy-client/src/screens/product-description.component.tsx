import React from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import DefaultTheme from '../theme';
import { SharedElement } from 'react-navigation-shared-element';
import {
	DescriptionRouteProp,
	DescriptionNavigationType
} from '../types/navigation';
import {
	SCREEN_HEIGHT,
	SCREEN_WIDTH,
	STATUS_BAR,
	TABS_HEADER_HEIGHT,
	convertToByn,
	FLOATING_GROUP_HEIGHT
} from '../global';
import { Image } from 'react-native';

interface Props {
	route: DescriptionRouteProp;
	navigation: DescriptionNavigationType;
}

const PHOTO_LIBRARY_HEIGHT = SCREEN_HEIGHT * 0.45;
const HEADER_HEIGHT = TABS_HEADER_HEIGHT;

const getKeyName = (key: string) => {
	let capital = null;
	let measure = '';
	const result = key.match(/[A-Z]+/);

	if (key === 'diagonal') measure = 'inch';
	if (key === 'RAM' || key === 'driveCapacity') measure = 'GB';
	if (key === 'batteryCapacity') measure = 'mAh';

	if (result !== null && result[0] === key) return [key, measure];

	key.split('').map((char, index) => {
		if (char === char.toUpperCase()) {
			capital = index;
		}
	});

	key = key[0].toUpperCase() + key.substr(1);

	if (capital !== null) {
		key = key.substring(0, capital) + ' ' + key.substring(capital);
	}

	return [key, measure];
};

// @ts-ignore
export const ProductDescription: React.FC = (props: Props) => {
	const [scrollY] = React.useState(new Animated.Value(0));
	const [scrollTranslateY] = React.useState(new Animated.Value(SCREEN_HEIGHT));

	const [floatingGroupAnimated] = React.useState(
		new Animated.Value(FLOATING_GROUP_HEIGHT)
	);
	const scrollable = React.useRef<Animated.ScrollView>();
	const [goingBack, setIsGoingBack] = React.useState(false);

	const staticBackgroundInterpolate = Animated.interpolateColors(scrollY, {
		inputRange: [PHOTO_LIBRARY_HEIGHT - 30, PHOTO_LIBRARY_HEIGHT],
		outputColorRange: [
			DefaultTheme.LIGHT_PRIMARY,
			DefaultTheme.PRIMARY_BACKGROUND
		]
	});

	React.useEffect(() => {
		const unsub = props.navigation.addListener('focus', () => {
			setTimeout(() => {
				Animated.timing(scrollTranslateY, {
					toValue: 0,
					duration: 500,
					easing: Easing.out(Easing.ease)
				}).start(() => {
					Animated.timing(floatingGroupAnimated, {
						toValue: 0,
						duration: 300,
						easing: Easing.out(Easing.ease)
					}).start();
				});
			}, 400);
		});

		return () => {
			unsub();
		};
	}, [props.navigation, scrollTranslateY, floatingGroupAnimated]);

	const tabScreenBorderRadius = scrollY.interpolate({
		inputRange: [0, PHOTO_LIBRARY_HEIGHT / 2],
		outputRange: [30, 0]
	});

	const photoOpacity = scrollY.interpolate({
		inputRange: [0, PHOTO_LIBRARY_HEIGHT],
		outputRange: [1, 0]
	});

	const background = Animated.interpolateColors(scrollY, {
		inputRange: [PHOTO_LIBRARY_HEIGHT, PHOTO_LIBRARY_HEIGHT + 100],
		outputColorRange: [DefaultTheme.LIGHT_PRIMARY, 'white']
	});

	Animated.useCode(() => {
		return Animated.call([scrollY], (scrollY) => {
			if (!scrollY[0] && goingBack) {
				setIsGoingBack(false);
				props.navigation.goBack();
				return;
			}
		});
	}, [scrollY, goingBack, props.navigation]);

	return (
		// @ts-ignore
		<Animated.View style={[style.container, { backgroundColor: background }]}>
			<Animated.View
				// @ts-ignore
				style={{
					height: STATUS_BAR,
					backgroundColor: staticBackgroundInterpolate
				}}
			/>
			<Animated.View
				style={[
					style.header,
					// @ts-ignore
					{ backgroundColor: staticBackgroundInterpolate }
				]}>
				<Pressable
					style={style.headerButton}
					onPress={() => {
						setIsGoingBack(true);
						if (scrollable.current) {
							scrollable.current.getNode().scrollTo({
								x: 0,
								y: 0,
								animated: true
							});
						}
					}}>
					<Image
						source={require('../assets/back.png')}
						style={style.headerButton}
					/>
				</Pressable>
				<Text style={style.headerText}>{props.route.params.item.model}</Text>
				<Pressable style={style.headerButton}>
					<Image
						source={require('../assets/bookmark.png')}
						style={style.headerButton}
					/>
				</Pressable>
			</Animated.View>
			<Animated.View style={[style.photoHolder, { opacity: photoOpacity }]}>
				<SharedElement
					id={`item.${
						props.route.params.item.id +
						(props.route.params.additionalID
							? props.route.params.additionalID
							: 0)
					}.photo`}>
					<Image
						source={{ uri: props.route.params.item.photos[0].url }}
						style={style.image}
					/>
				</SharedElement>
			</Animated.View>
			<Animated.ScrollView
				onScroll={Animated.event([
					{ nativeEvent: { contentOffset: { y: scrollY } } }
				])}
				ref={(ref) =>
					(scrollable.current = ref as Animated.ScrollView | undefined)
				}
				style={{
					transform: [{ translateY: scrollTranslateY }]
				}}
				scrollEventThrottle={16}
				overScrollMode={'never'}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: PHOTO_LIBRARY_HEIGHT
				}}>
				<Animated.View
					style={{
						backgroundColor: 'white',
						minHeight: SCREEN_HEIGHT - STATUS_BAR - HEADER_HEIGHT,
						borderTopLeftRadius: tabScreenBorderRadius,
						borderTopRightRadius: tabScreenBorderRadius,
						paddingBottom: FLOATING_GROUP_HEIGHT,
						paddingTop: 30,
						paddingHorizontal: 30
					}}>
					<Animated.Text style={style.model}>
						{props.route.params.item.model}
					</Animated.Text>
					<Animated.Text style={style.manufacturer}>
						By {props.route.params.item.manufacturer}
					</Animated.Text>
					{Object.keys(props.route.params.item).map((key: string) => {
						if (
							key === 'id' ||
							key === 'category' ||
							key === 'quantity' ||
							key === 'cost' ||
							key === 'manufacturer' ||
							key === 'model' ||
							key == '__typename' ||
							key == 'photos'
						)
							return;

						if ((props.route.params.item as any)[key]) {
							return (
								<View style={{ flexDirection: 'row', marginBottom: 10 }}>
									{key !== 'description' && (
										<Text style={style.key}>{getKeyName(key)[0]}: </Text>
									)}
									<Text style={style.data}>
										{(props.route.params.item as any)[key] +
											' ' +
											getKeyName(key)[1]}
									</Text>
								</View>
							);
						}
					})}
				</Animated.View>
			</Animated.ScrollView>
			<Animated.View
				style={[
					style.floatingGroup,
					{ transform: [{ translateY: floatingGroupAnimated }] }
				]}>
				<Animated.Text style={style.price}>
					{props.route.params.item.cost} ${'\n'}
					<Animated.Text style={{ opacity: 0.5, fontSize: 18 }}>
						{convertToByn(props.route.params.item.cost)} BYN
					</Animated.Text>
				</Animated.Text>
				<Animated.View style={style.button}>
					<Animated.Text style={[style.price, { fontSize: 18 }]}>
						Add To Cart
					</Animated.Text>
				</Animated.View>
			</Animated.View>
		</Animated.View>
	);
};

// @ts-ignore
ProductDescription.sharedElements = (route: DescriptionRouteProp) => {
	console.log(route.params.additionalID);

	return [
		{
			id: `item.${
				route.params.item.id +
				(route.params.additionalID ? route.params.additionalID : 0)
			}.photo`,
			animation: 'move'
		}
	];
};

const style = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.LIGHT_PRIMARY
	},
	image: {
		width: SCREEN_WIDTH * 0.65,
		height: SCREEN_WIDTH * 0.65,
		alignSelf: 'center',
		resizeMode: 'contain'
	},
	header: {
		height: HEADER_HEIGHT,
		backgroundColor: DefaultTheme.LIGHT_PRIMARY,
		paddingHorizontal: 35,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerText: {
		color: 'white',
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 16
	},
	headerButton: {
		height: 24,
		width: 24,
		resizeMode: 'contain'
	},
	photoHolder: {
		position: 'absolute',
		height: PHOTO_LIBRARY_HEIGHT,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: HEADER_HEIGHT + STATUS_BAR
	},
	floatingGroup: {
		height: FLOATING_GROUP_HEIGHT,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		position: 'absolute',
		zIndex: 2,
		bottom: 0,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 35
	},
	price: {
		fontSize: 20,
		fontFamily: DefaultTheme.fonts.bold,
		color: 'white'
	},
	button: {
		backgroundColor: DefaultTheme.DARK_PRIMARY,
		paddingHorizontal: 35,
		paddingVertical: 16,
		borderRadius: 15
	},
	model: {
		color: DefaultTheme.DARK_PRIMARY,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 20
	},
	manufacturer: {
		color: DefaultTheme.DARK_PRIMARY,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 18,
		opacity: 0.5,
		marginBottom: 20
	},
	key: {
		color: DefaultTheme.PRIMARY_BACKGROUND,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 15
	},
	data: {
		color: DefaultTheme.PRIMARY_BACKGROUND,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 15,
		opacity: 0.8
	}
});
