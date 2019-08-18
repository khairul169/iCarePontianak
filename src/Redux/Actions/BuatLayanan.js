import {ClientAPI, ServiceAPI} from 'public/API';

const setKategori = payload => ({
  type: 'BUATLAYANAN_KATEGORI',
  payload,
});

const setListKlien = payload => ({
  type: 'BUATLAYANAN_LIST_KLIEN',
  payload,
});

const setNakes = payload => ({
  type: 'BUATLAYANAN_NAKES',
  payload,
});

export const setTindakan = payload => ({type: 'BUATLAYANAN_TINDAKAN', payload});
export const setKlien = payload => ({type: 'BUATLAYANAN_KLIEN', payload});
export const setKeluhan = payload => ({type: 'BUATLAYANAN_KELUHAN', payload});
export const setAlamat = payload => ({type: 'BUATLAYANAN_ALAMAT', payload});
export const setLokasi = payload => ({type: 'BUATLAYANAN_LOKASI', payload});
export const setWaktu = payload => ({type: 'BUATLAYANAN_WAKTU', payload});

const addNakesExclusion = payload => ({
  type: 'BUATLAYANAN_EXCLUSION',
  payload,
});

export const resetNakesExclusion = () => ({
  type: 'BUATLAYANAN_RESET_EXCLUSION',
});

export const fetchKategori = id => async dispatch => {
  try {
    const {result} = await ServiceAPI.getCategory(id);
    dispatch(setKategori(result));
  } catch (error) {
    console.log(error);
  }
};

export const fetchKlien = () => async dispatch => {
  try {
    const {result} = await ClientAPI.getClients();
    dispatch(setListKlien(result));
  } catch (error) {
    console.log(error);
  }
};

export const searchNakes = () => async (dispatch, getState) => {
  try {
    const {kategori, lokasi, nakesExclusion} = getState().buatLayanan;
    const {result} = await ServiceAPI.searchNakes(
      kategori.id,
      lokasi,
      nakesExclusion,
    );
    dispatch(setNakes(result));
    dispatch(addNakesExclusion(result.id));
  } catch (error) {
    console.log(error);
  }
};

export const resetState = () => ({type: 'BUATLAYANAN_RESET_ALL'});
