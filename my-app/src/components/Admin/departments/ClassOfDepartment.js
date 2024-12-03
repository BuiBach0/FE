
import { Layout, message, Space, Table } from 'antd';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Helper/AxiosInstance';
import Column from 'antd/es/table/Column';
import SiderLayout from '../Menu/SiderLayout';
import moment from 'moment';

function ClassOfDepartment(props) {
  const { id, record } = props;
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const token = localStorage.getItem('access');
  
  
  
  // Fetch teachers
  const fetchTeachers = async () => {
    if (!token) {
      message.error('Bạn cần đăng nhập!');
      return;
    }
    try {
      const response = await axiosInstance.get(`/departments/${id}/teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeachers(response.data.data.users);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu giáo viên:', error);
      message.error('Không thể lấy thông tin giáo viên');
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    if (!token) {
      message.error('Bạn cần đăng nhập!');
      return;
    }
    try {
      const response = await axiosInstance.get(`/departments/${id}/students`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data.data.users);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu học sinh:', error);
      message.error('Không thể lấy thông tin học sinh');
    }
  };

  // Combine teachers and students
  useEffect(() => {
    setCombinedData([
      ...teachers.map((teacher) => ({ ...teacher, role: 'Teacher' })),
      ...students.map((student) => ({ ...student, role: 'Student' })),
    ]);
  }, [teachers, students]);

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
  }, [token]);

  return (
    <div>
      <SiderLayout style={{ minHeight: '100vh' }}>
        <Layout.Content>
          <Table dataSource={combinedData} rowKey="id">
            {/* <Column title="Id" dataIndex="id" key="id" /> */}
            <Column title="First Name" dataIndex="first_name" key="first_name" />
            <Column title="Last Name" dataIndex="last_name" key="last_name" />
            <Column title="Gender" dataIndex="gender" key="gender" />
            <Column
              title="Role"
              dataIndex="role"
              key="role"
              render={(role) => (role === 'Teacher' ? 'teacher' : 'student')}
            />
            <Column
              title="DOB"
              dataIndex="dob"
              key="dob"
              render={(dob) => (dob ? moment(dob).format('DD/MM/YYYY') : 'N/A')}
            />
          </Table>
        </Layout.Content>
      </SiderLayout>
    </div>
  );
}

export default ClassOfDepartment;
