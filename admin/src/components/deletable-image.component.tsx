import React from 'react';
import {TouchableOpacity, Image, ImageBackground} from 'react-native';
import { Photo } from "../../../astrofy-admin/src/types/types";

interface Props {
	item: Photo,
	onDelete: (() => void) | null;
}

export const DeletableImage: React.FC<Props> = (props: Props) => {
	return (
		<ImageBackground source={{ uri: props.item.url }} style={{
			width: 188,
			height: 188,
			marginHorizontal: '5%',
			marginVertical: 5,
			alignItems: "flex-end"
		}}>
			{
				props.onDelete && (
					<TouchableOpacity onPress={props.onDelete}>
						<Image style={{
							height: 20,
							width: 20,
							marginVertical: 10,
							marginHorizontal: 10
						}} source={require('../assets/delete-button.png')}/>
					</TouchableOpacity>
				)
			}
		</ImageBackground>
	)
}
