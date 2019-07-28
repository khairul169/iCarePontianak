const initialState = {
  isLoading: false,
  success: false,
  message: null,
  token: null
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    // setLoading
    case "AUTH_SET_LOADING":
      return {
        ...state,
        isLoading: action.payload
      };

    // setResponse
    case "AUTH_SET_RESPONSE":
      return {
        ...state,
        isLoading: false,
        success: action.payload.success,
        message: action.payload.message
      };

    // setToken
    case "AUTH_SET_TOKEN":
      return {
        ...state,
        token: action.payload
      };

    default:
      return state;
  }
};
