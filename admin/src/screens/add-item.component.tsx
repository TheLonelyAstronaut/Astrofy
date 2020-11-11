import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ChangeItem } from "../components/change-item.component";
import {ItemsRedux} from "../types/redux";
import { Photo } from "../types/types";
import {uploadImage as uploadImageToServer} from "../api/networkWorker";

export const AddItem: React.FC = () => {
	const [ photos, setPhotos ] = React.useState<Photo[]>([]);
	const [ photosFiles, setPhotosFiles ] = React.useState<File[]>([]);
	const [ uploadedPhotos, setUploadedPhotos ] = React.useState<number[]>([]);
 	const [ isLoading, setIsLoading ] = React.useState(false);

	const handleAddPhoto = async (file: File) => {
		setPhotosFiles(state => [ ...state, file ])

		const reader = new FileReader();
		reader.onloadend = () => {
			setPhotos(state => [
				...state,
				{
					url: reader.result as string,
					id: Math.random() % 1000 + state.length
				}
			]);
		}

		reader.readAsDataURL(file);
	}

	const handleRemovePhoto = (_index: number) => {
		setPhotos(state => state.filter((item, index) => index != _index));
		setPhotosFiles(state => state.filter((item, index) => index != _index));
	}

	const uploadImage = async (photo: File): Promise<Photo> => {
		const result = await uploadImageToServer(photo);
		return result.data.uploadImage;
	}

	const addItem = () => {
		setIsLoading(true);

		photosFiles.map(async (item, index) => {
			const result = await uploadImage(item);
			setUploadedPhotos(state => {
				const newState = [...state];
				newState[index] = result.id;
				return newState;
			});
		})
	}

	React.useEffect(() => {
		if(uploadedPhotos.length && uploadedPhotos.length == photosFiles.length) {
			setIsLoading(false);
		}
	}, [uploadedPhotos])

	return (
		<View style={styles.container}>
			<ChangeItem
				onAddPhoto={handleAddPhoto}
				onRemovePhoto={handleRemovePhoto}
				photos={photos}
				onSave={addItem}
				isLoading={isLoading}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ecf0f1',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
