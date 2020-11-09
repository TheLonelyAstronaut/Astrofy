import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import fs from 'fs';
import * as path from 'path'
import crypto from 'crypto';

export class AWSConnector {
	private S3Client: S3Client | undefined;
	private _BUCKET_NAME: string = 'astrofy';
	private _REGION: string = 'us-east-2';
	private _S3_URL: string = 'https://astrofy.s3.us-east-2.amazonaws.com/';

	initialize = () => {
		this.S3Client = new S3Client({
			region: this._REGION
		})
	}

	uploadImage = async (fileName: string) : Promise<string> => {
		const newName: string = crypto.randomBytes(64).toString('hex');
		const projectRootPath = path.resolve('./')
		const fileStream = fs.createReadStream(projectRootPath + '/temp_data/' + fileName);

		fileStream.on('error', (err) => {
			console.error(err);
		})

		const uploadParams: PutObjectCommandInput = {
			Bucket: this._BUCKET_NAME,
			ACL: 'public-read',
			Key: newName,
			Body: fileStream
		} as PutObjectCommandInput;

		await this.getS3Object().send(new PutObjectCommand(uploadParams));

		return this._S3_URL + fileName;
	}

	getS3Object = (): S3Client => {
		return this.S3Client as S3Client;
	}
}

const connector: AWSConnector = new AWSConnector();
export default connector;