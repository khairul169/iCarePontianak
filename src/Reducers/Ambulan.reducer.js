// ambulan items
export const ambulan = (state = [], action) => {
  return action.type === "AMBULAN_STATE" ? action.payload : state;
};
