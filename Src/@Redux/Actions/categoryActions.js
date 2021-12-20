import { SET_CATEGORY_DETAILS } from '../Constants';


export const setCategoryDetails = (categoryDetails) => {
    return {
        type: SET_CATEGORY_DETAILS,
        categoryDetails
    };
};
