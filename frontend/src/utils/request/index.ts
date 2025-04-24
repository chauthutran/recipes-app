export const API_BASE_URL = 'http://localhost:3000';

export const getErrMsg = (error: any) => {
    const errMsg =
        error.response?.data?.message ||
        error.response?.data?.errMsg ||
        error.message ||
        'An unknown error occurred';

    return errMsg;
};
