import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Recipe, RecipeDocument } from '../schemas/recipe.schema';

@Injectable()
export class RecipesService {
    constructor(
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
    ) {}

    create(data: Partial<Recipe>) {
        const created = new this.recipeModel(data);
        return created.save();
    }

    findAll({ limit, page }): Promise<Recipe[]> {
        return this.recipeModel
            .find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
    }

    findOne(id: string): Promise<Recipe | null> {
        return this.recipeModel.findById(id).exec();
    }

    findByCategory(categoryIds: string[]): Promise<Recipe[]> {
        const categoryObjIds = categoryIds.map((id) => new Types.ObjectId(id));
        return this.recipeModel
            .find({ categories: { $in: categoryObjIds } })
            .exec();
    }

    findTrending(limit = 10): Promise<Recipe[]> {
        return this.recipeModel.aggregate([
            {
                $addFields: {
                    totalSaves: {
                        $cond: {
                            if: { $isArray: '$saves' },
                            then: { $size: '$saves' },
                            else: 0,
                        },
                    },
                    averageRating: {
                        $cond: {
                            if: { $gt: [{ $size: '$ratings' }, 0] },
                            then: { $avg: '$ratings.rating' },
                            else: 0,
                        },
                    },
                },
            },
            {
                $sort: {
                    totalSaves: -1,
                    averageRating: -1,
                },
            },
            { $limit: limit },
        ]);
    }

    async findUserFavorite(limit: number): Promise<Recipe[]> {
        return this.recipeModel.aggregate([
            {
                $addFields: {
                    saveCount: { $size: { $ifNull: ['$saves', []] } },
                },
            },
            {
                $sort: { saveCount: -1, createdAt: -1 },
            },
            {
                $limit: +limit,
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories',
                },
            },
        ]);
    }

    findByRating(topN: number): Promise<Recipe[]> {
        return this.recipeModel.aggregate([
            {
                $addFields: {
                    avgRating: { $avg: '$ratings.rating' },
                },
            },
            {
                $sort: { avgRating: -1 },
            },
            {
                $limit: topN,
            },
            {
                $lookup: {
                    from: 'users', // Join with the 'users' collection to populate user details for ratings
                    localField: 'ratings.user',
                    foreignField: '_id',
                    as: 'ratingUsers', // Output as 'ratingUsers' array
                },
            },
            {
                $lookup: {
                    from: 'categories', // Join with the 'categories' collection
                    localField: 'categories', // Field in the 'recipes' collection that references categories
                    foreignField: '_id', // Field in the 'categories' collection
                    as: 'categoryDetails', // Output populated category details
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
        ]);
    }

    //  count how many recipes are in each category, and that count can be our "popularity" metric.
    findPopularCategoriesByRecipeAmount(limit: number): Promise<Recipe[]> {
        return this.recipeModel.aggregate([
            { $unwind: '$categories' }, // flatten the categories array
            {
                $group: {
                    _id: '$categories', // group by category ID
                    count: { $sum: 1 }, // count recipes in each category
                },
            },
            { $sort: { count: -1 } }, // most popular first
            { $limit: limit },
            {
                $lookup: {
                    from: 'categories', // assuming collection name is 'categories'
                    localField: '_id',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            { $unwind: '$category' },
            {
                $project: {
                    _id: '$category._id',
                    name: '$category.name',
                    count: 1,
                },
            },
        ]);
    }

    // Get the categories with the "saves" count
    findPopularCategoriesByRecipeSaves(limit: number): Promise<Recipe[]> {
        try {
            return this.recipeModel.aggregate([
                {
                    $addFields: {
                        saveCount: { $size: { $ifNull: ['$saves', []] } },
                    },
                },
                {
                    $addFields: {
                        categories: {
                            $map: {
                                input: '$categories',
                                as: 'cat',
                                in: { $toObjectId: '$$cat' },
                            },
                        },
                    },
                },
                {
                    $sort: { saveCount: -1, createdAt: -1 },
                },
                {
                    $limit: limit,
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categories',
                        foreignField: '_id',
                        as: 'categories',
                    },
                },
            ]);
        } catch (err) {
            throw new BadRequestException(
                `Failed to fetch popular categories by recipe saves: ${err.message || err}`,
            );
        }
    }

    search({
        userId,
        search,
        ingredients,
        categories,
        dietary,
        limit,
        page,
    }): Promise<Recipe[]> {
        const query: any = {};

        if (userId) {
            query.user = new Types.ObjectId(userId);
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (ingredients && ingredients.length) {
            query.ingredients = { $in: ingredients };
        }

        if (categories && categories.length) {
            const categoryObjIds = categories.map(
                (id: string) => new Types.ObjectId(id),
            );
            query.categories = { $in: categoryObjIds };
        }

        if (dietary && dietary.length) {
            query.dietaryRestrictions = { $in: dietary };
        }

        return this.recipeModel
            .find(query)
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
    }

    update(id: string, data: Partial<Recipe>): Promise<Recipe | null> {
        return this.recipeModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
    }

    /**
     *
     * Returns a Mongoose query that resolves to:
     * *** The deleted document (Recipe) if found and deleted
     * *** null if no document with that ID exists
     * *** .exec() executes the query and wraps the result in a Promise
     *
     */
    delete(id: string): Promise<Recipe | null> {
        return this.recipeModel.findByIdAndDelete(id).exec();
    }
}
