import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import { auth } from "./Reducers/Auth.reducer";
import { layanan } from "./Reducers/Layanan.reducer";
import { akun } from "./Reducers/Akun.reducer";
import { notifikasi } from "./Reducers/Notifikasi.reducer";
import { ambulan } from "./Reducers/Ambulan.reducer";

const reducers = combineReducers({
  auth,
  layanan,
  akun,
  notifikasi,
  ambulan
});

export default createStore(reducers, applyMiddleware(thunk));
