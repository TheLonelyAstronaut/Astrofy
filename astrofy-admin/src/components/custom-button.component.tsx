import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import './custom-button.css';

export interface CustomButtonProps {
	label: string;
	onPress: () => void;
	loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = (props: CustomButtonProps) => {
	return (
		<Button
			disabled={props.loading}
			variant={'contained'}
			onClick={props.onPress}
			color={'secondary'}
			classes={{
				root: 'custom-button'
			}}
		>
			{
				props.loading ? (
					<CircularProgress size={24}/>
				) : (
					props.label
				)
			}
		</Button>
	)
}
