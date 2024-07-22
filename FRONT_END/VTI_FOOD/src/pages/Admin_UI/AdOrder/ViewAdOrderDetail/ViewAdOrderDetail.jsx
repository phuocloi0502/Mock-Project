import React, { useState } from "react";
import { Card, Col, Row, Table, Tag, Timeline, Flex, Select, Spin } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  CarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { FaArrowLeft } from "react-icons/fa6";
import "./view_ad_order-detail.scss";
import "../../../MyOrderDetail/my_oder_detail.scss";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllOrder,
  getOrderDetailByOrderId,
  updateOrder,
} from "../../../../redux/slide/orderSlide";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import moment from "moment";
const getSelectClass = (value) => {
  switch (value) {
    case "XÁC NHẬN":
      return ["#0958d9", "#e6f4ff", "#91caff"];
    case "ĐÓNG GÓI":
      return ["#d46b08", "#fff7e6", "#ffd591"];
    case "ĐANG GIAO":
      return ["#d4b106", "#feffe6", "#fffb8f"];
    case "ĐÃ NHẬN":
      return ["#389e0d", "#f6ffed", "#b7eb8f"];
    case "HỦY":
      return ["#cf1322", "#fff1f0", "#ffa39e"];
    default:
      return ["#0958d9", "#e6f4ff", "#91caff"]; // Nếu không có giá trị nào khớp, trả về chuỗi rỗng
  }
};
const options = [
  {
    value: "XÁC NHẬN",
    lable: "XÁC NHẬN",
  },
  {
    value: "ĐÓNG GÓI",
    lable: "ĐÓNG GÓI",
  },
  {
    value: "ĐANG GIAO",
    lable: "ĐANG GIAO",
  },
  {
    value: "ĐÃ NHẬN",
    lable: "ĐÃ NHẬN",
  },
  {
    value: "HỦY",
    lable: "HỦY",
  },
];

const columns = [
  {
    title: "SẢN PHẨM",
    dataIndex: "name",
    key: "name",
    width: 300,
    render: (_, item) => {
      return (
        <div className="order-detail-product-wrap">
          <img src={"/uploads/" + item?.product?.productImages[0]?.imageUrl} />
          <span>{item?.product?.name}</span>
        </div>
      );
    },
  },
  {
    title: "GIÁ TIỀN",
    dataIndex: "price",
    key: "price",
    width: 200,
    render: (_, item) => {
      return <>{item?.price.toLocaleString("vi-VN") + " VND"}</>;
    },
  },
  {
    title: "SỐ LƯỢNG",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "TỔNG PHỤ",
    key: "subtotal",
    dataIndex: "subtotal",
  },
];

