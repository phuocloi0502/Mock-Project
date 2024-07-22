import React from "react";
import "./my_order.scss";

import { Table, Divider, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataTable } from "../../utils/constant";
import { getOrderByUserId } from "../../redux/slide/orderSlide";
export const MyOrder = (props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlide.userId);

  const rawData = useSelector((state) => state.orderSlide.listOrderByUserId);
  const dataSource = dataTable(rawData);
  useEffect(() => {
    console.log("userId", userId);
    if (userId) {
      dispatch(getOrderByUserId(userId));
    }
  }, [userId]);
  console.log(dataSource, "dataSource");
  const columns = [
    {
      title: "ID ĐƠN HÀNG",
      dataIndex: "id",
      key: "id",
      width: 150,
      render: (text) => <a>#00{text}</a>,
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 200,
      render: (_, { orderStatus }) => {
        let color;
        switch (orderStatus) {
          case "HỦY": {
            color = "red";
            break;
          }
          case "XÁC NHẬN": {
            color = "blue";
            break;
          }
          case "ĐÓNG GÓI": {
            color = "orange";
            break;
          }
          case "ĐANG GIAO": {
            color = "yellow";
            break;
          }
          case "ĐÃ NHẬN": {
            color = "green";
            break;
          }
          default: {
            color = "blue";
          }
        }

        return (
          <Tag color={color} key={orderStatus}>
            {orderStatus.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "THỜI GIAN ĐẶT",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "THÀNH TIỀN",
      key: "totalAmount",
      dataIndex: "totalAmount",
      render: (text) => <>{text.toLocaleString("vi-VN") + " VND"}</>,
    },
    {
      title: "HÀNH ĐỘNG",
      key: "action",
      render: (_, { id }) => (
        <Link to={`/my_order/${id}`}>
          <Button>Xem chi tiết</Button>
          {/* {console.log(order_id)} */}
        </Link>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      order_id: "2123121",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "ĐÃ HỦY",
    },
    {
      key: 2,
      order_id: "2123222",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "HOÀN THÀNH",
    },
    {
      key: 3,
      order_id: "2123223",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "TRONG TIẾN TRÌNH",
    },
    {
      key: 4,
      order_id: "2123124",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "ĐÃ HỦY",
    },
    {
      key: 5,
      order_id: "212322",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "HOÀN THÀNH",
    },
    {
      key: 6,
      order_id: "#2123225",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "TRONG TIẾN TRÌNH",
    },
    {
      key: 7,
      order_id: "2123226",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "TRONG TIẾN TRÌNH",
    },
    {
      key: 8,
      order_id: "2123127",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "ĐÃ HỦY",
    },
    {
      key: 9,
      order_id: "#212322",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "HOÀN THÀNH",
    },
    {
      key: 10,
      order_id: "2123228",
      created_at: "2024/7/3",
      payment_amount: 100.0,
      delivery_status: "TRONG TIẾN TRÌNH",
    },
  ];
  return (
    <div className="my-order content-container">
      <p>
        Tài khoản của tôi <span style={{ color: "gray" }}> / </span>
        Đơn hàng
      </p>
      <Divider orientation="center">
        <h2>Lịch sử đặt hàng</h2>
      </Divider>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};
