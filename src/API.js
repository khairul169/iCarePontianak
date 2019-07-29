import axios from "axios";

const DEBUG = true;
const API_URL = "http://192.168.43.48/icare/public/";
//const API_URL = "http://192.168.56.1/icare/public/";

const auth = token => {
  return {
    headers: token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined
  };
};

class API {
  static async get(url, token) {
    return axios
      .get(API_URL + url, auth(token))
      .then(result => {
        DEBUG && console.log(result.data);
        return result.data;
      })
      .catch(error => {
        DEBUG && console.log(error.message);
      });
  }

  static async post(url, body, token) {
    return axios
      .post(API_URL + url, body, auth(token))
      .then(result => {
        DEBUG && console.log(result.data);
        return result.data;
      })
      .catch(error => {
        DEBUG && console.log(error.message);
      });
  }

  static async patch(url, body, token) {
    return axios
      .patch(API_URL + url, body, auth(token))
      .then(result => {
        DEBUG && console.log(result.data);
        return result.data;
      })
      .catch(error => {
        DEBUG && console.log(error.message);
      });
  }
}

export default API;
