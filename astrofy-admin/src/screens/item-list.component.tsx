import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { history } from "../store/store";
import { SpeedDial, SpeedDialIcon, SpeedDialAction, Pagination } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import { CustomItemCard } from "../components/custom-item.component";
import { useDispatch, useSelector } from "react-redux";
import * as ACTIONS from '../store/actions/item-actions';
import { getCategories, getItemsFromCategory, getShopPageSize } from '../store/selectors/item-selectors';
import '../index.css';
import {Backdrop, ListItemText, List, ListItem, Typography} from "@material-ui/core";

export const ItemList: React.FC = () => {
	const classes = useStyles();
	const [ categoryID, setCategoryID ] = React.useState(0);
	const dispatch = useDispatch();
	const categories = useSelector(getCategories);
	const [ currentPage, setCurrentPage ] = React.useState(0);
	const [ isButtonOpen, setIsButtonOpen ] = React.useState(false);
	const items = useSelector(getItemsFromCategory(categories[categoryID]));
	const pageSize = useSelector(getShopPageSize);
	const [ categoryChooserVisible, setCategoryChooserVisible ] = React.useState(false);

	const actions = [
		{ icon: <SpeedDialIcon openIcon={<EditIcon />}/>, name: 'Add', onClick: () => history.push('/home/add_item') },
		{ icon: <SearchIcon/>, name: 'Sort', onClick: () => setCategoryChooserVisible(true )},
	];

	React.useEffect(() => {
		dispatch(ACTIONS.FETCH_CATEGORIES.TRIGGER());
	}, [dispatch]);

	React.useEffect(() => {
		if(categories.length) {
			dispatch(ACTIONS.GET_CATEGORY_PAGE.TRIGGER({ category: categories[categoryID], offset: currentPage }));
		}
	}, [categories.length, categoryID, currentPage])

	return (
		<div className={classes.container}>
			<div className={'hide-scroll'} style={{
				flexDirection: 'row',
				flexWrap: 'wrap',
				display: 'flex',
				justifyContent: 'center',
				alignContent: 'start',
				height: '93vh',
				maxHeight: '93vh',
				overflowX: 'scroll'
			}}>
				{
					items?.data.length ? items?.data.map((item, index) => {
						if(index >= currentPage * pageSize && index < (currentPage + 1) * pageSize) {
							return <CustomItemCard key={item.id} item={item}/>
						}
						return null
					}) : <Typography style={{ color: '#bdc3c7', marginTop: '42vh' }}>Empty! Add more items to category</Typography>
				}
			</div>
			{
				items?.totalCount ? (
					<div style={{ position: 'absolute', padding: 5, bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(52, 73, 94, 0.5)', borderRadius: 30 }}>
						<Pagination count={Math.ceil(items.totalCount / pageSize)} onChange={(event, num) => setCurrentPage(num - 1)}/>
					</div>
				) : null
			}
			<SpeedDial
				ariaLabel={'Actions'}
				icon={<SpeedDialIcon />}
				onClose={() => setIsButtonOpen(false)}
				onOpen={() => setIsButtonOpen(true)}
				open={isButtonOpen}
				direction={'up'}
				className={classes.floatingButton}
			>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.onClick}
					/>
				))}
			</SpeedDial>
			<Backdrop open={categoryChooserVisible} className={classes.backdrop} onClick={() => setCategoryChooserVisible(false)}>
				<List style={{ backgroundColor: '#34495e', padding: 10, borderRadius: 10 }}>
					{
						categories.map((item, index) => (
							<ListItem key={item} button onClick={() => {
								setCategoryID(index);
							}}>
								<ListItemText primary={item}/>
							</ListItem>
						))
					}
				</List>
			</Backdrop>
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: 70,
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		width: '100%',
		alignItems: 'center'
	},
	floatingButton: {
		position: 'absolute',
		bottom: 40,
		right: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backdrop: {
		zIndex: 9999,
		color: '#fff',
	},
}));
