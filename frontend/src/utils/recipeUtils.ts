import type { ICategory, IRecipe } from '../types/types';

export const calculateAverageRating = (recipe: IRecipe): number => {
    if (recipe.ratings && (recipe.ratings as string[]).length === 0) return 0; // If there are no ratings, return 0

    const total = recipe.ratings.reduce(
        (sum: number, item: any) => sum + item.rating,
        0,
    ); // Sum of all ratings
    return parseFloat((total / recipe.ratings.length).toFixed(1)); // Calculate average and round to 1 decimal place
};

export const emptyRecipe: Partial<IRecipe> = {
    name: '',
    ingredients: [] as string[],
    method: [] as string[],
    imageUrl: '',
    categories: [] as ICategory[],
    mealTypes: [] as string[],
    dietaryRestrictions: [] as string[],
};

export const validateRecipe = (recipe: Partial<IRecipe>): string[] => {
    const errMsgList = [];
    if (!recipe.name?.trim()) {
        errMsgList.push('Recipe name is required.');
    }

    if (
        !recipe.ingredients?.length ||
        !recipe.ingredients.some((ing) => ing.trim())
    ) {
        errMsgList.push('Please add at least one ingredient.');
    }

    if (!recipe.method?.length || !recipe.method.some((mth) => mth.trim())) {
        errMsgList.push('Method is required.');
    }

    if (!recipe.categories?.length) {
        errMsgList.push('Please add at least one catetory.');
    }

    return errMsgList;
};
