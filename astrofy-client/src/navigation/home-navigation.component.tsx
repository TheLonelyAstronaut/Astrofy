import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamsList } from '../types/navigation';
import { HomeDrawerNavigation } from './home-drawer.component';

const HomeStack = createStackNavigator<HomeStackParamsList>();

export const HomeNavigation: React.FC = () => {
	return (
		<HomeStack.Navigator headerMode={'none'}>
			<HomeStack.Screen name={'HomeDrawer'} component={HomeDrawerNavigation} />
		</HomeStack.Navigator>
	);
};
