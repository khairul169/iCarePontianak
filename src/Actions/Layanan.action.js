import API from "../Public/API";

const setLoading = bool => {
  return {
    type: "LAYANAN_SET_LOADING",
    payload: bool
  };
};

const setItems = items => {
  return {
    type: "LAYANAN_SET_ITEMS",
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

export const setServiceStatus = (id, status) => {
  return (dispatch, getState) => {
    API.patch(`service/${id}/status`, { status }, getState().auth.token).then(
      response => response.success && dispatch(fetchItems())
    );
  };
};
