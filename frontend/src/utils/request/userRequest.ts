import axios from 'axios';
import type {
    ICategory,
    IRecipe,
    IUser,
    ResponseData,
} from '../../types/types';
import { API_BASE_URL, getErrMsg } from '.';
import { HOME_PAGE_RECIPE_LIMIT } from '../../constants/constants';
import qs from 'qs';

// Get Recipe Favorites for user
export const retrieveFavoritesByUser = async (
    userId: string,
    categories: ICategory[],
    page: number,
): Promise<ResponseData<IRecipe[]>> => {
    try {
        const categoryIds = categories.map((item) => item._id);

        const res = await axios.get(
            `${API_BASE_URL}/users/favorites/${userId}`,
            {
                params: {
                    categories: categoryIds,
                    limit: HOME_PAGE_RECIPE_LIMIT,
                    page,
                },
                paramsSerializer: (params) =>
                    qs.stringify(params, { arrayFormat: 'comma' }),
            },
        );
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const login = async (
    email: string,
    password: string,
): Promise<ResponseData<IUser>> => {
    try {
        const res = await axios.post(`${API_BASE_URL}/users/login`, {
            email,
            password,
        });

        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const register = async (data: IUser): Promise<ResponseData<IUser>> => {
    try {
        const res = await axios.post(`${API_BASE_URL}/users`, data);
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};
