import AWS from 'aws-sdk';
import crypto from 'crypto';
import * as Definitions from '../types/definitions';
import {ReadStream} from 'fs';
// import * as stream from 'stream';

export class AWSConnector {
	private S3Client: AWS.S3 | undefined;
	private _BUCKET_NAME: string = 'astrofy';
	private _REGION: string = 'us-east-2';

	initialize = () => {
		this.S3Client = new AWS.S3({
			region: this._REGION
		})
	}

	uploadImage = async (image: Definitions.Upload) : Promise<string> => {
		const newName: string = crypto
			.randomBytes(16)
			.toString('hex') + '.' +
			image.mimetype.split('/')[1];

		const stream: ReadStream = image.createReadStream();

		const result = await this.getS3Object().upload({
			Bucket: this._BUCKET_NAME,
			ACL: 'public-read',
			Key: newName,
			Body: stream,
			ContentType: image.mimetype
		}).promise();

		return result.Location;
	}

	getS3Object = (): AWS.S3 => {
		return this.S3Client as AWS.S3;
	}
}

const connector: AWSConnector = new AWSConnector();
export default connector;
