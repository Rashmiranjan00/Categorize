import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from 'redux-persist';
import imageDetailsReducer from './imageDetailsReducer';
import categoryReducer from './categoryReducer';

import Config from '@Config/default';

const { TBAsyncStorageKey } = Config;

const config = {
    key: TBAsyncStorageKey,
    storage: AsyncStorage,
};

const appReducer = persistCombineReducers(config,{
    imageData : imageDetailsReducer,
    categoryData: categoryReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;