import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import "./ad_dashboard.scss";
import icon1 from "../../../assets/icon-admin/Group 121.svg";
import icon2 from "../../../assets/icon-admin/Group 82.svg";
import icon3 from "../../../assets/icon-admin/Group 228.svg";
import icon4 from "../../../assets/icon-admin/huy.svg";
export const AdDashBoard = () => {
  return (
    <div className="dash-board-wrapper">
      <div className="card-area">
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Card className="my-card">
              <div className="icon-area">
                <img src={icon1} alt="" />
              </div>
              <div className="card-content-area">
                <h3>75</h3>
                <h5>Tổng số đơn hàng</h5>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="my-card">
              <div className="icon-area">
                <img src={icon2} alt="" />
              </div>
              <div className="card-content-area">
                <h3>70</h3>
                <h5>Tổng số đã giao</h5>
              </div>
            </Card>
          </Col>

          <Col span={12}>
            <Card className="my-card">
              <div className="icon-area">
                <img src={icon3} alt="" />
              </div>
              <div className="card-content-area">
                <h3>50</h3>
                <h5>Tổng số khách hàng</h5>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card className="my-card">
              <div className="icon-area">
                <img src={icon4} alt="" />
              </div>
              <div className="card-content-area">
                <h3>5</h3>
                <h5>Tổng số đơn bị hủy</h5>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
