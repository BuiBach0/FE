import React from "react";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const HeaderComponent = ({ collapsed, setCollapsed }) => {
  return (
    <header
      style={{
        background: "#2C3E50", // Màu nền xanh đen
        color: "#fff", // Màu chữ trắng
        textAlign: "center",
        padding: 0,
      }}
    >
      <h1>Home Page</h1>
    </header>
  );
};

export default HeaderComponent;
