const initialState = {
  loading: true,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AKUN_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'AKUN_USER_STATE':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
