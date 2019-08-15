import {AuthAPI, UserAPI} from '../Public/API';
import * as Storage from '../Public/Storage';

const setLoading = (payload = true) => {
  return {
    type: 'AUTH_SET_LOADING',
    payload,
  };
};

const setResponse = ({success, message}) => {
  return {
    type: 'AUTH_SET_RESPONSE',
    payload: {
      success,
      message,
    },
  };
};

const setError = message => setResponse({success: false, message});

const setToken = token => {
  return {
    type: 'AUTH_SET_TOKEN',
    payload: token,
  };
};

export const setDeviceId = id => {
  return {
    type: 'AUTH_DEVICE_ID',
    payload: id,
  };
};

const updateUserData = () => (dispatch, getState) => {
  const auth = getState().auth;
  UserAPI.setDeviceId(auth.deviceId);
};

const updateToken = async (dispatch, response) => {
  try {
    const {success, result} = response;
    if (success) {
      await Storage.storeToken(result.token);
      dispatch(setToken(result.token));
      dispatch(updateUserData());
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogin = (username, password) => async dispatch => {
  dispatch(setLoading(true));

  try {
    const response = await AuthAPI.login(username, password);
    dispatch(setResponse(response));
    updateToken(dispatch, response);
  } catch (error) {
    console.log(error);
    dispatch(setError('Network error!'));
  }
};

export const fetchRegister = (
  username,
  password,
  fullname,
) => async dispatch => {
  dispatch(setLoading(true));

  try {
    const response = await AuthAPI.register(username, password, fullname);
    dispatch(setResponse(response));
    updateToken(dispatch, response);
  } catch (error) {
    console.log(error);
    dispatch(setError('Network error!'));
  }
};

export const validateToken = () => dispatch => {
  dispatch(setLoading(true));

  Storage.getToken()
    .then(token => AuthAPI.validate(token))
    .then(response => updateToken(dispatch, response))
    .catch(error => console.log(error))
    .finally(() => dispatch(setLoading(false)));
};

export const logout = () => async dispatch => {
  // clear token from storage
  await Storage.clearToken();
  // clear token state
  dispatch(setToken(null));
};
