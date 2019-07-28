import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import { auth } from "./Reducers/Auth.reducer";
import { akun } from "./Reducers/Akun.reducer";

const reducers = combineReducers({
  auth,
  akun
});

export default createStore(reducers, applyMiddleware(thunk));
