const initialState = {
  pushNotification: null,
  isLoading: false,
  kategoriLayanan: [],
};

export const beranda = (state = initialState, action) => {
  switch (action.type) {
    case 'BERANDA_PUSH_NOTIFICATION':
      return {
        ...state,
        pushNotification: action.payload,
      };
    case 'BERANDA_SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
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
