import {UserAPI} from '../../Public/API';

const STATE_LOADING = {
  type: 'AKUN_LOADING',
  payload: true,
};

const STATE_LOADED = {
  type: 'AKUN_LOADING',
  payload: false,
};

const setUserState = user => ({
  type: 'AKUN_USER_STATE',
  payload: user,
});

//////////////////////////////////////////////////////////////////////////////////////////////

export const fetchUser = () => async dispatch => {
  dispatch(STATE_LOADING);

  try {
    const {success, result} = await UserAPI.getUser();
    success && dispatch(setUserState(result));
  } catch (error) {
    console.log(error);
  }

  dispatch(STATE_LOADED);
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
