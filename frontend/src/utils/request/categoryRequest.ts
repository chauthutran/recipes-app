import axios from 'axios';
import { API_BASE_URL, getErrMsg } from '.';
import type { ICategory, ResponseData } from '../../types/types';

export const retrieveCategories = async (): Promise<
    ResponseData<ICategory[]>
> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};
