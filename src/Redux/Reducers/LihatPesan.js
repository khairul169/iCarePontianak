const initialState = {
  userId: 0,
  user: null,
  messages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_USER_ID':
      return {...state, userId: action.payload};

    case 'MESSAGE_USER':
      return {...state, user: action.payload};

    case 'MESSAGE_SET_MESSAGES':
      return {...state, messages: action.payload};

    default:
      return state;
  }
};

export default reducer;
