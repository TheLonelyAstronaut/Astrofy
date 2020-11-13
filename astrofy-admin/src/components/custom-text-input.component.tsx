import React from 'react';
import { TextField } from '@material-ui/core';
import './custom-text-input.css';
import { makeStyles } from '@material-ui/core/styles';

export interface CustomTextInputProps {
	placeholder: string;
	isHidden?: boolean;
	value: string;
	onChangeText: (text: string) => void;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = (props: CustomTextInputProps) => {
	const textInput = React.useRef<typeof TextField>();
	const styles = useStyles();

	React.useEffect(() => {
		if(!props.value) {
			(textInput.current as any).value = '';
		}
	}, [props.value, textInput])

	return (
		<TextField
			label={props.placeholder}
			value={props.value}
			inputRef={textInput}
			required={true}
			onChange={(data: any) => props.onChangeText(data.target.value)}
			InputLabelProps={{
				style: {
					color: '#ecf0f1',
					fontWeight: 500
				}
			}}
			inputProps={{
				style: {
					color: '#ecf0f1',
					fontWeight: 500
				}
			}}
			classes={{
				...styles
			}}
			type={props.isHidden ? 'password' : 'none'}
		/>
	)
}

const useStyles = makeStyles({
	root: {
		'& label.Mui-focused': {
			color: '#ecf0f1',
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: '#bdc3c7',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#ecf0f1',
		},
		'& :hover': {
			'& .MuiInput-underline': {
				borderBottomColor: '#95a5a6',
			},
		},
		width: '60%',
		alignSelf: 'center',
		marginTop: '12px'
	},
})
