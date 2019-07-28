import axios from "axios";

const DEBUG = true;
const LOCAL = true;
const API_URL = LOCAL
  ? "http://192.168.56.1/icare/public/"
  : "http://192.168.43.48/icare/public/";

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
        DEBUG && console.log(error);
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
        DEBUG && console.log(error);
      });
  }
}

export default API;
