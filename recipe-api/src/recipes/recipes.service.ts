import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';


@Injectable()
export class RecipesService {
    constructor(@InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>) {}
    
    create (data: Partial<Recipe>) {
        const created = new this.recipeModel(data);
        return created.save();
    }
    
    findAll (): Promise<Recipe[]> {
        return this.recipeModel.find().exec();
    }
    
    findOne (id: string): Promise<Recipe | null> {
        return this.recipeModel.findById(id).exec();
    }
    
    findByCategory (categoryIds: string[]): Promise<Recipe[]> {
        const categoryObjIds = categoryIds.map((id => new Types.ObjectId(id)));
        return this.recipeModel.find({categories: { $in: categoryObjIds }}).exec();
    }
    
    findByRating (topN: number): Promise<Recipe[]> {
        return this.recipeModel.aggregate([
            {
                $addFields: {
                    avgRating: { $avg: '$ratings.rating'}
                }
            },
            {
                $sort: { avgRating: -1 }
            },
            {
                $limit: topN
            },
            {
                $lookup: {
                    from: "users", // Join with the 'users' collection to populate user details for ratings
                    localField: "ratings.user",
                    foreignField: "_id",
                    as: "ratingUsers", // Output as 'ratingUsers' array
                },
            },
            {
                $lookup: {
                    from: "categories", // Join with the 'categories' collection
                    localField: "categories", // Field in the 'recipes' collection that references categories
                    foreignField: "_id", // Field in the 'categories' collection
                    as: "categoryDetails", // Output populated category details
                },
            },
            {
                $project: {
                    name: 1,
                    ingredients: 1,
                    method: 1,
                    averageRating: 1,
                    categoryDetails: 1, // Include the populated categories
                    mealTypes: 1,
                    dietaryRestrictions: 1,
                    ratings: 1,
                    ratingUsers: 1, // Include the user details of those who rated
                    createdAt: 1,
                },
            },
        ])
    }
    
    update (id: string, data: Partial<Recipe>): Promise<Recipe | null> {
        return this.recipeModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    
    /**
     * 
     * Returns a Mongoose query that resolves to:
     * *** The deleted document (Recipe) if found and deleted
     * *** null if no document with that ID exists
     * *** .exec() executes the query and wraps the result in a Promise
     * 
     */
    delete (id: string): Promise<Recipe | null> {
        return this.recipeModel.findByIdAndDelete(id).exec();
    }
}
