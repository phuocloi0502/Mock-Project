import "./wish_list.scss";
import React, { useState } from 'react';
import { Button, Form, Popconfirm, Table, Breadcrumb, Tag, Space, Image } from 'antd';
import { TiDeleteOutline } from "react-icons/ti";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  let childNode = children;
  return <td {...restProps}>{childNode}</td>;
};

export const WishList = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      product: {
        image:'https://th.bing.com/th/id/R.652c8d780880b03898dc075366bc1092?rik=2XX586SCpYhM5Q&riu=http%3a%2f%2fcdn.tgdd.vn%2fFiles%2f2020%2f12%2f16%2f1314124%2fthuc-an-nhanh-la-gi-an-thuc-an-nhanh-co-tot-hay-khong-202201201405201587.jpg&ehk=LZEkhLeMLbExsfHU2eD8wjAiAjbT5o8xu4azjmmKAVM%3d&risl=&pid=ImgRaw&r=0',
        name:'Fast Food',
      },
      price: '32',
      status: 'in stock out',
    },
    {
      key: '1',
      product: {
        image:'https://www.toursingapore.net.vn/images/van-hoa/am-thuc/am-thuc-viet-tai-singapore-lieu-co-chuan-vi-2.jpg',
        name:'Bún thịt nướng',
      },
      price: '65',
      status: 'in stock',
    },
  ]);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'SẢN PHẨM',
      dataIndex: 'product',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space size="middle" className="action-warp">
            <Image
              width={100}
              src={record.product.image}
            />
            <span>{record.product.name}</span>
          </Space>
        ) : null,
        sorter: (a, b) => a.product.name.length - b.product.name.length,
    },
    {
      title: 'GIÁ THÀNH',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'TRẠNG THÁI',
      dataIndex: 'status',
      key: 'status',
      render: (status) => ( 
        <span>
          <Tag color={status === 'in stock' ? 'green' : 'red'} key={status}>
            {status.toUpperCase()}
          </Tag>
        </span>
      ),
      sorter: (a, b) => a.status.length - b.price.length,
    },
    {
      title: '',
      dataIndex: 'operation',
      className: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Space size="middle" className="action-warp">
            <Button danger className="btn-add-to-cart"
               onClick={(event) => {
                console.log("clicked");
                event.stopPropagation();
              }}
              type="primary"
              style={{
                marginBottom: 16,
              }}
            >
              Thêm Vào Giỏ
            </Button>
            <Popconfirm
              title="Xóa sản phẩm khỏi danh sách yêu thích"
              description="Bạn có chắc chắn xóa sản phẩm này không?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger><TiDeleteOutline /></Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
      return col;
  });
  return (
    <>
      <div className="wish-list-wrapper">
        <div className="bread-crumb">
          <Breadcrumb
            items={[
              {
                title: 'My Account',
                href: './my_account',
              },
              {
                title: 'Sản phẩm yêu thích',
              },
            ]}
          />
        </div>
        <Table
          title={() => 'Sản phẩm yêu thích'}
          components={components}
          bordered
          dataSource={dataSource}
          columns={columns}
          className="container-wrap"
        />
      </div>
      
    </>
  );
};
export default WishList;