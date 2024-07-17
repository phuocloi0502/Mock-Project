import { Card, Form, Button, Input, Flex } from "antd";
import "./login_admin.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import authService from "../../../services/authService";
import { getToken } from "../../../utils/helpers";
import { jwtDecode } from "jwt-decode";

import { changeIsLogin, changeUserName } from "../../../redux/slide/userSlide";
export const LoginAdmin = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      await authService.login({
        username: values.username,
        password: values.password,
      });

      const token = getToken();
      const decoded = jwtDecode(token);

      if (decoded?.role !== "admin") {
        localStorage.removeItem("token");
        nav("/");
        toast.error("Bạn không phải Admin");
      } else {
        nav("/admin");
        toast.success("Đăng nhập thành công !!!");
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <div className="login-page">
      <Card className="login-card" title="LOGIN" style={{ width: 400 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="center">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
