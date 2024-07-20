import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  InputNumber,
  Spin,
  Image,
  Modal,
} from "antd";
import {
  PlusOutlined,
  CloseOutlined,
  InboxOutlined,
  SaveOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import "../CreateAdProduct/create_ad_product.scss";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAll } from "../../../../redux/slide/categorySlide";
import {
  getById,
  updateProduct,
  upLoadProductImage,
  deleteProductById,
} from "../../../../redux/slide/productSlide";
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

const UpdateAdProduct = () => {
  const nav = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  //const [productData, setProductData] = useState(null);
  // const loading = useSelector((state) => state.productSlide.loading);
  const [isUploading, setIsUploading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const categoryData = useSelector((state) => state.categorySlide.listCategory);
  const productStatus = ["ACTIVE", "INACTIVE", "OUT_OF_STOCK", "PENDING"];
  const productData = useSelector((state) => state.productSlide.productById);
  const loading = useSelector((state) => state.productSlide.loading);
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    dispatch(getAll());
  }, []);

  useEffect(() => {
    dispatch(getById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (productData) {
      form.setFieldsValue({
        ...productData,
        show: productData.show?.toString() ?? "",
      });
    }
  }, [productData, form]);

  const handleSubmit = (values) => {
    const updateData = {
      name: values.name,
      price: values.price,
      abstract: values.abstract,
      quantity: values.quantity,
      description: values.description,
      status: values.status,
      show: JSON.parse(values.show),
      category_id: values.category_id,
    };
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files", file.originFileObj);
    });
    console.log(fileList);
    setIsUploading(true); // Bắt đầu quá trình upload
    try {
      dispatch(updateProduct({ id: productId, body: updateData }));
      //await new Promise((resolve) => setTimeout(resolve, 500));
      if (fileList && fileList.length !== 0) {
        dispatch(upLoadProductImage({ productId, formData }));
      }
      toast.success("Sản phẩm đã được cập nhật thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi khi cập nhật sản phẩm!");
    } finally {
      setIsUploading(false);
      setShouldRender(true);
    }
    setFileList([]);
  };

  useEffect(() => {
    if (shouldRender) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [shouldRender]);
  const handleCancel = () => {
    nav("/admin/products/");
  };
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };
  // handle delete
  const showDeleteConfirm = (productId) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteProduct(productId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductById(productId));
    toast.success("Đã xóa");
    nav("/admin/products/");
  };
  const maxLengListImage = 5 - productData?.productImages?.length;
  const validateFileListLength = (rule, value) => {
    if (fileList.length > maxLengListImage) {
      return Promise.reject(
        `Số lượng hình ảnh vượt quá giới hạn là ${maxLengListImage}`
      );
    }
    return Promise.resolve();
  };
  return (
    <div className="create-product-container">
      <Spin spinning={loading} fullscreen="true"></Spin>
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
            icon={<PlusOutlined />}
            style={{ marginRight: "8px" }}
          >
            Lưu sản phẩm
          </Button>
          <Button
            type="primary"
            danger
            form="createProductForm"
            style={{ marginRight: "8px" }}
            onClick={() => {
              showDeleteConfirm(productId);
            }}
          >
            Xóa sản phẩm
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
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                  { min: 5, message: "Độ dài tối thiểu là 5 ký tự!" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm vào đây..." />
              </Form.Item>
              <Form.Item
                name="productImageView"
                label="Hình ảnh (tối đa 5 ảnh)"
              >
                <div className="view-product-image">
                  {productData?.productImages?.map((item, index) => (
                    <Image
                      key={index}
                      width={200}
                      src={"/uploads/" + item.imageUrl}
                    />
                  ))}
                </div>
              </Form.Item>
              {productData?.productImages?.length < 5 ? (
                <Form.Item
                  name="listImage"
                  label="Thêm hình ảnh"
                  getValueFromEvent={(e) => e.fileList}
                  rules={[
                    {
                      validator: validateFileListLength,
                    },
                  ]}
                >
                  <Upload
                    multiple={true}
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleChange}
                  >
                    <PlusOutlined />
                    Thêm ảnh
                  </Upload>
                </Form.Item>
              ) : (
                <></>
              )}

              <Form.Item
                name="description"
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
                name="abstract"
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
                name="price"
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
                name="category_id"
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
                name="status"
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
                name="show"
                label="Hiển thị sản phẩm"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn có hiển thị sản phẩm không!",
                  },
                ]}
              >
                <Select
                  //defaultValue={"true"}
                  placeholder="Chọn trạng thái sản phẩm"
                >
                  <Option value="true">Có</Option>
                  <Option value="false">Không</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="quantity"
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

export default UpdateAdProduct;
