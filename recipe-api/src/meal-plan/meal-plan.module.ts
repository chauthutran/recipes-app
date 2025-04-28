import { Module } from '@nestjs/common';
import { MealPlanController } from './meal-plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealPlan, MealPlanSchema } from 'src/schemas/mealPlan.schema';
import { MealPlanService } from './meal-plan.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MealPlan.name, schema: MealPlanSchema}
    ])
  ],
  controllers: [MealPlanController],
  providers: [MealPlanService],
})
export class MealPlanModule {}
