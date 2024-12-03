import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const ProfileSection = ({ data }) => (
  <div className="profile-section" style={{backgroundColor: '#BDC3C7'}}>
    <Avatar size={100} icon={<UserOutlined />} /> 
    <h4>{data?.username}</h4>
    <p style={{color:"#FFFFFF"}}>{data?.first_name} {data?.last_name}</p>
  </div>
);

export default ProfileSection;
