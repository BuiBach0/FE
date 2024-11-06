import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useState } from "react";
import axiosInstance from "../../Helper/AxiosInstance";
const token = localStorage.getItem("access");

function DeleteUser({ id }) { 
  const [loading, setLoading] = useState(true);
  const handleDelete = async () => {
    if (!token) {
      message.error("Bạn cần đăng nhập!");
      return;
    }
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/users/${id}/delete`, { // Chèn id vào URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Người dùng đã được xóa thành công");
    } catch (error) {
      console.error("Lỗi không thể xóa người dùng:", error);
      message.error("Không thể xóa người dùng");
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <div>
      <DeleteOutlined onClick={handleDelete} />
    </div>
  );
}

export default DeleteUser;
