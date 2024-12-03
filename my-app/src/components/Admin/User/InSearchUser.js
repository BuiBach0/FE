
import { AudioOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import Search from 'antd/es/transfer/search'
import React, { useState } from 'react'
import CreateUser from '../User/CreateUser';
import axiosInstance from '../../../Helper/AxiosInstance';
import { Navigate, NavLink, useNavigate ,useLocation } from 'react-router-dom';

const token = localStorage.getItem("access");
function InSearchUser(id) {
    const { Search } = Input;
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const onSearch = async () =>{
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
        // navigate('/ListUser', { state: { users: response.data } });
      } catch (error) {
        console.error("Lỗi không thể tìm người dùng:", error);
       
      }

    }

  return (

    <div>
      {(currentPath === '/ListUser' || currentPath === '/ListClass' || currentPath === '/ListDepartments') && (
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
            margin: '20px 20px 20px 0px',
          }}
        />
      )}
    </div>

  
  )
}

export default InSearchUser;
