import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { CustomTextInput } from '../components/custom-text-input.component';
import { CustomButton} from "../components/custom-button.component";

import { AUTH_LOGIN } from "../store/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { getIsUserFetching } from '../store/selectors/auth-selectors';

export const AuthScreen: React.FC = () => {
	const [ login, setLogin ] = React.useState("");
	const [ password, setPassword ] = React.useState("");
	const dispatch = useDispatch();
	const isLoading = useSelector(getIsUserFetching);

	const handleLogin = async () => {
		dispatch(AUTH_LOGIN.TRIGGER({
			username: login,
			password: password
		}));
	}

	return (
		<View style={styles.container}>
			<View style={styles.authHolder}>
				<Text style={styles.label}>Astrofy Admin Panel</Text>
				<Image source={require('../assets/chip_resized.png')} style={styles.logo}/>
				<CustomTextInput
					placeholder={'Login'}
					value={login}
					onChangeText={setLogin}
				/>
				<CustomTextInput
					placeholder={'Password'}
					isHidden
					value={password}
					onChangeText={setPassword}
				/>
				<CustomButton
					label={'Login'}
					onPress={handleLogin}
					loading={isLoading}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: '#ecf0f1'
	},
	authHolder: {
		backgroundColor: '#bdc3c7',
		height: '60%',
		maxWidth: '80%',
		width: 500,
		justifyContent: 'center',
		alignItems: "center",
		borderRadius: 30,
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 4
		},
		shadowRadius: 4,
		shadowOpacity: 0.1
	},
	label: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#2c3e50'
	},
	logo: {
		width: 150,
		height: 150,
		marginVertical: 30
	}
});
