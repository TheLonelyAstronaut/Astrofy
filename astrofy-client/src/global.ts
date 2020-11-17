import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const HEADER_HEIGHT = 160;
export const TABS_MARGIN = 80;
export const TABS_HEADER_HEIGHT = 60;
export const COLLAPSED_HEADER_HEIGHT = 40;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
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
