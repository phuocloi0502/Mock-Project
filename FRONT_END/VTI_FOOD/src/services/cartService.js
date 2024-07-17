import api from "./axiosClient";

const ENDPOINT = "/carts";
const cartService = {
  create(body) {
    return api.post(ENDPOINT + "/add", body);
  },

  getCartById(id) {
    return api.get(ENDPOINT + "/" + id);
  },
  updateCartById(id, body) {
    return api.put(ENDPOINT + "/" + id, body);
  },
  delete(cartId, productId) {
    return api.delete(ENDPOINT + "/" + cartId + "/product/" + productId);
  },
  getAll() {
    return api.get(ENDPOINT);
  },
};
export default cartService;
