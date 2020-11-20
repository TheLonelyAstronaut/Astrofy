import React from 'react';
import {NativeScrollEvent, StyleSheet} from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import {
	HEADER_HEIGHT,
	TABS_HEADER_HEIGHT,
	SCREEN_HEIGHT,
	STATUS_BAR,
	COLLAPSED_HEADER_HEIGHT,
	TABS_MARGIN
} from '../global';
import DefaultTheme from '../theme';
import { ItemOutputSchema, ItemType } from '../types/types';
import { CustomItem } from '../components/custom-item.component';
import { useSelector } from 'react-redux';
import { getItemsFromCategory } from '../store/selectors/item-selectors';

interface Props {
	route: {
		params: {
			scrollY: Animated.Value<number>;
			tabsTransform: Animated.Value<number>;
			onScrollEndDrag: () => void;
			onMomentumScrollEnd: () => void;
			onGetRef: (listRef: any) => void;
			setCurrent: () => void;
			onMomentumScrollStart: () => void;
			category: ItemType;
			additionalID: number;
		};
	};
	navigation: {
		addListener: (event: string, callback: () => void) => any;
	};
}

export const HomeTabScreen: React.FC<Props> = (props: Props) => {
	const items = useSelector(getItemsFromCategory(props.route.params.category));

	const holderOpacity = props.route.params.tabsTransform.interpolate({
		inputRange: [0, SCREEN_HEIGHT / 5],
		outputRange: [1, 0]
	});

	const holderHeight = props.route.params.scrollY.interpolate({
		inputRange: [-100, 0],
		outputRange: [0, SCREEN_HEIGHT / 3],
		extrapolateRight: Extrapolate.CLAMP
	});

	const tabScreenBorderRadius = props.route.params.scrollY.interpolate({
		inputRange: [
			0,
			(HEADER_HEIGHT - COLLAPSED_HEADER_HEIGHT + TABS_MARGIN) / 2
		],
		outputRange: [30, 0],
		extrapolateLeft: Extrapolate.CLAMP
	});

	React.useEffect(() => {
		const listener = props.navigation.addListener('focus', () => {
			props.route.params.setCurrent();
		});

		return () => {
			listener();
		};
	}, [props]);

	return (
		<Animated.View
			// @ts-ignore
			style={[styles.container]}>
			<Animated.View
				style={{
					position: 'absolute',
					zIndex: 0,
					height: holderHeight,
					width: '100%',
					backgroundColor: 'white',
					bottom: 0,
					opacity: holderOpacity
				}}
			/>
			<Animated.ScrollView
				onScroll={Animated.event([
					{
						nativeEvent: (nativeEvent: NativeScrollEvent) => {
							return Animated.set(
								props.route.params.scrollY,
								nativeEvent.contentOffset.y
							);
						}
					}
				])}
				ref={(ref) => props.route.params.onGetRef(ref)}
				onMomentumScrollEnd={props.route.params.onMomentumScrollEnd}
				onMomentumScrollBegin={props.route.params.onMomentumScrollStart}
				onScrollEndDrag={props.route.params.onScrollEndDrag}
				scrollEventThrottle={16}
				style={[
					styles.tabsScreens,
					{
						transform: [{ translateY: props.route.params.tabsTransform }],
						height: SCREEN_HEIGHT - STATUS_BAR
					}
				]}
				showsVerticalScrollIndicator={false}
				// bounces={false}
				contentContainerStyle={{
					paddingTop: HEADER_HEIGHT + TABS_HEADER_HEIGHT + TABS_MARGIN
				}}>
				<Animated.View
					style={{
						backgroundColor: 'white',
						minHeight:
							SCREEN_HEIGHT -
							COLLAPSED_HEADER_HEIGHT -
							TABS_HEADER_HEIGHT -
							STATUS_BAR -
							50,
						borderTopLeftRadius: tabScreenBorderRadius,
						borderTopRightRadius: tabScreenBorderRadius
					}}>
					{items.data.map((item) => (
						<CustomItem
							item={item}
							key={item.id}
							additionalID={props.route.params.additionalID}
						/>
					))}
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
	tabsScreens: {
		flex: 1,
		height: SCREEN_HEIGHT - STATUS_BAR,
		zIndex: 2
	}
});
