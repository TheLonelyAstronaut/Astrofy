import { StackNavigationProp } from '@react-navigation/stack';

export type ApplicationStack = {
	Auth: undefined;
	Main: undefined;
}

export type MainStack = {
	ItemList: undefined;
	AddItem: undefined;
	EditItem: undefined;
}

export type ItemListNavigationParamsType = StackNavigationProp<MainStack>;
