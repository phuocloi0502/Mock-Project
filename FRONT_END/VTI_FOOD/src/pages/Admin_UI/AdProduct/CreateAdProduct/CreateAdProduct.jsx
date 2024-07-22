import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  InputNumber,
  Spin,
} from "antd";
import { PlusOutlined, CloseOutlined, InboxOutlined } from "@ant-design/icons";
import "./create_ad_product.scss";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;
import api from "../../../../services/axiosClient";
import axios from "axios";
import { getToken } from "../../../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { upLoadProductImage } from "../../../../redux/slide/productSlide";
import { getAll } from "../../../../redux/slide/categorySlide";
import {
  createProduct,
  getAllProducts,
} from "../../../../redux/slide/productSlide";
export const CreateAdProduct = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryData = useSelector((state) => state.categorySlide.listCategory);
  useEffect(() => {
    // Kiểm tra xem trang đã được tải lại chưa
    if (!window.sessionStorage.getItem("reloaded")) {
      window.sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    } else {
      // Xóa giá trị khi trang đã được tải lại để không tải lại lại nữa
      window.sessionStorage.removeItem("reloaded");
    }
  }, []);
  useEffect(() => {
    dispatch(getAll());
  }, []);
  const productStatus = ["ACTIVE", "INACTIVE", "OUT_OF_STOCK", "PENDING"];
  const totalElements = useSelector(
    (state) => state.productSlide.totalElements
  );
  useEffect(() => {
    dispatch(getAllProducts({ pageNumber: 1, search: "" }));
  }, [dispatch]);
  console.log(totalElements, "totalElements");
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    const dataBody = {
      name: values.productName,
      price: values.productPrice,
      abstract: values.productAbstract,
      quantity: values.productQuantity,
      description: values.productDescription,
      status: values.productStatus,
      show: values.productShow,
      category_id: values.productCategory,
    };

    try {
      const createdProduct = await dispatch(createProduct(dataBody)).unwrap();
      const productId = createdProduct.id;
      console.log("Product id : ", productId);

      // Kiểm tra xem sản phẩm có được thêm thành công không
      if (productId && fileList.length > 0) {
        // Tạo đối tượng FormData và thêm các file
        const formData = new FormData();
        fileList.forEach((file) => {
          formData.append("files", file.originFileObj);
        });

        // Gọi API tải ảnh sản phẩm và chờ đợi nó hoàn tất
        await dispatch(upLoadProductImage({ productId, formData })).unwrap();

        // Hiển thị thông báo thành công và điều hướng đến trang quản lý sản phẩm
        message.success(
          "Sản phẩm đã được thêm thành công và ảnh đã được tải lên!"
        );
        nav(`/admin/products?productId=${productId}`);
        setFileList([]);
      } else {
        throw new Error("Không thể thêm sản phẩm");
      }
    } catch (error) {
      console.error("Error during form submission: ", error);
      message.error("Có lỗi xảy ra khi thêm sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    nav("/admin/products/");
  };

  const handleSelectCategory = (value) => {
    // console.log(value);
  };
  const validateFileListLength = (rule, value) => {
    if (fileList.length > 5) {
      return Promise.reject(`Số lượng hình ảnh vượt quá giới hạn là 5`);
    }
    return Promise.resolve();
  };
  return (
    <div className="create-product-container">
      <Spin spinning={loading} fullscreen="true"></Spin>
      <div className="create-product-header">
        <div className="create-product-header-title">
          <h4>Thêm sản phẩm</h4>
          <h5>
            Sản phẩm <span>/ Thêm sản phẩm</span>
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
            icon={<PlusOutlined />}
          >
            Thêm sản phẩm
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
                  { min: 5, message: "Độ dài tối thiểu là 5 ký tự!" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm vào đây..." />
              </Form.Item>
              <Form.Item
                name="productImage"
                label="Hình ảnh"
                rules={[
                  { required: true, message: "Vui lòng chọn ảnh sản phẩm!" },
                  {
                    validator: validateFileListLength,
                  },
                ]}
              >
                <Upload.Dragger
                  accept="image/*"
                  fileList={fileList}
                  name="files"
                  multiple={true}
                  beforeUpload={() => false}
                  onChange={handleChange}
                  listType="picture-card"
                >
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
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả sản phẩm!",
                  },
                ]}
              >
                <TextArea
                  aria-setsize={3}
                  placeholder="Nhập mô tả sản phẩm vào đây..."
                />
              </Form.Item>
              <Form.Item
                name="productAbstract"
                label="Mô tả thẻ sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mô tả thẻ sản phẩm!",
                  },
                ]}
              >
                <Input placeholder="Nhập mô tả thẻ sản phẩm vào đây..." />
              </Form.Item>
              <Form.Item
                name="productPrice"
                label="Giá tiền"
                rules={[
                  { required: true, message: "Vui lòng nhập giá tiền!" },
                  {
                    pattern: /^[0-9]*$/,
                    message: "Vui lòng nhập đúng định dạng Số !",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder="Nhập giá thành vào đây..."
                  prefix="VND"
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
                <Select
                  placeholder="Chọn loại sản phẩm"
                  onChange={(value) => {
                    handleSelectCategory(value);
                  }}
                >
                  {categoryData?.map((item, index) => (
                    <Option key={index} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
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
                  {productStatus.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="productShow"
                label="Hiển thị sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn có hiển thị sản phẩm không!",
                  },
                ]}
              >
                <Select placeholder="Chọn trạng thái sản phẩm">
                  <Option value="true">Có</Option>
                  <Option value="false">Không</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="productQuantity"
                label="Số lượng sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng số lượng sản phẩm!",
                  },
                  {
                    pattern: /^[0-9]*$/,
                    message: "Vui lòng nhập đúng định dạng Số !",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={1}></InputNumber>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
