import React from 'react';
import {
	View,
	ScrollView,
	KeyboardAvoidingView,
	Image,
	Pressable,
	StyleSheet,
	Text
} from 'react-native';
import DefaultTheme from '../theme';
import { OutlinedTextField } from 'react-native-material-textfield';
import { STATUS_BAR } from '../global';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

export const Login: React.FC = () => {
	const navigation = useNavigation();

	return (
		<KeyboardAvoidingView style={styles.container} behavior={'padding'}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				bounces={false}
				style={{ flexGrow: 1, width: '100%' }}
				contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
				<Pressable
					style={{
						position: 'absolute',
						height: 15,
						width: 15,
						marginTop: STATUS_BAR + 10,
						right: 35
					}}
					onPress={() => {
						// @ts-ignore
						navigation.popToTop();
					}}>
					<Image
						source={require('../assets/close.png')}
						style={{ height: 15, width: 15 }}
					/>
				</Pressable>
				<SharedElement id={'logo'}>
					<Image source={require('../assets/logo.png')} style={styles.logo} />
				</SharedElement>
				<View style={styles.fieldsHolder}>
					<Text
						style={{
							color: DefaultTheme.DARK_PRIMARY,
							fontFamily: DefaultTheme.fonts.bold,
							fontSize: 18
						}}>
						Login to Astrofy
					</Text>
					<View style={{ width: '80%', marginTop: 30, marginBottom: 30 }}>
						<OutlinedTextField
							label={'Login'}
							lineWidth={1.5}
							labelTextStyle={{
								color: DefaultTheme.DARK_PRIMARY,
								fontFamily: DefaultTheme.fonts.bold
							}}
							style={{
								fontFamily: DefaultTheme.fonts.bold,
								color: DefaultTheme.DARK_PRIMARY
							}}
							tintColor={DefaultTheme.DARK_PRIMARY}
							baseColor={DefaultTheme.PRIMARY_BACKGROUND}
						/>
						<View style={{ height: 20 }} />
						<OutlinedTextField
							label={'Password'}
							lineWidth={1.5}
							labelTextStyle={{
								color: DefaultTheme.DARK_PRIMARY,
								fontFamily: DefaultTheme.fonts.bold
							}}
							style={{
								fontFamily: DefaultTheme.fonts.bold,
								color: DefaultTheme.DARK_PRIMARY
							}}
							tintColor={DefaultTheme.DARK_PRIMARY}
							baseColor={DefaultTheme.PRIMARY_BACKGROUND}
						/>
					</View>
					<View style={{ flex: 1 }} />
					<Pressable
						style={{
							width: '80%',
							height: 50,
							backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
							borderRadius: 15,
							marginBottom: 15,
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Text
							style={{
								color: 'white',
								fontFamily: DefaultTheme.fonts.bold,
								fontSize: 16
							}}>
							Login
						</Text>
					</Pressable>
					<Pressable
						style={{
							width: '80%',
							height: 50,
							backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
							borderRadius: 15,
							marginBottom: 30,
							justifyContent: 'center',
							alignItems: 'center'
						}}
						onPress={() => navigation.navigate('Register')}>
						<Text
							style={{
								color: 'white',
								fontFamily: DefaultTheme.fonts.bold,
								fontSize: 16
							}}>
							Dont have an account? Sign Up!
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		alignItems: 'center'
	},
	logo: {
		height: 150,
		width: 150,
		marginBottom: 30,
		marginTop: 130
	},
	fieldsHolder: {
		flex: 1,
		backgroundColor: 'white',
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		width: '100%',
		alignItems: 'center',
		paddingTop: 30
	}
});
