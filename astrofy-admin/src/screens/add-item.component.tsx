import React from "react";
import { Photo } from "../types/types";
import { uploadImage as uploadImageToServer } from "../api/networkWorker";
import { makeStyles } from '@material-ui/core/styles';
import { history } from "../store/store";

export const AddItem: React.FC = () => {
	const [ photos, setPhotos ] = React.useState<Photo[]>([]);
	const [ photosFiles, setPhotosFiles ] = React.useState<File[]>([]);
	const [ uploadedPhotos, setUploadedPhotos ] = React.useState<number[]>([]);
	const [ isLoading, setIsLoading ] = React.useState(false);
	const styles = useStyles();

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

	return (
		<div className={styles.container}>
			<div className={styles.safeArea}>

			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		height: '100%',
		display: 'flex'
	},
	safeArea: {
		marginTop: 70,
		flexGrow: 1,
		display: 'flex',
		flex: 1
	}
}));
