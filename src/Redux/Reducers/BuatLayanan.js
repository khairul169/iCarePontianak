const initialState = {
  kategori: null,
  listKlien: [],

  // input
  tindakan: [],
  klien: null,
  keluhan: '',
  alamat: '',
  lokasi: null,
  waktu: null,

  // hasil cari nakes
  nakes: null,
  nakesExclusion: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BUATLAYANAN_KATEGORI':
      return {...state, kategori: action.payload};

    case 'BUATLAYANAN_LIST_KLIEN':
      return {...state, listKlien: action.payload, klien: null};

    case 'BUATLAYANAN_TINDAKAN':
      return {...state, tindakan: action.payload};

    case 'BUATLAYANAN_KLIEN':
      return {...state, klien: action.payload};

    case 'BUATLAYANAN_KELUHAN':
      return {...state, keluhan: action.payload};

    case 'BUATLAYANAN_ALAMAT':
      return {...state, alamat: action.payload};

    case 'BUATLAYANAN_LOKASI':
      return {...state, lokasi: action.payload};

    case 'BUATLAYANAN_WAKTU':
      return {...state, waktu: action.payload};

    case 'BUATLAYANAN_NAKES':
      return {...state, nakes: action.payload};

    case 'BUATLAYANAN_EXCLUSION':
      return {
        ...state,
        nakesExclusion: [...state.nakesExclusion, action.payload],
      };

    case 'BUATLAYANAN_RESET_EXCLUSION':
      return {...state, nakesExclusion: []};

    case 'BUATLAYANAN_RESET_ALL':
      return {
        ...state,
        kategori: null,
        listKlien: [],
        tindakan: [],
        klien: null,
        keluhan: '',
        alamat: '',
        lokasi: null,
        waktu: null,
        nakes: null,
        nakesExclusion: [],
      };

    default:
      return state;
  }
};

export default reducer;
