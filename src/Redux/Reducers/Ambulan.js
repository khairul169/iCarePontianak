const reducer = (state = [], action) => {
  return action.type === 'AMBULANCE_STATE' ? action.payload : state;
};

export default reducer;
