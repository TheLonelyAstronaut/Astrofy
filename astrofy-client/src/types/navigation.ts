import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ItemOutputSchema } from './types';

export type ApplicationStackParamsList = {
	Home: undefined;
	Auth: undefined;
};

export type HomeStackParamsList = {
	HomeDrawer: undefined;
	ProductDescription: {
		item: ItemOutputSchema;
		additionalID?: number;
	};
	Search: undefined;
};

export type HomeDrawerParamsList = {
	ProductList: undefined;
	Profile: undefined;
	Bookmarks: undefined;
	Cart: undefined;
	Settings: undefined;
};

export type HomeDrawerNavigationProp = StackNavigationProp<
	HomeStackParamsList,
	'HomeDrawer'
>;

export type DescriptionRouteProp = RouteProp<
	HomeStackParamsList,
	'ProductDescription'
>;

export type DescriptionNavigationType = StackNavigationProp<
	HomeStackParamsList,
	'ProductDescription'
>;
