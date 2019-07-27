import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import { auth } from "./Reducers/Auth.reducer";

const reducers = combineReducers({
  auth
});

export default createStore(reducers, applyMiddleware(thunk));
