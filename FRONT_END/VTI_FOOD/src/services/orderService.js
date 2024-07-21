import api from "./axiosClient";

const ENDPOINT = "/orders";
const orderService = {
  create(body) {
    return api.post(ENDPOINT + "/create", body);
  },
  getAll() {
    return api.get(ENDPOINT);
  },
  getOrderByUserId(userId) {
    return api.get(ENDPOINT + "/user/" + userId);
  },
  getOrderDetailByOrderId(oderId) {
    return api.get(ENDPOINT + "/" + oderId);
  },

  update(id, body) {
    return api.put(ENDPOINT + "/" + id, body);
  },
  //   delete(id) {
  //     return api.delete(ENDPOINT + id);
  //   },
};
export default orderService;
