const initialState = {
  pushNotification: null,
};

export const beranda = (state = initialState, action) => {
  switch (action.type) {
    case 'BERANDA_PUSH_NOTIFICATION':
      return {
        ...state,
        pushNotification: action.payload,
      };
    default:
      return state;
  }
};
