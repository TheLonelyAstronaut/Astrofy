import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationStack } from '../types/navigation';
import { AuthScreen } from '../screens/auth.component';
import { useSelector } from "react-redux";
import { getAuthToken} from "../store/selectors/auth-selectors";
import { MainStackComponent } from './main-navigator.component';

const AppStack = createStackNavigator<ApplicationStack>();

export const AppStackComponent: React.FC = () => {
	const token = useSelector(getAuthToken);

	return (
		<AppStack.Navigator headerMode={'none'}>
			{
				token ? (
					<AppStack.Screen name={'Main'} component={MainStackComponent}/>
				) : (
					<AppStack.Screen name={'Auth'} component={AuthScreen}/>
				)
			}
		</AppStack.Navigator>
	)
}
