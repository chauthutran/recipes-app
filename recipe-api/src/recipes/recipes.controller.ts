import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    
    @Put()
    update (@Param('id') id: string, @Body() data: Partial<Recipe>) {
        return this.recipeService.update(id, data);
    }
    
    @Delete()
    delete (@Param('id') id: string) {
        return this.recipeService.delete(id);
    }
}
