import {ServiceAPI} from '../../Public/API';

const STATE_LOADING = {
  type: 'LAYANAN_LOADING',
  payload: true,
};

const STATE_LOADED = {
  type: 'LAYANAN_LOADING',
  payload: false,
};

const setLayanan = items => ({
  type: 'LAYANAN_SET_ITEMS',
  payload: items,
});

//////////////////////////////////////////////////////////////////////////////////////////////

export const fetchItems = () => async dispatch => {
  dispatch(STATE_LOADING);
  const {success, result} = await ServiceAPI.getAll();
  success && dispatch(setLayanan(result));
  dispatch(STATE_LOADED);
};

export const setServiceStatus = (id, status) => async dispatch => {
  dispatch(STATE_LOADING);
  const {success} = await ServiceAPI.setStatus(id, status);
  success && dispatch(fetchItems());
  dispatch(STATE_LOADED);
};
