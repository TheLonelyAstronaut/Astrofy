import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { CustomHeader } from '../components/custom-header.component';
import DefaultTheme from '../theme';
import { mockUser } from '../api/mock-api';
// @ts-ignore
import FifthTriangle from '../assets/svg/triangle5';
// @ts-ignore
import SixTriangle from '../assets/svg/triangle6';
import { getUserObject } from '../store/selectors/auth-selectors';
import { useSelector } from 'react-redux';

export const Profile: React.FC = () => {
	const user = useSelector(getUserObject);

	return (
		<View style={styles.container}>
			<CustomHeader label={'Profile'} />
			<View style={styles.infoHolder}>
				<View
					style={{
						position: 'absolute',
						height: 382,
						bottom: 0,
						width: '100%'
					}}>
					<SixTriangle
						width={253}
						height={194}
						style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 0 }}
					/>
					<FifthTriangle
						width={196}
						height={382}
						style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 0 }}
					/>
				</View>
				<View style={styles.mainInfo}>
					<Image
						source={require('../assets/avatar.jpg')}
						style={styles.avatar}
					/>
					<View style={{ flex: 1, marginLeft: 10, alignItems: 'center' }}>
						<Text
							style={{
								fontFamily: DefaultTheme.fonts.bold,
								color: DefaultTheme.DARK_PRIMARY,
								fontSize: 24
							}}>
							{user.username}
						</Text>
						<Text
							style={{
								fontFamily: DefaultTheme.fonts.bold,
								color: DefaultTheme.DARK_PRIMARY,
								fontSize: 12,
								opacity: 0.5
							}}>
							{user.email}
						</Text>
					</View>
				</View>
				<View style={styles.editHolder}>
					<View style={styles.editHolderRow}>
						<Text style={styles.key}>Name:</Text>
						<Text style={styles.value}>{user.username}</Text>
					</View>
					<View style={styles.editHolderRow}>
						<Text style={styles.key}>Email:</Text>
						<Text style={styles.value}>{user.email}</Text>
					</View>
					<View style={styles.editHolderRow}>
						<Text style={styles.key}>Date Of Birth:</Text>
						<Text style={styles.value}>{user.address}</Text>
					</View>
					<View style={styles.editHolderRow}>
						<Text style={styles.key}>Address:</Text>
						<Text style={styles.value}>{user.birthDate}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DefaultTheme.PRIMARY_BACKGROUND
	},
	infoHolder: {
		flex: 1,
		backgroundColor: 'white',
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		marginTop: 20,
		zIndex: 0
	},
	mainInfo: {
		height: 120,
		flexDirection: 'row',
		paddingHorizontal: 35,
		marginTop: 40,
		alignItems: 'center',
		zIndex: 2
	},
	avatar: {
		height: 115,
		width: 115,
		resizeMode: 'cover',
		borderRadius: 60
	},
	button: {
		height: 36,
		width: '90%',
		backgroundColor: DefaultTheme.DARK_PRIMARY,
		marginTop: 15,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	editHolder: {
		marginTop: 30
	},
	editHolderRow: {
		paddingHorizontal: 35,
		flexDirection: 'row',
		alignItems: 'center'
	},
	key: {
		marginBottom: 10,
		fontFamily: DefaultTheme.fonts.bold,
		color: DefaultTheme.DARK_PRIMARY,
		fontSize: 16
	},
	value: {
		marginBottom: 10,
		fontFamily: DefaultTheme.fonts.bold,
		color: DefaultTheme.DARK_PRIMARY,
		fontSize: 16,
		marginLeft: 12,
		opacity: 0.6
	}
});
