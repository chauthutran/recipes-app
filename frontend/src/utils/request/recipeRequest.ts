import axios from 'axios';
import type { IRecipe, JSONObject, ResponseData } from '../../types/types';
import qs from 'qs';
import { HOME_PAGE_RECIPE_LIMIT } from '../../constants/constants';
import { API_BASE_URL, getErrMsg } from '.';

// Get Recipe Details
export const retrieveRecipeDetails = async (recipeId: string) => {
    try {
        const res = await axios.get(`${API_BASE_URL}/recipes/view/${recipeId}`);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

// Search recipes
export const searchRecipes = async (
    params: JSONObject,
): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/recipes/query`, {
            params,
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: 'comma' }),
        });

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

// Get trending
export const trendingRecipes = async (): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/recipes/trending?limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

// Get Recommended recipes
export const retrieveRecommenedRecipes = async (
    userId: string,
): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/users/recommended/${userId}?limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const retrieveFavorites = async (): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/recipes/favorites?limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const retrieveRecipes = async (
    page: number,
): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/recipes?page=${page}&limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const retrievePopularRecipesByUserAmount = async (
    page: number,
): Promise<ResponseData<IRecipe[]>> => {
    try {
        const res = await axios.get(
            `${API_BASE_URL}/recipes/popular-users-amount?page=${page}&limit=${HOME_PAGE_RECIPE_LIMIT}`,
        );

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

// Upload file
export const uploadImage = async (
    formData: FormData,
): Promise<ResponseData<JSONObject>> => {
    try {
        const res = await axios.post(
            `${API_BASE_URL}/recipes/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};
