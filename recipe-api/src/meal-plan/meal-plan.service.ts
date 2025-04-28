import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MealPlan, MealPlanDocument } from 'src/schemas/mealPlan.schema';

@Injectable()
export class MealPlanService {
    constructor(
        @InjectModel(MealPlan.name) private mealPlanModel: Model<MealPlanDocument>,
    ) {}
    
    async create( data: Partial<MealPlan>): Promise<MealPlan> {
        const createdMealPlan = new this.mealPlanModel(data);
        return (createdMealPlan).save();
    }
    
    async findById(id: string): Promise<MealPlan | null> {
        return this.mealPlanModel.findById(id).exec();
    }
    
    async findByUser(userId: string): Promise<MealPlan[]> {
        return this.mealPlanModel.find({ user: new Types.ObjectId(userId)}).exec();
    }
    
    async update(id: string, updateData: Partial<MealPlan>): Promise<MealPlan | null> {
        return this.mealPlanModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
    
    async delete(id: string): Promise<MealPlan | null> {
        return this.mealPlanModel.findByIdAndDelete(id).exec();
    }
}
