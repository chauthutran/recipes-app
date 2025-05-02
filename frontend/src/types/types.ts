import { DAY_NAMES, MEAL_TYPES } from './../constants/constants';
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
    categories: ICategory[];
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

export interface IIngredient {
    _id?: string;
    name: string;
    index: number;
}

export type JSONObject = { [key: string]: any };

export type ResponseData<T> = {
    success: boolean;
    data?: T;
    errMsg?: string;
};

// For MealPlan
export type IMealType = (typeof MEAL_TYPES)[number];

export type IDayName = (typeof DAY_NAMES)[number];

export interface IMealPlan {
    _id?: string;
    user: IUser;
    weekStartDate: string;
    weekEndDate: string;
    plan: IDayPlan[];
}

export interface IDayPlan {
    day: IDayName; // Monday, Tuesday, ...
    meals: IMealsPerDay;
}

export type IMealsPerDay = {
    [key in IMealType]?: Partial<IRecipe>[]; // array of recipes
};

export interface IMeal {
    mealType: string;
    recipes: Partial<IRecipe>[];
}
