import * as Definitions from '../../types/definitions';
import DatabaseConnector from '../database-connector';
import { Model, DataTypes } from 'sequelize';
import Item from '../item';

export default class Peripheral extends Model implements Definitions.Peripheral {
	public id!: number;
	public manufacturer!: string;
	public model!: string;
	public category!: Definitions.ItemType;
	public description!: string;
	public quantity!: number;
	public cost!: number;
	public photos!: Definitions.ImageSchema[];

	public additionalInfo!: string;

	static addToDatabase = async (data: Definitions.ItemInputSchema) : Promise<Definitions.Peripheral> => {
		const item: Item = await Item.addToDatabase(data);

		let peripheral: Peripheral = await Peripheral.create({
			id: item.id,
			additionalInfo: data.additionalInfo
		})

		peripheral = { ...peripheral.get(), ...item.get(), photos: item.photos  };

		return peripheral;
	}

	static getItemFromDatabase = async (itemID: number) : Promise<Definitions.Peripheral> => {
		const item: Item = await Item.getItemFromDatabase(itemID);
		const peripheral: Peripheral | null = await Peripheral.findOne({
			where: {
				id: itemID
			}
		})

		if(!peripheral) {
			throw new Error('Incorrect item ID');
		}

		const result = { ...peripheral.get(), ...item.get(), photos: item.photos  };

		return result;
	}

	static getAllItemsFromDatabase = async (pageNumber: number) : Promise<Definitions.ItemPagingSchema> => {
		const items: Definitions.BaseItemPagingSchema = await Item.getAllItemsFromDatabase(Definitions.ItemType.PERIPHERAL, pageNumber);

		const peripherals: Peripheral[] = await Peripheral.findAll({
			limit: Item._LIMIT,
			offset: Item._LIMIT * pageNumber,
			order: [ [ 'item_id', 'DESC' ]]
		});

		const resultItems = peripherals.map((item, index) => {
			return { ...item.get(), ...(items.items[index] as any).get(), photos: items.items[index].photos  } as Definitions.Peripheral
		});

		return {
			totalCount: items.totalCount,
			items: resultItems as Definitions.ItemOutputSchema[]
		};
	}

	static updateItem = async (item: Definitions.ItemInputSchema, id: number) : Promise<Definitions.ItemOutputSchema> => {
		const updatedBaseItem: Item = await Item.updateItem(item, id);

		const updatedChildItem: Peripheral = await Peripheral.findOne({
			where: {
				id
			}
		}) as Peripheral;

		Object.keys({...updatedChildItem.get()}).forEach(key => {
			Object.assign(updatedChildItem, { [key]: (item as any)[key] })
		})

		await updatedChildItem.save();

		return {
			...updatedChildItem.get(),
			...updatedBaseItem.get(),
			photos: updatedBaseItem.photos
		};
	}
}

export const initPeripheral = () => {
	Peripheral.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'item_id'
		},
		additionalInfo: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'additional_info'
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'peripherals',
		modelName: 'Peripheral',
		timestamps: false
	})
}
