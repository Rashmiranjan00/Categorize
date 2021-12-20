import { SET_IMAGE_DETAILS } from '../Constants';

const initialState = {
    imageDetails: [],
};

const imageDetailsReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {

    case SET_IMAGE_DETAILS: {
        const { imageDetails} = action;
        return { ...state, imageDetails: imageDetails };
    }

    default: {
        return state;
    }

    }
};

export default imageDetailsReducer;