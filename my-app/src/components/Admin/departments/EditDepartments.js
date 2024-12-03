import { EditOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Button } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../../Helper/AxiosInstance";
import AppContext from "antd/es/app/context";

function EditDepartments({  record , recallApi}) {
  const [data, setData] = useState({});
  const { fetchData, selectedDepartment } = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("access");

  // Hiển thị Modal và tải dữ liệu
  const showModal = async (record) => {
    setIsModalOpen(true);

    if (!token) {
      message.error("Bạn cần đăng nhập!");
      return;
    }

    try {
      const getNameDepartments = await axiosInstance.get("/departments", {
        
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Kiểm tra dữ liệu trả về từ API
      const departments = getNameDepartments.data.data;
      console.log(departments, "Kiểm tra dữ liệu trả về từ API");
      console.log(record.id,'--------------------');
      
      // Đặt dữ liệu vào state (chọn phần tử đầu tiên làm ví dụ)
      const selectedDepartment = departments.find(
        (dep) => dep.id === record.id
      );
      console.log(selectedDepartment.id,'aaaaaaaaaaaaaaaaaaaaa');
      if (selectedDepartment) {
        setData(selectedDepartment);
      } else {
        setData(record); // Fallback nếu không tìm thấy
      }
    } catch (error) {
      console.error("Lỗi không lấy được khoa", error);
      message.error("Lỗi không lấy được khoa");
    }
  };

  // Hàm xử lý lưu khi nhấn "Save"
  const handleOk = async () => {
    if (!token) {
      message.error("Bạn cần đăng nhập!");
      return;
    }

    try {
      // Gửi yêu cầu PUT để cập nhật dữ liệu
      const response = await axiosInstance.put(`/departments/${data.id}/edit`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      recallApi()
      message.success("Cập nhật thành công!");
      setData(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      message.error("Không thể cập nhật thông tin khoa");
    }
  };
  // Hàm xử lý thay đổi giá trị ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Đóng Modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  

  return (
    <div>
      <a onClick={() => showModal(record)}>
        <EditOutlined />
      </a>
      <Modal
        title="Edit Department"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form layout="vertical">
          <Form.Item label="Department name">
            <Input
              name="name"
              value={data.name || ""} // Hiển thị tên từ state
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EditDepartments;
