import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CustomButton} from "./custom-button.component";
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "../store/actions/auth-actions";

export const CustomHeader: React.FC = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(AUTH_LOGOUT());
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.logoHolder}>
				<Image source={require('../assets/chip_resized.png')} style={styles.logo}/>
				<Text style={styles.title}>Astrofy Admin Panel</Text>
			</TouchableOpacity>
			<View style={styles.buttonHolder}>
				<CustomButton
					label={'Logout'}
					onPress={handleLogout}
					loading={false}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 70,
		backgroundColor: '#bdc3c7',
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 4
		},
		shadowRadius: 4,
		shadowOpacity: 0.1,
		alignItems: 'center',
		justifyContent: "space-between",
		flexDirection: "row"
	},
	logoHolder: {
		height: 70,
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 30
	},
	logo: {
		height: 50,
		width: 50,
		marginRight: 10
	},
	title: {
		fontWeight: '500',
		fontSize: 16
	},
	buttonHolder: {
		height: 70,
		marginRight: 20
	}
})
