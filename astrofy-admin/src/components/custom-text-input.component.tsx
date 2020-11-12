import React from 'react';
import { TextField } from '@material-ui/core';
import './custom-text-input.css';

export interface CustomTextInputProps {
	placeholder: string;
	isHidden?: boolean;
	value: string;
	onChangeText: (text: string) => void
}

export const CustomTextInput: React.FC<CustomTextInputProps> = (props: CustomTextInputProps) => {
	return (
		<TextField
			label={props.placeholder}
			value={props.value}
			onChange={(data: any) => props.onChangeText(data.target.value)}
			classes={{
				root: 'custom-text-input-root'
			}}
			type={props.isHidden ? 'password' : 'none'}
		/>
	)
}
