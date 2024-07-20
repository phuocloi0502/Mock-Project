import api from "./axiosClient";

const ENDPOINT = "/orders";
const orderService = {
  create(body) {
    return api.post(ENDPOINT + "/create", body);
  },
  getAll() {
    return api.get(ENDPOINT);
  },
  getById(id) {
    return api.get(ENDPOINT + "/" + id);
  },

  update(id, body) {
    return api.put(ENDPOINT + id, body);
  },
  //   delete(id) {
  //     return api.delete(ENDPOINT + id);
  //   },
};
export default orderService;
