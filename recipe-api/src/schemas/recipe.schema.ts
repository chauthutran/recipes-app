import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type RecipeDocument = Recipe & Document;

@Schema({ timestamps: true })
export class Recipe {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [String], required: true })
    ingredients: string[];

    @Prop({ type: [String], required: true })
    method: string[];

    @Prop()
    imageUrl: string;

    @Prop({ type: MongooseSchema, ref: 'Category', required: true })
    categories: Types.ObjectId[];

    @Prop({ type: MongooseSchema, ref: 'Category', required: true })
    mealTypes: string[];

    @Prop({
        type: [String],
        enum: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'],
    })
    dietaryRestrictions: string[];

    @Prop({
        type: [
            {
                user: {
                    type: MongooseSchema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
            },
        ],
    })
    ratings: {
        user: Types.ObjectId;
        rating: number;
    }[];

    // Users who saved this recipes
    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'User' })
    saves: Types.ObjectId;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
