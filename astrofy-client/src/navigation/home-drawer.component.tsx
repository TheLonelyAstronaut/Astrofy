import React from 'react';
import {
	createDrawerNavigator,
	DrawerContentComponentProps
} from '@react-navigation/drawer';
import { HomeDrawerParamsList } from '../types/navigation';
import { ProductListScreen } from '../screens/product-list-screen.component';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Pressable
} from 'react-native';
import DefaultTheme from '../theme';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Cart } from '../screens/cart.component';
import { Profile } from '../screens/profile.component';
import { Bookmarks } from '../screens/bookmarks.component';
// @ts-ignore
import FirstTriangle from '../assets/svg/triangle1';
// @ts-ignore
import SecondTriangle from '../assets/svg/triangle2';
// @ts-ignore
import ThirdTriangle from '../assets/svg/triangle3';
// @ts-ignore
import ForthTriangle from '../assets/svg/triangle4';
import { getUserObject } from '../store/selectors/auth-selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AUTH_LOGOUT } from '../store/actions/auth-actions';

const HomeDrawer = createDrawerNavigator<HomeDrawerParamsList>();
const BookmarksWrapper = createSharedElementStackNavigator();
const CartWrapper = createSharedElementStackNavigator();

const CartWrapperComponent: React.FC = () => {
	return (
		<CartWrapper.Navigator headerMode={'none'}>
			<CartWrapper.Screen name={'CartWrapper'} component={Cart} />
		</CartWrapper.Navigator>
	);
};

const BookmarksWrapperComponent: React.FC = () => {
	return (
		<BookmarksWrapper.Navigator headerMode={'none'}>
			<BookmarksWrapper.Screen
				name={'BookmarksWrapper'}
				component={Bookmarks}
			/>
		</BookmarksWrapper.Navigator>
	);
};

export const HomeDrawerNavigation: React.FC = () => {
	return (
		<HomeDrawer.Navigator
			drawerContent={(props) => <CustomDrawer {...props} />}
			drawerType={'back'}
			drawerStyle={{ width: 257 }}
			screenOptions={{ headerShown: false }}>
			<HomeDrawer.Screen name={'ProductList'} component={ProductListScreen} />
			<HomeDrawer.Screen name={'Profile'} component={Profile} />
			<HomeDrawer.Screen
				name={'Bookmarks'}
				component={BookmarksWrapperComponent}
			/>
			<HomeDrawer.Screen name={'Cart'} component={CartWrapperComponent} />
		</HomeDrawer.Navigator>
	);
};

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
	const user = useSelector(getUserObject);
	const dispatch = useDispatch();

	return (
		<ScrollView
			bounces={false}
			style={styles.container}
			contentContainerStyle={{ flexGrow: 1 }}>
			<View
				style={{
					position: 'absolute',
					height: 160,
					width: '100%',
					zIndex: 0,
					bottom: 0
				}}>
				<ThirdTriangle
					width={195}
					height={156.5}
					style={{ position: 'absolute', right: 0, bottom: 0 }}
				/>
				<ForthTriangle
					width={141}
					height={92}
					style={{ position: 'absolute', bottom: 0 }}
				/>
			</View>
			<View style={styles.header}>
				<View style={{ position: 'absolute', height: '100%', width: '100%' }}>
					<FirstTriangle
						width={189}
						height={126}
						style={{ position: 'absolute', right: 0 }}
					/>
					<SecondTriangle
						width={158}
						height={158}
						style={{ position: 'absolute', right: 0, bottom: 0 }}
					/>
				</View>
				<View style={styles.info}>
					<Image
						source={require('../assets/avatar.jpg')}
						style={styles.avatar}
					/>
					<Text style={styles.name}>
						{user.username ? user.username : 'Signed out'}
					</Text>
					<Text style={styles.email}>
						{user.email ? user.email : 'Login first?'}
					</Text>
				</View>
			</View>
			<Pressable
				style={[styles.button, props.state.index === 0 ? styles.active : {}]}
				onPress={() => props.navigation.navigate('ProductList')}>
				<Image
					source={require('../assets/list.png')}
					style={styles.buttonImage}
				/>
				<Text style={styles.buttonText}>Product List</Text>
			</Pressable>
			<Pressable
				style={[styles.button, props.state.index === 1 ? styles.active : {}]}
				onPress={() => props.navigation.navigate('Profile')}>
				<Image
					source={require('../assets/user.png')}
					style={styles.buttonImage}
				/>
				<Text style={styles.buttonText}>Profile</Text>
			</Pressable>
			<Pressable
				style={[styles.button, props.state.index === 2 ? styles.active : {}]}
				onPress={() => props.navigation.navigate('Bookmarks')}>
				<Image
					source={require('../assets/bookmark.png')}
					style={styles.buttonImage}
				/>
				<Text style={styles.buttonText}>Bookmarks</Text>
			</Pressable>
			<Pressable
				style={[styles.button, props.state.index === 3 ? styles.active : {}]}
				onPress={() =>
					props.navigation.navigate(user.username ? 'Cart' : 'Auth')
				}>
				<Image
					source={require('../assets/cart.png')}
					style={styles.buttonImage}
				/>
				<Text style={styles.buttonText}>Cart</Text>
			</Pressable>
			<Pressable
				style={[styles.button, props.state.index === 4 ? styles.active : {}]}
				onPress={() => {
					props.navigation.closeDrawer();
					user.username
						? dispatch(AUTH_LOGOUT())
						: props.navigation.navigate('Auth');
				}}>
				<Image
					source={require('../assets/settings.png')}
					style={styles.buttonImage}
				/>
				<Text style={styles.buttonText}>
					{user.username ? 'Logout' : 'Login'}
				</Text>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		width: 257
	},
	header: {
		height: 220,
		backgroundColor: DefaultTheme.DARK_PRIMARY
	},
	info: {
		marginTop: 70,
		marginLeft: 20
	},
	avatar: {
		height: 80,
		width: 80,
		borderRadius: 40,
		resizeMode: 'cover'
	},
	name: {
		fontFamily: DefaultTheme.fonts.bold,
		color: 'white',
		fontSize: 16,
		marginTop: 6
	},
	email: {
		fontFamily: DefaultTheme.fonts.bold,
		color: 'white',
		fontSize: 13,
		marginTop: 3,
		opacity: 0.5
	},
	button: {
		flexDirection: 'row',
		height: 50,
		paddingHorizontal: 23,
		alignItems: 'center'
	},
	buttonImage: {
		width: 23,
		height: 23,
		resizeMode: 'contain'
	},
	buttonText: {
		marginLeft: 10,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 16,
		color: 'white'
	},
	active: {
		backgroundColor: DefaultTheme.DARK_PRIMARY
	}
});
