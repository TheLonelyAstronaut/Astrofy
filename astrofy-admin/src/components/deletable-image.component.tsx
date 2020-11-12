import React from 'react';
import { Photo } from "../types/types";

interface Props {
	item: Photo,
	onDelete: (() => void) | null;
}

export const DeletableImage: React.FC<Props> = (props: Props) => {
	return (
		<div style={{
			width: 188,
			height: 188,
			alignItems: "flex-end",
			backgroundImage: 'url()'
		}}>
			{
				props.onDelete && (
					<div onClick={props.onDelete}>
						<img style={{
							height: 20,
							width: 20,
						}} src={'/assets/delete-button.png'}/>
					</div>
				)
			}
		</div>
	)
}
