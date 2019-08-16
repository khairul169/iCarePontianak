const initialState = {
  deviceId: null,
  navProps: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PUSHNOTIF_DEVICE_ID':
      return {
        ...state,
        deviceId: action.payload,
      };
    case 'PUSHNOTIF_NAVPROPS':
      return {
        ...state,
        loading: false,
        navProps: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
