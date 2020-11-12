import React from 'react';
import {
	useParams
} from "react-router-dom";

interface Props {
	match: {
		params: {
			itemID: number
		}
	};
}

export const EditItem: React.FC<Props> = (props: Props) => {

	console.log(props.match.params.itemID);

	return (
		<div/>
	)
}
