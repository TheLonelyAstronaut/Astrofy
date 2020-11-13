import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ItemInputSchema, ItemType, Laptop, Peripheral, Photo, Smartphone, Tablet} from "../types/types";
import {keys} from 'ts-transformer-keys';
import {CustomButton} from "./custom-button.component";
import {GridList, GridListTile, ListItemText, MenuItem, Select} from '@material-ui/core';
import {DeletableImage} from "./deletable-image.component";
import {CustomTextInput} from "./custom-text-input.component";
import {getCategories} from '../store/selectors/item-selectors';
import {useSelector} from "react-redux";
import '../index.css';
import {history} from "../store/store";

interface Props {
	item: ItemInputSchema;
	changeObjectField: (key: string, value: string | number) => void;
	onAddPhoto: (file: File) => void;
	onRemovePhoto: (id: number) => void;
	photos: Photo[];
	onSave: () => void;
	isLoading: boolean;
	isPickerDisabled?: boolean;
}

export const ChangeItem: React.FC<Props> = (props: Props) => {
	const styles = useStyles();
	const categories = useSelector(getCategories);
	const imagePicker = React.useRef<HTMLInputElement>();
	const [ typeKeys, setTypeKeys ] = React.useState<string[]>([]);
	const [ currentCategory, setCurrentCategory ] = React.useState<ItemType>(ItemType.LAPTOP);

	if(!categories.length) {
		history.push('/home');
	}

	React.useEffect(() => {
		if(!props.isPickerDisabled) {
			handleChangeCategory({ target: { value: ItemType.LAPTOP } });
		}
	}, [])

	React.useEffect(() => {
		if(props.item?.category) {
			setCurrentCategory(props.item.category);
			handleChangeCategory({ target: { value: props.item.category } });
		}
	}, [props.item?.category])

	const handleChangeCategory = (data: any) => {
		const category = data.target.value as ItemType;

		if(!props.isPickerDisabled) {
			props.changeObjectField('category', category);
		}

		if(category === ItemType.LAPTOP) {
			setTypeKeys(keys<Laptop>());
		}

		if(category === ItemType.SMARTPHONE) {
			setTypeKeys(keys<Smartphone>());
		}

		if(category === ItemType.TABLET) {
			setTypeKeys(keys<Tablet>());
		}
		if(category === ItemType.PERIPHERAL) {
			setTypeKeys(keys<Peripheral>());
		}

	}

	const pickImage = () => {
		if(imagePicker.current) {
			imagePicker.current.click();
		}
	}

	const pickerStateChanged = (input: any) => {
		if(input.target.files) {
			props.onAddPhoto(input.target.files[0]);
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.infoHolder}>
				<div className={styles.dataHolder}>
					<GridList cellHeight={250} className={styles.photos} cols={3}>
						{props.photos.map((tile, index) => (
							<GridListTile key={tile.url} cols={1}>
								<DeletableImage
									item={tile}
									onDelete={!props.isLoading ? () => props.onRemovePhoto(tile.id) : null}
								/>
							</GridListTile>
						))}
					</GridList>
					<CustomButton
						label={'Add Image'}
						onPress={pickImage}
						loading={props.isLoading}
					/>
				</div>
				<div className={styles.dataHolder + ' hide-scroll'}>
					<Select
						onChange={handleChangeCategory}
						disabled={props.isPickerDisabled}
						defaultValue={currentCategory}
						value={currentCategory}
						inputProps={{
							style: {
								color: 'white'
							}
						}}
						style={{marginBottom: 20, width: '60%', alignSelf: 'center'}}
					>
						{
							categories.map((item: string, index: number) => (
								<MenuItem key={item} value={item}>
									<ListItemText primary={item} />
								</MenuItem>
							))
						}
					</Select>
					{
						typeKeys.map((item, index) => {
							if (item === 'photos' || item === 'id' || item === 'category') return;

							return (
								<CustomTextInput
									placeholder={item}
									value={(props.item as any)[item]}
									onChangeText={(text) => props.changeObjectField(item, text)}
								/>
							)
						})
					}
				</div>
			</div>
			<CustomButton
				label={'Save'}
				onPress={props.onSave}
				loading={props.isLoading}
			/>
			<input
				accept={'image'}
				type={'file'}
				ref={(ref) => imagePicker.current = ref as HTMLInputElement | undefined}
				onChange={pickerStateChanged}
				hidden
			/>
		</div>
	)
}

const useStyles = makeStyles((props) => ({
	container: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		padding: 60,
	},
	infoHolder: {
		display: 'flex',
		flexDirection: 'row',
		flex: 1
	},
	dataHolder: {
		width: '50%',
		display: 'flex',
		flexDirection: 'column',
		maxHeight: '75vh',
		height: '75vh',
		overflowX: 'hidden',
		overflowY: 'visible',
	},
	photos: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: '70vh',
		maxHeight: '70vh',
	}
}));
