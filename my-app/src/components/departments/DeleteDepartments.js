
import { message } from 'antd';
import React from 'react'
import axiosInstance from '../../Helper/AxiosInstance';
const token = localStorage.getItem("access");
function DeleteDepartments() {
    const handleDeleteClass = async () => {
        if (!token) {
          message.error("Bạn cần đăng nhập!");
          return;
        }
        console.log(id,"--------------");
        
        try {
          const response = await axiosInstance.delete(, { // Chèn id vào URL
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          message.success("Lớp học đã được xóa thành công");
        } catch (error) {
          console.error("Lỗi không thể xóa lớp học:", error);
          message.error("Không thể xóa lớp học ");
        }
      };
  return (
    <div>
      
    </div>
  )
}

export default DeleteDepartments


