import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	Pressable,
	Platform
} from 'react-native';
import { ItemOutputSchema } from '../types/types';
import DefaultTheme from '../theme';
import { HomeDrawerNavigationProp } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

interface Props {
	item: ItemOutputSchema;
	additionalID?: number;
}

export const CustomItem: React.FC<Props> = (props: Props) => {
	const navigation = useNavigation<HomeDrawerNavigationProp>();

	const handlePressItem = () => {
		navigation.navigate('ProductDescription', {
			item: props.item,
			additionalID: props.additionalID
		});
	};

	return (
		<Pressable style={styles.container} onPress={handlePressItem}>
			<View style={styles.dataHolder}>
				<View style={styles.infoHolder}>
					<Text style={styles.model}>{props.item.model}</Text>
					<Text style={styles.manufacturer}>By {props.item.manufacturer}</Text>
					<Text style={styles.description} numberOfLines={4}>
						{props.item.description}
					</Text>
				</View>
				<SharedElement
					id={`item.${
						props.item.id + (props.additionalID ? props.additionalID : 0)
					}.photo`}
					style={styles.image}>
					<Image
						source={{ uri: props.item.photos[0].url }}
						style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
					/>
				</SharedElement>
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
		shadowRadius: 4,
		zIndex: 3
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
