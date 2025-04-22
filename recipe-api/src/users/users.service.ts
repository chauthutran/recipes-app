import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.Schema';
import { PasswordService } from './PasswordService';
import { Recipe, RecipeDocument } from 'src/schemas/recipe.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
        private readonly passwordService: PasswordService,
    ) {}

    create(data: Partial<User>): Promise<User | null> {
        const created = new this.userModel(data);
        return created.save();
    }

    async find(
        email: string,
        plainTextPassword: string,
    ): Promise<Partial<User> | undefined> {
        const user = await this.userModel.findOne({ email });

        if (!user) return;

        const isValid = await this.passwordService.comparePasswords(
            plainTextPassword,
            user.password,
        );

        if (!isValid) return;

        // Exclude password before returning user
        const { password, ...userData } = user.toObject();
        return isValid ? userData : undefined;
    }

    update(email: string, data: Partial<User>): Promise<User | null> {
        return this.userModel.findOneAndUpdate(
            { email }, // Filter by email
            { $set: data }, // Update fields
            { new: true }, // Return update document
        );
    }

    delete(email: string): Promise<User | null> {
        return this.userModel.findOneAndDelete({ email });
    }

    async findUserRecipes({ userId, limit, page }): Promise<Recipe[]> {
        if (!Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid user ID format');
        }

        return await this.recipeModel
            .find({ user: new Types.ObjectId(userId) })
            .populate('categories ratings')
            .populate({
                path: 'user',
                select: '_id email',
            })
            .sort({ createdAt: -1 }) // newest first
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();
    }

    async findFavoritesByCategories({
        userId,
        categories,
        limit,
        page,
    }: {
        userId: string;
        categories?: string[];
        limit: number;
        page: number;
    }) {
        const skip = (page - 1) * limit;

        const filter: any = {
            saves: { $in: [new Types.ObjectId(userId)] },
        };

        if (categories && categories.length > 0) {
            filter.categories = {
                $in: categories.map((id) => new Types.ObjectId(id)),
            };
        }

        return this.recipeModel
            .aggregate([
                {
                    $match: filter,
                },
                {
                    $sort: { createdAt: -1 },
                },
                {
                    $skip: skip,
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
                {
                  $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails',
                  },
                },
                {
                  $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true,
                  },
                },
                {
                  $addFields: {
                    user: {
                      _id: '$userDetails._id',
                      email: '$userDetails.email',
                    },
                  },
                },
            ])
            .exec();
    }

    async findRecommended(userId: string, limit: number): Promise<Recipe[]> {
        const userRecipes = await this.recipeModel.find({
            $or: [{ 'ratings.user': userId }, { saves: userId }],
        });

        // 2. Extract user's preferred categories, meal types, and dietary filters
        const categories = userRecipes.flatMap((r) => r.categories).map(String);
        const mealTypes = userRecipes.flatMap((r) => r.mealTypes);
        const restrictions = userRecipes.flatMap((r) => r.dietaryRestrictions);

        // 3. Find similar recipes
        return this.recipeModel
            .find({
                $or: [
                    { categories: { $in: categories } },
                    { mealTypes: { $in: mealTypes } },
                    { dietaryRestrictions: { $in: restrictions } },
                ],
                saves: { $ne: userId }, // optionally exclude already saved
            })
            .populate('categories ratings')
            .populate({
                path: 'user',
                select: '_id email',
            })
            .sort({ updatedAt: -1 }) // newest recommended first
            .limit(limit);
    }
}
