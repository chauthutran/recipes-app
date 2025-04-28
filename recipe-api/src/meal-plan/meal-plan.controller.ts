import { MealPlan } from 'src/schemas/mealPlan.schema';
import { MealPlanService } from './meal-plan.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('meal-plan')
export class MealPlanController {
    constructor(
       private readonly mealPlanService: MealPlanService,
    ){}
    
    @Post()
    async create( data: Partial<MealPlan>) {
        return this.mealPlanService.create(data);
    }
    
    @Get('view/:id')
    findById(@Param('id') id: string) {
        return this.mealPlanService.findById(id);
    }
    
    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
        return this.mealPlanService.findByUser(userId);
    }
    
    @Put('/:id')
    update(@Param('id') id: string, @Body() data: Partial<MealPlan>) {
        return this.mealPlanService.update(id, data);
    }
    
    @Delete("/:id")
    delete(@Param('id') id: string) {
        return this.mealPlanService.delete(id);
    }
}
