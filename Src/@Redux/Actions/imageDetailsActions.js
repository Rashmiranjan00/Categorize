import {SET_IMAGE_DETAILS} from '../Constants';

export const setImageDetails = (imageDetails) => {
    return {
        type: SET_IMAGE_DETAILS,
        imageDetails
    };
};