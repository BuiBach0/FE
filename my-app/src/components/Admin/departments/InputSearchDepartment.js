import { Input, message } from 'antd';
import React from 'react';
import axiosInstance from '../../../Helper/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

function InputSearchDepartment(id) {
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  const onSearch = async (value) => {
    if (!token) {
      message.error('Bạn cần đăng nhập!');
      return;
    }

    if (!value.trim()) {
      message.warning('Vui lòng nhập nội dung tìm kiếm!');
      return;
    }

    try {
      const response = await axiosInstance.get(`/departments/${id}/classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.length > 0) {
      
      } else {
        message.info('Không tìm thấy kết quả phù hợp!');
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      message.error('Đã xảy ra lỗi, vui lòng thử lại sau!');
    }
  };

  return (
    <div>
      <Search
        placeholder="Nhập tên người dùng"
        allowClear
        onSearch={onSearch}
        style={{ width: 300, margin: '20px 20px 20px 0' }}
      />
    </div>
  );
}

export default InputSearchDepartment;
