import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import { auth } from "./Reducers/Auth.reducer";
import { akun } from "./Reducers/Akun.reducer";
import { notifikasi } from "./Reducers/Notifikasi.reducer";

const reducers = combineReducers({
  auth,
  akun,
  notifikasi
});

export default createStore(reducers, applyMiddleware(thunk));
