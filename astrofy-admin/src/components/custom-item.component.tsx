import React from 'react';
import * as DataTypes from '../types/types';
import { history } from "../store/store";
import {makeStyles} from "@material-ui/core/styles";
import Truncate from 'react-truncate';

interface Props {
	item: DataTypes.ItemOutputSchema
}

export const CustomItemCard: React.FC<Props> = ( props: Props ) => {
	const styles = useStyles();

	return (
		<div className={styles.container}>
			<div className={styles.card} onClick={() => history.push(`/home/edit_item/${props.item.category.toLowerCase()}/${props.item.id}`)}>
				<div className={styles.dataHolder}>
					<div className={styles.infoHolder}>
						<a className={styles.itemModel}>{props.item.model}</a>
						<a className={styles.itemManufacturer}>By {props.item.manufacturer}</a>
						<Truncate lines={2} className={styles.itemDescription}>{props.item.description}</Truncate>
						<a className={styles.itemMinorInfo}>Quantity: {props.item.quantity}</a>
						<a className={styles.itemMinorInfo}>Cost: {props.item.cost} BYN</a>
					</div>
					<img src={props.item.photos[0].url} className={styles.itemPicture}/>
				</div>
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	container: {
		height: 250,
		display: 'flex',
		justifyContent: "flex-end",
		width: 500,
		alignSelf: 'center',
		cursor: 'pointer'
	},
	card: {
		width: '90%',
		backgroundColor: '#2c3e50',
		height: 200,
		display: 'flex',
		alignSelf: "center",
		borderRadius: 40,
		marginVertical: 10,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 10,
		shadowOpacity: 0.1
	},
	dataHolder: {
		width: '98%',
		display: 'flex',
		borderRadius: 40,
		backgroundColor: '#34495e',
		flexDirection: 'row',
		paddingHorizontal: 20
	},
	itemPicture: {
		height: 200,
		width: 200,
		display: 'flex',
		marginRight: 20,
		objectFit: 'contain',
		transform: 'translateY(-15px)'
	},
	infoHolder: {
		flex: 1,
		paddingTop: 25,
		paddingLeft: 30,
		display: 'flex',
		flexDirection: 'column'
	},
	itemModel: {
		fontWeight: 'bold',
		fontSize: 17,
		color: '#ecf0f1'
	},
	itemManufacturer: {
		fontWeight: 'bold',
		fontSize: 14,
		color: '#bdc3c7',
		opacity: 0.6,
		marginTop: 0
	},
	itemDescription: {
		marginTop: 5,
		color: '#95a5a6',
		fontSize: 14,
		opacity: 0.6,
		fontWeight: 500
	},
	itemMinorInfo: {
		marginTop: 5,
		color: '#7f8c8d',
		opacity: 0.6,
		fontSize: 14,
		fontWeight: 500
	}
}));
