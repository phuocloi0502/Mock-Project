import React from "react";
import { Form, Input, Button, Breadcrumb } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import "./create_ad_category.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createCategory } from "../../../../redux/slide/categorySlide";
const { TextArea } = Input;
import { toast } from "react-hot-toast";
export const CreateAdCategory = (props) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCancel = () => {
    nav("/admin/categories");
  };

  const handleAddCategory = (values) => {
    console.log("Received values from form: ", values);
    const createCategoryData = {
      name: values?.name,
    };
    try {
      dispatch(createCategory(createCategoryData));
      toast.success("Tạo loại sản phầm thành công");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="create-category-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Loại sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>Thêm</Breadcrumb.Item>
      </Breadcrumb>
      <div className="header">
        <Button
          type="default"
          onClick={handleCancel}
          icon={<CloseOutlined />}
          style={{ marginRight: "8px" }}
        >
          Hủy bỏ
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          form="createCategoryForm"
          icon={<PlusOutlined />}
        >
          Thêm thể loại
        </Button>
      </div>
      <div className="form-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddCategory}
          className="create-category-form"
          id="createCategoryForm"
        >
          <h3 className="section-title">Thông tin chung</h3>
          <Form.Item
            name="name"
            label="Tên loại"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại sản phẩm!" },
            ]}
          >
            <Input placeholder="Nhập tên danh mục ở đây..." />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
