import { Model, DataTypes } from 'sequelize';
import DatabaseConnector from './database-connector';
import * as Definitions from '../types/definitions';
// import crypto from 'crypto';
import AWSConnector from './aws-s3-connector';

export default class Image extends Model implements Definitions.ImageSchema {
	public id!: number;
	public url!: string;
	public itemID!: number;

	static uploadImage = async (image: Promise<Definitions.Upload>) : Promise<Definitions.ImageSchema> => {
		const result = await AWSConnector.uploadImage(await image);
		const newImage: Image = await Image.create({
			url: result
		});

		return newImage.get();
	}
}

export const initImage = () => {
	Image.init({
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		itemID: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'item_id'
		}
	}, {
		sequelize: DatabaseConnector.getSequelizeObject(),
		tableName: 'images',
		modelName: 'Image',
		timestamps: false
	});
}
