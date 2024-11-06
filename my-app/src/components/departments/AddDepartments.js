import React, { useEffect, useState } from "react";
import { Layout, Form, Input, Button, Row, Col } from "antd";
import { message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../Helper/AxiosInstance";
import SiderLayout from "../Menu/SiderLayout";

function CreateTeacher() {
  const [form] = Form.useForm();

  // Lấy token từ localStorage
  const getAuthConfig = () => {
    const token =
      localStorage.getItem("access") || "your-fallback-bearer-token";
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Hàm gửi dữ liệu form và file lên server
  const handleSubmit = async (values) => {
    const token = localStorage.getItem("access");
    const name = values.name;
    if (!name) {
      message.error("Tên khoa không được để trống.");
      return; // Dừng nếu `name` bị trống
    }

    // Tạo FormData để gửi file và dữ liệu
    const formData = new FormData();
    formData.append("name", name);
    const body = {
      name: name
    }
    console.log("Giá trị của name:", values.name);
    try {
      const response = await axiosInstance.post(
        "/departments/create",
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Thêm khoa thành công!");
        form.resetFields(); // Reset form sau khi thành công
      } else {
        message.error("Thêm khoa thất bại!");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        message.error(`Lỗi: ${error.response.data.message[0]}`);
      } else {
        console.error("Lỗi khi gửi yêu cầu:", error);
        message.error("Có lỗi xảy ra khi thêm khoa.");
      }
    }
  };

  return (
    <SiderLayout>
      <Layout.Content>
        <Layout.Content className="content">
          <div
            className="detail-section"
            style={{ backgroundColor: "#F0F4F8" }}
          >
            <h3>Thông tin chi tiết</h3>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={90}>
                <Col span={10}>
                  <Form.Item label="Departments" name="name">
                    <Input
                      onChange={(e) =>
                        console.log("Giá trị nhập vào:", e.target.value)
                      } // Log giá trị của ô input
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <div className="button-group">
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                  <Button type="default" className="cancel-button">
                    <NavLink to="/Menu">Thoát</NavLink>
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Layout.Content>
      </Layout.Content>
    </SiderLayout>
  );
}

export default CreateTeacher;
