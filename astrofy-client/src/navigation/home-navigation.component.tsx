import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { HomeStackParamsList } from '../types/navigation';
import { HomeDrawerNavigation } from './home-drawer.component';
import { ProductDescription } from '../screens/product-description.component';
import { Search } from '../screens/search.component';

export const iosTransitionSpec = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: true,
		restDisplacementThreshold: 10,
		restSpeedThreshold: 10
	}
};

const HomeStack = createSharedElementStackNavigator<HomeStackParamsList>();
const TabsWrapper = createSharedElementStackNavigator();

const TabsWrapperComponent = () => (
	<TabsWrapper.Navigator headerMode={'none'}>
		<TabsWrapper.Screen component={HomeDrawerNavigation} name={'HomeWrapper'} />
	</TabsWrapper.Navigator>
);

export const HomeNavigation: React.FC = () => {
	return (
		<HomeStack.Navigator headerMode={'none'} mode={'modal'}>
			<HomeStack.Screen name={'HomeDrawer'} component={TabsWrapperComponent} />
			<HomeStack.Screen
				name={'ProductDescription'}
				component={ProductDescription}
				// @ts-ignore
				options={() => ({
					//...TransitionPresets.ModalSlideFromBottomIOS,
					gestureEnabled: false,
					transitionSpec: {
						open: iosTransitionSpec,
						close: iosTransitionSpec
					},
					cardStyleInterpolator: ({ current: { progress } }) => ({
						cardStyle: {
							opacity: progress
						}
					})
				})}
			/>
			<HomeStack.Screen
				name={'Search'}
				component={Search}
				// @ts-ignore
				options={() => ({
					//...TransitionPresets.ModalSlideFromBottomIOS,
					gestureEnabled: false,
					transitionSpec: {
						open: iosTransitionSpec,
						close: iosTransitionSpec
					},
					cardStyleInterpolator: ({ current: { progress } }) => ({
						cardStyle: {
							opacity: progress
						}
					})
				})}
			/>
		</HomeStack.Navigator>
	);
};
