import {AmbulanceAPI} from '../Public/API';

const setItems = items => {
  return {
    type: 'AMBULAN_STATE',
    payload: items,
  };
};

export const fetchItems = () => async dispatch => {
  // fetch data
  const response = await AmbulanceAPI.getAll();
  response.success && dispatch(setItems(response.result));
};
