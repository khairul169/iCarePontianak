import API from "../API";

const setLoading = bool => {
  return {
    type: "NOTIFIKASI_SET_LOADING",
    payload: bool
  };
};

const setItems = items => {
  return {
    type: "NOTIFIKASI_SET_ITEMS",
    payload: items
  };
};

export const fetchItems = () => {
  return (dispatch, getState) => {
    // set loading
    dispatch(setLoading(true));

    // fetch data
    API.get("service/", getState().auth.token)
      .then(response => {
        dispatch(setLoading(false));
        return response;
      })
      .then(({ success, result }) => {
        success && dispatch(setItems(result));
      });
  };
};
