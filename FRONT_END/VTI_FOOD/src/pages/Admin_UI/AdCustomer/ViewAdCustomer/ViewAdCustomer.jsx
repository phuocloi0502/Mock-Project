import React from "react";
import { Table, Button, Input, Pagination } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { GrView } from "react-icons/gr";
import "./view_ad_customer.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUser } from "../../../../redux/slide/userSlide";
import { dataTable } from "../../../../utils/constant";
const { Search } = Input;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
    defaultSortOrder: "descend",
  },
  {
    title: "Họ và tên",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      <span>
        <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
        <Button icon={<GrView />} style={{ marginRight: 8 }}></Button>
        <Button icon={<DeleteOutlined />} />
      </span>
    ),
  },
];

export const ViewAdCustomer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser({ pageNumber: 1 }));
  }, []);
  const rawData = useSelector((state) => state.userSlide.listUser);
  // Xử lý dữ liệu
  const dataSource = dataTable(rawData).filter(
    (item) => item.roleName != "admin"
  );
  return (
    <div className="view-customer-container">
      <div className="header">
        <div>
          <h4>Khách Hàng</h4>
          <Search placeholder="Tìm kiếm khách hàng" style={{ width: 300 }} />
        </div>
        <Button type="primary">+ Thêm Khách Hàng</Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 4 }} // Disable default pagination
        // rowSelection={{
        //   type: "checkbox",
        // }}
      />
    </div>
  );
};
