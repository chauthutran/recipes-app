import axios from 'axios';
import { API_BASE_URL, getErrMsg } from '.';
import type {
    IDayName,
    IDayPlan,
    IMealPlan,
    IRecipe,
    JSONObject,
    ResponseData,
} from '../../types/types';
import { DAY_NAMES } from '../../constants/constants';

export const retrieveMealPlanByUser = async (
    userId: string,
): Promise<ResponseData<IMealPlan[]>> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/meal-plan/user/${userId}`);
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const retrieveMealPlanById = async (
    id: string,
): Promise<ResponseData<IMealPlan>> => {
    try {
        const res = await axios.get(`${API_BASE_URL}/meal-plan/view/${id}`);
        return { success: true, data: res.data };
    } catch (error: any) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

// -----------------------------------------------------------------------------------------------------
// For Add/Update MealPlan

export const addMealPlan = async (
    data: Partial<IMealPlan>,
): Promise<ResponseData<IMealPlan>> => {
    try {
        const payload = generateMealPlanPayload(data);
        const res = await axios.post(`${API_BASE_URL}/meal-plan`, payload);
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const updateMealPlan = async (data: Partial<IMealPlan>) => {
    try {
        const payload = generateMealPlanPayload(data);
        const res = await axios.put(
            `${API_BASE_URL}/meal-plan/${data._id}`,
            payload,
        );
        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
};

export const generateEmptyMealPlan = (): IDayPlan[] => {
    return DAY_NAMES.map((day) => ({
        day: day as IDayName,
        meals: {
            breakfast: [] as Partial<IRecipe>[],
            lunch: [] as Partial<IRecipe>[],
            snack: [] as Partial<IRecipe>[],
            dinner: [] as Partial<IRecipe>[],
        },
    }));
};

// -----------------------------------------------------------------------------------------------------
// Supportive methods

const generateMealPlanPayload = (data: Partial<IMealPlan>) => {
    return {
        ...data,
        user: data.user?._id,
    } as JSONObject;
};
