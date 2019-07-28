const initialState = {
  loading: false,
  items: null
};

export const notifikasi = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFIKASI_SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "NOTIFIKASI_SET_ITEMS":
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    default:
      return state;
  }
};
