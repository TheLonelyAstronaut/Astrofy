import 'graphql-import-node';
import * as typeDefs from '../../schemas/schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../types/index';
import { GraphQLSchema } from 'graphql';

export const schema: GraphQLSchema = makeExecutableSchema({
	typeDefs,
	resolvers,
});