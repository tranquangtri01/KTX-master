import React from "react";
import { Input, Row, Col, Card, Form } from "antd";

const rules = {
  name: [
    {
      required: true,
      message: "Hãy nhập tên tòa nhà",
    },
  ],
  description: [
    {
      required: false,
    },
  ],
};

const GeneralField = () => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Thông tin chi tiết">
          <Form.Item name="name" label="Tên tòa nhà" rules={rules.name}>
            <Input placeholder="Toàn nhà" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={rules.description}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Card>
      </Col>
      
    </Row>
  );
};

export default GeneralField;
