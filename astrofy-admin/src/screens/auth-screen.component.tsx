import React from "react";
import './auth-screen.css';
import { CustomTextInput } from '../components/custom-text-input.component';
import { CustomButton } from "../components/custom-button.component";
import { AUTH_LOGIN } from "../store/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import { getIsUserFetching } from '../store/selectors/auth-selectors';

export const AuthScreen: React.FC = () => {
	const [ login, setLogin ] = React.useState("");
	const [ password, setPassword ] = React.useState("");
	const dispatch = useDispatch();
	const isLoading = useSelector(getIsUserFetching);

	const handleLogin = () => {
		dispatch(AUTH_LOGIN.TRIGGER({
			username: login,
			password
		}));
	}


	return (
		<div className={'container'}>
			<div className={'authHolder'}>
				<h3 className={'label'}>Astrofy Admin Panel</h3>
				<img src='assets/chip_resized.png' className={'logo'}/>
				<CustomTextInput
					value={login}
					onChangeText={setLogin}
					placeholder={'Login'}
				/>
				<CustomTextInput
					value={password}
					onChangeText={setPassword}
					placeholder={'Password'}
					isHidden={true}
				/>
				<CustomButton
					label={'Login'}
					onPress={handleLogin}
					loading={isLoading}
				/>
			</div>
		</div>
	)
}
