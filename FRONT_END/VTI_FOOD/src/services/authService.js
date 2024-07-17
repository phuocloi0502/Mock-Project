import api from "./axiosClient";

const ENDPOINT = "/users";
const authService = {
  async login(body) {
    try {
      const response = await api.post(ENDPOINT + "/login", body);
      // console.log(response);
      if (response.data) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");
      if (error.response) {
        // Nếu server trả về mã lỗi và thông báo từ phía server
        throw new Error(error.response.data.message);
      } else if (error.request) {
        // Nếu request được gửi nhưng không nhận được phản hồi
        throw new Error("Không có phản hồi từ server");
      } else {
        // Lỗi xảy ra khi thiết lập request
        throw new Error("Lỗi khi gửi yêu cầu đến server");
      }
    }
  },
  async register(body) {
    try {
      const response = await api.post(ENDPOINT + "/register", body);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Nếu server trả về mã lỗi và thông báo từ phía server
        throw new Error(error.response.data);
      } else if (error.request) {
        // Nếu request được gửi nhưng không nhận được phản hồi
        throw new Error("Không có phản hồi từ server");
      } else {
        // Lỗi xảy ra khi thiết lập request
        throw new Error("Lỗi khi gửi yêu cầu đến server");
      }
    }
  },
  forgetPassword() {},
};

export default authService;
