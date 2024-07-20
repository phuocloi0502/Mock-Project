import React from "react";
import "./check_out.scss";
import { Form, Input, Button, Radio, DatePicker, message } from "antd";
import { useState, useEffect } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaCcVisa } from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import productImg from "../../assets/image.png";
import { useSelector, useDispatch } from "react-redux";
import { getUserById, updateUser } from "../../redux/slide/userSlide";
import { getCartInfoById } from "../../redux/slide/cartSlide";
import Item from "antd/es/list/Item";
export const CheckOut = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const [payMethod, setPayMethod] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setPayMethod(e.target.value);
  };
  // get data user
  const dispatch = useDispatch();
  const userIdCurrent = useSelector((state) => state.userSlide.userId);
  const dataUserById = useSelector((state) => state.userSlide.userById);

  // useEffect(() => {
  //   if (userId) {
  //     dispatch(getUserById(userId));
  //   }
  // }, []);

  // get data cart detail
  const dataCartByUserId = useSelector(
    (state) => state.cartSlide.dataCartByUserId
  );

  console.log("dataCartByUserId", dataCartByUserId);
  // Tính tổng tiền trong giỏ hàng
  const calculateTotal = () => {
    return dataCartByUserId.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
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
              name="checkount-form"
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
                <Input placeholder="Phone" />
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
                  value={payMethod}
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
            {payMethod == 1 ? (
              <></>
            ) : (
              <Form
                name="user-payment-form"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 13 }}
                //  onFinish={onFinish}
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
            )}
          </div>
          <div className="check-out-form user-note">
            <h4>Ghi chú đặt hàng</h4>
            <Input.TextArea rows={5} placeholder="Ghi chú"></Input.TextArea>
          </div>
        </div>
        <div className="check-out-order">
          <h4>Sản phẩm của bạn</h4>
          <div className="check-out-order-product">
            {dataCartByUserId?.map((item, index) => (
              <div key={index} className="check-out-order-product-item">
                <div className="product-item-info">
                  {" "}
                  <div>
                    {" "}
                    <img src={"/uploads/" + item.images[0]} />
                  </div>
                  <div className="product-item-info-text">
                    <div>{item.productName}</div>
                    <div>
                      <strong style={{ color: "blue" }}>{item.quantity}</strong>
                      <span style={{ color: "black" }}> x </span>
                      <strong>{item.price.toLocaleString("vi-VN")}</strong>
                    </div>
                  </div>
                </div>
                <hr />
                <hr />
                <div className="payment-sub-amount">
                  <span>
                    {(item.quantity * item.price).toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="check-out-order-payment ">
            <div className="payment-text total-amount-text">
              <p>Tổng phụ:</p>
              <strong> {calculateTotal().toLocaleString("vi-VN")} VND</strong>
            </div>
            <div className="payment-text ship-amount">
              <p>Phí giao hàng:</p>
              <span>0 VND</span>
            </div>
          </div>
          <hr />
          <div className="check-out-order-payment-amount">
            <h3>Tổng Cộng:</h3>
            <strong>{calculateTotal().toLocaleString("vi-VN")} VND</strong>
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
