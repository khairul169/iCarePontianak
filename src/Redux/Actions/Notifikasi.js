import {NotificationAPI} from '../../Public/API';

const STATE_LOADING = {
  type: 'NOTIFIKASI_LOADING',
  payload: true,
};

const STATE_LOADED = {
  type: 'NOTIFIKASI_LOADING',
  payload: false,
};

const setItems = items => ({
  type: 'NOTIFIKASI_SET_ITEMS',
  payload: items,
});

//////////////////////////////////////////////////////////////////////////////////////////////

export const fetchItems = () => async dispatch => {
  dispatch(STATE_LOADING);

  // load items
  const response = await NotificationAPI.getAll();
  response.success && dispatch(setItems(response.result));

  dispatch(STATE_LOADED);
};
