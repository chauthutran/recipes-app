import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './recipes/recipes.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MealPlanService } from './meal-plan/meal-plan.service';
import { MealPlanModule } from './meal-plan/meal-plan.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env.local', // <-- load your .env.local
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
            }),
            inject: [ConfigService],
        }),
        RecipesModule,
        UsersModule,
        CategoriesModule,
        CloudinaryModule,
        MealPlanModule,
    ],
    controllers: [AppController, CloudinaryController],
    providers: [AppService, MealPlanService],
})
export class AppModule {}
