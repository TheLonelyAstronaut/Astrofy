import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationStackParamsList } from '../types/navigation';
import { HomeNavigation } from './home-navigation.component';

const ApplicationStack = createStackNavigator<ApplicationStackParamsList>();

export const ApplicationNavigation: React.FC = () => {
	return (
		<ApplicationStack.Navigator headerMode={'none'}>
			<ApplicationStack.Screen name={'Home'} component={HomeNavigation} />
		</ApplicationStack.Navigator>
	);
};
