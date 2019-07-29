import API from "../API";
import { fetchItems } from "./Notifikasi.action";

export const setServiceStatus = (id, status) => {
  return (dispatch, getState) => {
    API.patch(`service/${id}/status`, { status }, getState().auth.token).then(
      response => response.success && dispatch(fetchItems())
    );
  };
};
