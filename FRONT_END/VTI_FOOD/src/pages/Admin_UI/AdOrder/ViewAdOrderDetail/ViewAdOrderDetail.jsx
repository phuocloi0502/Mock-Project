import React, { useState } from "react";
import { Card, Col, Row, Table, Tag, Timeline, Flex, Select } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  CarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import "./view_ad_order-detail.scss";
import styled from "styled-components";
const getSelectClass = (value) => {
  switch (value) {
    case "ĐÃ XÁC NHẬN":
      return ["#0958d9", "#e6f4ff", "#91caff"];
    case "ĐÃ ĐÓNG GÓI":
      return ["#d46b08", "#fff7e6", "#ffd591"];
    case "ĐANG GIAO":
      return ["#d4b106", "#feffe6", "#fffb8f"];
    case "ĐÃ GIAO":
      return ["#389e0d", "#f6ffed", "#b7eb8f"];
    case "ĐÃ HỦY":
      return ["#cf1322", "#fff1f0", "#ffa39e"];
    default:
      return ["#0958d9", "#e6f4ff", "#91caff"]; // Nếu không có giá trị nào khớp, trả về chuỗi rỗng
  }
};
const options = [
  {
    value: "ĐÃ XÁC NHẬN",
    lable: "ĐÃ XÁC NHẬN",
  },
  {
    value: "ĐÃ ĐÓNG GÓI",
    lable: "ĐÃ ĐÓNG GÓI",
  },
  {
    value: "ĐANG GIAO",
    lable: "ĐANG GIAO",
  },
  {
    value: "ĐÃ GIAO",
    lable: "ĐÃ GIAO",
  },
  {
    value: "ĐÃ HỦY",
    lable: "ĐÃ HỦY",
  },
];
const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "product",
    key: "product",
    render: (text) => (
      <div>
        <img
          src="https://via.placeholder.com/40"
          alt="product"
          style={{ marginRight: 10 }}
        />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: "Tổng cộng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Giá tiền",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Thành tiền",
    dataIndex: "total",
    key: "total",
  },
];

const data = [
  {
    key: "1",
    product: "Hamburger",
    quantity: "1 pcs",
    price: "$121.00",
    total: "$121.00",
  },
  {
    key: "2",
    product: "Hamburger",
    quantity: "1 pcs",
    price: "$590.00",
    total: "$590.00",
  },
];

export const ViewAdOrderDetail = () => {
  const [optionValue, setOptionValue] = useState("ĐÃ GIAO");
  const handleChange = (value) => {
    setOptionValue(value);
  };
  console.log(optionValue);
  const CustomSelect = styled(Select)`
    .ant-select-selector {
      color: ${getSelectClass(optionValue)[0]} !important;
      background-color: ${getSelectClass(optionValue)[1]} !important;
      border-color: ${getSelectClass(optionValue)[2]} !important;
    }
  `;

  return (
    <div className="order-detail-wrap">
      <h4>Chi tiết đặt hàng</h4>
      <h5>
        Danh sách đặt hàng <span>/ Chi tiết đặt hàng</span>
      </h5>
      <Row gutter={16}>
        <Col span={12}>
          <Card
            title="Đơn hàng #302011"
            extra={
              <CustomSelect
                defaultValue={optionValue}
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
                    <CalendarOutlined className="lable-icon" /> Ngày thêm:
                  </span>{" "}
                  <span className="text-content">12 Dec 2022</span>
                </Flex>

                <Flex justify="space-between" className="order-info-text">
                  <span>
                    {" "}
                    <CreditCardOutlined className="lable-icon" /> Phương thức
                    thanh toán:
                  </span>{" "}
                  <span className="text-content"> Visa</span>
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
              <span className="text-content"> Josh Adam</span>
            </Flex>
            <Flex justify="space-between" className="order-info-text">
              <span>
                {" "}
                <MailOutlined className="lable-icon" /> Email:
              </span>{" "}
              <span className="text-content"> joshadam@mail.com</span>
            </Flex>
            <Flex justify="space-between" className="order-info-text">
              <span>
                {" "}
                <PhoneOutlined className="lable-icon" /> Số Điện Thoại:
              </span>{" "}
              <span className="text-content"> 0909 427 2910</span>
            </Flex>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="Danh sách đặt hàng">
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3}>
                      Giá vận chuyển
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>$20.00</Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={3}>
                      <strong>Tổng Cộng</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <strong>$731.00</strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Địa Chỉ">
            <p>
              <EnvironmentOutlined className="lable-icon" /> Địa chỉ giao hàng
            </p>
            <p>1833 Bel Meadow Drive, Fontana, California 92335, USA</p>
          </Card>

          <Card title="Tình trạng đặt hàng" style={{ marginTop: "20px" }}>
            <Timeline>
              <Timeline.Item color="green">
                Đã đặt hàng 12/12/2022, 03:00
              </Timeline.Item>
              <Timeline.Item color="orange">
                Đang xử lý 12/12/2022, 03:30
              </Timeline.Item>
              <Timeline.Item color="blue">
                Đóng gói DD/MM/YY, 00:00
              </Timeline.Item>
              <Timeline.Item color="blue">
                Đang vận chuyển DD/MM/YY, 00:00
              </Timeline.Item>
              <Timeline.Item color="gray">
                Đã giao thành công DD/MM/YY, 00:00
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
