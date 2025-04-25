import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { getLimit, getPage } from './../utils/recipeUtils';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    ParseArrayPipe,
    Post,
    Put,
    Query,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from 'src/schemas/recipe.schema';
import { RECIPES_PER_PAGE } from 'src/constants/app.constant';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('recipes')
export class RecipesController {
    constructor(
        private readonly recipeService: RecipesService,
    ) {}

    @Post()
    create(@Body() data: Partial<Recipe>) {
        return this.recipeService.create(data);
    }

    @Get()
    findAll(@Query('limit') limit: string, @Query('page') page: string) {
        const limitNumber = getLimit(limit);
        const pageNumber = parseInt(page) || 1;
        return this.recipeService.findAll({
            limit: limitNumber,
            page: pageNumber,
        });
    }

    @Get('view/:id')
    findOne(@Param('id') id: string) {
        return this.recipeService.findOne(id);
    }

    @Get('top-pick')
    findByRating(@Query('top') top: string) {
        return this.recipeService.findByRating(getLimit(top));
    }

    @Get('trending')
    findTrending(@Query('limit') limit: string) {
        return this.recipeService.findTrending(getLimit(limit));
    }

    @Get('popular-users-amount')
    findByUserSaves(@Query('limit') limit: string) {
        const limitNumber = getLimit(limit);
        return this.recipeService.findPopularCategoriesByRecipeSaves(
            limitNumber,
        );
    }

    @Get('popular-recipes-amount')
    findByRecipesAmount(@Query() limit: string) {
        const limitNumber = getLimit(limit); // Default to 5 if not provided
        return this.recipeService.findPopularCategoriesByRecipeAmount(
            limitNumber,
        );
    }

    @Get('favorites')
    findUserFavoriteRecipes(@Query('limit') limit: string): Promise<Recipe[]> {
        const limitNumber = getLimit(limit); // Default to 5 if not provided
        return this.recipeService.findUserFavorite(limitNumber);
    }

    @Get('query')
    async searchRecipes(
        @Query('userId') userId?: string,
        @Query('search') search?: string,
        @Query('ingredients') ingredients?: string[], // comma separated in URL

        @Query(
            'categories',
            new ParseArrayPipe({
                items: String,
                separator: ',', // split on commas
                optional: true, // so missing param doesn’t error
            }),
        )
        categories?: string[],

        @Query(
            'dietary',
            new ParseArrayPipe({
                items: String,
                separator: ',', // split on commas
                optional: true, // so missing param doesn’t error
            }),
        )
        dietary?: string[],

        @Query('limit') limit = RECIPES_PER_PAGE,
        @Query('page') page = 1,
    ): Promise<Recipe[]> {
        try {
            return this.recipeService.search({
                userId,
                search,
                ingredients,
                categories,
                dietary,
                limit: Number(limit),
                page: Number(page),
            });
        } catch (error) {
            throw new HttpException(
                'Failed to fetch recipes',
                error.message || error,
            );
        }
    }

    @Get('categories')
    findByCategory(@Query('id') ids: string[]) {
        return this.recipeService.findByCategory(ids);
    }

    @Put("/:id")
    update(@Param('id') id: string, @Body() data: Partial<Recipe>) {
        return this.recipeService.update(id, data);
    }

    @Delete("/:id")
    delete(@Param('id') id: string) {
        return this.recipeService.delete(id);
    }
}
