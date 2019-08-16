const initialState = {
  loading: true,
  kategoriLayanan: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'BERANDA_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'BERANDA_KATEGORI_LAYANAN':
      return {
        ...state,
        kategoriLayanan: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
