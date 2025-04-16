import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from 'src/schemas/recipe.schema';

@Controller('recipes')
export class RecipesController {
    constructor (private readonly recipeService: RecipesService) {}
    
    @Post()
    create (@Body() data: Partial<Recipe>) {
        return this.recipeService.create(data);
    }
    
    @Get()
    findAll () {
        return this.recipeService.findAll();
    }
    
    @Get()
    findOne (@Param('id') id: string) {
        return this.recipeService.findOne(id);
    }
    
    @Get("top-pick")
    findByRating(@Query("top") top: string) {
        const topNumber = parseInt(top) || 10; // Default to 10 if not provided
        return this.recipeService.findByRating(topNumber);
    }
    
    @Get("categories")
    findByCategory(@Query("id") ids: string[]) {
        return this.recipeService.findByCategory(ids);
    }
    
    @Put()
    update (@Param('id') id: string, @Body() data: Partial<Recipe>) {
        return this.recipeService.update(id, data);
    }
    
    @Delete()
    delete (@Param('id') id: string) {
        return this.recipeService.delete(id);
    }
}
