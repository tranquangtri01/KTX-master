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

const GeneralFieldEdit = (props) => {
  const { campus } = props;
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Thông tin chi tiết">
          <Form.Item name="name" label="Tên tòa nhà" rules={rules.name} initialValue={campus[0].name}>
            <Input placeholder="Toàn nhà" defaultValue={campus[0].name} />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={rules.description} initialValue={campus[0].description}>
            <Input.TextArea rows={4} defaultValue={campus[0].description} />
          </Form.Item>
        </Card>
      </Col>
      
    </Row>
  );
};

export default GeneralFieldEdit;
