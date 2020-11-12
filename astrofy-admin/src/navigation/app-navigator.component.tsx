import React, {useEffect} from 'react';
import {Switch, Route, useRouteMatch, Redirect} from "react-router-dom";
import { AuthScreen } from '../screens/auth-screen.component';
import { useSelector } from "react-redux";
import { getAuthToken } from "../store/selectors/auth-selectors";
import { ConnectedRouter } from 'connected-react-router'
import { history } from "../store/store";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../index.css';
import { useDispatch } from "react-redux";
import { AUTH_LOGOUT } from "../store/actions/auth-actions";
import { ItemList } from "../screens/item-list.component";
import { EditItem } from "../screens/edit-item.component";
import { AddItem } from '../screens/add-item.component';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: '#bdc3c7'
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		color: '#2c3e50'
	},
	button: {
		color: '#2c3e50'
	},
	logo: {
		height: 50,
		width: 50,
		marginRight: 10
	}
}));


const HomeNavigator = () => {
	const match = useRouteMatch();
	const token = useSelector(getAuthToken);
	const classes = useStyles();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(AUTH_LOGOUT());
	}

	return (
		<Switch>
			<div className={'root'}>
				<AppBar position={'fixed'} style={{ height: 70, backgroundColor: '#bdc3c7', justifyContent: 'center' }}>
					<Toolbar>
						<img src={'/assets/chip_resized.png'} className={classes.logo}/>
						<Typography variant="h6" className={classes.title}>
							Astrofy Admin
						</Typography>
						<Button color="inherit" onClick={handleLogout} className={classes.button}>Logout</Button>
					</Toolbar>
				</AppBar>
				<Route exact path={`${match.path}`}>
					<Redirect to={token ? '/home' : '/login'}/>
					<ItemList/>
				</Route>
				<Route exact path={`${match.path}/add_item`}>
					<Redirect to={token ? `${match.path}/add_item` : '/login'}/>
					<AddItem/>
				</Route>
				<Route exact path={`${match.path}/edit_item/:itemID`} component={EditItem}/>
			</div>
		</Switch>
	)
}

export const AppNavigator = () => {
	const token = useSelector(getAuthToken);

	return (
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path={'/'}>
					<Redirect to={token ? '/home' : '/login'}/>
				</Route>
				<Route path={'/home'}>
					<Redirect to={token ? '/home' : '/login'}/>
					<HomeNavigator/>
				</Route>
				<Route exact path={'/login'}>
					<Redirect to={token ? '/home' : '/login'}/>
					<AuthScreen/>
				</Route>
			</Switch>
		</ConnectedRouter>
	)
}
