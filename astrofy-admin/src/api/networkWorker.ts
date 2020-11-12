import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import * as Constants from '../globals';
import { gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

export const client = new ApolloClient({
	uri: Constants.SERVER_ADDRESS,
	cache: new InMemoryCache()
});

export const uploadClient = new ApolloClient({
	cache: new InMemoryCache()
});

export const setAuthToken = (token: string) => {
	const httpLink = createHttpLink({
		uri: Constants.SERVER_ADDRESS,
	});

	const uploadLink = createUploadLink({
		uri: Constants.SERVER_ADDRESS
	})

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from local storage if it exists
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token,
			}
		}
	});

	client.setLink(authLink.concat(httpLink));
	uploadClient.setLink(authLink.concat(uploadLink));
}

export const login = async (username: string, password: string) => {
    return await client.mutate({
        mutation: gql`
            mutation login($loginData: LoginInput!) {
                login(data: $loginData) {
                    user {
                        id
                        username
                        email
                        isAdmin
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
    })
}

export const logout = async () => {
	return await client.mutate({
		mutation: gql`
			mutation logout {
				logout
			}
		`
	})
}

export const uploadImage = async (image: File) => {
	return await uploadClient.mutate({
		mutation: gql`
			mutation uploadImage($image: Upload!) {
				uploadImage(image: $image) {
					id
					itemID
					url
				}
			}
		`,
		variables: {
			image
		}
	})
}
