import api from "./axiosClient";
import apiUploadImage from "./uploadClient";

const ENDPOINT = "/products";
const productService = {
  getAll(pageNumber, search) {
    return api.get(ENDPOINT, {
      params: {
        pageNumber: pageNumber,
        search: search,
      },
    });
  },
  getByCategoryId(id, pageNumber) {
    return api.get(ENDPOINT + `/category/${id}`, {
      params: {
        pageNumber: pageNumber,
      },
    });
  },
  getById(id) {
    return api.get(ENDPOINT + "/" + id);
  },

  // upload product image
  uploadProductImage(id, body) {
    return apiUploadImage.post(ENDPOINT + "/" + id + "/images", body);
  },
  create(body) {
    //return api.interceptors.request.use
    return api.post(ENDPOINT, body);
  },
  update(id, body) {
    return api.put(ENDPOINT + "/" + id, body);
  },
  delete(id) {
    return api.delete(ENDPOINT + "/" + id);
  },
};
export default productService;
