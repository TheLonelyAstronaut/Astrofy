import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {history} from "../store/store";
import { mockGetItems } from '../api/mocks';
import { CustomItemCard } from "../components/custom-item.component";

export const ItemList: React.FC = () => {
	const [ items, setItems ] = React.useState(mockGetItems);
	const classes = useStyles();

	return (
		<div className={classes.container}>
			{
				items.map((item, index) => (
					<CustomItemCard item={item}/>
				))
			}
			<div className={classes.filterButton} onClick={() => alert()}>
				<img className={classes.filterImage} src={'assets/filter.png'}/>
			</div>
			<div className={classes.addItem} onClick={() => history.push('/home/add_item')}>
				<img className={classes.filterImage} src={'assets/file.png'}/>
			</div>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: 70,
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		width: '100%',
		flexWrap: 'wrap'
	},
	filterButton: {
		height: 70,
		width: 70,
		display: 'flex',
		borderRadius: 35,
		position: 'absolute',
		bottom: 40,
		right: 40,
		backgroundColor: '#bdc3c7',
		justifyContent: 'center',
		alignItems: 'center'
	},
	filterImage: {
		height: 35,
		width: 35
	},
	addItem: {
		height: 70,
		width: 70,
		borderRadius: 35,
		position: 'absolute',
		bottom: 130,
		display: 'flex',
		right: 40,
		backgroundColor: '#bdc3c7',
		justifyContent: 'center',
		alignItems: 'center'
	},
}));
