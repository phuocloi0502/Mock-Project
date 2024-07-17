import React, { useState, useEffect } from "react";
import { Card, Avatar, Table, Pagination, Button } from "antd";
import { UserOutlined, MailOutlined, HomeOutlined, PhoneOutlined, EditOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./view_ad_customer_detail.scss";

const { Meta } = Card;

const data = [
  {
    key: '1',
    orderId: '302002',
    product: 'Hamburger',
    total: '$121.00',
    status: 'Đang xử lý',
    date: '12 Dec 2024',
  },
  {
    key: '2',
    orderId: '301901',
    product: 'Pizza',
    total: '$590.00',
    status: 'Đang xử lý',
    date: '1 Dec 2024',
  },
];

const columns = [
  {
    title: 'ID Đơn Hàng',
    dataIndex: 'orderId',
    key: 'orderId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Sản Phẩm',
    dataIndex: 'product',
    key: 'product',
  },
  {
    title: 'Tổng Cộng',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Trạng Thái',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      let color = text === 'Đang xử lý' ? 'orange' : 'green';
      return <span style={{ color }}>{text}</span>;
    },
  },
  {
    title: 'Thời gian',
    dataIndex: 'date',
    key: 'date',
  },
];

export const ViewAdCustomerDetail = (props) => {
  const { id } = useParams();
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const data = {
      id: "1",
      name: "Hieu Duong",
      email: "lindablair@mail.com",
      address: "1833 Bel Meadow Drive, Fontana, California 92335, USA",
      phone: "050 414 8778",
      orders: 10,
    };
    setCustomerData(data);
  }, [id]);

  if (!customerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="customer-detail-container">
      <div className="header">
        <h2>Chi Tiết Khách Hàng</h2>
        <div className="breadcrumb">
          <a href="/customers">Danh sách khách hàng</a> &gt; Chi tiết khách hàng
        </div>
      </div>
      <div className="customer-info">
        <Card>
          <div className="avatar-section">
            <Avatar size={100} icon={<UserOutlined />} />
            <Meta title={customerData.name} />
          </div>
          <div className="details-section">
            <p>
              <MailOutlined /> Email: {customerData.email}
            </p>
            <p>
              <HomeOutlined /> Địa Chỉ: {customerData.address}
            </p>
            <p>
              <PhoneOutlined /> Số Điện Thoại: {customerData.phone}
            </p>
          </div>
          <Button type="primary" icon={<EditOutlined />}>Chỉnh sửa</Button>
        </Card>
        <Card className="order-info">
          <p>Tổng số đơn hàng: {customerData.orders}</p>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <div className="pagination-container">
            <Pagination
              className="custom-pagination"
              defaultCurrent={1}
              total={240}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
