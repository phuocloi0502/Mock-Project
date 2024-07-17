import React from "react";
import "./my_order.scss";

import { Table, Divider, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const MyOrder = (props) => {
  const nav = useNavigate();
  const columns = [
    {
      title: "ID ĐƠN HÀNG",
      dataIndex: "order_id",
      key: "order_id",
      width: 200,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "delivery_status",
      key: "delivery_status",
      width: 200,
      render: (_, { delivery_status }) => {
        let color;
        switch (delivery_status) {
          case "ĐÃ HỦY": {
            color = "red";
            break;
          }
          case "TRONG TIẾN TRÌNH": {
            color = "blue";
            break;
          }
          case "HOÀN THÀNH": {
            color = "green";
            break;
          }
          default: {
            color = "green";
          }
        }

        return (
          <Tag color={color} key={delivery_status}>
            {delivery_status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "THỜI GIAN ĐẶT",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "THÀNH TIỀN",
      key: "payment_amount",
      dataIndex: "payment_amount",
    },
    {
      title: "HÀNH ĐỘNG",
      key: "action",
      render: (_, { order_id }) => (
        <Link to={`/my_order/${order_id}`}>
          <Button>Xem chi tiết</Button>
          {console.log(order_id)}
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
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};
