import React from 'react';
import { Form, Row, Col } from 'antd';
import dayjs from 'dayjs';

const DetailSection = ({ data }) => (
  <div className="detail-section">
    <h3>Thông tin chi tiết</h3>
    <Form layout="vertical">
      <Row gutter={90}>
        <Col span={8}>
          <Form.Item label="First Name">
            <p>{data?.first_name}</p>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Last Name">
            <p>{data?.last_name}</p>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Gender">
            <p>{data?.gender}</p>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={90}>
        <Col span={8}>
          <Form.Item label="Date Of Birthday">
            <p>{data?.dob ? dayjs(data.dob).format("YYYY-MM-DD") : "N/A"}</p>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Address">
            <p>{data?.address}</p>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Role">
            <p>{data?.role?.name}</p>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </div>
);

export default DetailSection;
