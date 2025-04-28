export const API_BASE_URL = 'http://localhost:3000';

export const getErrMsg = (error: any) => {
    if (error.response && error.response.status === 400) {
        const validationErrors = error.response.data.errors;
        return validationErrors;
        // Show in UI, for example:
        // user: "Path `user` is required."
    }

    const errMsg =
        error.response?.data?.errors ||
        error.response?.data?.message ||
        error.response?.data?.errMsg ||
        error.message ||
        'An unknown error occurred';

    return errMsg;
};
