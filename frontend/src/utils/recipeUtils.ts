import type { IRecipe } from '../types/types';

export const calculateAverageRating = (recipe: IRecipe): number => {
    if (recipe.ratings && (recipe.ratings as string[]).length === 0) return 0; // If there are no ratings, return 0

    const total = recipe.ratings.reduce(
        (sum: number, item: any) => sum + item.rating,
        0,
    ); // Sum of all ratings
    return parseFloat((total / recipe.ratings.length).toFixed(1)); // Calculate average and round to 1 decimal place
};
