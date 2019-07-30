const initialState = {
  loading: false,
  items: null
};

export const notifikasi = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIF_SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    case "NOTIF_SET_ITEMS":
      return {
        ...state,
        loading: false,
        items: action.payload
      };
    default:
      return state;
  }
};
