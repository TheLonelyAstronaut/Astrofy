import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import * as Constants from '../global';
import { gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ItemInputSchema, ItemType } from '../types/types';
import { RegisterPayload } from '../store/actions/auth-actions';

export const client = new ApolloClient({
	uri: Constants.SERVER_ADDRESS,
	cache: new InMemoryCache()
});

export const setAuthToken = (token: string) => {
	const httpLink = createHttpLink({
		uri: Constants.SERVER_ADDRESS
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token
			}
		};
	});

	client.setLink(authLink.concat(httpLink));
};

export const login = async (username: string, password: string) => {
	return await client.mutate({
		mutation: gql`
			mutation login($loginData: LoginInput!) {
				login(data: $loginData) {
					user {
						id
						username
						email
						birthDate
						address
					}
					token
				}
			}
		`,
		variables: {
			loginData: {
				username,
				password
			}
		}
	});
};

export const register = async (payload: RegisterPayload) => {
	return await client.mutate({
		mutation: gql`
			mutation register($registerData: RegisterInput!) {
				register(data: $registerData) {
					user {
						id
						username
						email
						address
						birthDate
					}
					token
				}
			}
		`,
		variables: {
			registerData: {
				username: payload.username,
				password: payload.password,
				email: payload.email,
				address: payload.address,
				birthDate: payload.birthDate
			}
		}
	});
};

export const logout = async () => {
	return await client.mutate({
		mutation: gql`
			mutation logout {
				logout
			}
		`
	});
};

export const getCategories = async () => {
	return await client.query({
		query: gql`
			query getCategories {
				getCategories
			}
		`
	});
};

export const getAllItemsFromDatabase = async (
	category: ItemType,
	pageNumber: number
) => {
	return await client.query({
		query: gql`
			query getAllItemsFromDatabase(
				$category: ItemCategory!
				$pageNumber: Int!
			) {
				getAllItemsFromDatabase(category: $category, pageNumber: $pageNumber) {
					totalCount
					items {
						id
						manufacturer
						model
						category
						description
						cost
						CPU
						GPU
						RAM
						diagonal
						driveCapacity
						batteryCapacity
						SoC
						additionalInfo
						quantity
						photos {
							id
							itemID
							url
						}
					}
				}
			}
		`,
		variables: {
			category,
			pageNumber
		}
	});
};

export const getCart = async () => {
	return client.query({
		query: gql`
			query getCart {
				getUserInfo {
					basket {
						id
						manufacturer
						model
						category
						description
						cost
						CPU
						GPU
						RAM
						diagonal
						driveCapacity
						batteryCapacity
						SoC
						additionalInfo
						quantity
						photos {
							id
							itemID
							url
						}
					}
				}
			}
		`
	});
};

export const addItemToCart = async (itemID: number) => {
	return await client.mutate({
		mutation: gql`
			mutation addToBasket($itemID: Int!) {
				addItemToBasket(itemID: $itemID) {
					items {
						id
						manufacturer
						model
						category
						description
						cost
						CPU
						GPU
						RAM
						diagonal
						driveCapacity
						batteryCapacity
						SoC
						additionalInfo
						quantity
						photos {
							id
							itemID
							url
						}
					}
				}
			}
		`,
		variables: {
			itemID
		}
	});
};

export const removeItemFromCart = async (itemID: number) => {
	return await client.mutate({
		mutation: gql`
			mutation removeFromBasket($itemID: Int!) {
				removeItemFromBasket(itemID: $itemID) {
					items {
						id
						manufacturer
						model
						category
						description
						cost
						CPU
						GPU
						RAM
						diagonal
						driveCapacity
						batteryCapacity
						SoC
						additionalInfo
						quantity
						photos {
							id
							itemID
							url
						}
					}
				}
			}
		`,
		variables: {
			itemID
		}
	});
};
