import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  InboxOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import "./update_ad_product.scss";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

export const UpdateAdProduct = ({ productId }) => {
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      setProductData(data);
      form.setFieldsValue(data);
    };

    fetchProductData();
  }, [productId, form]);

  const handleSubmit = (values) => {
    console.log("Received values from form: ", values);
    message.success("Sản phẩm đã được cập nhật thành công!");
    // Perform the update operation here
    // This is a placeholder, you should replace it with actual API call
  };

  const handleCancel = () => {
    // Redirect to product list or previous page

    nav("/admin/products/");
  };

  return (
    <div className="create-product-container">
      <div className="create-product-header">
        <div className="create-product-header-title">
          <h4>Sửa sản phẩm</h4>
          <h5>
            Sản phẩm <span>/ Sửa sản phẩm</span>
          </h5>
        </div>
        <div className="button-group">
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
            form="createProductForm"
            icon={<SaveOutlined />}
          >
            Lưu sản phẩm
          </Button>
        </div>
      </div>
      <div className="create-product-form-container">
        <Form
          labelCol={{ span: 20 }}
          wrapperCol={{ span: 26 }}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="create-product-form"
          id="createProductForm"
        >
          <div className="left-section form ">
            <div className="product-info">
              <h2>Thông tin chung</h2>
              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
                style={{ width: 792 }}
              >
                <Input
                  placeholder="Nhập tên sản phẩm vào đây..."
                  style={{ height: 40 }}
                />
              </Form.Item>
              <Form.Item
                name="productImage"
                label="Hình ảnh"
                style={{ width: 792 }}
              >
                <Upload.Dragger>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Kéo thả ảnh vào đây hoặc bấm thêm ảnh
                  </p>
                </Upload.Dragger>
              </Form.Item>
              <Form.Item
                name="productDescription"
                label="Mô tả sản phẩm"
                style={{ width: 792 }}
              >
                <TextArea
                  placeholder="Nhập mô tả sản phẩm vào đây..."
                  style={{ height: 156 }}
                />
              </Form.Item>
              <Form.Item
                name="productPrice"
                label="Giá tiền"
                rules={[{ required: true, message: "Vui lòng nhập giá tiền!" }]}
                style={{ width: 792 }}
              >
                <Input
                  placeholder="Nhập giá thành vào đây..."
                  prefix="$"
                  style={{ height: 40 }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="right-section form ">
            <div className="category-status">
              <Form.Item
                name="productCategory"
                label="Loại sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng chọn loại sản phẩm!" },
                ]}
              >
                <Select placeholder="Chọn loại sản phẩm">
                  <Option value="thucAn">Thức ăn</Option>
                  <Option value="doUong">Đồ uống</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="productStatus"
                label="Trạng thái sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn trạng thái sản phẩm!",
                  },
                ]}
              >
                <Select placeholder="Chọn trạng thái sản phẩm">
                  <Option value="banNhap">Bản nháp</Option>
                  <Option value="daThem">Đã thêm</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

// export default UpdateAdProduct;
