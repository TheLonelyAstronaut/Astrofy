import React from 'react';
import { Card, CardContent } from '@material-ui/core';

interface CustomCardProps {
	children: React.ClassicElement<any>[];
}

export const CustomCard: React.FC<CustomCardProps> = (props: CustomCardProps) => {
	return (
		<Card>
			<CardContent>
				{props.children}
			</CardContent>
		</Card>
	)
}
