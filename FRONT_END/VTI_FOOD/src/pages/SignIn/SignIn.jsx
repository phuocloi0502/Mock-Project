import image_signin from "../../assets/Lovepik_com-380163134-hand-drawn-world-food-day-group-illustration-fruit-food-illustrations.png";
import "./sign_in.scss";
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { Button, Checkbox, Form, Input, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { changeIsLogin, changeUserName } from "../../redux/slide/userSlide";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
export const SignIn = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      await authService.login({
        username: values.username,
        password: values.password,
      });
      dispatch(changeIsLogin(true));
      nav("/");
      toast.success("Đăng nhập thành công !!!");
    } catch (error) {
      if (error?.message == "wrong username or password") {
        toast.error("Username hoặc mật khẩu không đúng");
      } else {
        toast.error(error?.message);
      }

      //console.log(error?.message);
    }
  };
  return (
    <div className="wrapper-signIn">
      <div className="image-signIn-area">
        <img src={image_signin} />
      </div>
      <div className="content-area">
        <div className="title-signIn-area">
          <h1>Chào mừng đến VTI FOOD !</h1>
        </div>
        <div className="form-signIn-area">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item>
              <Flex justify="center">
                <h1> Đăng Nhập</h1>
              </Flex>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập User name !",
                },
              ]}
            >
              <Input
                prefix={<FaUser className="site-form-item-icon" />}
                placeholder="Username"
                autoFocus
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
                },
              ]}
            >
              <Input.Password
                prefix={<FaLock className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lưu đăng nhập</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Flex gap={"large"} justify="center">
                <Button htmlType="submit" className="login-form-button">
                  Đăng Nhập
                </Button>
                <Link to={"/register"}>
                  {" "}
                  <Button className="login-form-button">Đăng ký</Button>
                </Link>{" "}
              </Flex>
            </Form.Item>
            <Form.Item className="login-form-forgot">
              <Link>Quên mật khẩu</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
