import * as Definitions from '../../types/definitions';
import DatabaseConnector from '../database-connector';
import { Model, DataTypes } from 'sequelize';
import Item from '../item';

export default class Smartphone extends Model implements Definitions.Smartphone {
	public id!: number;
	public manufacturer!: string;
	public model!: string;
	public category!: Definitions.ItemType;
	public description!: string;
	public quantity!: number;
	public cost!: number;

	public SoC!: string;
	public RAM!: number;
	public diagonal!: number;
	public driveCapacity!: number;
	public batteryCapacity!: number;

	static addToDatabase = async (data: Definitions.Smartphone) : Promise<Definitions.Smartphone> => {
		const item: Item = await Item.addToDatabase(data as Definitions.Item);

		let smartphone: Smartphone = await Smartphone.create({
			id: item.id,
			SoC: data.SoC,
			RAM: data.RAM,
			diagonal: data.diagonal,
			driveCapacity: data.driveCapacity,
			batteryCapacity: data.batteryCapacity
		})

		smartphone = { ...smartphone.get(), ...item.get() };

		return smartphone;
	}

	static getItemFromDatabase = async (itemID: number) : Promise<Definitions.Smartphone> => {
		const item: Item = await Item.getItemFromDatabase(itemID);
		const smartphone: Smartphone | null = await Smartphone.findOne({
			where: {
				id: itemID
			}
		})

		if(!smartphone) {
			throw new Error('Incorrect item ID');
		}

		const result = { ...smartphone.get(), ...item.get() };

		return result;
	}

	static getAllItemsFromDatabase = async (pageNumber: number) : Promise<Definitions.Smartphone[]> => {
		const items: Item[] = await Item.getAllItemsFromDatabase(Definitions.ItemType.SMARTPHONE, pageNumber);

		const smartphones: Smartphone[] = await Smartphone.findAll({
			limit: Item._LIMIT,
			offset: Item._LIMIT * pageNumber
		});

		return smartphones.map((item, index) => {
			return { ...item.get(), ...items[index].get() } as Definitions.Smartphone
		});
	}
}

export const initSmartphone = () => {
	Smartphone.init({
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
		tableName: 'smartphones',
		modelName: 'Smartphone',
		timestamps: false
	})
}