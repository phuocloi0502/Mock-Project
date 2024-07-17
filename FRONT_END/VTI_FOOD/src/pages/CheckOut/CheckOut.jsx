import React from "react";
import "./check_out.scss";
import { Form, Input, Button, Radio, DatePicker, message } from "antd";
import { useState } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaCcVisa } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import productImg from "../../assets/image.png";
export const CheckOut = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div className="check-out-wrap">
      <p>
        Trang chủ <span style={{ color: "gray" }}>/ </span>
        Thanh toán
      </p>
      <div className="check-out-area">
        <div className="check-out-user">
          <div className="check-out-form user-info">
            <h4>Thông tin giao hàng</h4>
            <Form
              name="normal_login"
              className="login-form"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 13 }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tên !",
                  },
                  {
                    type: "string",
                    message: "Username must only contain letters!",
                  },
                ]}
              >
                <Input placeholder="Name" autoFocus />
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
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Address !",
                  },
                ]}
              >
                <Input placeholder="Name" autoFocus />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Phone !",
                  },
                  {
                    pattern: /^(0[3|5|7|8|9])+([0-9]{8})$/,
                    message: "Phone number is not valid!",
                  },
                ]}
              >
                <Input placeholder="Phone" autoFocus />
              </Form.Item>

              <Button htmlType="submit" type="primary">
                Apply
              </Button>
            </Form>
          </div>
          <div className="check-out-form user-payment">
            <h4>Phương thức thanh toán</h4>

            <div className="radio-payment-area">
              <div className="radio-title">
                <div className="radio-item">
                  <div className="radio-item-icon">
                    {" "}
                    <RiMoneyDollarCircleFill />
                  </div>
                  <span> Thannh toán khi giao hàng</span>
                </div>
                <div className="radio-item">
                  <div className="radio-item-icon">
                    <FaCcVisa />
                  </div>
                  <span> Thẻ ghi nợ/thẻ tín dụng</span>
                </div>
              </div>
              <div className="radio-button">
                <Radio.Group
                  className="my-radio-button"
                  onChange={onChange}
                  value={value}
                >
                  <div>
                    {" "}
                    <Radio value={1}></Radio>
                  </div>
                  <div>
                    {" "}
                    <Radio value={2}></Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>

            <Form
              name="user-payment-form"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 13 }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Tên chủ thẻ"
                name="card_name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Tên chủ thẻ !",
                  },
                  {
                    pattern: /^[a-zA-Z]*$/,
                    message: "Please enter valid characters (a-z, A-Z)!",
                  },
                ]}
              >
                <Input placeholder="NGUYEN VAN A" autoFocus />
              </Form.Item>
              <Form.Item
                label="Số thẻ"
                name="card_number"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số thẻ !",
                  },

                  {
                    pattern: /^[0-9]*$/,
                    message: "Vui lòng nhập đúng định dạng Số !",
                  },
                  {
                    len: 12,
                    message: "Vui lòng nhập 12 số ! ",
                  },
                ]}
              >
                <Input placeholder="1234 1234 1234 1234" />
              </Form.Item>

              <Form.Item
                label="Ngày hết hạn"
                name="expiry_date"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày hết hạn !",
                  },
                  {
                    type: DatePicker,
                    message: "Nhập tháng và năm !",
                  },
                ]}
              >
                <DatePicker
                  placeholder="MM/YY"
                  format={"MM/YY"}
                  picker="month"
                  className="my-date-picker"
                />
              </Form.Item>
              <Form.Item
                label="CVC"
                name="security_code"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã CVC !",
                  },
                  {
                    len: 3,
                    message: "Vui lòng nhập 3 số ! ",
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: "Please enter a valid number!",
                  },
                ]}
              >
                <Input placeholder="123" />
              </Form.Item>

              <Button htmlType="submit" type="primary">
                Apply
              </Button>
            </Form>
          </div>
          <div className="check-out-form user-note">
            <h4>Ghi chú đặt hàng</h4>
            <Input.TextArea rows={5} placeholder="Ghi chú"></Input.TextArea>
          </div>
        </div>
        <div className="check-out-order">
          <h4>Đơn đặt hàng của bạn</h4>
          <div className="check-out-order-product">
            <div className="check-out-order-product-item">
              <div className="product-item-info">
                {" "}
                <div>
                  {" "}
                  <img src={productImg} />
                </div>
                <div className="product-item-info-text">
                  <div>Ga ran</div>
                  <div>
                    1 x <span>16$</span>
                  </div>
                </div>
              </div>
              <div className="payment sub amount">
                <span>16$</span>
              </div>
            </div>
            <div className="check-out-order-product-item">
              <div className="product-item-info">
                {" "}
                <div>
                  {" "}
                  <img src={productImg} />
                </div>
                <div className="product-item-info-text">
                  <div>Dui ga ran</div>
                  <div>
                    1 x <span>16$</span>
                  </div>
                </div>
              </div>
              <div className="payment sub amount">
                <span>16$</span>
              </div>
            </div>
            <div className="check-out-order-product-item">
              <div className="product-item-info">
                {" "}
                <div>
                  {" "}
                  <img src={productImg} />
                </div>
                <div className="product-item-info-text">
                  <div>Canh ga ran</div>
                  <div>
                    1 x <span>16$</span>
                  </div>
                </div>
              </div>
              <div className="payment sub amount">
                <span>16$</span>
              </div>
            </div>
          </div>
          <div className="check-out-order-payment ">
            <div className="payment-text">
              <p>Tổng phụ:</p>
              <span>32$</span>
            </div>
            <div className="payment-text">
              <p>Phí giao hàng:</p>
              <span>0$</span>
            </div>
          </div>
          <hr />
          <div className="check-out-order-payment-amount"></div>
          <div className="payment-text">
            <p>Tổng Cộng:</p>
            <span style={{ color: "red", fontSize: "1.3rem" }}>32$</span>
          </div>
          <div className="check-out-order-buton">
            <Button danger type="primary">
              ĐẶT HÀNG <IoArrowForward />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
