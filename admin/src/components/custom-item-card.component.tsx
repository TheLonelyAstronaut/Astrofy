import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as DataTypes from '../types/types';
import { useNavigation } from '@react-navigation/native';

interface Props {
	item: DataTypes.ItemOutputSchema
}

export const CustomItemCard: React.FC<Props> = ( props: Props ) => {
	const navigation = useNavigation();

	const handleEditItem = () => {
		navigation.navigate('EditItem');
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.card} onPress={handleEditItem}>
				<View style={styles.dataHolder}>
					<View style={styles.infoHolder}>
						<Text style={styles.itemModel}>{props.item.model}</Text>
						<Text style={styles.itemManufacturer}>By {props.item.manufacturer}</Text>
						<Text numberOfLines={3} style={styles.itemDescription}>{props.item.description}</Text>
						<Text style={styles.itemMinorInfo}>Quantity: {props.item.quantity}</Text>
						<Text style={styles.itemMinorInfo}>Cost: {props.item.cost} BYN</Text>
					</View>
					<Image source={require('../assets/laptop.png')} style={styles.itemPicture}/>
				</View>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 250,
		justifyContent: "flex-end",
		width: 500
	},
	card: {
		width: '90%',
		backgroundColor: '#bdc3c7',
		height: 200,
		alignSelf: "center",
		borderRadius: 40,
		marginVertical: 10,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 10,
		shadowOpacity: 0.1
	},
	dataHolder: {
		flex: 1,
		width: '98%',
		borderRadius: 40,
		backgroundColor: '#ecf0f1',
		flexDirection: 'row',
		paddingHorizontal: 20
	},
	itemPicture: {
		height: 220,
		width: 220,
		transform: [
			{
				translateY: -20
			}
		]
	},
	infoHolder: {
		flex: 1,
		paddingVertical: 30,
		paddingHorizontal: 10
	},
	itemModel: {
		fontWeight: '700',
		fontSize: 17,
		color: '#2c3e50'
	},
	itemManufacturer: {
		fontWeight: '700',
		fontSize: 14,
		color: '#34495e',
		opacity: 0.6,
		marginTop: 3
	},
	itemDescription: {
		marginTop: 5,
		color: '#34495e',
	},
	itemMinorInfo: {
		marginTop: 5,
		color: '#34495e',
		opacity: 0.6
	}
})
