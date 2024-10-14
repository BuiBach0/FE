import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Table,
  Popconfirm,
  message,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import AxiosInstance from "../../Helper/AxiosInstance";
import SiderLayout from "../Menu/SiderLayout";

function AddDepartments() {
  const [form] = Form.useForm(); // Khởi tạo form instance
  
  
  const [data, setData] = useState(null); // Biến để lưu trữ dữ liệu từ endpoint
  // Sử dụng useEffect để fetch data khi component mount
  useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem("access"); // Lấy token từ localStorage
        try {
            const response = await AxiosInstance.post('/departments/create', {
                // Có thể thêm dữ liệu vào đây nếu cần thiết
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []); // Chỉ chạy khi component mount
  
  // Hàm để xử lý việc thêm lớp học
  const handleSubmit = async (values) => {
    const token = localStorage.getItem("access"); // Lấy token từ localStorage
    try {
      const newClass = {
        id :values.id,
        name: values.name,
        
      };
        console.log(token, "dâd");

        const response = await AxiosInstance.post(
            "/departments/create",
            newClass,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success("Thêm khoa thành công!");
            form.resetFields(); // Reset form sau khi submit thành công
        } else {
            message.error("Thêm khoa thất bại!");        }
    } catch (error) {
        console.error("Lỗi khi thêm khoa :", error);
        message.error("Có lỗi xảy ra khi thêm khoa.");
    }
};

  return (
    <SiderLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{ background: "#2C3E50", color: "#fff", textAlign: "center", padding: 0 }}
      >
        <h1>Add Department</h1>
      </Header>

      <Row style={{ height: "calc(100vh - 64px)" }} >
            <Content className="content"  style={{ background: "#F0F4F8",}}>
              <div className="detail-section" >
                <h3>Thêm lớp học</h3>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                  <Row gutter={90}>
                    <Col span={12}>
                      <Form.Item label="ID" name="id">
                        <Input  type="number"/>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label=" Name" name="name">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Lưu
                      </Button>
                      <Button type="default">
                        <NavLink to="/Menu">Thoát</NavLink>
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </div>
            </Content>
        </Row>
    </SiderLayout>
  );
}

export default AddDepartments;
