import React, { useState } from "react";
import { Button, Space } from "antd";
import "./status_filter.scss";
import { changeStatusOrder } from "../../../redux/slide/orderSlide";
import { useDispatch } from "react-redux";
export const StatusFilter = (props) => {
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState("Tất cả trạng thái");

  const statuses = [
    "Tất cả trạng thái",
    "XÁC NHẬN",
    "ĐÓNG GÓI",
    "ĐANG GIAO",
    "ĐÃ NHẬN",
    "HỦY",
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    dispatch(changeStatusOrder(status));
  };

  return (
    <div className="status-filter-wrap">
      <Space>
        {statuses.map((status) => (
          <Button
            key={status}
            type={selectedStatus === status ? "primary" : "default"}
            onClick={() => handleStatusChange(status)}
            style={{
              backgroundColor:
                selectedStatus === status ? props?.backgroundColor : "", //#f4ecfb
              color: selectedStatus === status ? props?.color : "", //#722ed1
            }}
          >
            {status}
          </Button>
        ))}
      </Space>
    </div>
  );
};
