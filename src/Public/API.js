import axios from 'axios';
import {API_BASE, API_DEV, OPENROUTE_APIKEY} from 'react-native-dotenv';
import store from './Store';

/* ##################################### Base API ##################################### */

const API = (() => {
  // consts
  const API_URL = __DEV__ ? API_DEV : API_BASE;

  const getConfig = () => {
    const authToken = store.getState().auth.token;
    const headers = {Authorization: `Bearer ${authToken}`};
    return {headers};
  };

  // get method
  const get = async url => {
    try {
      const result = await axios.get(API_URL + url, getConfig());
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  // post method
  const post = async (url, body) => {
    try {
      const result = await axios.post(API_URL + url, body, getConfig());
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  // patch method
  const patch = async (url, body) => {
    try {
      const result = await axios.patch(API_URL + url, body, getConfig());
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  // delete method
  const del = async url => {
    try {
      const result = await axios.delete(API_URL + url, getConfig());
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    get,
    post,
    patch,
    del,
  };
})();

/* ##################################### Auth API ##################################### */

const AuthAPI = {
  register: (username, password, fullname) =>
    API.post('auth/register', {
      username,
      password,
      fullname,
    }),
  login: (username, password) =>
    API.post('auth/login', {
      username,
      password,
    }),
  validate: token =>
    API.post('auth/validate', {
      token,
    }),
};

/* ##################################### User API ##################################### */

const UserAPI = {
  getUser: () => API.get('user/'),
  getUserById: id => API.get(`user/${id}`),
  setData: data => API.patch('user/', {data}),
  setUserLocation: (latitude, longitude) =>
    API.patch('user/location', {
      value: {latitude, longitude},
    }),
  setProfileImage: value => API.patch('user/profileimg', {value}),
  setActive: value => API.patch('user/active', {value}),
  setDeviceId: value => value && API.patch('user/deviceid', {value}),
};

/* ##################################### Client API ##################################### */

const ClientAPI = {
  getClients: () => API.get('client/'),
  getClient: id => API.get(`client/${id}`),
  create: data => API.post('client/', {data}),
  update: (id, data) => API.patch(`client/${id}`, {data}),
  delete: id => API.del(`client/${id}`),
};

/* ##################################### Service API ##################################### */

const ServiceAPI = {
  getCategories: () => API.get('service/category'),
  getCategory: id => API.get(`service/category/${id}`),
  searchNakes: (kategori, lokasi, exclude) =>
    API.post('service/nakes', {kategori, lokasi, exclude}),
  createService: data => API.post('service/create', {data}),
  getServiceList: () => API.get('service/lists'),
  getServiceById: id => API.get(`service/view/${id}`),
  cancel: id => API.patch(`service/cancel/${id}`),
  finish: id => API.patch(`service/finish/${id}`),
};

/* ##################################### Emergency API ##################################### */

const EmergencyAPI = {
  getLists: () => API.get('emergency/'),
  getById: id => API.get(`emergency/${id}`),
  create: data => API.post('emergency/', {data}),
  getAmbulance: () => API.get('emergency/ambulance'),
};

/* ##################################### Message API ##################################### */

const MessageAPI = {
  getMessages: id => API.get(`message/get/${id}`),
  create: (id, message) => API.post('message/', {id, message}),
};

/* ##################################### OpenRoute API ##################################### */

const OpenRouteAPI = {
  getDirection: async (from, to) => {
    // direction api
    let url = 'https://api.openrouteservice.org/v2/directions/';
    url += `driving-car?api_key=${OPENROUTE_APIKEY}`;
    url += `&start=${from.longitude},${from.latitude}`;
    url += `&end=${to.longitude},${to.latitude}`;

    // fetch navigation path
    try {
      const response = await axios.get(url);
      const {coordinates} = response.data.features[0].geometry;

      return coordinates.map(item => ({
        latitude: item[1],
        longitude: item[0],
      }));
    } catch (error) {
      console.log(error);
    }
    return false;
  },
};

export default API;
export {
  // Server API
  AuthAPI,
  UserAPI,
  ClientAPI,
  ServiceAPI,
  EmergencyAPI,
  MessageAPI,
  // Third-party API
  OpenRouteAPI,
};
