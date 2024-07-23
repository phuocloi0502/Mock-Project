import React from "react";
import "./my_order.scss";

import { Table, Divider, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataTable } from "../../utils/constant";
import { getOrderByUserId } from "../../redux/slide/orderSlide";
import { StatusFilter } from "../../components/admin_components/StatusFilter/StatusFilter";
export const MyOrder = (props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userSlide.userId);

  const rawData = useSelector((state) => state.orderSlide.listOrderByUserId);
  const creatingOrder = useSelector((state) => state.orderSlide.creatingOrder);
  const data = dataTable(rawData);
  useEffect(() => {
    console.log("userId", userId);
    if (userId) {
      dispatch(getOrderByUserId(userId));
    }
  }, [userId, creatingOrder]);

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

  const status = useSelector((state) => state.orderSlide.statusOrder);
  const [dataSource, setDataSource] = useState(data);
  useEffect(() => {
    if (status == "" || status == "Tất cả trạng thái") {
      setDataSource(data);
    } else {
      //dataOderByUserId.filter((item) => item.id == orderId)
      setDataSource(data.filter((item) => item.orderStatus == status));
    }
  }, [status, rawData]);
  return (
    <div className="my-order content-container">
      <p>
        Tài khoản của tôi <span style={{ color: "gray" }}> / </span>
        Đơn hàng
      </p>
      <Divider orientation="center">
        <h2>Lịch sử đặt hàng</h2>
      </Divider>
      <StatusFilter backgroundColor="#2da5f3" color="#ffff" />
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
