import { SET_CATEGORY_DETAILS } from '../Constants';

const initialState = {
    categoryDetails: [{ id: 1, name: 'Favourite', images: [] }]
};

const categoryReducer = (state = initialState, action) => {
    const { type } = action;

    switch (type) {
        
    case SET_CATEGORY_DETAILS: {
        const { categoryDetails } = action;
        return { ...state, categoryDetails: categoryDetails };
    }

    default: {
        return state;
    }

    }
};

export default categoryReducer;