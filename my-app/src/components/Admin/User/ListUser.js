import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Layout,
  message,
  Space,
  Table,
} from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import SiderLayout from "../Menu/SiderLayout";
import axiosInstance from "../../../Helper/AxiosInstance";
import moment from "moment";
import DeleteUser from "./DeleteUser";
import InputSearchUser from "./InputSearchUser";

const { Column, ColumnGroup } = Table;

function ListUser() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const token = localStorage.getItem("access");

  const fetchData = async () => {
    if (!token) {
      message.error("Bạn cần đăng nhập!");
      return;
    }
    try {
      const getUser = await axiosInstance.get("/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = getUser.data.data;
      setData(userData);
      setOriginalData(userData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      message.error("Không thể lấy thông tin người dùng");
    }
  };

  const handleSearch = (value) => {
    const filteredData = originalData.filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      message.info("Không tìm thấy kết quả phù hợp!");
    }

    setData(filteredData);
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div>
      <SiderLayout style={{ minHeight: "100vh" }}>
        <Layout.Content>
          {/* Thanh tìm kiếm */}
          <Space style={{ marginBottom: 16 }}>
            <InputSearchUser
              placeholder="Tìm kiếm người dùng"
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
            />
          </Space>

          {/* Bảng hiển thị dữ liệu */}
          <Table dataSource={data} rowKey="id">
            <ColumnGroup title="Name">
              <Column title="First Name" dataIndex="first_name" key="first_name" />
              <Column title="Last Name" dataIndex="last_name" key="last_name" />
            </ColumnGroup>
            <Column
              title="Dob"
              dataIndex="dob"
              key="dob"
              render={(dob) => moment(dob).format("DD/MM/YYYY")}
            />
            <Column title="Gender" dataIndex="gender" key="gender" />
            <Column
              title="Role"
              dataIndex="role.name"
              key="role.name"
              render={(text, record) => record.role.name}
            />
            
          <Column
            title="Action"
            key="action"
            render={(_, record) =>{
              return (
              <Space size="middle">
                 <EditOutlined />
                <a>
                  <DeleteUser id={record.id} recallApi={fetchData}/>
                </a>
              </Space>
            )
            } }
          />
          </Table>
        </Layout.Content>
      </SiderLayout>
    </div>
  );
}

export default ListUser;
