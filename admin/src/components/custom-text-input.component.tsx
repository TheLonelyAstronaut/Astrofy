import React from "react";
import {
	TextInput
} from 'react-native-paper';
import {Platform} from "react-native";
import '../root.css';

export interface CustomTextInputProps {
	placeholder: string;
	isHidden?: boolean;
	value: string;
	onChangeText: (text: string) => void
}

export const CustomTextInput: React.FC<CustomTextInputProps> = (props: CustomTextInputProps) => {
	return (
		<div className={'disable-outline input-handler'}>
			<TextInput
				style={{
					backgroundColor: 'transparent',
					width: '100%',
					marginBottom: 20,
					fontWeight: '500',
					fontSize: 16
				}}
				placeholder={props.placeholder}
				underlineColor={'#34495e'}
				mode={'flat'}
				value={props.value}
				onChangeText={props.onChangeText}
				secureTextEntry={props.isHidden}
				placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
				theme={{ colors: { text: '#2c3e50', primary: '#2c3e50' } }}
			/>
		</div>
	)
}
