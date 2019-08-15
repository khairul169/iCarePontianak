import {ServiceAPI} from '../Public/API';

const setLoading = (payload = true) => {
  return {
    type: 'BERANDA_SET_LOADING',
    payload,
  };
};

const setCategories = payload => {
  return {
    type: 'BERANDA_KATEGORI_LAYANAN',
    payload,
  };
};

export const onPushNotification = data => {
  return {
    type: 'BERANDA_PUSH_NOTIFICATION',
    payload: data,
  };
};

export const fetchData = () => async dispatch => {
  dispatch(setLoading());

  // fetch service categories
  const {result} = await ServiceAPI.getCategories();
  dispatch(setCategories(result));

  dispatch(setLoading(false));
};
