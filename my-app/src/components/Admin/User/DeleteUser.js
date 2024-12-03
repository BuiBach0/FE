import { DeleteOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../Helper/AxiosInstance";
const token = localStorage.getItem("access");

function DeleteUser(props) {
  const { id, recallApi } = props;
  const [loading, setLoading] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(""); // Vai trò của người dùng hiện tại
  const [targetUserRole, setTargetUserRole] = useState(""); // Vai trò của người bị xóa

  // Lấy thông tin vai trò của người dùng hiện tại
  useEffect(() => {
    const fetchCurrentUserRole = async () => {
      if (!token) {
        message.error("Bạn cần đăng nhập!");
        return;
      }
      try {
        const response = await axiosInstance.get(`/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUserRole(response.data.role); // Lưu vai trò của người dùng hiện tại
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng hiện tại:", error);
        message.error("Không thể lấy thông tin người dùng");
      }
    };

    fetchCurrentUserRole();
  }, []);

  // Lấy vai trò của người bị xóa
  useEffect(() => {
    const fetchTargetUserRole = async () => {
      if (!token) {
        message.error("Bạn cần đăng nhập!");
        return;
      }
      try {
        const response = await axiosInstance.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTargetUserRole(response.data.role); // Lưu vai trò của người bị xóa
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng mục tiêu:", error);
        message.error("Không thể lấy thông tin người dùng mục tiêu");
      }
    };

    fetchTargetUserRole();
  }, [id]);

  // Hàm xử lý xóa người dùng
  const handleDelete = async () => {
    if (!token) {
      message.error("Bạn cần đăng nhập!");
      return;
    }

    // Kiểm tra điều kiện: admin không thể xóa admin
    if (currentUserRole === "admin" && targetUserRole === "admin") {
      message.error("Bạn không thể xóa người dùng cùng cấp!");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.delete(`/users/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      recallApi(); // Gọi lại API để cập nhật danh sách
      message.success("Người dùng đã được xóa thành công");
    } catch (error) {
      console.error("Lỗi không thể xoá người dùng:", error);
      message.error("Không thể xoá người dùng");
    } finally {
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
