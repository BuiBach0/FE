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
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
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
      <Search
        placeholder="input search text"
        allowClear
        onSearch={onSearch}
        style={{
          width: 200,
          margin: '20px 20px 0px 0px',
        }}
      />
   
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
