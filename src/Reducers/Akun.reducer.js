const initialState = {
  loading: false,
  userData: null,
};

export const akun = (state = initialState, action) => {
  switch (action.type) {
    case 'AKUN_SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'AKUN_SET_USERDATA':
      return {
        ...state,
        loading: false,
        userData: action.payload,
      };
    default:
      return state;
  }
};
