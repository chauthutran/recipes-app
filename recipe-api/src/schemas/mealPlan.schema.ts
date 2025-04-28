import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, Schema as MongooseSchema, Types } from 'mongoose';

export type MealPlanDocument = MealPlan & Document;

@Schema({ timestamps: true })
export class MealPlan {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
    
    @Prop({ type: Date, required: true })
    weekStartDate: Date;
    
    @Prop({ type: Date, required: true })
    weekEndDate: Date;
    
    @Prop({
        type:[{
            day: { type: String, required: true },
            meals:[{
                mealType: { type: String, enum: ['breakfast', 'lunch', 'snack', 'dinner']},
                recipe: { type: MongooseSchema.Types.ObjectId, required: true }
            }],
        }],
    })
    days: Array<{
        day: string;
        meals: Array<{ mealType: string, recipe: string }>;
    }>
}

export const MealPlanSchema = SchemaFactory.createForClass(MealPlan);