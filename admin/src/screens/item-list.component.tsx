import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Button, Paragraph, Dialog, Portal, ActivityIndicator } from 'react-native-paper';

import { CustomButton } from "../components/custom-button.component";
import { ItemListNavigationParamsType } from '../../../astrofy-admin/src/types/navigation';

import { mockGetItems } from "../api/mocks";
import * as DataTypes from '../../../astrofy-admin/src/types/types';
import { CustomItemCard } from "../components/custom-item-card.component";

interface Props {
	navigation: ItemListNavigationParamsType
}

export const ItemList: React.FC<Props> = (props: Props) => {
	const [ isDialogVisible, setIsDialogVisible ] = React.useState(false);
	const [ isDataLoading, setIsDataLoading ] = React.useState(false)

	const handleSetCategory = () => {
		setIsDialogVisible(false);
	}

	const handleAddItem = () => {
		props.navigation.navigate('AddItem');
	}

	const handleLoadData = () => {
		setIsDataLoading(true);
	}

	return (
		<View style={styles.container}>
			<View style={styles.listHolder}>
				<FlatList
					data={mockGetItems}
					style={{ height: 300 }}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					//onEndReached={() => alert('HERE')}
					renderItem={({ item }) => (
						<CustomItemCard item={item}/>
					)}
				/>
			</View>
			<TouchableOpacity style={[styles.filter, styles.defaultShadow]} onPress={() => setIsDialogVisible(true)}>
				<Image source={require('../assets/filter.png')} style={styles.filterImage}/>
			</TouchableOpacity>
			<TouchableOpacity style={[styles.addItem, styles.defaultShadow]} onPress={handleAddItem}>
				<Image source={require('../assets/file.png')} style={[styles.filterImage, { marginLeft: 5 }]}/>
			</TouchableOpacity>
			{
				isDataLoading && (
					<View style={[styles.indicatorHolder, styles.defaultShadow]}>
						<ActivityIndicator size={25} color={'#2c3e50'}/>
					</View>
				)
			}
			<Portal>
				<Dialog
					visible={isDialogVisible}
					onDismiss={() => setIsDialogVisible(false)}
					style={styles.dialogStyle}
				>
					<Dialog.Title style={{ color: '#2c3e50' }}>
						Choose category
					</Dialog.Title>
					<Dialog.Actions>
						<CustomButton
							label={'Cancel'}
							onPress={() => setIsDialogVisible(false)}
						/>
						<CustomButton
							label={'Set'}
							onPress={handleSetCategory}
						/>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ecf0f1',
		alignItems: 'center'
	},
	listHolder: {
		flex: 1,
		maxWidth: '80%',
		width: 1000,
	},
	filter: {
		height: 70,
		width: 70,
		borderRadius: 35,
		position: 'absolute',
		bottom: 40,
		right: 40,
		backgroundColor: '#bdc3c7',
		justifyContent: 'center',
		alignItems: 'center'
	},
	filterImage: {
		height: 35,
		width: 35
	},
	dialogStyle: {
		maxWidth: '80%',
		width: 500,
		alignSelf: "center",
		backgroundColor: '#ecf0f1'
	},
	indicatorHolder: {
		height: 50,
		width: 50,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		alignSelf: "center",
		top: 20,
		backgroundColor: '#bdc3c7'
	},
	defaultShadow: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 2,
			height: 4
		},
		shadowRadius: 4,
		shadowOpacity: 0.1
	}
})
