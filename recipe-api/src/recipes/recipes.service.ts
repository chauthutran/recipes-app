import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';

@Injectable()
export class RecipesService {
    constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}
    
    create (data: Partial<Recipe>) {
        const created = new this.recipeModel(data);
        return created.save();
    }
    
    findAll () {
        return this.recipeModel.find().exec();
    }
    
    findOne (id: string) {
        return this.recipeModel.findById(id).exec();
    }
    
    update (id: string, data: Partial<Recipe>) {
        return this.recipeModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    
    delete (id: string) {
        return this.recipeModel.findByIdAndDelete(id).exec();
    }
}
