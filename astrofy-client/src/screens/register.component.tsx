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
import { STATUS_BAR } from '../global';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { CustomTextInput } from '../components/custom-text-input.component';

// @ts-ignore
export const Register: React.FC = () => {
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
						navigation.navigate('Home');
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
						Register in Astrofy
					</Text>
					<View style={{ width: '80%', marginTop: 30, marginBottom: 30 }}>
						<CustomTextInput label={'Login'} />
						<CustomTextInput label={'Email'} />
						<CustomTextInput label={'Password'} />
						<CustomTextInput label={'Repeat password'} />
						<CustomTextInput label={'Address'} />
						<CustomTextInput label={'Date of birth'} />
					</View>
					<View style={{ flex: 1 }} />
					<Pressable
						style={{
							width: '80%',
							height: 50,
							backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
							borderRadius: 15,
							marginBottom: 30,
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Text
							style={{
								color: 'white',
								fontFamily: DefaultTheme.fonts.bold,
								fontSize: 16
							}}>
							Register
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

// @ts-ignore
Register.sharedElements = () => {
	return ['logo'];
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
		alignItems: 'center'
	},
	logo: {
		height: 100,
		width: 100,
		marginBottom: 30,
		marginTop: 80
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
