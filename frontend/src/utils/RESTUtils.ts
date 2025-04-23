import axios from "axios";
import type { ICategory, IRecipe, JSONObject, ResponseData } from "../types/types";
import qs from 'qs';
import { HOME_PAGE_RECIPE_LIMIT } from "../constants/constants";

const API_BASE_URL = "http://localhost:3000";

export const retrieveRecipeDetails = async (recipeId: string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/recipes/view/${recipeId}`);
        return { success: true, data: res.data };
    } 
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const searchRecipes = async (params: JSONObject): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/recipes/query`, {
            params,
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'comma' }),
        });

        return { success: true, data: res.data };
    } 
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const trendingRecipes = async (): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/recipes/trending?limit=${HOME_PAGE_RECIPE_LIMIT}`);
        return { success: true, data: res.data };
    } 
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}


export const retrieveRecommenedRecipes = async (userId: string): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/users/recommended/${userId}?limit=${HOME_PAGE_RECIPE_LIMIT}`);
        return { success: true, data: res.data };
    } 
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const retrieveFavoritesByUser = async (userId: string, categories: ICategory[], page: number): Promise<ResponseData<IRecipe[]>>  => {
    try {
        const categoryIds = categories.map((item) => item._id);
        
        const res = await axios.get(
            `http://localhost:3000/users/favorites/${userId}`,
            {
                params: {
                    categories: categoryIds,
                    limit: HOME_PAGE_RECIPE_LIMIT,
                    page,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: 'comma' }),
            },
        );return { success: true, data: res.data };
    }
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const retrieveFavorites = async (): Promise<ResponseData<IRecipe[]>>  => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/recipes/favorites?limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );
        
        return { success: true, data: res.data };
    }
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const retrieveRecipes = async (page: number): Promise<ResponseData<IRecipe[]>>  => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/recipes?page=${page}&limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );
        
        return { success: true, data: res.data };
    }
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const retrievePopularRecipesByUserAmount = async (page: number): Promise<ResponseData<IRecipe[]>>  => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/recipes/popular-users-amount?page=${page}&limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );
        
        return { success: true, data: res.data };
    }
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

// Upload file
export const uploadImage = async (formData: FormData): Promise<ResponseData<JSONObject>> => {
    try {
        const res = await axios.post(`${API_BASE_URL}/recipes/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return { success: true, data: res.data };
    }
    catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

// ------------------------------------------------------------------------------
// Supportive methods

const getErrMsg = (error: any) => {
    const errMsg =
        error.response?.data?.message ||
        error.response?.data?.errMsg ||
        error.message ||
        'An unknown error occurred';
        
    return errMsg;
}