export const ViewAdOrderDetail = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const [orderStatus, setOrderStatus] = useState();

  // handle update order
  const handleChange = (value) => {
    setOrderStatus(value);
    let paymentStatus = false;
    let paymentDate = "";
    const today = moment().format("YYYY-MM-DDTHH:mm:ss");
    if (value == "ĐÃ NHẬN") {
      paymentStatus = true;
      paymentDate = moment().format("YYYY-MM-DDTHH:mm:ss");
    }

    const dataUpdate = {
      deliveryDate: today,
      deliveryAddress: dataOrder[0]?.user?.address,
      orderStatus: value,
      note: dataOrder[0]?.note,
      paymentStatus: paymentStatus,
      paymentDate: paymentDate,
      paymentMethodId: 1,
    };
    //console.log("dataUpdate", dataUpdate);
    try {
      dispatch(updateOrder({ id: orderId, body: dataUpdate }));
      toast.success("Đã chuyển trạng thái");
    } catch (error) {}
  };
  // console.log(orderStatus);
  const CustomSelect = styled(Select)`
    .ant-select-selector {
      color: ${getSelectClass(orderStatus)[0]} !important;
      background-color: ${getSelectClass(orderStatus)[1]} !important;
      border-color: ${getSelectClass(orderStatus)[2]} !important;
    }
  `;

  // handle data
  //const [dataOrder, setDataOrder] = useState([]);
  // const [orderTitle, setOrderTitle] = useState(""); //"XÁC NHẬN"
  const [paymentDate, setPaymentDate] = useState("");
  const dataAllOrder = useSelector((state) => state.orderSlide.listOrder);
  const loading = useSelector((state) => state.orderSlide.loading);
  const dataOrderDetailByOderId = useSelector(
    (state) => state.orderSlide.listOrderDetailByOderId
  );

  useEffect(() => {
    dispatch(getAllOrder());
    if (orderId) {
      dispatch(getOrderDetailByOrderId(orderId));
    }
  }, [orderId, orderStatus]);
  let dataOrder = dataAllOrder.filter((item) => item.id == orderId);
  let orderTitle = "#00" + dataOrder[0]?.id;
  // useEffect(() => {
  //   setDataOrder();
  // }, [dataAllOrder]);
  useEffect(() => {
    //setOrderTitle();
    setOrderStatus(dataOrder[0]?.orderStatus);
  }, [dataOrder]);

  const dataSource = dataOrderDetailByOderId.map((item) => ({
    key: item.id,
    subtotal: `${
      (item?.price * item?.quantity).toLocaleString("vi-VN") + " VND"
    }`,
    ...item,
  }));

  return (
    <div className="order-detail-wrap">
      {/* <Spin spinning={loading} fullscreen="true"></Spin>
      {console.log("laod  ")} */}
      <Link to={"/admin/order"}>
        <div style={{ display: "flex" }}>
          <FaArrowLeft className=" icon" />
          <h4>Chi tiết đặt hàng</h4>
        </div>
      </Link>
      <h5>
        Danh sách đặt hàng <span>/ Chi tiết đặt hàng</span>
      </h5>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title={"Đơn hàng " + orderTitle}
            extra={
              <CustomSelect
                defaultValue={orderStatus}
                options={options}
                style={{
                  width: "150px",
                }}
                onChange={handleChange}
              ></CustomSelect>
            }
          >
            <Row>
              <Col span={24}>
                <Flex justify="space-between" className="order-info-text">
                  <span>
                    {" "}
                    <CalendarOutlined className="lable-icon" /> Ngày tạo đơn:
                  </span>{" "}
                  <span className="text-content">
                    {dataOrder[0]?.createdAt}
                  </span>
                </Flex>

                <Flex justify="space-between" className="order-info-text">
                  <span>
                    {" "}
                    <CreditCardOutlined className="lable-icon" /> Phương thức
                    thanh toán:
                  </span>{" "}
                  <span className="text-content">
                    {" "}
                    {dataOrder[0]?.paymentMethod?.name}
                  </span>
                </Flex>
                <Flex justify="space-between" className="order-info-text">
                  <span>
                    {" "}
                    <CarOutlined className="lable-icon" /> Phương thức vận
                    chuyển:
                  </span>{" "}
                  <span className="text-content"> Vận chuyển thông thường</span>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Khách hàng">
            <Flex justify="space-between" className="order-info-text">
              <span>
                {" "}
                <UserOutlined className="lable-icon" /> Khách Hàng:
              </span>{" "}
              <span className="text-content">
                {" "}
                {dataOrder[0]?.user?.lastName +
                  " " +
                  dataOrder[0]?.user?.firstName}
              </span>
            </Flex>
            <Flex justify="space-between" className="order-info-text">
              <span>
                {" "}
                <MailOutlined className="lable-icon" /> Email:
              </span>{" "}
              <span className="text-content"> {dataOrder[0]?.user?.email}</span>
            </Flex>
            <Flex justify="space-between" className="order-info-text">
              <span>
                {" "}
                <PhoneOutlined className="lable-icon" /> Số Điện Thoại:
              </span>{" "}
              <span className="text-content">
                {" "}
                {dataOrder[0]?.user?.phoneNumber}
              </span>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="Danh sách đặt hàng">
            <div className="order-detail-products">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 4 }}
                scroll={{
                  y: 300,
                }}
                summary={() => (
                  <Table.Summary>
                    <Table.Summary.Row>
                      <Table.Summary.Cell colSpan={3}>
                        Giá vận chuyển
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>0 VND</Table.Summary.Cell>
                    </Table.Summary.Row>
                    <Table.Summary.Row>
                      <Table.Summary.Cell colSpan={3}>
                        <strong>Tổng Cộng</strong>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <strong>
                          {dataOrder[0]?.totalAmount.toLocaleString("vi-VN") +
                            " VND"}
                        </strong>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Địa Chỉ">
            <p>
              <EnvironmentOutlined className="lable-icon" /> Địa chỉ giao hàng
            </p>
            <p style={{ marginTop: 5 }}>{dataOrder[0]?.user?.address}</p>
          </Card>

          <Card title="Tình trạng đặt hàng" style={{ marginTop: "20px" }}>
            <Timeline>
              <Timeline.Item color="green">
                Đã đặt hàng {dataOrder[0]?.createdAt}
              </Timeline.Item>
              {/* <Timeline.Item color="orange">
                Đang xử lý 12/12/2022, 03:30
              </Timeline.Item>
              <Timeline.Item color="blue">
                Đóng gói DD/MM/YY, 00:00
              </Timeline.Item>
              <Timeline.Item color="blue">
                Đang vận chuyển DD/MM/YY, 00:00
              </Timeline.Item> */}
              <Timeline.Item color="gray">
                Đã giao thành công {dataOrder[0]?.paymentDate}
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
