import {createStore,applyMiddleware} from 'redux';
import combineReducers from './Reducers';
//import thunkMiddleware from 'redux-thunk';
import PromiseMiddleware from './middleware/PromiseMiddleware';

let Store = createStore(combineReducers,applyMiddleware(PromiseMiddleware));

export default Store;
