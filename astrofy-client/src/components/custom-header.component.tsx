import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { COLLAPSED_HEADER_HEIGHT, STATUS_BAR } from '../global';
import DefaultTheme from '../theme';
import { useNavigation } from '@react-navigation/native';

interface Props {
	label: string;
};

export const CustomHeader: React.FC<Props> = (props: Props) => {
	const navigation = useNavigation();

	return (
		<>
			<View
				style={{
					height: STATUS_BAR,
					backgroundColor: DefaultTheme.PRIMARY_BACKGROUND
				}}
			/>
			<View
				style={{
					height: COLLAPSED_HEADER_HEIGHT,
					backgroundColor: DefaultTheme.PRIMARY_BACKGROUND,
					justifyContent: 'space-between',
					flexDirection: 'row',
					alignItems: 'center'
				}}>
				<Text
					style={{
						fontFamily: DefaultTheme.fonts.bold,
						fontSize: 26,
						color: 'white',
						marginLeft: 35
					}}>
					{props.label}
				</Text>
				<Pressable
					onPress={() => {
						// @ts-ignore
						navigation.openDrawer();
					}}>
					<Image
						source={require('../assets/openDrawer.png')}
						style={{
							height: 26,
							width: 26,
							resizeMode: 'contain',
							marginRight: 35
						}}
					/>
				</Pressable>
			</View>
		</>
	);
};
