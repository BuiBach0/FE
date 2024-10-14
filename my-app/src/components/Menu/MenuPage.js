import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Layout, Menu, message, Row, theme } from "antd";
import { NavLink } from "react-router-dom";
import DetailSection from "../Profile/Add/DetailSection";
import ButtonGroup from "../Profile/Add/ButtonGroup";
import axiosInstance from "../../Helper/AxiosInstance";
import ProfileSection from "../Profile/Add/ProfileSection";
import SiderLayout from "./SiderLayout";

const { Header, Sider, Content } = Layout;

function MenuPage() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleName, setRoleName] = useState("");
  const [data, setData] = useState();
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        message.error("Bạn cần đăng nhập!");
        return;
      }

      try {
        const response = await axiosInstance.get("/users/profile", {
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
  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");

    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setFirstName(profile.first_name);
      setLastName(profile.last_name);
      setRoleName(profile.role?.name);
      console.log(roleName, "Role from Profile");
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
  };

  return (
    <div>
      {/* <Header
        style={{
          background: "#2C3E50", // Màu nền xanh đen
          color: "#fff", // Màu chữ trắng
          textAlign: "center",
          padding: 0,
        }}
      >
        <h1>Home Page</h1>
      </Header> */}

      <div className="tbody">
        <Layout>
        <SiderLayout/>
        </Layout>
        
      </div>
    </div>
  );
}

export default MenuPage;
