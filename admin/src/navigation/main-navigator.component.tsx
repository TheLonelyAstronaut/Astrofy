import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStack as MainStackParams } from '../types/navigation';
import { ItemList } from '../screens/item-list.component';
import { CustomHeader } from '../components/custom-header.component';
import { AddItem} from "../screens/add-item.component";
import { EditItem} from "../screens/edit-item.component";

const MainStack = createStackNavigator<MainStackParams>();

export const MainStackComponent: React.FC = () => {
	return (
		<MainStack.Navigator screenOptions={{ header: () => <CustomHeader/>}} initialRouteName={'AddItem'}>
			<MainStack.Screen name={'ItemList'} component={ItemList}/>
			<MainStack.Screen name={'AddItem'} component={AddItem}/>
			<MainStack.Screen name={'EditItem'} component={EditItem}/>
		</MainStack.Navigator>
	)
}
