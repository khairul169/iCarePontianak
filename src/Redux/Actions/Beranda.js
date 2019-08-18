import {ServiceAPI} from '../../Public/API';

const STATE_LOADING = {
  type: 'BERANDA_LOADING',
  payload: true,
};

const STATE_LOADED = {
  type: 'BERANDA_LOADING',
  payload: false,
};

const setKategoriLayanan = payload => ({
  type: 'BERANDA_KATEGORI_LAYANAN',
  payload,
});

//////////////////////////////////////////////////////////////////////////////////////////////

export const fetchData = () => async dispatch => {
  dispatch(STATE_LOADING);

  // fetch service categories
  const {result} = await ServiceAPI.getCategories();
  dispatch(setKategoriLayanan(result));

  dispatch(STATE_LOADED);
};

export const setNavigation = payload => ({
  type: 'BERANDA_NAVIGATION',
  payload,
});
