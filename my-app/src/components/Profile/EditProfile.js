import React, { useEffect, useState } from "react";
import "./AddProfile.css";
import {
  Layout,
  Avatar,
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { message } from "antd";
import axiosInstance from "../../Helper/AxiosInstance";

function EditProfile() {
  const [data, setData] = useState({});
  const [form] = Form.useForm();
  const nac = useNavigate();
  const [role, setRole] = useState(); 
  const getAuthConfig = () => {
    
    const token = localStorage.getItem("access") || "your-fallback-bearer-token";
    localStorage.setItem("bearer", token);
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };
  const getRoler = async () => {
    const config = getAuthConfig();
    const userRole  = await axiosInstance.get(
      "/role",
       config
    );
    if (userRole.data?.code === 200) {
      // setRole(userRole.data?.data)
      setRole(userRole.data?.data?.map((e) => ({value: e?.id, label: e?.name})))
     
    }
  }
  // Lấy thông tin từ localStorage
  useEffect(() => {
    debugger
    const fetchData = async () => {
      try {
        // Lấy profile từ localStorage
        const storedProfile = localStorage.getItem("profile");
        if (storedProfile) {
          const userData = JSON.parse(storedProfile);
          setData(userData);

          // Cập nhật các giá trị trên form
          form.setFieldsValue({
            first_name: userData.first_name,
            last_name: userData.last_name,
            gender: userData.gender,
            dob: dayjs(userData.dob),
            address: userData.address,
            role:userData?.role?.name,
          });
        }
      } catch (err) {
        console.log("Error fetching data from localStorage:", err);
      }
    };

    fetchData();
  }, [form]);

  useEffect(() => {
    getRoler ()
  },[] );

  // Xử lý lưu thông tin sau khi submit form
  const handleSave = async (values) => {
    try {
      const config = getAuthConfig();  // Sử dụng hàm getAuthConfig
      const response = await axiosInstance.put(
        "/users/edit",
        values,
        config
      );
  
      if (response.data?.code === 200) {
        const updatedProfile = { ...data, ...values };
        localStorage.setItem("profile", JSON.stringify(updatedProfile));
        message.success("Cập nhật thông tin thành công!");
        nac("/addProfile");
      } else {
        console.error("Unexpected response structure:", response.data);
        message.error("Có lỗi xảy ra khi cập nhật thông tin!");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      message.error("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };
  console.log(role,"aaaaaa");
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          color: "#fff",
          textAlign: "center",
          padding: 0,
        }}
      >
        <h1>Edit Profile</h1>
      </Header>
      <Content>
        <Row style={{ height: "calc(100vh - 64px)" }}>
          <Col span={6} style={{ backgroundColor: "#ffffff", padding: "20px" }}>
            <div className="profile-section">
              <Avatar size={100} icon={<UserOutlined />} />
              <h4>
                {data?.first_name} {data?.last_name}
              </h4>{" "}
              <p>{data?.username}</p>
            </div>
          </Col>
          <Col span={18} style={{ backgroundColor: "#ffffff", padding: "20px" }}>
            <Content className="content">
              <div className="detail-section">
                <h3>Thông tin chi tiết</h3>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                  <Row gutter={90}>
                    <Col span={8}>
                      <Form.Item label="First Name" name="first_name">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Last Name" name="last_name">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Gender" name="gender">
                        <Select
                          showSearch
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare((optionB?.label ?? "").toLowerCase())
                          }
                          options={[
                            { value: "nam", label: "Male" },
                            { value: "nữ", label: "Female" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={90}>
                    <Col span={8}>
                      <Form.Item label="Date Of Birthday" name="dob">
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Address" name="address">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Role" name="role">
                      <Select
                          showSearch
                          disabled
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare((optionB?.label ?? "").toLowerCase())
                          }
                          options={role} 
                        />
                      </Form.Item>
                    </Col> 
                  </Row>
                  
                  <Form.Item>
                    <div className="button-group">
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                      <Button type="default" className="cancel-button">
                        <NavLink to="/AddProfile">Exit</NavLink>
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default EditProfile;
