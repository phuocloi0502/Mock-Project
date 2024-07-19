import api from "./axiosClient";

const ENDPOINT = "/carts";
const cartService = {
  create(body) {
    return api.post(ENDPOINT + "/add", body);
  },

  getCartDetailByUserId(userid) {
    return api.get("/cart_details/" + userid);
  },
  updateCart(body) {
    return api.put(ENDPOINT + "/update", body);
  },
  deleteProductFromCart(cartId, productId) {
    return api.delete(`carts/${cartId}/product/${productId}`);
  },
};
export default cartService;
