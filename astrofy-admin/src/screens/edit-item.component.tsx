import React from 'react';
import { history } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { getItemFromStore } from "../store/selectors/item-selectors";
import {ItemInputSchema, ItemType, Photo} from "../types/types";
import {makeStyles} from "@material-ui/core/styles";
import {uploadImage as uploadImageToServer} from "../api/networkWorker";
import * as ACTIONS from "../store/actions/item-actions";
import { ChangeItem } from "../components/change-item.component";

interface Props {
	match: {
		params: {
			itemID: string,
			category: string
		}
	};
}

export const EditItem: React.FC<Props> = (props: Props) => {
	if(!props.match.params.category || !props.match.params.itemID) {
		history.push('/home');
	}
	const styles = useStyles();
	const dispatch = useDispatch();

	const [ changeableItem, changeItem ] = React.useState<ItemInputSchema>({} as ItemInputSchema);
	const [ photos, setPhotos ] = React.useState<Photo[]>([]);
	const [ photosFiles, setPhotosFiles ] = React.useState<File[]>([]);
	const [ uploadedPhotos, setUploadedPhotos ] = React.useState<number[]>([]);

	const originalItem = useSelector(getItemFromStore(
		props.match.params.category.toUpperCase() as ItemType,
		props.match.params.itemID
	))

	if(!originalItem) {
		history.push('/home');
	}

	React.useEffect(() => {
		setPhotos(originalItem.photos);

		Object.keys(originalItem).map(key => {
			if(key === '__typename' || key === 'id' || key === 'photos') return;

			changeItem(state => {
				const newItem = { ...state };

				Object.assign(newItem, { [key]: (originalItem as any)[key] })
				return newItem;
			})
		})
	}, [originalItem]);

	const handleChangeObjectField = (key: string, value: string) => {
		changeItem(state => {
			const newObject = key === 'category' ? { } : { ...state };
			const parsed = parseFloat(value);
			let result: number | string = value;

			if(parsed.toString().length === value.length && !Number.isNaN(parsed)) {
				result = +parsed;
			}

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
		let wasFound = false;

		const items = photos.filter((item, index) => {
			if(!item.itemID && !wasFound) deletableIndex++;
			if(item.id === _index) wasFound = true;

			return item.id !== _index
		});

		setPhotos(items);

		setPhotosFiles(state => state.filter((item, index) => index !== deletableIndex));
	}

	const uploadImage = async (photo: File): Promise<Photo> => {
		const result = await uploadImageToServer(photo);

		return result.data.uploadImage;
	}

	const changeItemInDatabase = () => {
		// console.log(creatableObject, uploadImage, setUploadedPhotos);
		if(!photos.length) {
			alert('Add photos!');
			return;
		}
		dispatch(ACTIONS.LOADING_SHOP_DATA.STARTED());

		const uploaded: number[] = [];
		photos.map(item => {
			if(item.itemID) uploaded.push(item.id);
		});

		setUploadedPhotos(state => [...state, ...uploaded]);

		photosFiles.map(async (fileItem, index) => {
			// console.log(fileItem, photos, uploadedPhotos)

			const result = await uploadImage(fileItem);
			setUploadedPhotos(state => {
				return [...state, result.id];
			});
		})
	}

	React.useEffect(() => {
		if(uploadedPhotos.length && uploadedPhotos.length === photos.length) {
			if(!changeableItem) {
				return;
			}

			changeableItem.photos = [...uploadedPhotos];

			dispatch(ACTIONS.UPDATE_ITEM.TRIGGER({
				item: changeableItem,
				id: originalItem.id
			}));
		}
	}, [uploadedPhotos]);

	return (
		<div className={styles.container}>
			<div className={styles.safeArea}>
				<ChangeItem
					item={changeableItem}
					changeObjectField={handleChangeObjectField}
					onAddPhoto={handleAddPhoto}
					onRemovePhoto={handleRemovePhoto}
					photos={photos}
					onSave={changeItemInDatabase}
					isLoading={false}
					isPickerDisabled={true}
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
