import React from "react";
import { Form, Input, Button, Breadcrumb } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import "./create_ad_category.scss";

const { TextArea } = Input;

export const CreateAdCategory = (props) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    // Xử lý hủy bỏ
    console.log('Cancelled');
  };

  const handleAddCategory = (values) => {
    // Xử lý thêm loại sản phẩm
    console.log('Received values from form: ', values);
  };

  return (
    <div className="create-category-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Loại sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>Thêm</Breadcrumb.Item>
      </Breadcrumb>
      <div className="header">
        <Button type="default" onClick={handleCancel} icon={<CloseOutlined />} style={{ marginRight: '8px' }}>
          Hủy bỏ
        </Button>
        <Button type="primary" htmlType="submit" form="createCategoryForm" icon={<PlusOutlined />}>
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
            name="categoryName"
            label="Tên loại"
            rules={[{ required: true, message: 'Vui lòng nhập tên loại sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên danh mục ở đây..." />
          </Form.Item>
          <Form.Item
            name="categoryDescription"
            label="Mô tả"
          >
            <TextArea placeholder="Nhập mô tả danh mục ở đây..." className="ant-input-textarea"/>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
