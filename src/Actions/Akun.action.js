import {UserAPI} from '../Public/API';

const setLoading = bool => {
  return {
    type: 'AKUN_SET_LOADING',
    payload: bool,
  };
};

const setUserData = userData => {
  return {
    type: 'AKUN_SET_USERDATA',
    payload: userData,
  };
};

export const fetchUser = () => async dispatch => {
  dispatch(setLoading(true));

  try {
    const {success, result} = await UserAPI.getUser();
    success && dispatch(setUserData(result));
  } catch (error) {
    console.log(error);
  }
};

export const setMultiData = data => async dispatch => {
  await UserAPI.setData(data);
  dispatch(fetchUser());
};

export const setProfileImage = data => async dispatch => {
  await UserAPI.setProfileImage(data);
  dispatch(fetchUser());
};

export const setActive = value => async dispatch => {
  await UserAPI.setActive(value);
  dispatch(fetchUser());
};

export const setUserLocation = (latitude, longitude) => async dispatch => {
  await UserAPI.setUserLocation(latitude, longitude);
  dispatch(fetchUser());
};
