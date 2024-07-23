import image_signin from "../../assets/Lovepik_com-380163134-hand-drawn-world-food-day-group-illustration-fruit-food-illustrations.png";
import "./sign_up.scss";
import { MdEmail } from "react-icons/md";
import { FaLock, FaPhone, FaAddressBook } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { Button, Checkbox, Form, Input, Flex, DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/authService";
import { toast } from "react-hot-toast";

export const SignUp = () => {
  const nav = useNavigate();
  const [mydate, setMyDate] = useState("");
  const handleChangeDatePicker = (date, dateString) => {
    setMyDate(dateString);
    //console.log(dateString);
  };

  const onFinish = async (values) => {
    try {
      await authService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        username: values.username,
        password: values.password,
        retypePassword: values.confirm,
        address: values.address,
        dob: mydate,
        email: values.email,
        create_ad: "",
        role_id: 2,
      });
      toast.success("Đăng ký thành công !!!");
      nav("/login");
    } catch (error) {
      // console.log("dsadas");
      toast.error(error?.message);
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
            name="normal_register"
            initialValues={{
              remember: true,
            }}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
          >
            <Form.Item>
              <Flex justify="center">
                <h1> Đăng Ký</h1>
              </Flex>
            </Form.Item>
            <Form.Item
              label="Họ"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Họ !",
                },
              ]}
            >
              <Input
                prefix={<FaUser className="site-form-item-icon" />}
                placeholder="Họ"
              />
            </Form.Item>
            <Form.Item
              label="Tên"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tên !",
                },
              ]}
            >
              <Input
                prefix={<FaUser className="site-form-item-icon" />}
                placeholder="Tên"
              />
            </Form.Item>
            <Form.Item
              label="User name"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập user name !",
                },
                { min: 5, message: "User name  phải nhập ít nhất 5 kí tự !" },
                { max: 50, message: "User name  phải nhập ít hơn 50 kí tự !" },
              ]}
            >
              <Input
                prefix={<FaUser className="site-form-item-icon" />}
                placeholder="User name"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Email !",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng Email !",
                },
              ]}
            >
              <Input
                prefix={<MdEmail className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại !",
                },
                {
                  pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/,
                  message: "Phone number is not valid!",
                },
              ]}
            >
              <Input
                prefix={<FaPhone className="site-form-item-icon" />}
                placeholder="Phone number"
              />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ !",
                },
              ]}
            >
              <Input
                prefix={<FaAddressBook className="site-form-item-icon" />}
                placeholder="Địa chỉ"
              />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="dob"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày sinh !",
                },
              ]}
            >
              <DatePicker
                placeholder="DD/MM/YYYY"
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                onChange={handleChangeDatePicker}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu !",
                },
                { min: 6, message: "Mật khẩu phải nhập ít nhất 6 kí tự !" },
              ]}
            >
              <Input.Password
                prefix={<FaLock className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                autoComplete="off"
              />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirm"
              dependencies={["password"]}
              //  hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu !",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                prefix={<FaLock className="site-form-item-icon" />}
                autoComplete="off"
              />
            </Form.Item>
            <div className="form-button-register">
              <Link to={"/login"}>
                {" "}
                <Button className="login-form-button">Đăng nhập</Button>
              </Link>{" "}
              <Button htmlType="submit">Đăng ký</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
