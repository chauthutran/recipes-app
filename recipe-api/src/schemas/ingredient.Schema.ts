import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type IngredientDocument = Ingredient & Document;

@Schema({ timestamps: true })
export class Ingredient {
    @Prop({ type: String, require: true })
    name: string;

    @Prop({ type: Number, required: true })
    index: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
