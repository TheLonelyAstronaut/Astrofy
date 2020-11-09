import * as Definitions from '../../types/definitions';
import DatabaseConnector from '../database-connector';
import { Model, DataTypes } from 'sequelize';
import Item from '../item';

export default class Laptop extends Model implements Definitions.Laptop {
	public id!: number;
	public manufacturer!: string;
	public model!: string;
	public category!: Definitions.ItemType;
	public description!: string;
	public quantity!: number;
	public cost!: number;

	public CPU!: string;
	public GPU!: string;
	public RAM!: number;
	public diagonal!: number;
	public driveCapacity!: number;
	public batteryCapacity!: number;

	static addToDatabase = async (data: Definitions.Laptop) : Promise<Definitions.Laptop> => {
		const item: Item = await Item.addToDatabase(data as Definitions.Item);

		let laptop: Laptop = await Laptop.create({
			id: item.id,
			CPU: data.CPU,
			GPU: data.GPU,
			RAM: data.RAM,
			diagonal: data.diagonal,
			driveCapacity: data.driveCapacity,
			batteryCapacity: data.batteryCapacity
		})

		laptop = { ...laptop.get(), ...item.get() };

		return laptop;
	}

	static getItemFromDatabase = async (itemID: number) : Promise<Definitions.Laptop> => {
		const item: Item = await Item.getItemFromDatabase(itemID);
		const laptop: Laptop | null = await Laptop.findOne({
			where: {
				id: itemID
			}
		})

		if(!laptop) {
			throw new Error('Incorrect item ID');
		}

		const result = { ...laptop.get(), ...item.get() };

		return result;
	}

	static getAllItemsFromDatabase = async (pageNumber: number) : Promise<Definitions.Laptop[]> => {
		const items: Item[] = await Item.getAllItemsFromDatabase(Definitions.ItemType.LAPTOP, pageNumber);

		const laptops: Laptop[] = await Laptop.findAll({
			limit: Item._LIMIT,
			offset: Item._LIMIT * pageNumber
		});

		return laptops.map((item, index) => {
			return { ...item.get(), ...items[index].get() } as Definitions.Laptop
		});
	}
}

export const initLaptop = () => {
	Laptop.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			field: 'item_id'
		},
		CPU: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'cpu'
		},
		GPU: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'gpu'
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
		tableName: 'laptops',
		modelName: 'Laptop',
		timestamps: false
	})
}