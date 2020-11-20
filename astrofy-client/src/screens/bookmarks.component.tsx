import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { CustomHeader } from '../components/custom-header.component';
import DefaultTheme from '../theme';
import { mockGetItems } from '../api/mock-api';
import { CustomItem } from '../components/custom-item.component';

export const Bookmarks: React.FC = () => {
	return (
		<View style={styles.container}>
			<CustomHeader label={'Bookmarks'} />
			<View style={styles.infoHolder}>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={{ paddingTop: 70 }}
					contentContainerStyle={{ paddingBottom: 30 }}
					data={[]}
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
