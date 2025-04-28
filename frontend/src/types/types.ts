export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';
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
export interface IMealPlan {
    _id?: string;
    user: IUser;
    weekStartDate: Date;
    weekEndDate: Date;
    days: DayPlan;
}

export interface DayPlan {
    day: string; // Monday, Tuesday, ...
    meal: IMeal[];
}

export interface IMeal {
    mealType: MealType,
    recipe: IRecipe
}