import axios from "axios";
import { APP_API } from "react-native-dotenv";

const API_URL = __DEV__ ? "http://192.168.43.48/icare/public/" : APP_API;

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
        console.log(result.data);
        return result.data;
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  static async post(url, body, token) {
    return axios
      .post(API_URL + url, body, auth(token))
      .then(result => {
        console.log(result.data);
        return result.data;
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  static async patch(url, body, token) {
    return axios
      .patch(API_URL + url, body, auth(token))
      .then(result => {
        console.log(result.data);
        return result.data;
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}

export default API;
