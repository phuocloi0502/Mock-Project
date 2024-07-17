import React, { useState } from "react";
import { Button, Space } from "antd";
import "./status_filter.scss";
export const StatusFilter = () => {
  const [selectedStatus, setSelectedStatus] = useState("Tất cả trạng thái");

  const statuses = [
    "Tất cả trạng thái",
    "Đã xác nhận",
    "Đã đóng gói",
    "Đang giao",
    "Đã nhận",
    "Đã huỷ",
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
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
              backgroundColor: selectedStatus === status ? "#f4ecfb" : "",
              color: selectedStatus === status ? "#722ed1" : "",
            }}
          >
            {status}
          </Button>
        ))}
      </Space>
    </div>
  );
};
