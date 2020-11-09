import * as Definitions from '../types/definitions';
import DatabaseConnector from './database-connector';
import { Model, DataTypes } from 'sequelize';

export default class Item extends Model implements Definitions.Item {
	public id!: number;
	public manufacturer!: string;
	public model!: string;
	public category!: Definitions.ItemType;
	public description!: string;
	public quantity!: number;
	public cost!: number;

	public static _LIMIT: number = 20;

	static addToDatabase = async (data: Definitions.Item) : Promise<Item> => {
		const item: Item = await Item.create({
			manufacturer: data.manufacturer,
			model: data.model,
			category: data.category,
			description: data.description,
			quantity: data.quantity,
			cost: data.cost
		})

		return item;
	}

	static removeFromDatabase = async (itemID: number, delta: number) : Promise<boolean> => {
		const item = await Item.getItemFromDatabase(itemID);

		if(item.quantity < delta) {
			throw new Error('Not enough items');
		}

		item.quantity -= delta;
		await item.save();

		return true;
	}

	static getAllItemsFromDatabase = async (category: Definitions.ItemType, pageNumber: number) : Promise<Item[]> => {
		const items: Item[] = await Item.findAll({
			limit: Item._LIMIT,
			offset: Item._LIMIT * pageNumber,
			where: {
				category
			}
		});

		return items;
	}

	static getItemCategory = async (itemID: number) : Promise<Definitions.ItemType> => {
		const item = await Item.getItemFromDatabase(itemID);

		return item.category;
	}

	static getItemFromDatabase = async (itemID: number): Promise<Item> => {
		const item: Item | null = await Item.findOne({
			where: {
				id: itemID
			}
		})

		if(!item) {
			throw new Error('Incorrect item ID');
		}

		return item;
	}
}

export const initItem = () => {
	Item.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		manufacturer: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: false
		},
		model: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: false
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: false
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: false,
		},
		cost: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'items',
		modelName: 'Item',
		timestamps: false
	})
}