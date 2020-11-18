import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import React from 'react';

export const HEADER_HEIGHT = 160;
export const TABS_MARGIN = 80;
export const TABS_HEADER_HEIGHT = 60;
export const COLLAPSED_HEADER_HEIGHT = 40;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const STATUS_BAR = getStatusBarHeight();
export const SEARCH_WIDTH = Dimensions.get('window').width - 70;
export const SEARCH_HEIGHT = 65;
export const SEARCH_CIRCLE_SIZE = 40;
export const SEARCH_CIRCLE_DELTA = {
	VERTICAL: -70,
	HORIZONTAL: Dimensions.get('window').width - 150
};
export const SEARCH_ICON = 35;
export const SEARCH_WRAPPER_HORIZONTAL_PADDING = 20;
export const FLOATING_GROUP_HEIGHT = 110;

export const convertToByn = (usd: number) => {
	return (usd * 2.56).toFixed(2);
};

export const resizeSVG = (height: number, width: number) => {
	return {
		height: (height / 896) * SCREEN_HEIGHT,
		width: (width / 414) * SCREEN_WIDTH
	};
};

export const withSharedWrapper = (screen: React.FC, name: string) => {
	const SharedWrapper = createSharedElementStackNavigator();

	return () => (
		<SharedWrapper.Navigator headerMode={'none'}>
			<SharedWrapper.Screen component={screen} name={name + 'Wrapper'} />
		</SharedWrapper.Navigator>
	);
};
