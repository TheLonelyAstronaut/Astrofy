import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Login } from '../screens/login.component';
import { Register } from '../screens/register.component';
import { withSharedWrapper } from '../global';

const AuthNavigator = createSharedElementStackNavigator();
const WrappedLogin = withSharedWrapper(Login, 'Login');
const WrappedRegister = withSharedWrapper(Register, 'Register');

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

export const AuthNavigatorComponent: React.FC = () => (
	<AuthNavigator.Navigator headerMode={'none'}>
		<AuthNavigator.Screen component={WrappedLogin} name={'Login'} />
		<AuthNavigator.Screen
			component={WrappedRegister}
			name={'Register'}
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
	</AuthNavigator.Navigator>
);
