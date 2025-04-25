import { BadRequestException, Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('cloudinary')
export class CloudinaryController {
     constructor(
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    // Upload image
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: memoryStorage(),
            limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB limit
        }),
    )
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        if (!file || !file.buffer) {
            throw new Error('No file or file buffer provided');
        }
        const uploadedImage =
            await this.cloudinaryService.uploadToCloudinary(file);
        return {
            url: uploadedImage.secure_url,
            public_id: uploadedImage.public_id,
        };
    }
    
    // Delete image
    @Delete("image")
    async deleteImage(@Body("imageUrl") imageUrl: string) {
        if (!imageUrl) {
            throw new BadRequestException("Image URL is required");
        }
        
        const result = await this.cloudinaryService.deleteImageFromCloudinary(imageUrl);
        
        if( result.result !== 'ok' ) {
            throw new BadRequestException("Failed to delete image");
        }
        
        return { message: 'Image deleted successfully', result };
    }
}
