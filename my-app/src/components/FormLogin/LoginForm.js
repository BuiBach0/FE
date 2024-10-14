import React, { useState } from "react";
import { Form, Input, Button, message, Layout, Row, Col, Card } from "antd";
import axiosInstance from "../../Helper/AxiosInstance";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const { Content } = Layout;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      const data = response.data.data;
      if (response.data.code === 200) {
        localStorage.setItem("access", data.accessToken);
        localStorage.setItem("refresh", data.refreshToken);
        localStorage.setItem("profile", JSON.stringify(data?.user));

        message.success("Đăng nhập thành công!");
        navigate("/Menu");
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      message.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Col xs={22} sm={16} md={12} lg={8}>
            <Card
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "24px" }}>
                Đăng nhập
              </h2>
              <Form
                name="loginForm"
                layout="vertical"
                onFinish={handleLogin}
              >
                <Form.Item
                  label="Username"
                  name="username"
                  s={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
                >
                  <Input placeholder="Nhập username" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  s={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                  <Input.Password placeholder="Nhập password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginForm;
