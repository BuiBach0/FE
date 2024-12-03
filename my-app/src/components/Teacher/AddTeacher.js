import React, { useEffect, useState } from "react";
import {
  Layout,
  Avatar,
  Form,
  Input,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
  Upload,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../../Helper/AxiosInstance";
import SiderLayout from "../Admin/Menu/SiderLayout";

function AddTeacher() {
  const [form] = Form.useForm();
  const [role, setRole] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [departmentId, setDepartmentID] = useState([]);
  const token = localStorage.getItem("access");
  const getAuthConfig = () => {
    const token =
      localStorage.getItem("access") || "your-fallback-bearer-token";
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const getRoler = async () => {
    const config = getAuthConfig();
    const userRole = await axiosInstance.get("/role", config);
    if (userRole.data?.code === 200) {
      setRole(
        userRole.data?.data?.map((e) => ({
          value: e?.id,
          label: e?.name,
        }))
      );
    }
  };
  const getDepartmentId = async () => {
    const departmentName = await axiosInstance.get("/departments", {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token trong headers
      },
    });
    if (departmentName.code === 200) console.log(departmentId, "aaaaaaaaa");
    setDepartmentID(
      departmentName.data?.data?.map((e) => ({ value: e?.id, label: e?.name }))
    );
  };
  useEffect(() => {
    getRoler();
    getDepartmentId();
  }, []);

  // Hàm gửi dữ liệu form và file lên server
  const handleSubmit = async (values) => {
    const token = localStorage.getItem("access");

    // Tạo FormData để gửi file và dữ liệu
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("username", values.username);
    formData.append("password", values.password);
    formData.append("address", values.address);
    formData.append("gender", values.gender);
    formData.append("dob", values.dob);
    formData.append("departmentId", values.departmentId);
    formData.append("roleId", values.role);

    // Thêm file ảnh vào formData (nếu có)
    if (fileList.length > 0) {
      formData.append("file", fileList[0].originFileObj);
    }

    try {
      const response = await axiosInstance.post(
        "/users/create-user",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Đảm bảo gửi dữ liệu dạng multipart
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        message.success("Thêm người dùng thành công!");
        form.resetFields(); // Reset form
        setFileList([]); // Reset fileList
      } else {
        message.error("Thêm người dùng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm người dùng:", error);
      message.error("Có lỗi xảy ra khi thêm người dùng.");
    }
  };

  // Hàm cập nhật file khi thay đổi
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <SiderLayout>
      <Content>
        <Row style={{ height: "calc(100vh - 64px)" }}>
          <Col span={6} style={{ backgroundColor: "#ECF0F1", padding: "20px" }}>
            <div
              className="profile-section"
              style={{ backgroundColor: "#BDC3C7" }}
            >
              <Avatar
                size={100}
                src={
                  fileList.length > 0
                    ? URL.createObjectURL(fileList[0].originFileObj)
                    : null
                }
                icon={!fileList.length && <UserOutlined />}
              />
              <h4>{/* {data?.first_name} {data?.last_name} */}</h4>
            </div>
          </Col>

          <Col
            span={18}
            style={{ backgroundColor: "#ECF0F1", padding: "20px" }}
          >
            <Content className="content">
              <div
                className="detail-section"
                style={{ backgroundColor: "#F0F4F8" }}
              >
                <h3>Thông tin chi tiết</h3>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                  <Row gutter={90}>
                    <Col span={8}>
                      <Form.Item label="First Name" name="first_name">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Last Name" name="last_name">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="User Name" name="username">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Password" name="password">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Address" name="address">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Gender" name="gender">
                        <Select
                          showSearch
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={[
                            { value: "nam", label: "Nam" },
                            { value: "nữ", label: "Nữ" },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={90}>
                    <Col span={8}>
                      <Form.Item label="Date Of Birthday" name="dob">
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label="Role" name="role">
                        <Select
                          showSearch
                          optionFilterProp="label"
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={role}
                        />
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
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          options={departmentId}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Upload hình ảnh */}
                  <Form.Item label="Upload Image" name="file">
                    <Upload
                      onChange={handleChange}
                      fileList={fileList}
                      beforeUpload={() => false} // Ngăn không cho tự động upload
                    >
                      <Button>Click to Upload</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item>
                    <div className="button-group">
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                      <Button type="default" className="cancel-button">
                        <NavLink to="/Menu">Exit</NavLink>
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Content>
          </Col>
        </Row>
      </Content>
    </SiderLayout>
  );
}

export default AddTeacher;
