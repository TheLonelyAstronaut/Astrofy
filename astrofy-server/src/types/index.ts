import User from '../models/user';
import { IResolvers } from 'graphql-tools';
import * as Definitions from './definitions';
import Token from '../models/token';

import Item from '../models/item';
import Laptop from '../models/items/laptop';
import Smartphone from '../models/items/smartphone';
import Tablet from '../models/items/tablet';
import Peripheral from '../models/items/peripheral';
import Basket from '../models/basket';
import Payment from '../models/payment';
import { GraphQLUpload } from 'graphql-upload';
import Image from '../models/image';

export const getItemFromDatabase = async ( _: void, args: Definitions.GetItemsSchema) : Promise<Definitions.ItemOutputSchema> => {
	const category = await Item.getItemCategory(args.itemID);
	let result;

	if(category === Definitions.ItemType.LAPTOP) {
		result = await Laptop.getItemFromDatabase(args.itemID) as Definitions.ItemOutputSchema;
	}

	if(category === Definitions.ItemType.SMARTPHONE) {
		result = await Smartphone.getItemFromDatabase(args.itemID) as Definitions.ItemOutputSchema;
	}

	if(category === Definitions.ItemType.TABLET) {
		result = await Tablet.getItemFromDatabase(args.itemID) as Definitions.ItemOutputSchema;
	}

	if(category === Definitions.ItemType.PERIPHERAL) {
		result = await Peripheral.getItemFromDatabase(args.itemID) as Definitions.ItemOutputSchema;
	}

	return result as Definitions.ItemOutputSchema;
}

const resolverMap: IResolvers = {
	Upload: GraphQLUpload,
	Query: {
		getItemFromDatabase,
		getAllItemsFromDatabase: async ( _: void, args: Definitions.GetAllItemsSchema ) : Promise<Definitions.ItemPagingSchema> => {
			let result;

			if(args.category === Definitions.ItemType.LAPTOP) {
				result = await Laptop.getAllItemsFromDatabase(args.pageNumber);
			}

			if(args.category === Definitions.ItemType.SMARTPHONE) {
				result = await Smartphone.getAllItemsFromDatabase(args.pageNumber);
			}

			if(args.category === Definitions.ItemType.TABLET) {
				result = await Tablet.getAllItemsFromDatabase(args.pageNumber);
			}

			if(args.category === Definitions.ItemType.PERIPHERAL) {
				result = await Peripheral.getAllItemsFromDatabase(args.pageNumber);
			}

			return result as Definitions.ItemPagingSchema;
		},
		getCategories: () : Definitions.ItemType[] => {
			return [
				Definitions.ItemType.LAPTOP,
				Definitions.ItemType.TABLET,
				Definitions.ItemType.SMARTPHONE,
				Definitions.ItemType.PERIPHERAL
			]
		},
		getUserInfo: async (_: void, __: void, { currentUserToken }) : Promise<Definitions.UserSchema> => {
			const userID = await Token.getIDfromToken(currentUserToken);

			return User.getUserInfo(userID);
		}
	},
	Mutation: {
		login: async ( _: void, args ): Promise<Definitions.AuthSchema> => {
			const data: Definitions.LoginInputSchema = args.data;

			return await User.login(data);
		},
		register: async ( _: void, args ): Promise<Definitions.AuthSchema> => {
			const data: Definitions.RegisterInputSchema = args.data;

			return await User.register(data);
		},
		logout: async ( _: void, __: void, { currentUserToken }): Promise<boolean> => {
			return await User.logout(currentUserToken);
		},
		uploadImage: async ( _: void, args, { currentUserToken }): Promise<Definitions.ImageSchema> => {
			await Token.getIDfromToken(currentUserToken);

			return await Image.uploadImage(args.image);
		},

		addItem: async ( _: void, args, { currentUserToken }): Promise<Definitions.ItemOutputSchema> => {
			await Token.getIDfromToken(currentUserToken);

			const data: Definitions.ItemInputSchema = args.data;
			let result;

			// Rewrite this to generics (create function, that resolves type and return interface) (Create interface)
			if(data.category === Definitions.ItemType.LAPTOP) {
				result = await Laptop.addToDatabase(data);
			}

			if(data.category === Definitions.ItemType.SMARTPHONE) {
				result = await Smartphone.addToDatabase(data);
			}

			if(data.category === Definitions.ItemType.TABLET) {
				result = await Tablet.addToDatabase(data);
			}

			if(data.category === Definitions.ItemType.PERIPHERAL) {
				result = await Peripheral.addToDatabase(data);
			}

			return result as Definitions.ItemOutputSchema;
		},
		removeFromDatabase: async ( _: void, args: Definitions.RemoveFromDatabaseSchema) : Promise<boolean> => {
			await Item.removeFromDatabase(args.itemID, args.delta);

			return true;
		},
		updateItem: async ( _: void, args, { currentUserToken }): Promise<Definitions.ItemOutputSchema> => {
			await Token.getIDfromToken(currentUserToken);

			const item: Definitions.ItemInputSchema = args.item;
			const id: number = args.id;
			let result;

			if(item.category === Definitions.ItemType.LAPTOP) {
				result = await Laptop.updateItem(item, id);
			}

			if(item.category === Definitions.ItemType.SMARTPHONE) {
				result = await Smartphone.updateItem(item, id);
			}

			if(item.category === Definitions.ItemType.TABLET) {
				result = await Tablet.updateItem(item, id);
			}

			if(item.category === Definitions.ItemType.PERIPHERAL) {
				result = await Peripheral.updateItem(item, id);
			}

			return result as Definitions.ItemOutputSchema;
		},

		addItemToBasket: async ( _:void, args, { currentUserToken }) : Promise<Definitions.BasketOutput> => {
			const userID = await Token.getIDfromToken(currentUserToken);
			const itemID = args.itemID;

			await Basket.addItemToBasket(userID, itemID);
			const currentBasketItems: Definitions.BasketOutput = {
				items: await Basket.getUserBasketItems(userID)
			};;

			return currentBasketItems;
		},
		removeItemFromBasket: async ( _:void, args, { currentUserToken }) : Promise<Definitions.BasketOutput> => {
			const userID = await Token.getIDfromToken(currentUserToken);
			const itemID = args.itemID;

			await Basket.removeItemFromBasket(userID, itemID);
			const currentBasketItems: Definitions.BasketOutput = {
				items: await Basket.getUserBasketItems(userID)
			};;

			return currentBasketItems;
		},

		processPayment: async ( _: void, __: void, {currentUserToken}) : Promise<Definitions.Payment> => {
			const userID = await Token.getIDfromToken(currentUserToken);

			return await Payment.processPayment(userID);
		}
	}
}

export default resolverMap;
