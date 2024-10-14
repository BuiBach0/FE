import { Col, message, Row, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import ProfileSection from '../Profile/Add/ProfileSection'
import DetailSection from '../Profile/Add/DetailSection'
import axiosInstance from '../../Helper/AxiosInstance'

function SiderContent() {
    const token = localStorage.getItem("access");
    const {
      token: { borderRadiusLG },
    } = theme.useToken();
    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
          if (!token) {
            message.error("Bạn cần đăng nhập!");
            return;
          }
    
          try {
            const response = await axiosInstance.get("/users/profile", {
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
    
        fetchData();
      }, [token]);
  return (
    <div>
      <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: "calc(100vh - 112px)", // Chiều cao tối thiểu để tránh khoảng trắng
                background: "#F0F4F8", // Nền sáng cho content
                borderRadius: borderRadiusLG,
              }}
            >
              <Row style={{ height: "calc(100vh - 64px)" }}>
                <Col  span={6}>
                  <ProfileSection data={data} />

                </Col>
                <Col span={18}>
                  <DetailSection data={data} />
                </Col>

                
              </Row>
          </Content>
    </div>
  )
}

export default SiderContent
