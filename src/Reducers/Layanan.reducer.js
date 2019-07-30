const initialState = {
  loading: false,
  items: null
};

export const layanan = (state = initialState, action) => {
  switch (action.type) {
    case "LAYANAN_SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "LAYANAN_SET_ITEMS":
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    default:
      return state;
  }
};
