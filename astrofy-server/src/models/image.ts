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

	static setItemIdToImage = async (images: number[], itemID: number) : Promise<Definitions.ImageSchema[]> => {
		const fromDatabase = await Image.findAll({
			where: {
				id: images
			}
		})

		if(!fromDatabase) {
			throw new Error('Incorrect image IDs');
		}

		const result: Definitions.ImageSchema[] = [];

		fromDatabase.forEach(item => {
			item.itemID = itemID;
			item.save();

			result.push(item.get());
		})

		return result;
	}

	static getAllItemImages = async (itemID: number) : Promise<Definitions.ImageSchema[]> => {
		const fromDatabase = await Image.findAll({
			where: {
				itemID
			}
		})

		const result: Definitions.ImageSchema[] = [];

		fromDatabase.forEach(item => {
			result.push(item.get());
		})

		return result;
	}

	static updateItemImages = async (images: number[], itemID: number) : Promise<Definitions.ImageSchema[]> => {
		const fromDatabase = await Image.findAll({
			where: {
				itemID
			}
		})

		fromDatabase.forEach(image => {
			if(images.indexOf(image.id) === -1) {
				image.itemID = 0;
				image.save();
			}
		})

		const newImages = await Image.findAll({
			where: {
				id: images
			}
		})

		for await (const image of newImages) {
			image.itemID = itemID;
			await image.save();
		}

		return newImages.map(image => ({
			...image.get()
		}))
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
