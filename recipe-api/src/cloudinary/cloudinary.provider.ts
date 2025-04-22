// src/cloudinary/cloudinary.provider.ts
import { Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';


export const CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        
        const logger = new Logger("fasdfsadfasdfasdf")
        logger.log( "==================== : ", process.env.CLOUDINARY_CLOUD_NAME);
        logger.log( "==================== : ", process.env);
        
        return cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            // api_key: "344935136281222",
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    },
};
