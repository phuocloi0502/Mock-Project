import React from "react";
import "./view_ad_order.scss";
import { Table, Divider, Tag, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import testImage from "../../../../assets/test.jpg";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusFilter } from "../../../../components/admin_components/StatusFilter/StatusFilter";
import { getAllOrder } from "../../../../redux/slide/orderSlide";
import { dataTable } from "../../../../utils/constant";

export const ViewAdOrder = (props) => {
  const { Search } = Input;
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const status = useSelector((state) => state.orderSlide.statusOrder);
  const rawData = useSelector((state) => state.orderSlide.listOrder);
  const data = dataTable(rawData);
  const [dataSource, setDataSource] = useState(data);
  useEffect(() => {
    if (status == "" || status == "Tất cả trạng thái") {
      setDataSource(data);
    } else {
      //dataOderByUserId.filter((item) => item.id == orderId)
      setDataSource(data.filter((item) => item.orderStatus == status));
    }
  }, [status, rawData]);

  useEffect(() => {
    dispatch(getAllOrder());
  }, []);

  const columns = [
    {
      title: "ID Đặt hàng",
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
      width: 150,
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
      width: 200,
    },
    {
      title: "KHÁCH HÀNG",
      key: "user",
      dataIndex: "user",
      width: 200,
      render: (_, item) => {
        const fullName = item?.user?.lastName + " " + item?.user?.firstName;

        return <>{fullName}</>;
      },
    },
    {
      title: "THÀNH TIỀN",
      key: "totalAmount",
      dataIndex: "totalAmount",
      render: (text) => <>{text.toLocaleString("vi-VN") + " VND"}</>,
    },
    {
      title: "THANH TOÁN",
      key: "paymentMethod",
      dataIndex: "paymentMethod",
      render: (_, item) => {
        const paymentMethod = item?.paymentMethod?.name;

        return <>{paymentMethod}</>;
      },
    },
    {
      title: "HÀNH ĐỘNG",
      key: "action",
      render: (_, { id }) => (
        <div className="action-buttons">
          <Link to={`/admin/order/${id}`}>
            <Button>
              <FaEdit />
            </Button>
          </Link>
          {/* <Link to={`/admin/order/${orderId}`}>
            <Button>
              <GrView />
            </Button>
          </Link> */}
        </div>
      ),
    },
  ];

  return (
    <div className="admin-order-wrap">
      <Divider orientation="center">
        <h2>LIST ORDER</h2>
      </Divider>
      <div className="header-order-area">
        <StatusFilter backgroundColor="#f4ecfb" color="#722ed1" />
        <Search
          placeholder="Search ..."
          allowClear
          style={{ width: 200 }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Table
        //  rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};
