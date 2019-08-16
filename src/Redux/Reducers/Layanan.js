const initialState = {
  loading: true,
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LAYANAN_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'LAYANAN_SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
