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
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import {
  getOrderDetailByOrderId,
  getOrderByUserId,
} from "../../redux/slide/orderSlide";
export const MyOrderDetail = (props) => {
  const nav = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlide.userId);

  const dataOrderDetailByOderId = useSelector(
    (state) => state.orderSlide.listOrderDetailByOderId
  );
  const dataOderByUserId = useSelector(
    (state) => state.orderSlide.listOrderByUserId
  );
  const [dataOrder, setDataOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState(""); //"XÁC NHẬN"

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetailByOrderId(orderId));
    }
    if (userId) {
      dispatch(getOrderByUserId(userId));
    }
  }, [userId, orderId]);

  useEffect(() => {
    setDataOrder(dataOderByUserId.filter((item) => item.id == orderId));
  }, [dataOderByUserId]);
  useEffect(() => {
    // 'XÁC NHẬN','ĐÓNG GÓI','ĐANG GIAO','ĐÃ NHẬN','HỦY'
    setOrderStatus(dataOrder[0]?.orderStatus);
    // setOrderStatus("HỦY");
  }, [dataOrder]);
  console.log("dataOrder", dataOrder);
  const dataSource = dataOrderDetailByOderId.map((item) => ({
    key: item.id,
    subtotal: `${
      (item?.price * item?.quantity).toLocaleString("vi-VN") + " VND"
    }`,
    ...item,
  }));

  const sliderData = [
    {
      iconSlider: <FaCircleCheck />,
      iconLabel: <PiNotebook />,
      label: "XÁC NHẬN",
    },
    {
      iconSlider: null,
      iconLabel: <BsBoxSeam />,
      label: "ĐÓNG GÓI",
    },
    {
      iconSlider: null,
      iconLabel: <FaShippingFast />,
      label: "ĐANG GIAO",
    },
    {
      iconSlider: null,
      iconLabel: <PiHandshake />,
      label: "ĐÃ NHẬN",
    },
  ];

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
    if (sliderData[i].label == orderStatus) {
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
      dataIndex: "name",
      key: "name",
      width: 300,
      render: (_, item) => {
        return (
          <div className="order-detail-product-wrap">
            <img
              src={"/uploads/" + item?.product?.productImages[0]?.imageUrl}
            />
            <span
              onClick={() => {
                nav("/product/" + item?.product?.id);
              }}
            >
              {item?.product?.name}
            </span>
          </div>
        );
      },
    },
    {
      title: "GIÁ TIỀN",
      dataIndex: "price",
      key: "price",
      width: 200,
      render: (_, item) => {
        return <>{item?.price.toLocaleString("vi-VN") + " VND"}</>;
      },
    },
    {
      title: "SỐ LƯỢNG",
      dataIndex: "quantity",
      key: "quantity",
      width: 200,
    },
    {
      title: "TỔNG PHỤ",
      key: "subtotal",
      dataIndex: "subtotal",
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
        <Link to={"/my_order"}>
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
          <p>#00{orderId}</p>
          <span>
            {dataOrderDetailByOderId?.length} sản phẩm. Đặt hàng vào{" "}
            {dataOrderDetailByOderId[0]?.createdAt}
          </span>
        </div>
        <div className="order-detail-payment-amount">
          {dataOrder[0]?.totalAmount.toLocaleString("vi-VN") + " VND"}
        </div>
      </div>
      {orderStatus == "HỦY" ? (
        <>
          <h3 style={{ textAlign: "center", color: "red" }}>Đã Bị Hủy</h3>
        </>
      ) : (
        <div className="order-detail-slider">
          <p>Đơn hàng dự kiến giao trong vòng 1 giờ kể từ ngày tạo</p>
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
      )}

      {/* <div className="order-detail-delivery-process">
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
      </div> */}

      <div className="order-detail-products">
        <h4>Sản phẩm</h4>

        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ pageSize: 4 }}
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
              Tên:{" "}
              <span>
                {dataOrder[0]?.user?.lastName +
                  " " +
                  dataOrder[0]?.user?.firstName}
              </span>
            </li>
            <li>
              Địa chỉ: <span>{dataOrder[0]?.user?.address}</span>
            </li>
            <li>
              Phone: <span>{dataOrder[0]?.user?.phoneNumber}</span>
            </li>
            <li>
              Email: <span>{dataOrder[0]?.user?.email}</span>
            </li>
          </ul>
        </div>
        <div className="user-note">
          <h4>Ghi chú đặt hàng</h4>
          <p>{dataOrder[0]?.note}</p>
        </div>
      </div>
    </div>
  );
};
