const initialState = {
  loading: true,
  success: false,
  message: null,
  loggedIn: false,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'AUTH_SET_RESPONSE':
      return {
        ...state,
        success: action.payload.success,
        message: action.payload.message,
      };
    case 'AUTH_LOGGED_IN':
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default reducer;
