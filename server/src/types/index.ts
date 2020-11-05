import User from '../models/user';
import { IResolvers } from 'graphql-tools';
import * as Definitions from './definitions';

const resolverMap: IResolvers = {
	Query: {
		login: async ( _: void, args: Definitions.LoginScheme ): Promise<boolean> => {
			return await User.login(args);
		}
	},
	Mutation: {
		register: async ( _: void, args: Definitions.RegisterScheme ): Promise<boolean> => {
			return await User.register(args);
		}
	}
}

export default resolverMap;