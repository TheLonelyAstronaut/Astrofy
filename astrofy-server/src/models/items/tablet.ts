import * as Definitions from '../../types/definitions';
import DatabaseConnector from '../database-connector';
import { Model, DataTypes } from 'sequelize';
import Item from '../item';

export default class Tablet extends Model implements Definitions.Tablet {
	public id!: number;
	public manufacturer!: string;
	public model!: string;
	public category!: Definitions.ItemType;
	public description!: string;
	public quantity!: number;
	public cost!: number;
	public photos!: Definitions.ImageSchema[];

	public SoC!: string;
	public RAM!: number;
	public diagonal!: number;
	public driveCapacity!: number;
	public batteryCapacity!: number;

	static addToDatabase = async (data: Definitions.ItemInputSchema) : Promise<Definitions.Tablet> => {
		const item: Item = await Item.addToDatabase(data);

		let tablet: Tablet = await Tablet.create({
			id: item.id,
			SoC: data.SoC,
			RAM: data.RAM,
			diagonal: data.diagonal,
			driveCapacity: data.driveCapacity,
			batteryCapacity: data.batteryCapacity
		})

		tablet = { ...tablet.get(), ...item.get(), photos: item.photos };

		return tablet;
	}

	static getItemFromDatabase = async (itemID: number) : Promise<Definitions.Tablet> => {
		const item: Item = await Item.getItemFromDatabase(itemID);
		const tablet: Tablet | null = await Tablet.findOne({
			where: {
				id: itemID
			}
		})

		if(!tablet) {
			throw new Error('Incorrect item ID');
		}

		const result = { ...tablet.get(), ...item.get(), photos: item.photos  };

		return result;
	}

	static getAllItemsFromDatabase = async (pageNumber: number) : Promise<Definitions.ItemPagingSchema> => {
		const items: Definitions.BaseItemPagingSchema = await Item.getAllItemsFromDatabase(Definitions.ItemType.TABLET, pageNumber);

		const tablets: Tablet[] = await Tablet.findAll({
			limit: Item._LIMIT,
			offset: Item._LIMIT * pageNumber,
			order: [ [ 'item_id', 'DESC' ]]
		});

		const resultItems = tablets.map((item, index) => {
			return { ...item.get(), ...(items.items[index] as any).get(), photos: items.items[index].photos  } as Definitions.Tablet
		});

		return {
			totalCount: items.totalCount,
			items: resultItems as Definitions.ItemOutputSchema[]
		};
	}

	static updateItem = async (item: Definitions.ItemInputSchema, id: number) : Promise<Definitions.ItemOutputSchema> => {
		const updatedBaseItem: Item = await Item.updateItem(item, id);

		const updatedChildItem: Tablet = await Tablet.findOne({
			where: {
				id
			}
		}) as Tablet;

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

export const initTablets = () => {
	Tablet.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'item_id'
		},
		SoC: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'soc'
		},
		RAM: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: false,
			field: 'ram'
		},
		diagonal: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		driveCapacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'drive_capacity'
		},
		batteryCapacity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'battery_capacity'
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'tablets',
		modelName: 'Tablet',
		timestamps: false
	})
}
