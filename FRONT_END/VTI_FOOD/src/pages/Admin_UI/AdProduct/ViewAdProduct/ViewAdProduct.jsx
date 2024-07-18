import React from "react";
import { Table, Button, Input, Checkbox, Pagination, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./view_ad_product.scss";
import { useNavigate } from "react-router-dom";
import { dataTable } from "../../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAll,
  deleteProductById,
  changePageCurrent,
} from "../../../../redux/slide/productSlide";
import { ExclamationCircleFilled } from "@ant-design/icons";
const { Search } = Input;
const { confirm } = Modal;

export const ViewAdProduct = (props) => {
  const nav = useNavigate();
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();
  const rawData = useSelector((state) => state.productSlide.listProduct);

  useEffect(() => {
    dispatch(getAll({ pageNumber: current }));
  }, [current, dispatch]);
  const totalElements = useSelector(
    (state) => state.productSlide.totalElements
  );
  const loading = useSelector((state) => state.productSlide.loading);
  const onChange = (page) => {
    setCurrent(page);
  };

  // Xử lý dữ liệu
  const dataSource = dataTable(rawData);
  // console.log(dataSource);
  const columns = [
    {
      title: "#ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, item) => {
        return (
          <div
            style={{
              width: "200px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <img
              src={"/uploads/" + item.productImages[0]?.imageUrl}
              alt=""
              style={{ width: "50px", height: "50px" }}
            />
            {item?.name}
          </div>
        );
      },
    },
    {
      title: "Loại",
      dataIndex: "categoryName",
      key: "categoryName",
    },

    {
      title: "Giá Tiền",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return text.toLocaleString("vi-VN") + " VND";
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let color =
          text === "Còn hàng"
            ? "volcano"
            : text === "Đã thêm"
            ? "green"
            : "grey";
        return <span style={{ color }}>{text}</span>;
      },
    },
    // {
    //   title: "Thêm Ngày",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    // },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            onClick={() => {
              nav(`/admin/products/${record.id}`);
            }}
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
          />

          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              showDeleteConfirm(record.id);
            }}
          />
        </span>
      ),
    },
  ];
  const showDeleteConfirm = (productId) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(productId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleDelete = (productId) => {
    dispatch(changePageCurrent(current));
    dispatch(deleteProductById(productId));
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <div>
          <h4>Sản Phẩm</h4>

          <Search placeholder="Tìm kiếm sản phẩm" style={{ width: 300 }} />
        </div>
        <Button
          type="primary"
          onClick={() => {
            nav("/admin/products/create");
          }}
        >
          + Thêm Sản Phẩm
        </Button>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={false} // Disable default pagination
        // pagination={{ pageSize: 8 }}
        scroll={{
          y: 500,
        }}
        // rowSelection={{
        //   type: "checkbox",
        // }}
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        <Pagination
          className="custom-pagination"
          pageSize={8}
          defaultCurrent={1}
          current={current}
          onChange={onChange}
          total={totalElements}
        />
      </div>
    </div>
  );
};
