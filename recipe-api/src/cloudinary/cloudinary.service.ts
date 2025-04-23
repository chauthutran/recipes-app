import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    constructor(private configService: ConfigService) {
        const logger = new Logger("fasfsadfasdfsdaf sadfsa");
        logger.log("asdfasdfasdfa: " , this.configService.get<string>('CLOUDINARY_CLOUD_NAME'));
        
        cloudinary.config({
          cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
          api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
          api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        });
      }
      
    async uploadToCloudinary(
        file: Express.Multer.File,
    ): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'recipes' },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result)
                        return reject(
                            new Error('No result returned from Cloudinary'),
                        );
                    resolve(result); // ✅ Now guaranteed to be UploadApiResponse
                },
            );

            if (!file.buffer) return reject(new Error('File buffer is missing'));
            
            Readable.from(file.buffer).pipe(uploadStream);
        });
    }
}
