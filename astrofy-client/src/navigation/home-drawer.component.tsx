import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrawerParamsList } from '../types/navigation';
import { ProductListScreen } from '../screens/product-list-screen.component';

const HomeDrawer = createDrawerNavigator<HomeDrawerParamsList>();

export const HomeDrawerNavigation: React.FC = () => {
	return (
		<HomeDrawer.Navigator
			drawerType={'back'}
			screenOptions={{ headerShown: false }}>
			<HomeDrawer.Screen name={'ProductList'} component={ProductListScreen} />
		</HomeDrawer.Navigator>
	);
};
