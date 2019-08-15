import axios from 'axios';
import {API_BASE, API_DEV} from 'react-native-dotenv';
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

  return {
    get,
    post,
    patch,
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

/* ##################################### Service API ##################################### */

const ServiceAPI = {
  getAll: () => API.get('service/'),
  create: (type, data, location) =>
    API.post('service/', {type, data, location}),
  setStatus: (id, status) => API.patch(`service/${id}/status`, {status}),
};

/* ##################################### Notification API ##################################### */

const NotificationAPI = {
  getAll: () => API.get('notification/'),
};

/* ##################################### Ambulance API ##################################### */

const AmbulanceAPI = {
  getAll: () => API.get('ambulance/'),
};

export default API;
export {AuthAPI, UserAPI, ServiceAPI, NotificationAPI, AmbulanceAPI};
