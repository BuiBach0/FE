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
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SiderLayout from "../Menu/SiderLayout";
import axiosInstance from "../../Helper/AxiosInstance";
import moment from "moment";
import EditUser from "../User/EditUser";
import DeleteUser from "../User/DeleteUser";
const { Column, ColumnGroup } = Table;

function ListDepartments() {
    const [data, setData] = useState([]);
  console.log(data, "aaaaaaaa");
  const token = localStorage.getItem("access");
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        message.error("Bạn cần đăng nhập!");
        return;
      }
      try {
        const response = await axiosInstance.get("/departments", {
          headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token trong headers
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        message.error("Không thể lấy thông tin người dùng");
      }
    };

    fetchData();
  }, [token]);
  
  return (
    <div>
    <SiderLayout style={{ minHeight: "100vh" }}>
      <Layout.Content>
        <Table dataSource={data}>
          <Column
            title="Id"
            dataIndex="id"
            key="id"
          />
          <Column title="Department name" dataIndex="name" key="name" />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Space size="middle">
                <EditUser />
                <a>
                  <DeleteUser />
                </a>
              </Space>
            )}
          />
        </Table>
      </Layout.Content>
    </SiderLayout>
  </div>
  )
}

export default ListDepartments
