import API from "../API";

const setLoading = bool => {
  return {
    type: "AKUN_SET_LOADING",
    payload: bool
  };
};

const setUserData = userData => {
  return {
    type: "AKUN_SET_USERDATA",
    payload: userData
  };
};

export const fetchUser = () => {
  return (dispatch, getState) => {
    // set loading
    dispatch(setLoading(true));

    // fetch data
    API.get("users/", getState().auth.token)
      .then(response => {
        dispatch(setLoading(false));
        return response;
      })
      .then(({ success, result }) => {
        success && dispatch(setUserData(result));
      });
  };
};
