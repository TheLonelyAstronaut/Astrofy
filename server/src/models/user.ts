import * as Definitions from '../types/definitions';
import { Model, DataTypes } from 'sequelize';
import DatabaseConnector from './database-connector';
import Token from './token';
import Basket from './basket';
import Payment from './payment';
import crypro from 'crypto';

export default class User extends Model implements Definitions.UserSchema{
	public id!: number;
	public username!: string;
	public email!: string;
	public address!: string;
	public birthDate!: string;
	public basket!: Definitions.ItemOutputSchema[];
	public payments!: Definitions.Payment[];
	public isAdmin!: boolean;

	static login = async (data: Definitions.LoginInputSchema) : Promise<Definitions.AuthSchema> => {
		const passwordSalt = crypro.scryptSync(data.password, 'Astronaut', 64).toString('utf-8');

		const result: User | null = await User.findOne({
			where: {
				username: data.username,
				password: passwordSalt
			}
		});

		if(!result) {
			throw new Error('Invalid data');
		}

		result.basket = await Basket.getUserBasketItems(result.id);
		result.payments = await Payment.getUserPayments(result.id);


		return {
			user: result,
			token: await Token.generateTokenForID(result.id)
		};
	}

	// Auto throws error if user with same username or email exists
	static register = async (data: Definitions.RegisterInputSchema) : Promise<Definitions.AuthSchema> => {
		const passwordSalt = crypro.scryptSync(data.password, 'Astronaut', 64).toString('utf-8');

		const result: User = await User.create({
			...data,
			password: passwordSalt
		});

		result.basket = await Basket.getUserBasketItems(result.id);
		result.payments = await Payment.getUserPayments(result.id);

		return {
			user: result,
			token: await Token.generateTokenForID(result.id)
		};
	}

	static logout = async (token: string) : Promise<boolean> => {
		return await Token.deactivateToken(token);
	}

	static getUserInfo = async (userID: number): Promise<User> => {
		const user = await User.findOne({
			where: {
				id: userID
			}
		}) as User;

		user.basket = await Basket.getUserBasketItems(userID);
		user.payments = await Payment.getUserPayments(userID);

		return user;
	}
}

export const initUser = () => {
	User.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		birthDate: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'birth_date'
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'is_admin'
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'users',
		modelName: 'User',
		timestamps: false
	});
}