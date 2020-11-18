import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { CustomHeader } from '../components/custom-header.component';
import DefaultTheme from '../theme';
import Animated from 'react-native-reanimated';
import { convertToByn, FLOATING_GROUP_HEIGHT } from '../global';
import { mockGetItems } from '../api/mock-api';
import { CustomItem } from '../components/custom-item.component';
// @ts-ignore
import Swipeable from 'react-native-swipeable';

const leftContent = [
	<Text
		style={{
			color: DefaultTheme.DARK_PRIMARY,
			fontFamily: DefaultTheme.fonts.bold,
			marginTop: 35
		}}>
		Remove
	</Text>
];

export const Cart: React.FC = () => {
	return (
		<View style={styles.container}>
			<CustomHeader label={'Cart'} />
			<View style={styles.infoHolder}>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={{ paddingTop: 70 }}
					contentContainerStyle={{ paddingBottom: 30 }}
					data={mockGetItems}
					keyExtractor={(item) => '' + item.id}
					renderItem={({ item }) => (
						<Swipeable rightButtons={leftContent}>
							<CustomItem item={item} key={item.id} additionalID={1000} />
						</Swipeable>
					)}
				/>
				<Animated.View style={[styles.floatingGroup]}>
					<Animated.Text style={styles.price}>
						228 ${'\n'}
						<Animated.Text style={{ opacity: 0.5, fontSize: 18 }}>
							{convertToByn(228)} BYN
						</Animated.Text>
					</Animated.Text>
					<Animated.View style={styles.button}>
						<Animated.Text style={[styles.price, { fontSize: 18 }]}>
							Buy
						</Animated.Text>
					</Animated.View>
				</Animated.View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND
	},
	infoHolder: {
		flex: 1,
		backgroundColor: 'white',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginTop: 20
	},
	floatingGroup: {
		height: FLOATING_GROUP_HEIGHT,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 35
	},
	price: {
		fontSize: 20,
		fontFamily: DefaultTheme.fonts.bold,
		color: 'white'
	},
	button: {
		backgroundColor: DefaultTheme.DARK_PRIMARY,
		paddingHorizontal: 35,
		paddingVertical: 16,
		borderRadius: 15
	}
});
