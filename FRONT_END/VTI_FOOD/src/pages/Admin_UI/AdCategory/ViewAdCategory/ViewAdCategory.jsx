import React from "react";
import { Table, Button, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./view_ad_category.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { dataTable } from "../../../../utils/constant";
import { getAll } from "../../../../redux/slide/categorySlide";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Tên loại sản phẩm",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div>
        <span>{text}</span>
      </div>
    ),
  },

  {
    title: "Hành động",
    key: "action",
    render: (_, record) => (
      <span>
        <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
        <Button icon={<DeleteOutlined />} />
      </span>
    ),
  },
];

export const ViewAdCategory = (props) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const listCategory = useSelector((state) => state.categorySlide.listCategory);
  useEffect(() => {
    dispatch(getAll());
  }, []);
  const dataSource = dataTable(listCategory);
  return (
    <div className="view-category-container">
      <div className="header">
        <h2>Loại sản phẩm</h2>
        <Button
          type="primary"
          className="add-category-button"
          onClick={() => {
            nav("/admin/categories/create");
          }}
        >
          + Thêm loại sản phẩm
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />
      {/* <div className="pagination-container">
        <Pagination
          className="custom-pagination"
          defaultCurrent={1}
          total={100}
          pageSize={10}
        />
      </div> */}
    </div>
  );
};
