import React, { useEffect, useState } from "react";
import "./AddProfile.css";
import { Layout, Row, Col, message } from "antd";
import axiosInstance from "../../../Helper/AxiosInstance";
import HeaderComponent from "./Add/HeaderComponent";
import ProfileSection from "./Add/ProfileSection";
import DetailSection from "./Add/DetailSection";
import ButtonGroup from "./Add/ButtonGroup";
import SiderLayout from "../Menu/SiderLayout";

function AddProfile() {
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

  return (
    <SiderLayout style={{ minHeight: "100vh" }}>
      <HeaderComponent />
      <Layout.Content>
        <Row style={{ height: "calc(100vh - 64px)" }}>
          <Col span={6} style={{ backgroundColor: "#F0F4F8", padding: "20px" }}>
            <ProfileSection data={data} />
          </Col>
          <Col
            span={18}
            style={{ backgroundColor: "#F0F4F8", padding: "20px" }}
          >
            <DetailSection data={data} />
            <ButtonGroup />
          </Col>
        </Row>
      </Layout.Content>
    </SiderLayout>
  );
}

export default AddProfile;
