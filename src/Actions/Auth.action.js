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

const setError = message => setResponse({ success: false, message });

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

    try {
      const { success, result } = response;
      dispatch(setResponse(response));

      // set token
      if (success) {
        dispatch(setToken(result.token));
        await Storage.storeToken(result.token);
      }
    } catch (error) {
      // exception catched
      dispatch(setError("Network error!"));
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

    try {
      const { success, result } = response;
      dispatch(setResponse(response));

      // set token
      if (success) {
        dispatch(setToken(result.token));
        await Storage.storeToken(result.token);
      }
    } catch (error) {
      // exception catched
      dispatch(setError("Network error!"));
    }
  };
};

export const validateToken = () => {
  return async dispatch => {
    // set loading
    dispatch(setLoading(true));

    // get token
    const token = await Storage.getToken();

    // validate token
    const response = await API.get("auth/validate", token);

    try {
      const { success, result } = response;

      // set token
      if (success) {
        dispatch(setToken(result.token));
        await Storage.storeToken(result.token);
      }

      // finalize
      dispatch(setLoading(false));
    } catch (error) {
      // exception catched
      console.log(error.message);
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
