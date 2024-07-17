import React from "react";
import "./my_oder_detail.scss";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import { PiNotebook } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { PiHandshake } from "react-icons/pi";
import { BiCheckDouble } from "react-icons/bi";
import { Table } from "antd";
import { Link } from "react-router-dom";

import productImg from "../../assets/image.png";
export const MyOrderDetail = (props) => {
  const { order_id } = useParams();

  const sliderData = [
    {
      iconSlider: <FaCircleCheck />,
      iconLabel: <PiNotebook />,
      label: "Đã đặt hàng",
    },
    {
      iconSlider: null,
      iconLabel: <BsBoxSeam />,
      label: "Đóng gói",
    },
    {
      iconSlider: null,
      iconLabel: <FaShippingFast />,
      label: "Trên đường giao",
    },
    {
      iconSlider: null,
      iconLabel: <PiHandshake />,
      label: "Đã giao hàng",
    },
  ];
  const status_order = "Đóng gói";
  const sliderShow = [];
  let dots_left = 0;
  let slider_icon;
  let slider_track = 0;
  let add_style_dots = {
    borderColor: "white",
    backgroundColor: "green",
  };
  let status_current = 5;
  let done_color = {
    color: "green",
  };

  for (let i = 0; i < sliderData.length; i++) {
    if (sliderData[i].label == status_order) {
      slider_track = 300 * i;
      status_current = i;
    }
    if (i > status_current) {
      add_style_dots = {};
      done_color = { color: "#fb9701" };
    }
    if (!sliderData[i].iconSlider) {
      slider_icon = <div className="icon circle" style={add_style_dots}></div>;
    } else {
      slider_icon = <FaCircleCheck className="icon checked" />;
    }
    dots_left = i * 300;
    sliderShow.push(
      <div key={i} className="slider-step" style={{ left: `${dots_left}px` }}>
        {slider_icon}
        <div className="label">
          <div className="label-icon" style={done_color}>
            {sliderData[i].iconLabel}
          </div>
          <div className="label-title">{sliderData[i].label}</div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      title: "SẢN PHẨM",
      dataIndex: "order_detail_product",
      key: "order_detail_product",
      width: 200,
      render: (props) => {
        return (
          <div className="order-detail-product-wrap">
            <img src={props.productImg} />
            <span>{props.productName}</span>
          </div>
        );
      },
    },
    {
      title: "GIÁ TIỀN",
      dataIndex: "price",
      key: "price",
      width: 200,
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "TỔNG PHỤ",
      key: "subtotal",
      dataIndex: "subtotal",
    },
  ];
  const data = [
    {
      key: 1,
      order_detail_product: {
        productImg: productImg,
        productName: "Gà rán",
      },
      price: "12.000",
      quantity: 2,
      subtotal: "24.000 ",
    },
    {
      key: 2,
      order_detail_product: {
        productImg: productImg,
        productName: "Gà rán",
      },
      price: "12.000",
      quantity: 2,
      subtotal: "24.000 ",
    },
  ];

  return (
    <div className="my-order-detail content-container">
      <p>
        Tài khoản của tôi <span style={{ color: "gray" }}> / </span>
        Chi tiết đơn hàng
      </p>
      <hr />
      <div className="order-detail-header">
        <Link>
          <div>
            <FaArrowLeft className=" icon" /> CHI TIẾT ĐƠN HÀNG
          </div>
        </Link>
        <div className="order-detail-header-rating">
          Để lại xếp hạng
          <MdOutlineAdd className=" icon" />
        </div>
      </div>
      <hr />
      <div className="order-detail-info">
        <div className="order-id-wrapper">
          <p>#{order_id}</p>
          <span>4 sản phẩm. Đặt hàng vào 2024/7/03 7:32AM</span>
        </div>
        <div className="order-detail-payment-amount">100.000 VND</div>
      </div>
      <div className="order-detail-slider">
        <p>Đơn hàng dự kiến đến lúc 2024/7/03 8:32AM</p>
        <div className="slider-delivery-wrapper">
          <div className="slider-line">
            <div className="slider-rail"></div>
            {sliderShow}
            <div
              className="slider-track"
              style={{ width: `${slider_track}px` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="order-detail-delivery-process">
        <hr />
        <h4>Hoạt động đặt hàng</h4>
        <div className="order-action">
          <div className="order-action-icon">
            {" "}
            <BiCheckDouble />
          </div>
          <div className="order-action-info">
            <p>Đơn đặt hàng của bạn đã được xác nhận</p>
            <span>2024/7/03 7:32AM</span>
          </div>
        </div>
        <div className="order-action">
          <div className="order-action-icon">
            {" "}
            <BiCheckDouble />
          </div>
          <div className="order-action-info">
            <p>Đơn đặt hàng của bạn đã được xác nhận</p>
            <span>2024/7/03 7:32AM</span>
          </div>
        </div>
        <div className="order-action">
          <div className="order-action-icon">
            {" "}
            <BiCheckDouble />
          </div>
          <div className="order-action-info">
            <p>Đơn đặt hàng của bạn đã được xác nhận</p>
            <span>2024/7/03 7:32AM</span>
          </div>
        </div>
      </div>

      <div className="order-detail-products">
        <hr />
        <h4>Sản phẩm</h4>
        <hr />
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          scroll={{
            y: 500,
          }}
        ></Table>
      </div>
      <div className="order-detail-user-info">
        <div className="user-address">
          {" "}
          <h4>Địa chỉ giao hàng</h4>
          <ul>
            <li>
              Tên: <span>Dương Minh Hiếu</span>
            </li>
            <li>
              Địa chỉ:{" "}
              <span>193 Nguyễn Lương Bằng, Liên Chiểu, Thành Phố Đà Nẵng</span>
            </li>
            <li>
              Phone: <span>0905.543.467</span>
            </li>
            <li>
              Email: <span>hieuduong@mail.com</span>
            </li>
          </ul>
        </div>
        <div className="user-note">
          <h4>Ghi chú đặt hàng</h4>
          <p>
            Ghi chú đặt hàngGhi chú đặt hàngGhi chú đặt hàngGhi chú đặt hàngGhi
            chú đặt hàngGhi chú đặt hàngGhi chú đặt hàngGhi chú đặt hàngGhi chú
            đặt hàngGhi chú đặt hàng
          </p>
        </div>
      </div>
    </div>
  );
};
