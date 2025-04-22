import { RECIPES_PER_PAGE } from 'src/constants/app.constant';

export const getLimit = (limit: string) => {
    return limit ? parseInt(limit) : RECIPES_PER_PAGE;
};

export const getPage = (page: string) => {
    return page ? parseInt(page) : 1;
};
