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
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
const { Column, ColumnGroup } = Table;

function ListUser() {
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
        const response = await axiosInstance.get("/users/all", {
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
  // const maleCount = data.filter(item => item.gender === "nam").length;
  // const femaleCount = data.filter(item => item.gender === "nu").length;
  return (
    <div>
      <SiderLayout style={{ minHeight: "100vh" }}>
        <Layout.Content>
          <Table dataSource={data}>
          <Column title="Id" dataIndex="id" key="id" />
            <ColumnGroup title="Name">
              <Column
                title="First Name"
                dataIndex="first_name"
                key="first_name"
              />
              <Column title="Last Name" dataIndex="last_name" key="last_name" />
            </ColumnGroup>
            <Column
              title="Dob"
              dataIndex="dob"
              key="dob"
              render={(dob) => moment(dob).format("DD/MM/YYYY")}
            />
            { data.gender === "nam" ? "red" : "blue" && (
              <Column
              title="Gender"
              dataIndex="gender"
              key="gender"
              render={(text) => (
                <span style={{ color: text === "nam" ? "red" : "blue" }}>
                  {text}
                </span>
              )}
            />)}
            <Column title="Gender" dataIndex="gender" key="gender" />

            <Column
              title="Role"
              dataIndex="role.name"
              key="role.name"
              render={(text, record) =>{  return record.role.name; }}
            />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                    <EditUser user={record}
                      
                    /> 
                  <a>
                  <DeleteUser id={record.id} /> {/* Truyền id của user vào DeleteUser */}
                  </a>
                </Space>
              )}
            />
          </Table>
        </Layout.Content>
        {/* <p>Số lượng nam: {maleCount}</p>
        <p>Số lượng nữ: {femaleCount}</p> */}
      </SiderLayout>

    </div>
  );
}

export default ListUser;
