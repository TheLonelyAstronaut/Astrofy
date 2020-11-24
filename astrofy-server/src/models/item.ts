import * as Definitions from '../types/definitions';
import DatabaseConnector from './database-connector';
import { Model, DataTypes } from 'sequelize';
import Image from './image'
import { Op } from 'sequelize';
import Laptop from './items/laptop';
import Smartphone from './items/smartphone';
import Tablet from './items/tablet';
import Peripheral from './items/peripheral';

export default class Item extends Model implements Definitions.PhotoItem {
	public id!: number;
	public manufacturer!: string;
	public model!: string;
	public category!: Definitions.ItemType;
	public description!: string;
	public quantity!: number;
	public cost!: number;
	public photos!: Definitions.ImageSchema[];

	public static _LIMIT: number = 20;

	static addToDatabase = async (data: Definitions.ItemInputSchema) : Promise<Item> => {
		const item: Item = await Item.create({
			manufacturer: data.manufacturer,
			model: data.model,
			category: data.category,
			description: data.description,
			quantity: data.quantity,
			cost: data.cost
		})

		item.photos = await Image.setItemIdToImage(data.photos, item.id);

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

	static getAllItemsFromDatabase = async (category: Definitions.ItemType, pageNumber: number) : Promise<Definitions.BaseItemPagingSchema> => {
		const items: Item[] = await Item.findAll({
			limit: Item._LIMIT,
			offset: Item._LIMIT * pageNumber,
			where: {
				category
			},
			order: [ [ 'id', 'DESC' ] ]
		});

		const totalCount = await Item.count({
			where: {
				category
			}
		})

		for await (const item of items) {
			item.photos = await Image.getAllItemImages(item.id);
		}

		return {
			totalCount,
			items
		};
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

		item.photos = await Image.getAllItemImages(item.id);

		return item;
	}

	static updateItem = async (item: Definitions.ItemInputSchema, id: number) : Promise<Item> => {
		const updatedBaseItem = await Item.findOne({
			where: {
				id
			}
		})

		if(!updatedBaseItem) {
			throw new Error('Invalid item id');
		}

		Object.keys({...updatedBaseItem.get()}).forEach(key => {
			Object.assign(updatedBaseItem, { [key]: (item as any)[key] })
		})

		console.log(updatedBaseItem.get())
		await updatedBaseItem.save();
		updatedBaseItem.photos = await Image.updateItemImages(item.photos, id);

		return updatedBaseItem;
	}

	static searchItem = async (substring: string) : Promise<Definitions.ItemOutputSchema[]> => {
		const itemIDs = await Item.findAll({
			where: {
				manufacturer: {
					[Op.substring]: substring
				},
				model: {
					[Op.substring]: substring
				}
			}
		});

		if (!itemIDs) {
			return [];
		}

		const returnable: Definitions.ItemOutputSchema[] = [];

		for await (const item of itemIDs) {
			let result: Definitions.ItemOutputSchema = {} as Definitions.ItemOutputSchema;

			if(item.category === Definitions.ItemType.LAPTOP) {
				result = (await Laptop.getItemFromDatabase(item.id)) as Definitions.ItemOutputSchema;
			}

			if(item.category === Definitions.ItemType.SMARTPHONE) {
				result = (await Smartphone.getItemFromDatabase(item.id)) as Definitions.ItemOutputSchema;
			}

			if(item.category === Definitions.ItemType.TABLET) {
				result = (await Tablet.getItemFromDatabase(item.id)) as Definitions.ItemOutputSchema;
			}

			if(item.category === Definitions.ItemType.PERIPHERAL) {
				result = (await Peripheral.getItemFromDatabase(item.id)) as Definitions.ItemOutputSchema;
			}

			returnable.push(result);
		}

		return returnable;
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
