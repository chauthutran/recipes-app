import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseArrayPipe,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from 'src/schemas/recipe.schema';

@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipeService: RecipesService) {}

    @Post()
    create(@Body() data: Partial<Recipe>) {
        return this.recipeService.create(data);
    }

    @Get()
    findAll( @Query('limit') limit = 10, @Query('page') page = 1,) {
        return this.recipeService.findAll({limit, page});
    }

    @Get()
    findOne(@Param('id') id: string) {
        return this.recipeService.findOne(id);
    }

    @Get('top-pick')
    findByRating(@Query('top') top: string) {
        const topNumber = parseInt(top) || 10; // Default to 10 if not provided
        return this.recipeService.findByRating(topNumber);
    }
    
    @Get('trending')
    findTrending(@Query('limit') limit: string) {
        const limitNumber = parseInt(limit) || 10; // Default to 10 if not provided
        return this.recipeService.findTrending(limitNumber);
    }
    
    @Get('recommended/:userId')
    findRecommended(@Param('userId') userId: string, @Query() limit: string) {
        const limitNumber = parseInt(limit) || 10; // Default to 10 if not provided
        return this.recipeService.findRecommended(userId, limitNumber);
    }
    
    @Get("popular-users-amount")
    findByUserSaves(@Query('limit') limit: string) {
        const limitNumber = parseInt(limit) || 5; // Default to 5 if not provided
        return this.recipeService.findPopularCategoriesByRecipeSaves(limitNumber);
    }
    
    @Get("popular-recipes-amount")
    findByRecipesAmount(@Query() limit: string) {
        const limitNumber = parseInt(limit) || 5; // Default to 5 if not provided
        return this.recipeService.findPopularCategoriesByRecipeAmount(limitNumber);
    }
    
    @Get('favorites')
    findUserFavoriteRecipes(@Query('limit') limit: string): Promise<Recipe[]> {
        const limitNumber = parseInt(limit) || 10; // Default to 5 if not provided
        return this.recipeService.findUserFavorite(limitNumber);
    }

    @Get("query")
    async searchRecipes(
        @Query('search') search?: string,
        @Query('ingredients') ingredients?: string[], // comma separated in URL
        
        @Query('categories', new ParseArrayPipe({
            items: String,
            separator: ',',      // split on commas
            optional: true,      // so missing param doesn’t error
        }))
        categories?: string[],
        
        @Query('dietary', new ParseArrayPipe({
            items: String,
            separator: ',',      // split on commas
            optional: true,      // so missing param doesn’t error
        }))
        dietary?: string[],
        @Query('limit') limit = 10,
        @Query('page') page = 1,
    ): Promise<Recipe[]> {
        return this.recipeService.search({
            search,
            ingredients,
            categories,
            dietary,
            limit: Number(limit),
            page: Number(page),
        });
    }

    @Get('categories')
    findByCategory(@Query('id') ids: string[]) {
        return this.recipeService.findByCategory(ids);
    }

    @Put()
    update(@Param('id') id: string, @Body() data: Partial<Recipe>) {
        return this.recipeService.update(id, data);
    }

    @Delete()
    delete(@Param('id') id: string) {
        return this.recipeService.delete(id);
    }
}
