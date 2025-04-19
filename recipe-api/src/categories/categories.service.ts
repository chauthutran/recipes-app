import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.Schema';
import { Recipe, RecipeDocument } from 'src/schemas/recipe.schema';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectModel(Category.name)
        private categoryModel: Model<CategoryDocument>,

        @InjectModel(Recipe.name)
        private recipeModel: Model<RecipeDocument>,
    ) {}

    findAll() {
        return this.categoryModel.find();
    }
}
