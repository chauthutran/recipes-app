import axios from "axios";
import { API_BASE_URL, getErrMsg } from ".";
import type { JSONObject, ResponseData } from "../../types/types";

export const uploadImageToCloud = async ( formData: FormData ): Promise<ResponseData<JSONObject>> => {
    try {
        const res = await axios.post(
            `${API_BASE_URL}/cloudinary/upload`,
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
}


export const deleteImageFromCloud = async ( imageUrl: string ): Promise<ResponseData<JSONObject>> => {
    try {
        const res = await axios.delete(
            `${API_BASE_URL}/cloudinary/image`, {
                data:  {imageUrl}
            }
        );

        return { success: true, data: res.data };
    } catch (error) {
        return { success: false, errMsg: getErrMsg(error) };
    }
}