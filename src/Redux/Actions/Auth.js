import {AuthAPI} from '../../Public/API';
import * as Storage from '../../Public/Storage';

const STATE_LOADING = {
  type: 'AUTH_SET_LOADING',
  payload: true,
};

const STATE_LOADED = {
  type: 'AUTH_SET_LOADING',
  payload: false,
};

const setResponse = ({success, message}) => ({
  type: 'AUTH_SET_RESPONSE',
  payload: {
    success,
    message,
  },
});

const STATE_ERROR = setResponse({
  success: false,
  message: 'Terjadi kesalahan!',
});

const setLoggedIn = (loggedIn, token) => ({
  type: 'AUTH_LOGGED_IN',
  payload: {
    loggedIn,
    token,
  },
});

//////////////////////////////////////////////////////////////////////////////////////////////

export const fetchLogin = (username, password) => async dispatch => {
  dispatch(STATE_LOADING);

  try {
    const response = await AuthAPI.login(username, password);
    const {success, result} = response;

    if (success) {
      await Storage.storeToken(result.token);
      dispatch(setLoggedIn(true, result.token));
    }

    dispatch(setResponse(response));
  } catch (error) {
    dispatch(STATE_ERROR);
  }

  dispatch(STATE_LOADED);
};

export const fetchRegister = (
  username,
  password,
  fullname,
) => async dispatch => {
  dispatch(STATE_LOADING);

  try {
    const response = await AuthAPI.register(username, password, fullname);
    const {success, result} = response;

    if (success) {
      await Storage.storeToken(result.token);
      dispatch(setLoggedIn(true, result.token));
    }

    dispatch(setResponse(response));
  } catch (error) {
    dispatch(STATE_ERROR);
  }

  dispatch(STATE_LOADED);
};

export const validateToken = () => async dispatch => {
  dispatch(STATE_LOADING);

  try {
    const token = await Storage.getToken();
    const {success, result} = await AuthAPI.validate(token);

    if (success) {
      await Storage.storeToken(result.token);
      dispatch(setLoggedIn(true, result.token));
    }
  } catch (error) {
    console.log(error);
  }

  dispatch(STATE_LOADED);
};

export const logout = () => async dispatch => {
  // clear auth token
  await Storage.clearToken();
  dispatch(setLoggedIn(false));
};
