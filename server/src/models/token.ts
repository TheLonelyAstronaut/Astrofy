import { Model, DataTypes } from 'sequelize';
import DatabaseConnector from './database-connector';
import * as Definitions from '../types/definitions';
import crypto from 'crypto';

export default class Token extends Model implements Definitions.TokenSchema {
	public id!: number;
	public token!: string;
	public userID!: number;
	public isActive!: boolean;

	// Auto throws error if same token exists
	static generateTokenForID = async (userID: number) : Promise<string> => {
		const token = crypto.randomBytes(64).toString('hex');

		const result = await Token.create({
			isActive: true,
			token,
			userID
		});

		return result.token;
	}

	static getIDfromToken = async (token: string) : Promise<number> => {
		const result: Token | null = await Token.findOne({
			where: {
				token
			}
		})

		if(!result || !result.isActive) {
			throw new Error('Invalid token');
		}

		return result.userID;
	}

	static deactivateToken = async (token: string) : Promise<boolean> => {
		const result: Token | null = await Token.findOne({
			where: {
				token
			}
		})

		if(!result || !result.isActive) {
			throw new Error('Invalid token');
		}

		result.isActive = false;
		await result.save();

		return true;
	}
}

export const initToken = () => {
	Token.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false
		},
		userID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'user_id'
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			field: 'is_active'
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'tokens',
		modelName: 'Token',
		timestamps: false
	});
}