import { EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Helper/AxiosInstance';
function EditUser({ user }) {
  const [data, setData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("access");
  const showModal = () => {
    setData(user);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
   
    

   
  }, []);

  // console.log('--------------' ,user);
  return (
    <div>
      
      <a  onClick={showModal}>
      <EditOutlined />
      </a>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        layout="vertical"
        okText='Save'
      >
        <Form layout="vertical">
          <Form.Item label="First Name" >
            <Input value={data?.first_name}/>
          </Form.Item>
          <Form.Item label="Last Name">
            <Input value={data?.last_name} />
          </Form.Item>
          <Form.Item label="DOB">
            <Input value={data?.dob}/>
          </Form.Item>
          <Form.Item label="Address">
            <Input  value={data?.address}/>
          </Form.Item>
          <Form.Item label="Gender">
            <Input  value={data?.gender}/>
          </Form.Item>
          <Form.Item label="Role">
            <label/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditUser
