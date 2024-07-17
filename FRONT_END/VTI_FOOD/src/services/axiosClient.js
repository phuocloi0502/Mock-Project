import axios from "axios";
import { getToken } from "../utils/helpers";
import { urlApi } from "../utils/constant";

const api = axios.create({
  baseURL: urlApi,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Can thiệp vào quá trình request lên server
api.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Can thiệp vào quá trình response từ server
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default api;
