import React from 'react';
import { Photo } from "../types/types";

interface Props {
	item: Photo,
	onDelete: (() => void) | null;
}

export const DeletableImage: React.FC<Props> = (props: Props) => {
	return (
		<div style={{
			width: 250,
			height: 250,
			display: 'flex',
			flexDirection: 'column',
			alignItems: "flex-end",
			backgroundImage: `url(${props.item.url})`,
			backgroundSize: 'contain',
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat',
			marginRight: 10,
			marginLeft: 10,
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
