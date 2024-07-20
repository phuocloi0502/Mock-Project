import React from "react";
import { Form, Input, Button, Breadcrumb } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import "./update_ad_category.scss";

const { TextArea } = Input;

export const UpdateAdCategory = (props) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    // Xử lý hủy bỏ
    console.log('Cancelled');
  };

  const handleUpdateCategory = (values) => {
    // Xử lý cập nhật loại sản phẩm
    console.log('Category Updated', values);
  };

  return (
    <div className="update-category-container">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Loại sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>Cập nhật</Breadcrumb.Item>
      </Breadcrumb>
      <div className="header">
        <Button onClick={handleCancel} icon={<CloseOutlined />}>Hủy bỏ</Button>
        <Button type="primary" icon={<SaveOutlined />} form="update-category-form" key="submit" htmlType="submit">
          Lưu thay đổi
        </Button>
      </div>
      <div className="form-container">
        <div className="section-title">Thông tin chung</div>
        <Form
          form={form}
          layout="vertical"
          id="update-category-form"
          className="update-category-form"
          onFinish={handleUpdateCategory}
        >
          <Form.Item
            label="Tên loại"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder="Nhập tên danh mục ở đây..." />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
          >
            <TextArea placeholder="Nhập mô tả danh mục ở đây..." />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
