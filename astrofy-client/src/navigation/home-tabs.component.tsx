import React from 'react';
import {
	createMaterialTopTabNavigator,
	MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs';
import { HomeTabScreen } from '../screens/home-tab-screen.component';
import Animated, { Easing } from 'react-native-reanimated';
import { Pressable, StyleSheet } from 'react-native';
import DefaultTheme from '../theme';
import { TABS_HEADER_HEIGHT } from '../global';
import { EventRegister } from 'react-native-event-listeners';
import { ListRef } from '../screens/product-list-screen.component';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useSelector } from 'react-redux';
import { getCategories } from '../store/selectors/item-selectors';

const HomeTabs = createMaterialTopTabNavigator();

interface Props {
	scrollY: Animated.Value<number>;
	tabsTransform: Animated.Value<number>;
	barTranslate: Animated.Node<number>;
	onScrollEndDrag: () => void;
	onMomentumScrollEnd: () => void;
	onGetRef: (data: ListRef) => void;
	setCurrent: (key: string) => void;
	onMomentumScrollStart: () => void;
}

export const HomeTabsNavigator: React.FC<Props> = (props: Props) => {
	const categories = useSelector(getCategories);

	return (
		<HomeTabs.Navigator
			tabBar={(barProps) => (
				<CustomHomeTabsBar {...barProps} barTranslate={props.barTranslate} />
			)}>
			{categories.map((category, index) => (
				<HomeTabs.Screen
					name={category}
					key={category}
					component={TabScreen}
					initialParams={{
						tabsTransform: props.tabsTransform,
						category: category,
						scrollY: props.scrollY,
						onScrollEndDrag: props.onScrollEndDrag,
						onMomentumScrollEnd: props.onMomentumScrollEnd,
						onMomentumScrollStart: props.onMomentumScrollStart,
						additionalID: (index + 1) * 10000,
						onGetRef: (listRef: any) =>
							props.onGetRef({
								key: category,
								value: listRef
							}),
						setCurrent: () => props.setCurrent(category),
						name: category
					}}
				/>
			))}
		</HomeTabs.Navigator>
	);
};

const TabWrapper = createSharedElementStackNavigator();

const TabScreen = (props: any) => {
	return (
		<TabWrapper.Navigator headerMode="none">
			<TabWrapper.Screen
				name={props.route.params.name + 'InWrapper'}
				component={HomeTabScreen}
				initialParams={{ ...props.route.params }}
			/>
		</TabWrapper.Navigator>
	);
};

interface BarProps {
	barTranslate: Animated.Node<number>;
}

export const CustomHomeTabsBar: React.FC<BarProps & MaterialTopTabBarProps> = (
	props: BarProps & MaterialTopTabBarProps
) => {
	return (
		<Animated.View
			style={[
				styles.tabsHeader,
				{
					transform: [
						{
							translateY: props.barTranslate
						}
					]
				}
			]}>
			<Animated.ScrollView
				horizontal={true}
				style={{ flexGrow: 1 }}
				contentContainerStyle={{ alignItems: 'center' }}
				showsHorizontalScrollIndicator={false}>
				{props.state.routes.map((route, index) => (
					<CustomHomeTabsBarButton
						key={route.name + index}
						route={route.name}
						isFocused={props.state.index === index}
						navigate={props.navigation.navigate}
						containerStyle={
							!index
								? { marginLeft: 35 }
								: index == props.state.routes.length - 1
								? { marginRight: 35 }
								: undefined
						}
					/>
				))}
			</Animated.ScrollView>
		</Animated.View>
	);
};

interface ButtonProps {
	route: string;
	isFocused: boolean;
	navigate: (route: string) => void;
	containerStyle?: object;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CustomHomeTabsBarButton: React.FC<ButtonProps> = (
	props: ButtonProps
) => {
	const [buttonBackground] = React.useState(new Animated.Value(0));
	const [textColor] = React.useState(new Animated.Value(0));

	const handlePress = () => {
		props.navigate(props.route);
	};

	const buttonBackgroundInterpolate = Animated.interpolateColors(
		buttonBackground,
		{
			inputRange: [0, 1],
			outputColorRange: [
				DefaultTheme.PRIMARY_BACKGROUND,
				DefaultTheme.SECONDARY_BACKGROUND
			]
		}
	);

	const textColorInterpolate = Animated.interpolateColors(textColor, {
		inputRange: [0, 1],
		outputColorRange: [DefaultTheme.DARK_PRIMARY, 'white']
	});

	React.useEffect(() => {
		const toValue = props.isFocused ? 1 : 0;
		EventRegister.emit('SWITCH_TABS');

		Animated.timing(buttonBackground, {
			toValue: toValue,
			duration: 150,
			easing: Easing.out(Easing.ease)
		}).start();

		Animated.timing(textColor, {
			toValue: toValue,
			duration: 150,
			easing: Easing.out(Easing.ease)
		}).start();
	}, [props.isFocused, buttonBackground, textColor]);

	return (
		<AnimatedPressable
			onPress={handlePress}
			style={[
				styles.button,
				{ backgroundColor: buttonBackgroundInterpolate },
				props.containerStyle
			]}>
			<Animated.Text
				// @ts-ignore
				style={[styles.buttonText, { color: textColorInterpolate }]}>
				{props.route[0].toUpperCase() + props.route.substr(1).toLowerCase()}
			</Animated.Text>
		</AnimatedPressable>
	);
};

const styles = StyleSheet.create({
	tabLabel: {
		color: 'white',
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 14
	},
	tabsHeader: {
		height: TABS_HEADER_HEIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: '100%',
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		zIndex: 2
	},
	button: {
		backgroundColor: 'transparent',
		paddingVertical: 7,
		paddingHorizontal: 15,
		marginHorizontal: 0,
		borderRadius: 20
	},
	buttonText: {
		fontFamily: DefaultTheme.fonts.bold,
		color: DefaultTheme.DARK_PRIMARY,
		fontSize: 14,
		lineHeight: 18
	},
	focusedContainer: {
		backgroundColor: DefaultTheme.SECONDARY_BACKGROUND
	}
});
