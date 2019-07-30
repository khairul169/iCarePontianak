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
    API.get("user/", getState().auth.token)
      .then(response => {
        dispatch(setLoading(false));
        return response;
      })
      .then(({ success, result }) => {
        success && dispatch(setUserData(result));
      });
  };
};

export const setMultiData = data => {
  return (dispatch, getState) => {
    API.patch("user/", { data }, getState().auth.token).then(() => {
      // refresh data
      dispatch(fetchUser());
    });
  };
};

export const setProfileImage = value => {
  return (dispatch, getState) => {
    API.patch("user/profileimg", { value }, getState().auth.token).then(() => {
      // refresh data
      dispatch(fetchUser());
    });
  };
};

export const setActive = value => {
  return (dispatch, getState) => {
    API.patch("user/active", { value }, getState().auth.token).then(() => {
      // refresh data
      dispatch(fetchUser());
    });
  };
};

export const setUserLocation = (latitude, longitude) => {
  return (dispatch, getState) => {
    API.patch(
      "user/location",
      {
        value: {
          latitude,
          longitude
        }
      },
      getState().auth.token
    ).then(() => {
      // refresh data
      dispatch(fetchUser());
    });
  };
};
