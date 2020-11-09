import { Sequelize } from 'sequelize';

export class DatabaseConnector {
	static _HOST: string;
	static _DATABASE: string;
	static _USER: string;
	static _PORT: number;
	static _PASSWORD: string;
	private sequelizeObject: Sequelize | undefined;

	initialize = () => {
		DatabaseConnector._HOST = process.env.DATABASE_HOST as string;
		DatabaseConnector._DATABASE = process.env.DATABASE_NAME as string;
		DatabaseConnector._USER = process.env.DATABASE_USER as string;
		DatabaseConnector._PORT = parseInt(process.env.DATABASE_PORT as string, 10);
		DatabaseConnector._PASSWORD = process.env.DATABASE_PASSWORD as string;

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
		return this.sequelizeObject as Sequelize;
	}
}

const connector: DatabaseConnector = new DatabaseConnector();
export default connector;