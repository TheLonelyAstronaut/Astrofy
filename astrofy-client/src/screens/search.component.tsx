import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Image, Text } from 'react-native';
import DefaultTheme from '../theme';
import { SharedElement } from 'react-navigation-shared-element';
import { mockGetItems } from '../api/mock-api';
import Animated from 'react-native-reanimated';
import {
	COLLAPSED_HEADER_HEIGHT,
	SEARCH_ICON,
	SEARCH_WRAPPER_HORIZONTAL_PADDING,
	STATUS_BAR
} from '../global';
import { CustomItem } from '../components/custom-item.component';
import { useNavigation } from '@react-navigation/native';

// @ts-ignore
export const Search: React.FC = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={{ height: STATUS_BAR }} />
			<View
				style={{
					height: COLLAPSED_HEADER_HEIGHT,
					alignItems: 'center',
					flexDirection: 'row',
					paddingHorizontal: 35
				}}>
				<Pressable
					style={{ marginRight: SEARCH_WRAPPER_HORIZONTAL_PADDING / 2 }}
					onPress={() => navigation.goBack()}>
					<Image
						source={require('../assets/back.png')}
						style={{ width: 28, height: 28, resizeMode: 'contain' }}
					/>
				</Pressable>
				<Text style={styles.title}>Search</Text>
			</View>
			<View style={[styles.textInputWrapper]}>
				<Animated.Image
					source={require('../assets/search.png')}
					style={[styles.searchLogo]}
				/>
				<Animated.Text
					style={{
						fontFamily: DefaultTheme.fonts.bold,
						color: 'white',
						fontSize: 18,
						marginLeft: 15
					}}>
					Search...
				</Animated.Text>
			</View>
			<View
				style={{
					flex: 1,
					backgroundColor: 'white',
					marginTop: (STATUS_BAR * 2) / 3,
					borderRadius: 30
				}}>
				<FlatList
					data={mockGetItems}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingTop: 70 }}
					keyExtractor={(item) => '' + item.id}
					renderItem={({ item }) => (
						<CustomItem item={item} additionalID={4000} />
					)}
				/>
			</View>
		</View>
	);
};

// @ts-ignore
Search.sharedElements = () => {
	return [];
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND
	},
	textInputWrapper: {
		borderRadius: 20,
		marginTop: 30,
		height: 65,
		backgroundColor: DefaultTheme.SECONDARY_BACKGROUND,
		paddingLeft: SEARCH_WRAPPER_HORIZONTAL_PADDING,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		elevation: 4,
		shadowOpacity: 0.1,
		shadowOffset: { height: 2, width: 1 },
		shadowColor: '#000000',
		shadowRadius: 3,
		marginHorizontal: 35
	},
	searchLogo: {
		height: SEARCH_ICON,
		width: SEARCH_ICON,
		resizeMode: 'contain'
	},
	title: {
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 26,
		color: 'white'
	}
});
