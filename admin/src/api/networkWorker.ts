import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import * as Constants from '../globals';
import { gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const client = new ApolloClient({
	uri: Constants.SERVER_ADDRESS,
	cache: new InMemoryCache()
});

export const setAuthToken = (token: string) => {
	const httpLink = createHttpLink({
		uri: Constants.SERVER_ADDRESS,
	});

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
