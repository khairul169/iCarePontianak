import API from "../Public/API";

const setItems = items => {
  return {
    type: "AMBULAN_STATE",
    payload: items
  };
};

export const fetchItems = () => {
  return async (dispatch, getState) => {
    // fetch data
    const response = await API.get("ambulance/", getState().auth.token);
    response.success && dispatch(setItems(response.result));
  };
};
