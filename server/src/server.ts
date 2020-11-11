import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import { schema } from './schemas/schema';
import dotenv from 'dotenv';

import DatabaseConnector from './models/database-connector';
import AWSConnector from './models/aws-s3-connector';
import { initUser } from './models/user';
import { initToken } from './models/token';
import { initItem } from './models/item';
import { initLaptop } from './models/items/laptop';
import { initSmartphone } from './models/items/smartphone';
import { initTablets } from './models/items/tablet';
import { initPeripheral } from './models/items/peripheral';
import { initBasket } from './models/basket';
import { initPayment } from './models/payment';
import { initImage } from './models/image';
import { graphqlUploadExpress } from 'graphql-upload';

// Getting secret config vars
if(process.env.NODE_ENV !== 'production') {
	console.log('DEV MODE');
	dotenv.config();
}

// Setting up S3
AWSConnector.initialize();

// Setting up Sequelize
DatabaseConnector.initialize();

// Initializing models
initUser();
initToken();
initItem();
initLaptop();
initSmartphone();
initTablets();
initPeripheral();
initBasket();
initPayment();
initImage();

// Creating Express&Apollo vars
const app = express();
const server = new ApolloServer({
	schema,
	uploads: false,
	validationRules: [depthLimit(7)],
	context: async ({ req }) => {
		const currentUserToken = req.headers.authorization;

		return { currentUserToken };
	}
});

// Configuring and starting
app.use('*', cors());
app.use(compression());
app.use(graphqlUploadExpress());

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = createServer(app);
httpServer.listen(
	{ port: 5858 },
	(): void => console.log('GraphQL is now running on http://localhost:5858/graphql')
);
