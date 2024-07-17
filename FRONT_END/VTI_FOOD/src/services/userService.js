import api from "./axiosClient";

const ENDPOINT = "/users";
const userService = {
  getAll(pageNumber) {
    return api.get(ENDPOINT, {
      params: {
        pageNumber: pageNumber,
      },
    });
  },

  getById(id) {
    return api.get(ENDPOINT + "/" + id);
  },
  create(body) {
    return api.post(body);
  },
  update(id, body) {
    return api.put(ENDPOINT + "/" + id, body);
  },
  delete(id) {
    return api.delete(ENDPOINT + "/" + id);
  },
};
export default userService;
