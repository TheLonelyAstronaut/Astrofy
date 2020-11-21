import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { CustomHeader } from '../components/custom-header.component';
import DefaultTheme from '../theme';
import { CustomItem } from '../components/custom-item.component';
import { useSelector } from 'react-redux';
import { getBookmarks } from '../store/selectors/item-selectors';

export const Bookmarks: React.FC = () => {
	const bookmarks = useSelector(getBookmarks);

	console.log('NEEDs TO BE UPDATED')

	return (
		<View style={styles.container}>
			<CustomHeader label={'Bookmarks'} />
			<View style={styles.infoHolder}>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={{ paddingTop: 70 }}
					contentContainerStyle={{ paddingBottom: 30 }}
					data={bookmarks}
					keyExtractor={(item) => '' + item.id}
					renderItem={({ item }) => (
						<CustomItem item={item} key={item.id} additionalID={3000} />
					)}
				/>
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
		marginTop: 20
	}
});
