import { NotificationAPI } from "../Public/API";

const setLoading = (bool = true) => {
  return {
    type: "NOTIF_SET_LOADING",
    payload: bool
  };
};

const setItems = items => {
  return {
    type: "NOTIF_SET_ITEMS",
    payload: items
  };
};

export const fetchItems = () => async dispatch => {
  // fetch data
  dispatch(setLoading());
  const response = await NotificationAPI.getAll();
  dispatch(setLoading(false));

  // items loaded
  response.success && dispatch(setItems(response.result));
};
