import React from "react";
import "./view_ad_order.scss";
import { Table, Divider, Tag, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import testImage from "../../../../assets/test.jpg";
import { FaEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { useState } from "react";
import { StatusFilter } from "../../../../components/admin_components/StatusFilter/StatusFilter";
export const ViewAdOrder = (props) => {
  const { Search } = Input;
  const nav = useNavigate();
  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log("selectedRowKeys changed: ", newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  //const onSearch = (value, _e, info) => console.log(info?.source, value);
  const [search, setSearch] = useState("");
  console.log(search);
  const columns = [
    {
      title: "ID Đặt hàng",
      dataIndex: "orderId",
      key: "orderId",
      width: 200,
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TRẠNG THÁI",
      dataIndex: "orderStatus",
      key: "orderStatus",
      width: 200,
      render: (_, { orderStatus }) => {
        let color;
        switch (orderStatus) {
          case "ĐÃ HỦY": {
            color = "red";
            break;
          }
          case "ĐÃ XÁC NHẬN": {
            color = "blue";
            break;
          }
          case "ĐÃ GIAO": {
            color = "green";
            break;
          }
          case "ĐANG GIAO": {
            color = "yellow";
            break;
          }
          case "ĐÃ ĐÓNG GÓI": {
            color = "orange";
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
      title: "KHÁCH HÀNG",
      key: "userName",
      dataIndex: "userName",
    },
    {
      title: "THÀNH TIỀN",
      key: "paymentAmount",
      dataIndex: "paymentAmount",
    },
    {
      title: "THANH TOÁN",
      key: "paymentMethod",
      dataIndex: "paymentMethod",
    },
    {
      title: "HÀNH ĐỘNG",
      key: "action",
      render: (_, { orderId }) => (
        <div className="action-buttons">
          <Link to={`/admin/order/${orderId}`}>
            <Button>
              <FaEdit />
            </Button>
          </Link>
          <Link to={`/admin/order/${orderId}`}>
            <Button>
              <GrView />
            </Button>
          </Link>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      orderId: "2123121",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "ĐÃ XÁC NHẬN",
    },
    {
      key: 2,
      orderId: "2123122",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "ĐÃ ĐÓNG GÓI",
    },
    {
      key: 3,
      orderId: "2123123",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "ĐANG GIAO",
    },
    {
      key: 4,
      orderId: "2123124",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "ĐÃ GIAO",
    },
    {
      key: 5,
      orderId: "2123125",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "ĐÃ HỦY",
    },
    {
      key: 6,
      orderId: "2123126",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "HOÀN THÀNH",
    },
    {
      key: 7,
      orderId: "2123127",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "HOÀN THÀNH",
    },
    {
      key: 8,
      orderId: "2123128",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "HOÀN THÀNH",
    },
    {
      key: 9,
      orderId: "2123129",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "HOÀN THÀNH",
    },
    {
      key: 10,
      orderId: "2123110",
      products: [
        {
          productName: "Hamburger",
          productImage: testImage,
        },
        {
          productName: "Pizza",
          productImage: testImage,
        },
        {
          productName: "Kem",
          productImage: testImage,
        },
      ],
      createdAt: "2024/7/3",
      userName: "Vo Phuoc Loi",
      paymentAmount: 100000,
      paymentMethod: "COD",
      orderStatus: "HOÀN THÀNH",
    },
  ];
  return (
    <div className="admin-order-wrap">
      <Divider orientation="center">
        <h2>LIST ORDER</h2>
      </Divider>
      <div className="header-order-area">
        <StatusFilter />
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
        dataSource={data}
        pagination={{ pageSize: 10 }}
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};
