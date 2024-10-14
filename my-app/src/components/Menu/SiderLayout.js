import React, { useEffect, useState } from "react";
import { Layout, Menu, message, theme, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import axiosInstance from "../../Helper/AxiosInstance";
import SiderContent from "./SiderContent";
import PersonalMenu from "./PersonalMenu"

const { Header, Sider, Content } = Layout;

function SiderLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [roleName, setRoleName] = useState("");

  const handleLogOut = () => {
    localStorage.clear();
    
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setRoleName(profile.role?.name);
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#34495E" }}
      >
        <Menu theme="dark" mode="inline" style={{ background: "#34495E" }}>
          {roleName === "admin" && (
            <Menu.SubMenu
              key="1"
              icon={<i className="bi bi-pc-display-horizontal" />}
              title="Admin"
            >
              <Menu.Item key="11">
                <NavLink to="/ListUser">User</NavLink>
              </Menu.Item>
              <Menu.Item key="12">
                <NavLink to="/AddClass">Class</NavLink>
              </Menu.Item>
              <Menu.Item key="13">
                <NavLink to="/AddDepartments">Department</NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          )}
          {roleName && (
            <Menu.SubMenu key="2" icon={<UserOutlined />} title="Profile">
              <Menu.Item key="21">
                <NavLink to="/AddProfile">Information</NavLink>
              </Menu.Item>
              {roleName === "admin" ? (
                <Menu.Item key="22">
                  <NavLink to="/Option2">Option 2</NavLink>
                </Menu.Item>
              ) : roleName === "teacher" ? (
                <>
                  <Menu.Item key="22">
                    <NavLink to="/Option2">Grade criteria</NavLink>
                  </Menu.Item>
                  <Menu.Item key="23">
                    <NavLink to="/Option2">Student in class</NavLink>
                  </Menu.Item>
                  <Menu.Item key="24">
                    <NavLink to="/Option2">Create grade</NavLink>
                  </Menu.Item>
                </>
              ) : null}
            </Menu.SubMenu>
          )}
          <Menu.SubMenu key="3" icon={<UploadOutlined />} title="Nav 3">
            <Menu.Item key="31">
              <NavLink to="/Option1">Grades</NavLink>
            </Menu.Item>
            <Menu.Item key="32">
              <NavLink to="/Option2">Join class</NavLink>
            </Menu.Item>
            <Menu.Item key="33">
              <NavLink to="/Option2">Class</NavLink>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "#3498DB",
            }}
          />
          <div className="PersonalMenu" style={{paddingRight:"10px"}}>
          
              <PersonalMenu/>
            
          </div>
            
        </Header>
        <Content style={{ padding: '24px', background: colorBgContainer }}>
          {location.pathname === "/Menu" ? (
            <SiderContent />
          ) : (
            children
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiderLayout;
