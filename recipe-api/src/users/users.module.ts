import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.Schema';
import { PasswordService } from './PasswordService';
import { RecipesService } from 'src/recipes/recipes.service';
import { Recipe, RecipeSchema } from 'src/schemas/recipe.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Recipe.name, schema: RecipeSchema },
        ]),
    ],
    controllers: [UsersController],
    providers: [UsersService, PasswordService, RecipesService],
})
export class UsersModule {}
