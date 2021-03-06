import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { CustomHeader } from '../components/custom-header.component';
import DefaultTheme from '../theme';
import Animated from 'react-native-reanimated';
import { convertToByn, FLOATING_GROUP_HEIGHT } from '../global';
import { CustomItem } from '../components/custom-item.component';
import { processPayment } from '../api/networkWorker';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { SET_CART } from '../store/actions/item-actions';

// @ts-ignore
import Swipeable from 'react-native-swipeable';
import { useSelector } from 'react-redux';
import { getCart } from '../store/selectors/item-selectors';
import BePaid from 'react-native-bepaid';

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
	const cart = useSelector(getCart);
	const dispatch = useDispatch();
	const price = React.useMemo(() => {
		let cost = 0;

		cart.forEach((item) => (cost += item.cost));

		return cost;
	}, [cart]);

	const handlePayment = React.useCallback(() => {
		BePaid.setAmount(price);
		BePaid.processPayment()
			.then(async (fromNative) => {
				if (fromNative.result === 'SUCCESS') {
					await processPayment();
					dispatch(SET_CART([]));

					showMessage({
						animated: true,
						duration: 2000,
						backgroundColor: DefaultTheme.DARK_PRIMARY,
						message: 'Payment Success',
						description: 'Wait for delivery :p'
					});
				} else {
					throw new Error(fromNative.error);
				}
			})
			.catch((error: Error) => {
				showMessage({
					animated: true,
					duration: 2000,
					backgroundColor: '#e74c3c',
					message: 'Payment Failed',
					description: error.message
				});
			});
	}, [price, dispatch]);

	return (
		<View style={styles.container}>
			<CustomHeader label={'Cart'} />
			<View style={styles.infoHolder}>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={{ zIndex: 1 }}
					contentContainerStyle={{
						paddingBottom: 30,
						paddingTop: 60,
						zIndex: 1
					}}
					data={cart}
					keyExtractor={(item) => '' + item.id}
					renderItem={({ item }) => (
						<Swipeable rightButtons={leftContent}>
							<CustomItem item={item} key={item.id} additionalID={1000} />
						</Swipeable>
					)}
				/>
				<Animated.View style={[styles.floatingGroup]}>
					<Animated.Text style={styles.price}>
						{price + '$\n'}
						<Animated.Text style={{ opacity: 0.5, fontSize: 18 }}>
							{convertToByn(price)} BYN
						</Animated.Text>
					</Animated.Text>
					<Pressable style={styles.button} onPress={handlePayment}>
						<Animated.Text style={[styles.price, { fontSize: 18 }]}>
							Buy
						</Animated.Text>
					</Pressable>
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
