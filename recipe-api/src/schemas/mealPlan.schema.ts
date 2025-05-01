import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, Schema as MongooseSchema, Types } from 'mongoose';

export type MealPlanDocument = MealPlan & Document;

type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

@Schema({ _id: false })
class MealsPerDay {
    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: "Recipe", default: []})
    breakfast?: Types.ObjectId[];
    
    
    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: "Recipe", default: []})
    lunch?: Types.ObjectId[];
    
    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: "Recipe", default: []})
    snack?: Types.ObjectId[];
    
    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: "Recipe", default: []})
    dinner?: Types.ObjectId[];
}

@Schema({ _id: false })
class DayPlan {
  @Prop({ type: String, required: true })
  day: string;

  @Prop({ type: [MealsPerDay], default: [] })
  meals: MealsPerDay[];
}

@Schema({ timestamps: true })
export class MealPlan {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
    
    @Prop({ type: Date, required: true })
    weekStartDate: Date;
    
    @Prop({ type: Date, required: true })
    weekEndDate: Date;
    
    @Prop({ type: [DayPlan], required: true })
    plan: DayPlan[];
}

export const MealPlanSchema = SchemaFactory.createForClass(MealPlan);