import React from 'react'
import { Layout, Row, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import SiderLayout from '../Menu/SiderLayout';
import HeaderComponent from '../Menu/Header';
const { Column, ColumnGroup } = Table;
const data = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      gender: 'nam'
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      gender: 'nam'
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      gender: 'nam'
    },
  ];
function ListUser() {
  return (
    <div>
    <SiderLayout style={{ minHeight: "100vh" }}>
      
      <Layout.Content>
        <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Dob" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column title="Gender" dataIndex="gender" key="gender"/>
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a><EditOutlined /></a>
          <a><DeleteOutlined /></a>
        </Space>
      )}
    />
  </Table>
      </Layout.Content>
    </SiderLayout>
      
    </div>
  )
}

export default ListUser
