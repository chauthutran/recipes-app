export interface IRecipe {
    _id: string;
    name: string;
    ingredients: string[];
    method: string[];
    imageUrl: string;
    categories: string[];
    mealTypes: string[];
    dietaryRestrictions: string[];
    ratings: string[];
    saves: string[];
    createdAt?: string;
}

export interface ICategory {
    name: string;
    description: string;
    icon: string
}