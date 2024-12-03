import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import {
  AppleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import SiderLayout from "../Menu/SiderLayout";
import axiosInstance from "../../../Helper/AxiosInstance";
import moment from "moment";
import EditUser from "../User/EditUser";
import DeleteUser from "../User/DeleteUser";
import EditDepartments from "./EditDepartments";
import InputSearchDepartment from "./InputSearchDepartment";
import { NavLink } from "react-router-dom";
import ClassOfDepartment from "./ClassOfDepartment";
const { Column, ColumnGroup } = Table;

function ListDepartments() {
  const [data, setData] = useState([]);
  console.log(data, "aaaaaaaa");

  const token = localStorage.getItem("access");

  const fetchData = async () => {
    if (!token) {
      message.error("Bạn cần đăng nhập!");
      return;
    }
    try {
      const response = await axiosInstance.get("/departments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      message.error("Không thể lấy thông tin người dùng");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div>
      <SiderLayout style={{ minHeight: "100vh" }}>
        <Layout.Content>
          {/* <InputSearchDepartment
              placeholder="Tìm kiếm người dùng"
              allowClear
              // onSearch={handleSearch}
              style={{ width: 300 }}
            /> */}
          <Table dataSource={data}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Department name" dataIndex="name" key="name" />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <EditDepartments
                    record={record}
                    id={record.id}
                    recallApi={fetchData}
                  />
                  <NavLink
                    record={record}
                    to={{
                      pathname: `/ClassOfDepartment`,
                      state: { id: record.id }, // Truyền id qua state
                    }}
                    onClick={() => {
                      console.log("id:", record.id); // Log giá trị của record 
                    }}
                  >
                    <PlusOutlined />
                  </NavLink>
                </Space>
              )}
            />
          </Table>
        </Layout.Content>
      </SiderLayout>
    </div>
  );
}

export default ListDepartments;
