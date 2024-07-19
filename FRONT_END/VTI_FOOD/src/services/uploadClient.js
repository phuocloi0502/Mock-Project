import axios from "axios";
import { getToken } from "../utils/helpers";
import { urlApi } from "../utils/constant";
const token = getToken();
const apiUploadImage = axios.create({
  baseURL: urlApi,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
});

// Can thiệp vào quá trình request lên server
// apiUploadImage.interceptors.request.use(
//   function (config) {
//     if (token) {
//       config.headers["Authorization"] = "Bearer " + token;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// // Can thiệp vào quá trình response từ server
// apiUploadImage.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
export default apiUploadImage;
