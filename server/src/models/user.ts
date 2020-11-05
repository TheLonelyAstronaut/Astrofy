import * as Definitions from '../types/definitions';
import { Model, DataTypes } from 'sequelize';
import DatabaseConnector from './database-connector';

export interface UserSchema {
	id: number;
	username: string;
	password: string;
}

export default class User extends Model {
	static login = async (data: Definitions.LoginScheme) : Promise<boolean> => {
		const result: User | null = await User.findOne({
			where: {
				username: data.username,
				password: data.password
			}
		});

		return result ? true : false;
	}

	static register = async (data: Definitions.RegisterScheme) : Promise<boolean> => {
		const result: User = await User.create({
			username: data.username,
			password: data.password
		});

		return result.isNewRecord;
	}
}

User.init({
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	sequelize: DatabaseConnector.getSequelizeObject(),
	tableName: 'users',
	modelName: 'User',
	timestamps: false
})