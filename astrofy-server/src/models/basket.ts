import * as Definitions from '../types/definitions';
import DatabaseConnector from './database-connector';
import { Model, DataTypes } from 'sequelize';
import { getItemFromDatabase } from '../types/index';

export default class Basket extends Model implements Definitions.Basket {
	public items!: number[];
	public id!: number;
	public userID!: number;
	public isActual!: boolean;

	static addItemToBasket = async (userID: number, itemID: number) : Promise<Basket> => {
		const [ basket, newBasket ] : [ Basket, boolean ] = await Basket.findOrCreate({
			where: {
				userID,
				isActual: true
			},
			defaults: {
				isActual: true,
				items: []
			}
		})

		if(newBasket) basket.items = [];

		basket.items.push(itemID);
		basket.isActual = true;
		basket.changed('items', true);
		await basket.save();

		return basket;
	}

	static removeItemFromBasket = async (userID: number, itemID: number) : Promise<Basket> => {
		const basket = await Basket.getUserBasket(userID);

		basket.items.slice(basket.items.indexOf(itemID), 1);
		basket.changed('items', true);
		await basket.save();

		return basket;
	}

	static makeInactive = async (userID: number) : Promise<boolean> => {
		const basket = await Basket.getUserBasket(userID);

		basket.isActual = false;
		basket.changed('isActual', true);
		await basket.save();

		return true;
	}

	static getUserBasket = async (userID: number, basketID: number = 0): Promise<Basket> => {
		const where: any = {
			userID,
			isActual: basketID === 0 ? true : false,
		}

		if(basketID) where.id = basketID;

		const [ basket ] : [ Basket , boolean ] = await Basket.findOrCreate({
			where,
			defaults: {
				isActual: true,
				items: []
			}
		})

		if(!basket) {
			throw new Error('Incorrect basket variable');
		}

		return basket;
	}

	static getUserBasketItems = async (userID: number, basketID: number = 0): Promise<Definitions.ItemOutputSchema[]> => {
		const currentBasketIDs =  await Basket.getUserBasket(userID, basketID);
		const currentBasketItems: Definitions.ItemOutputSchema[] = [];

		for await (const id of currentBasketIDs.items) {
			currentBasketItems.push(
				await getItemFromDatabase({} as any, { itemID: id })
			)
		}

		return currentBasketItems;
	}

	static getBasketByID = async (basketID: number) : Promise<Basket> => {
		return await Basket.findOne({
			where: {
				id: basketID
			}
		}) as Basket;
	}
}

export const initBasket = () => {
	Basket.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userID: {
			type: DataTypes.NUMBER,
			allowNull: false,
			primaryKey: false,
			field: 'user_id'
		},
		isActual: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			primaryKey: false,
			field: 'is_actual'
		},
		items: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			allowNull: false,
			primaryKey: false
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'baskets',
		modelName: 'Basket',
		timestamps: false
	})
}