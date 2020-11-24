import * as Definitions from '../types/definitions';
import DatabaseConnector from './database-connector';
import { Model, DataTypes } from 'sequelize';
import Basket from './basket';
import Item from './item';

export default class Payment extends Model implements Definitions.Payment {
	public paymentID!: number;
	public createdAt!: string;
	public items!: Definitions.ItemOutputSchema[];
	public basketID!: number;
	public userID!: number;

	static processPayment = async (userID: number): Promise<Payment> => {
		const basket = await Basket.getUserBasket(userID);
		const toFilter = basket.items;

		basket.items.forEach(item => {
			Item.removeFromDatabase(item, toFilter.filter(filtering => filtering === item).length)
		})

		const payment = await Payment.create({
			basketID: basket.id,
			userID
		});

		payment.items = await Basket.getUserBasketItems(userID);
		await Basket.makeInactive(userID);

		payment.userID = userID;

		return payment;
	}

	static getUserPayments = async (userID: number): Promise<Payment[]> => {
		const payments: Payment[] = await Payment.findAll({
			where: {
				userID
			}
		});

		return payments;
	}
}

export const initPayment = () => {
	Payment.init({
		paymentID: {
			field: 'id',
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
			type: DataTypes.NUMBER
		},
		basketID: {
			type: DataTypes.NUMBER,
			unique: true,
			allowNull: false,
			field: 'basket_id'
		},
		userID: {
			type: DataTypes.NUMBER,
			allowNull: false,
			field: 'user_id'
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'payments',
		modelName: 'Payment',
		timestamps: false
	})
}
