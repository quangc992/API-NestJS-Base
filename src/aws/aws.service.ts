import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'


@Injectable()
export class AwsService { 
    constructor(
        private configService: ConfigService
    ){}

    bucsketName = this.configService.get('AWS_BUCKET_NAME')
    s3 = new S3({
        accessKeyId: this.configService.get('ACCESS_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
    })

    async upLoadPublicFile(dataBuffre: Buffer, filename:string){
        try {
            const uploadResult = await this.s3
            .upload({
                Bucket: this.bucsketName,
                Body: dataBuffre,
                Key: `${filename}`,
                ACL: 'puclic-read',
                ContentDisposition: 'inline',
            })
            .promise();
            return uploadResult;
            
        } catch (error) {
            
        }
    }
}
