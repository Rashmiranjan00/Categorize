import { SET_IMAGE_DETAILS } from '../Constants';

const initialState = {
    imageDetails: {},
};

const imageDetailsReducer = (state = initialState, action) => {
    const { type, imageDetails } = action;
    switch (type) {
    case SET_IMAGE_DETAILS:
        return { ...state, imageDetails: imageDetails };
    }
    return state;
};

export default imageDetailsReducer;