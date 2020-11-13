import React from "react";
import { Photo, ItemInputSchema } from "../types/types";
import { uploadImage as uploadImageToServer } from "../api/networkWorker";
import { makeStyles } from '@material-ui/core/styles';
import { ChangeItem } from '../components/change-item.component';
import * as ACTIONS from '../store/actions/item-actions';
import { useDispatch } from "react-redux";

export const AddItem: React.FC = () => {
	const [ photos, setPhotos ] = React.useState<Photo[]>([]);
	const [ photosFiles, setPhotosFiles ] = React.useState<File[]>([]);
	const [ uploadedPhotos, setUploadedPhotos ] = React.useState<number[]>([]);
	const [ creatableObject, setCreatableObject ] = React.useState<ItemInputSchema>();
	const styles = useStyles();
	const dispatch = useDispatch();

	const handleChangeObjectField = (key: string, value: string) => {
		setCreatableObject(state => {
			const newObject = key === 'category' ? { } : { ...state };
			const parsed = parseFloat(value);
			let result: number | string = value;

			if(parsed.toString().length === value.length && !Number.isNaN(parsed)) {
				result = +parsed;
			}

			console.log(parsed)

			Object.assign(newObject, { [key]: result });

			return newObject as ItemInputSchema;
		})
	}

	const handleAddPhoto =  (file: File): void => {
		setPhotosFiles(state => [ ...state, file ]);

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
		let deletableIndex = -1;

		const items = photos.filter((item, index) => {
			if(item.id === _index) deletableIndex = _index;

			return item.id !== _index
		});
		setPhotos(items);

		setPhotosFiles(state => state.filter((item, index) => index !== deletableIndex));
	}

	const uploadImage = async (photo: File): Promise<Photo> => {
		const result = await uploadImageToServer(photo);

		return result.data.uploadImage;
	}

	const addItem = () => {
		// console.log(creatableObject, uploadImage, setUploadedPhotos);
		if(!photosFiles.length) {
			alert('Add photos!');
			return;
		}
		dispatch(ACTIONS.LOADING_SHOP_DATA.STARTED());

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
		if(uploadedPhotos.length && uploadedPhotos.length === photosFiles.length) {
			if(!creatableObject) {
				return;
			}

			creatableObject.photos = [...uploadedPhotos];

			dispatch(ACTIONS.ADD_ITEM.TRIGGER(creatableObject));
		}
	}, [uploadedPhotos]);

	return (
		<div className={styles.container}>
			<div className={styles.safeArea}>
				<ChangeItem
					onAddPhoto={handleAddPhoto}
					onRemovePhoto={handleRemovePhoto}
					photos={photos}
					onSave={addItem}
					isLoading={false}
					item={creatableObject as ItemInputSchema}
					changeObjectField={handleChangeObjectField}
				/>
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
