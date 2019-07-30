import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import { auth } from "./Reducers/Auth.reducer";
import { layanan } from "./Reducers/Layanan.reducer";
import { akun } from "./Reducers/Akun.reducer";

const reducers = combineReducers({
  auth,
  layanan,
  akun
});

export default createStore(reducers, applyMiddleware(thunk));
