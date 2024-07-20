import React from 'react';
import { Table, Button, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import "./view_ad_category.scss";

const data = [
  {
    key: '1',
    name: 'Thức ăn',
    description: 'Great fashion, great selections, great prices.',
    date: '29 Dec 2022',
  },
  {
    key: '2',
    name: 'Đồ uống',
    description: 'Our range of watches are perfect whether you\'re looking to upgrade.',
    date: '24 Dec 2022',
  },
  // Thêm dữ liệu khác nếu cần
];

const columns = [
  {
    title: 'Tên loại sản phẩm',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <div>
        <input type="checkbox" style={{ marginRight: '8px' }} />
        <span>{text}</span>
        <div style={{ fontSize: '12px', color: '#888' }}>{record.description}</div>
      </div>
    ),
  },
  {
    title: 'Thêm ngày',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <span>
        <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
        <Button icon={<EyeOutlined />} style={{ marginRight: 8 }} />
        <Button icon={<DeleteOutlined />} />
      </span>
    ),
  },
];

export const ViewAdCategory = (props) => {
  return (
    <div className="view-category-container">
      <div className="header">
        <h2>Loại sản phẩm</h2>
        <Button type="primary" className="add-category-button">+ Thêm loại sản phẩm</Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false} // Disable default pagination
      />
      <div className="pagination-container">
        <Pagination
          className="custom-pagination"
          defaultCurrent={1}
          total={100}
          pageSize={10}
        />
      </div>
    </div>
  );
};
