import { Sequelize } from 'sequelize';

export class DatabaseConnector {
	static _HOST: string = 'ec2-54-247-122-209.eu-west-1.compute.amazonaws.com';
	static _DATABASE: string = 'd5tjuvq3lqhmq6';
	static _USER: string = 'ntgglftycvhcdq';
	static _PORT: number = 5432;
	static _PASSWORD: string = 'dbb17ba4de4db13d5d487b2c66548ae35e71e1940f2fd68c7773cab67b990618';
	readonly sequelizeObject: Sequelize;

	constructor() {
		this.sequelizeObject = new Sequelize(
			DatabaseConnector._DATABASE,
			DatabaseConnector._USER,
			DatabaseConnector._PASSWORD,
			{
				dialect: 'postgres',
				dialectOptions: {
					ssl: {
						require: true,
						rejectUnauthorized: false
					}
				},
				ssl: true,
				protocol: 'postgres',
				host: DatabaseConnector._HOST,
				port: DatabaseConnector._PORT
			}
		);
	}

	getSequelizeObject = () : Sequelize => {
		return this.sequelizeObject;
	}
}

const connector: DatabaseConnector = new DatabaseConnector();
export default connector;