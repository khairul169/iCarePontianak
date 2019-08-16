const initialState = {
  loading: true,
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFIKASI_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'NOTIFIKASI_SET_ITEMS':
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
