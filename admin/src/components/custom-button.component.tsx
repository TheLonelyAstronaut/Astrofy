import React from 'react';
import {
	Button
} from 'react-native-paper';

export interface CustomButtonProps {
	label: string;
	onPress: () => void;
	loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = (props: CustomButtonProps) => {
	return (
		<Button
			mode={'outlined'}
			color={'#34495e'}
			style={{
				marginTop: 20,
				borderColor: '#34495e',
				borderWidth: 2,
				marginHorizontal: 10,
			}}
			loading={props.loading}
			onPress={props.onPress}
		>
			{props.label}
		</Button>
	)
}
