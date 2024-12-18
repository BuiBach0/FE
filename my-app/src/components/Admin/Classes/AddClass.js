import { DownOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Space,
  Table,
  Popconfirm,
  message,
  InputNumber,
  Dropdown,
  Typography,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";

import SiderLayout from "../Menu/SiderLayout";
import axiosInstance from "../../../Helper/AxiosInstance";

function AddClass() {
  const [form] = Form.useForm(); // Khởi tạo form instance
  const [departmentId, setDepartmentID] =useState([])
  const [teacherId, setTeacherId] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "attendance",
      weight: "10",
    },
    {
      key: "1",
      name: "midterm",
      weight: "30",
    },
    {
      key: "2",
      name: "final",
      weight: "60",
    },
  ]);
  const calculateTotalWeight = () => {
    return dataSource.reduce((sum, item) => sum + parseInt(item.weight, 10), 0);
  };
  const token = localStorage.getItem("access");
  const [count, setCount] = useState(3);
  const [data, setData] = useState(null); // Biến để lưu trữ dữ liệu từ endpoint
  // Sử dụng useEffect để fetch data khi component mount
  const getDepartmentId =  async () => {
    const departmentName =  await axiosInstance.get("/departments",{
      headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token trong headers
          },
    });
    if (departmentName.code === 200)
     
     console.log(departmentId,'aaaaaaaaa');
      setDepartmentID(departmentName.data?.data?.map((e) => ({value: e?.id, label: e?.name})))
  }
  const getTeachers = async () => {
    try {
      const teacher = await axiosInstance.get("/users/all",{
        headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token nếu cần thiết
      },
      });
    if (teacher.status === 200) {
      
      // Lọc chỉ những người dùng có role là giáo viên
      setTeacherId(teacher.data?.data?.map((e) => ({value: e?.id, label: e?.first_name})))
      const teachers = teacher.data.data.filter(user => user.role?.name === "teacher");
      console.log("Danh sách giáo viên:", teachers);
      setTeacherId(
        teachers.map((teacher) => ({
          value: teacher.id,
          label: teacher.first_name,
        }))
      );
      
      
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách giáo viên:", error);
    
  }
  };
  console.log(teacherId,'0000000000000000');
  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access"); // Lấy token từ localStorage
      try {
        const response = await axiosInstance.post(
          "/classes/create-class",
          {
            // Có thể thêm dữ liệu vào đây nếu cần thiết
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, []); // Chỉ chạy khi component mount
  useEffect(() => {
    getDepartmentId ()
    getTeachers()
  },[] );
  // Hàm để xử lý việc thêm lớp học
  const handleSubmit = async (values) => {
    const totalWeight = calculateTotalWeight();
    if (totalWeight > 100) {
      message.error("Tổng giá trị của bảng điểm không được vượt quá 100.");
      return; // Dừng lại nếu tổng weight vượt quá 100
    }

    // Phần code lưu dữ liệu vào API
    const token = localStorage.getItem("access");
    try {
      const newClass = {
        name: values.name,
        quantity: parseInt(values.quantity, 10),
        teacherId: parseInt(values.teacherId, 10),
        start_date: values.start_date,
        end_date: values.end_date,
        departmentId: parseInt(values.departmentId, 10),
        grade_details: dataSource,
      };

      const response = await axiosInstance.post(
        "/classes/create-class",
        newClass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Thêm lớp học thành công!");
        form.resetFields();
      } else {
        message.error("Thêm lớp học thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm lớp học:", error);
      message.error("Có lỗi xảy ra khi thêm lớp học.");
    }
  };
  console.log(departmentId, "-----------------------");
  console.log(data,'========================');
  
  // Hàm để thêm hàng mới vào bảng
  const handleAdd = () => {
    const newData = {
      key: count,
      name: "New Grade",
      weight: "0",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  // Hàm để xóa hàng khỏi bảng
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} là bắt buộc.`,
            },
            dataIndex === "weight" && {
              type: "number",
              max: 99,
              message: "Giá trị không được vượt quá 99",
            },
          ].filter(Boolean)} // Lọc các giá trị `null` khi dataIndex là "name"
        >
          {dataIndex === "name" ? (
            <Input ref={inputRef} onPressEnter={save} onBlur={save} /> // Dùng Input cho cột "name"
          ) : (
            <InputNumber
              ref={inputRef}
              min={1}
              max={99}
              onPressEnter={save}
              onBlur={save}
            /> // Dùng InputNumber cho cột "weight"
          )}
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingInlineEnd: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    // Cập nhật bảng với giá trị mới
    setDataSource(newData);

    // Kiểm tra tổng weight
    const totalWeight = calculateTotalWeight();
    if (totalWeight > 100) {
      message.error("Tổng giá trị của bảng điểm không được vượt quá 100.");
    }
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const defaultColumns = [
    {
      title: "Loại điểm",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Phần trăm (%)",
      dataIndex: "weight",
      width: "30%",
      editable: true,
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = defaultColumns.map((col) => {
    
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <SiderLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#001529",
          color: "#fff",
          textAlign: "center",
          padding: 0,
        }}
      >
        <h1>Add Classes</h1>
      </Header>
      <Content>
        <Row style={{ height: "calc(100vh - 64px)" }}>
          <Content className="content" style={{ background: "#F0F4F8" }}>
            <div className="detail-section" style={{ background: "#F0F4F8" }}>
              <h3>Thêm lớp học</h3>
              <Form form={form} onFinish={handleSubmit} layout="vertical">
                <Row gutter={90}>
                  <Col span={8}>
                    <Form.Item label="Class Name" name="name">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Quantity" name="quantity">
                      <Input type="number" min={1} max={88} />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Teacher ID" name="teacherId">
                    <Select
                        showSearch
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={
                          teacherId
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={90}>
                  <Col span={8}>
                    <Form.Item label="Start Date" name="start_date">
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="End Date" name="end_date">
                      <Input type="date" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Department ID" name="departmentId">
                      <Select
                        showSearch
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        options={
                          departmentId
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                  />
                  <Button
                    onClick={handleAdd}
                    type="primary"
                    style={{ marginTop: "20px" }}
                  >
                    Thêm loại điểm
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Lưu
                    </Button>
                    <Button type="default">
                      <NavLink to="/AddProfile">Thoát</NavLink>
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Row>
      </Content>
    </SiderLayout>
  );
}

export default AddClass;
