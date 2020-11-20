import React from 'react';
import DefaultTheme from '../theme';
import { OutlinedTextField } from 'react-native-material-textfield';
import { View } from 'react-native';

interface Props {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	secureTextEntry?: boolean;
}

export const CustomTextInput: React.FC<Props> = (props: Props) => {
	return (
		<>
			<OutlinedTextField
				label={props.label}
				lineWidth={1.5}
				value={props.value}
				onChangeText={props.onChangeText}
				secureTextEntry={props.secureTextEntry}
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
			<View style={{ height: 15 }} />
		</>
	);
};
