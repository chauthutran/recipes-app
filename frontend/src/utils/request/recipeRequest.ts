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

// -----------------------------------------------------------------------------------------------------
// For Add/Update recipe

export const addRecipe = async (
    data: Partial<IRecipe>,
): Promise<ResponseData<IRecipe>> => {
    try {
        const payload = generateRecipePayload(data);
        const res = await axios.post(`${API_BASE_URL}/recipes`, payload);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const updateRecipe = async (
    data: Partial<IRecipe>,
): Promise<ResponseData<IRecipe>> => {
    try {
        const payload = generateRecipePayload(data);
        const res = await axios.put(
            `${API_BASE_URL}/recipes/${data._id}`,
            payload,
        );
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const deleteRecipe = async (
    id: string,
): Promise<ResponseData<IRecipe>> => {
    try {
        const res = await axios.delete(`${API_BASE_URL}/recipes/${id}`);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};


// -----------------------------------------------------------------------------------------------------
// Supportive methods

const generateRecipePayload = (data: Partial<IRecipe>): JSONObject => {
    return {
        ...data,
        categories: data.categories?.map((cat) => cat._id),
        user: data.user?._id,
    } as JSONObject;
};