import React from 'react';
import {View, Text, Image, StyleSheet, Pressable, Platform} from 'react-native';
import { ItemOutputSchema } from '../types/types';
import DefaultTheme from '../theme';

interface Props {
	item: ItemOutputSchema;
}

export const CustomItem: React.FC<Props> = (props: Props) => {
	return (
		<Pressable style={styles.container}>
			<View style={styles.dataHolder}>
				<View style={styles.infoHolder}>
					<Text style={styles.model}>{props.item.model}</Text>
					<Text style={styles.manufacturer}>By {props.item.manufacturer}</Text>
					<Text style={styles.description} numberOfLines={4}>{props.item.description}</Text>
				</View>
				<Image source={require('../assets/laptop.png')} style={styles.image} />
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '80%',
		height: 140,
		backgroundColor: DefaultTheme.LIGHT_PRIMARY,
		alignSelf: 'center',
		marginBottom: 35,
		borderRadius: 40,
		transform: [{ translateY: -30 }],
		elevation: 4,
		shadowOpacity: 0.2,
		shadowOffset: { height: 1, width: 1 },
		shadowColor: '#000000',
		shadowRadius: 4
	},
	dataHolder: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		width: '98%',
		borderRadius: 40,
		paddingLeft: 25,
		paddingTop: Platform.OS === 'ios' ? 20 : 15
	},
	infoHolder: {
		flex: 1
	},
	image: {
		height: 170,
		width: '55%',
		resizeMode: 'contain',
		transform: [{ translateY: -45 }]
	},
	model: {
		color: DefaultTheme.DARK_PRIMARY,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 15
	},
	manufacturer: {
		color: DefaultTheme.DARK_PRIMARY,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 13,
		opacity: 0.5,
		lineHeight: 15
	},
	description: {
		color: DefaultTheme.PRIMARY_BACKGROUND,
		fontFamily: DefaultTheme.fonts.bold,
		fontSize: 13,
		opacity: 0.5,
		marginTop: 5
	}
});
