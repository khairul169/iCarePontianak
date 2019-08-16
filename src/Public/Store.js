import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../Redux/Reducers';

export default createStore(combineReducers(reducers), applyMiddleware(thunk));
