import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Reducers';
import thunk from 'redux-thunk';

const reduxStore = createStore(
    rootReducer,
    applyMiddleware(thunk),
);
export default reduxStore;