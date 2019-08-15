import {ServiceAPI} from '../Public/API';

const setLoading = (bool = true) => {
  return {
    type: 'LAYANAN_SET_LOADING',
    payload: bool,
  };
};

const setItems = items => {
  return {
    type: 'LAYANAN_SET_ITEMS',
    payload: items,
  };
};

export const fetchItems = () => async dispatch => {
  dispatch(setLoading());
  const {success, result} = await ServiceAPI.getAll();
  success && dispatch(setItems(result));
};

export const setServiceStatus = (id, status) => async dispatch => {
  dispatch(setLoading());
  const {success} = await ServiceAPI.setStatus(id, status);
  success && dispatch(fetchItems());
};
