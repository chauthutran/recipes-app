export interface IUser {
    _id: string;
    email: string;
}

export interface IRecipe {
    _id: string;
    name: string;
    ingredients: string[];
    method: string[];
    imageUrl?: string;
    categories: string[];
    mealTypes: string[];
    dietaryRestrictions: string[];
    ratings: string[];
    saves: string[];
    createdAt?: string;
    user: IUser;
}

export interface ICategory {
    _id: string;
    name: string;
    description: string;
    icon: string;
}

export type JSONObject = { [key: string]: any };
