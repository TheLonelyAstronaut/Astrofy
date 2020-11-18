import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationStackParamsList } from '../types/navigation';
import { HomeNavigation } from './home-navigation.component';
import { enableScreens } from 'react-native-screens';
import { AuthNavigatorComponent } from './auth.component';
import { withSharedWrapper } from '../global';

enableScreens();

const WrappedAuth = withSharedWrapper(AuthNavigatorComponent, 'Auth');

const ApplicationStack = createStackNavigator<ApplicationStackParamsList>();

export const ApplicationNavigation: React.FC = () => {
	return (
		<ApplicationStack.Navigator mode={'modal'} headerMode={'none'}>
			<ApplicationStack.Screen name={'Home'} component={HomeNavigation} />
			<ApplicationStack.Screen name={'Auth'} component={WrappedAuth} />
		</ApplicationStack.Navigator>
	);
};
