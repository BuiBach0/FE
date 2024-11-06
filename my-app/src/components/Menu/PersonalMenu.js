import {
  LogoutOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Dropdown, Space, Input } from "antd"; // Đúng: Dropdown từ antd
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import "./PersonalMenu.css"
import InputSearch from "./InputSearch";


const handleLogOut = () => {
  localStorage.clear();
};

const menu = (
  <Menu>
    <Menu.Item key="img">
      <Avatar size="large" icon={<UserOutlined />} />
    </Menu.Item>
    <Menu.Item key="profile" icon={<UserOutlined />}>
      <a href="/AddProfile">Thông tin cá nhân</a>
    </Menu.Item>
    <Menu.Item key="settings" icon={<SettingOutlined />}>
      Cài đặt & quyền riêng tư
    </Menu.Item>
    <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
      Trợ giúp & hỗ trợ
    </Menu.Item>
    <Menu.Item key="logout" icon={<LogoutOutlined />}>
      <NavLink to={"/"} onClick={handleLogOut}>
        Đăng xuất
      </NavLink>
    </Menu.Item>
  </Menu>
);

function Test() {
  // const[data,setData] = useState();
  // useEffect(() =>{

  // })
  return (
    
    <div className="a">
      <InputSearch/>
   
      <Dropdown overlay={menu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar size="large" icon={<UserOutlined />} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default Test;
