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

	public additionalInfo!: string;

	static addToDatabase = async (data: Definitions.Peripheral) : Promise<Definitions.Peripheral> => {
		const item: Item = await Item.addToDatabase(data as Definitions.Item);

		let peripheral: Peripheral = await Peripheral.create({
			id: item.id,
			additionalInfo: data.additionalInfo
		})

		peripheral = { ...peripheral.get(), ...item.get() };

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

		const result = { ...peripheral.get(), ...item.get() };

		return result;
	}

	static getAllItemsFromDatabase = async (pageNumber: number) : Promise<Definitions.Peripheral[]> => {
		const items: Item[] = await Item.getAllItemsFromDatabase(Definitions.ItemType.PERIPHERAL, pageNumber);

		const peripherals: Peripheral[] = await Peripheral.findAll({
			limit: Item._LIMIT,
			offset: Item._LIMIT * pageNumber
		});

		return peripherals.map((item, index) => {
			return { ...item.get(), ...items[index].get() } as Definitions.Peripheral
		});
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