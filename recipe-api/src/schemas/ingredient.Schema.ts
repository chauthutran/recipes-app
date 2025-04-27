import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema({ timestamps: true })
export class Ingredient {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    index: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
