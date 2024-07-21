import React, { useEffect } from "react";
import "./my_account.scss";
import {
  Breadcrumb,
  Col,
  Row,
  Form,
  Input,
  Button,
  Upload,
  DatePicker,
  message,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PiRocketDuotone } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { LuFileBox } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUser } from "../../redux/slide/userSlide";
import { useState } from "react";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const YYMMFormat = "YY/MM";

export const MyAccount = (props) => {
  const [form] = Form.useForm();

  const [dataForm, setDataForm] = useState({});
  // handle data
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlide.userId);
  const dataUserById = useSelector((state) => state.userSlide.userById);

  useEffect(() => {
    console.log(userId);
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [userId]);
  console.log(dataUserById, "dataUserById");
  const onFinish = (value) => {
    const dataUpdate = {
      firstName: value.firstname,
      lastName: value.lastname,
      phoneNumber: value.phone,
      username: dataUserById?.username,
      password: dataUserById?.password,
      retypePassword: dataUserById?.password,
      address: value.address,
      dob: "09/10/2001",
      email: value.email,
      role_id: "2",
    };
    console.log(dataUpdate);
    if (userId) {
      console.log(userId, "dadsa");
      try {
        dispatch(updateUser({ id: userId, body: dataUpdate }));
      } catch (error) {
        console.error("Failed to dispatch update:", error);
      }
    }
  };

  useEffect(() => {
    setDataForm({
      lastname: `${dataUserById?.lastName}`,
      firstname: `${dataUserById?.firstName}`,
      email: `${dataUserById?.email}`,
      address: `${dataUserById?.address}`,
      phone: `${dataUserById?.phoneNumber}`,
    });
    form.setFieldsValue({
      lastname: `${dataUserById?.lastName}`,
      firstname: ` ${dataUserById?.firstName}`,
      email: `${dataUserById?.email}`,
      address: `${dataUserById?.address}`,
      phone: `${dataUserById?.phoneNumber}`,
    });
  }, [dataUserById, form]);

  const [open, setOpen] = useState(false);
  const configModal = {};
  const handleChangePassword = async (values) => {
    console.log("change password");
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        okText="Đổi"
        title="Đổi mật khẩu"
        footer={null}
      >
        <Form
          variant="filled"
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="currentPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu hiện tại!",
              },
              { min: 6, message: "Mật khẩu phải nhập ít nhất 6 kí tự !" },
            ]}
          >
            <Input type="password" placeholder="Password" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới !",
              },
              { min: 6, message: "Mật khẩu phải nhập ít nhất 6 kí tự !" },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Password"
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="newPasswordConfirm"
            dependencies={["newPassword"]}
            //  hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lại mật khẩu mới !",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" autoComplete="off" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="my-account-wrapper">
        <div id="bread-crumb">
          <Breadcrumb
            items={[
              {
                title: "My Account",
              },
              {
                title: "Personal",
              },
            ]}
          />
        </div>
        <Row justify="space-between" className="order-statistics">
          <Col span={6} className="container piRocket-duotone">
            <Row className="statistical-wrap">
              <Col span={4} id="icon">
                <PiRocketDuotone />
              </Col>
              <Col span={20}>
                <Row id="number">
                  <h1>154</h1>
                </Row>
                <Row>Tổng số đơn đặt hàng</Row>
              </Col>
            </Row>
          </Col>
          <Col span={6} className="container file-box">
            <Row className="statistical-wrap">
              <Col span={4} id="icon">
                <LuFileBox />
              </Col>
              <Col span={20}>
                <Row id="number">
                  <h1>05</h1>
                </Row>
                <Row>Đơn hàng đang giao</Row>
              </Col>
            </Row>
          </Col>
          <Col span={6} className="container box-seam">
            <Row className="statistical-wrap">
              <Col span={4} id="icon">
                <BsBoxSeam />
              </Col>
              <Col span={20}>
                <Row id="number">
                  <h1>149</h1>
                </Row>
                <Row>Đơn hàng đã hoàn thành</Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className="information-wrap">
          <Form
            {...formItemLayout}
            form={form}
            variant="filled"
            className="form-warp"
            layout="vertical"
            initialValues={dataForm}
            onFinish={onFinish}
          >
            <Form.Item label="Họ" extra="">
              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: "Xin vui lòng nhập Họ và Tên!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Tên" extra="">
              <Form.Item
                name="firstname"
                rules={[
                  { required: true, message: "Xin vui lòng nhập Họ và Tên!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Form.Item>

            <Form.Item label="E-mail" extra="">
              <Form.Item
                name="email"
                noStyle
                rules={[
                  {
                    type: "email",
                    message: "Xin vui lòng kiểm tra lại định dạng E-mail!",
                  },
                  {
                    required: true,
                    message: "Xin vui lòng nhập địa chỉ E-mail!",
                  },
                ]}
              >
                <Input placeholder="abc@gmail.com" />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Địa chỉ" extra="">
              <Form.Item
                name="address"
                noStyle
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng nhập địa chỉ của bạn!",
                  },
                ]}
              >
                <Input placeholder="Địa chỉ" />
              </Form.Item>
            </Form.Item>

            <Form.Item label="Số điện thoại" extra="">
              <Form.Item
                name="phone"
                noStyle
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
                <Input placeholder="0336728056" />
              </Form.Item>
            </Form.Item>

            {/* <Form.Item
              label="Avatar"
              getValueFromEvent={normFile}
              layout="horizontal"
              className="avatar"
              labelCol={{
                span: 3,
              }}
            >
              <Upload action="" listType="picture-card">
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload>
            </Form.Item> */}
            <Row className="title">
              <h3>*Phương Thức Thanh Toán</h3>
            </Row>
            <Form.Item label="Tên chủ thẻ" extra="" name="nameBank">
              <Input placeholder="Nhập Tên chủ thẻ" />
            </Form.Item>

            <Form.Item label="Số thẻ" extra="" name="numberBank">
              <Input placeholder="Nhập số thẻ" />
            </Form.Item>

            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item
                  label="Ngày hết hạn"
                  extra=""
                  name="expiryDate"
                  wrapperCol={{
                    offset: 0,
                  }}
                >
                  <DatePicker
                    placeholder="YY/MM"
                    format={YYMMFormat}
                    picker="month"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CVC" extra="" name="cvc">
                  <Input type="text" placeholder="000" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Row justify="space-evenly" className="container-end">
                <Col span={8}>
                  <Col span={24} className="link">
                    <a
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Thay Đổi Mật Khẩu
                    </a>
                  </Col>
                  <Col span={24} className="link">
                    <a>Xoá Tài Khoản</a>
                  </Col>
                </Col>
                <Col span={8} className="btn-edit">
                  <Button type="primary" htmlType="submit">
                    Chỉnh Sửa
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default MyAccount;
