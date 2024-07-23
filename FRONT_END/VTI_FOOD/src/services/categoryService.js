import api from "./axiosClient";

const ENDPOINT = "/categories";
const categoryService = {
  getAll() {
    return api.get(ENDPOINT);
  },
  getById(id) {
    return api.get(ENDPOINT + "/" + id);
  },
  create(body) {
    return api.post(ENDPOINT, body);
  },
  update(id, body) {
    return api.put(ENDPOINT + id, body);
  },
  delete(id) {
    return api.delete(ENDPOINT + id);
  },
};
export default categoryService;
