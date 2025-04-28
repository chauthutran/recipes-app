import axios from 'axios';
import { API_BASE_URL, getErrMsg } from '.';
import type { IMealPlan, JSONObject, ResponseData } from '../../types/types';

export const retrieveMealPlanByUser = async (userId: string): Promise<
    ResponseData<IMealPlan[]>
> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/meal-plan/user/${userId}`);
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const retrieveMealPlanById = async (id: string): Promise<
    ResponseData<IMealPlan>
> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/meal-plan/view/${id}`);
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

// -----------------------------------------------------------------------------------------------------
// For Add/Update MealPlan

export const addMealPlan = async(
    data: Partial<IMealPlan>
): Promise<ResponseData<IMealPlan>> => {
    try {
        const payload = generateMealPlanPayload(data);
        const res = await axios.post(`${API_BASE_URL}/recipes`, payload);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const updateMealPlan = async (data: Partial<IMealPlan>) => {
    try {
        const payload = generateMealPlanPayload(data);
        const res = await axios.put(`${API_BASE_URL}/recipes/${data._id}`, payload);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}

export const emptyMealPlan = () => {
    return {
        "weekStartDate": new Date(),
        "weekEndDate": new Date(),
        "days": []
      }
}

// -----------------------------------------------------------------------------------------------------
// Supportive methods

const generateMealPlanPayload = (data: Partial<IMealPlan>) => {
    return {
        ...data,
        user: data.user?._id
    } as JSONObject;
}