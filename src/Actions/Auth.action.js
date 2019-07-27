import API from "../API";
import * as Storage from "../Storage";

const setLoading = (payload = true) => {
  return {
    type: "AUTH_SET_LOADING",
    payload
  };
};

const setResponse = ({ success, message }) => {
  return {
    type: "AUTH_SET_RESPONSE",
    payload: {
      success,
      message
    }
  };
};

const setToken = token => {
  return {
    type: "AUTH_SET_TOKEN",
    payload: token
  };
};

export const fetchLogin = (username, password) => {
  return async dispatch => {
    // set loading
    dispatch(setLoading(true));

    // fetch data
    const response = await API.post("auth/login", { username, password });

    // set response
    dispatch(setResponse(response));

    if (response && response.success) {
      const token = response.result.token;

      // save token
      await Storage.storeToken(token);
      dispatch(setToken(token));
    }
  };
};

export const fetchRegister = (username, password, fullname) => {
  return async dispatch => {
    // set loading
    dispatch(setLoading(true));

    // fetch data
    const response = await API.post("auth/register", {
      username,
      password,
      fullname
    });

    // set response
    dispatch(setResponse(response));

    if (response && response.success) {
      const token = response.result.token;

      // save token
      await Storage.storeToken(token);
      dispatch(setToken(token));
    }
  };
};

export const validateToken = () => {
  return async dispatch => {
    // set loading
    dispatch(setLoading(true));

    // get token from storage
    const token = await Storage.getToken();

    // fetch data
    const response = await API.get("auth/validate", token);

    // data loaded
    dispatch(setLoading(false));

    // success
    if (response && response.success) {
      await Storage.storeToken(token);
      dispatch(setToken(token));
    }
  };
};

export const logout = () => {
  return async dispatch => {
    // clear token from storage
    await Storage.clearToken();

    // clear token state
    dispatch(setToken(null));
  };
};
