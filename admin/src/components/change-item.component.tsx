import React, {SyntheticEvent} from "react";
import {View, Image, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { CustomButton } from "./custom-button.component";
import { Photo, ItemType } from "../types/types";
import { DeletableImage } from "./deletable-image.component";
import { List } from 'react-native-paper';
import { keys } from 'ts-transformer-keys';

interface Props {
	itemID?: number;
	onAddPhoto: (file: File) => void;
	onRemovePhoto: (id: number) => void;
	photos: Photo[];
	onSave: () => void;
	isLoading: boolean;
}

// <Image source={{ uri: item instanceof File ? getFileUri(item) : item }}  style={{ height: 100, width: 100 }}/>

export const ChangeItem: React.FC<Props> = (props: Props) => {
	const imagePicker = React.useRef<HTMLInputElement>();
	const chosenCategory = ItemType.LAPTOP;
	const [ typeKeys, setTypeKeys ] = React.useState<string[]>([]);

	React.useEffect(() => {
		const item: typeof chosenCategory = {} as typeof chosenCategory;

		console.log(Object.keys(item));
	}, [chosenCategory]);

	const pickImage = async () => {
		if(imagePicker.current) {
			imagePicker.current.click();
		}
	}

	const pickerStateChanged = async (input: any) => {
		if(input.target.files) {
			props.onAddPhoto(input.target.files[0]);
		}
	}

	return (
		<View style={[styles.container, styles.defaultShadow]}>
			<View style={styles.infoHolder}>
				<View style={styles.picturesHolder}>
					<FlatList
						data={props.photos}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						style={{ height: 300 }}
						renderItem={({item, index}) => (
							<DeletableImage
								item={item}
								onDelete={!props.isLoading ? () => props.onRemovePhoto(index) : null}
							/>
						)}
					/>
					<CustomButton
						label={'Add Image'}
						onPress={pickImage}
						loading={props.isLoading}
					/>
				</View>
				<input
					accept={'image'}
					type={'file'}
					ref={(ref) => imagePicker.current = ref as HTMLInputElement | undefined}
					onChange={pickerStateChanged}
					hidden
				/>
				<View>
					{
						!props.itemID && (
							<List.Accordion
								title="Select type"
							>
								<TouchableOpacity>
									<Text>Well</Text>
								</TouchableOpacity>
								<List.Item title="Second item" />
							</List.Accordion>
						)
					}
					{

					}
				</View>
			</View>
			<CustomButton
				label={'Save'}
				onPress={props.onSave}
				loading={props.isLoading}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		maxWidth: '80%',
		width: 1000,
		flex: 1,
		marginVertical: 50,
		backgroundColor: '#bdc3c7',
		borderRadius: 30,
		padding: 30
	},
	defaultShadow: {
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 10,
		shadowOpacity: 0.1,
	},
	infoHolder: {
		flexDirection: 'row',
		flex: 1
	},
	picturesHolder: {
		width: '50%',
	}
});
