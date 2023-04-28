import React from "react";
import { Input, Row, Col, Card, Form, InputNumber } from "antd";

const rules = {
  name: [
    {
      required: true,
      message: "Hãy nhập tên loại phòng",
    },
  ],
  price: [
    {
      required: true,
      message: "Hãy nhập giá loại phòng",
    },
  ],
  quality: [
    {
      required: true,
      message: "Hãy nhập số lượng của loại phòng",
    },
  ],
};

const GeneralFieldEdit = (props) => {
  const { roomType } = props;
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Thông tin chi tiết">
          <Form.Item
            name="name"
            label="Tên loại phòng"
            rules={rules.name}
            initialValue={roomType[0].name}
          >
            <Input
              placeholder="Tên loại phòng"
              defaultValue={roomType[0].name}
            />
          </Form.Item>
          <Form.Item
            name="quality"
            label="Số lượng người trong phòng"
            rules={rules.quality}
            initialValue={roomType[0].quality}
          >
            <InputNumber
              style={{ width: "100%" }}
              defaultValue={roomType[0].quality}
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá cả"
            rules={rules.price}
            initialValue={roomType[0].price}
          >
            <InputNumber
              style={{ width: "100%" }}
              defaultValue={roomType[0].price}
            />
          </Form.Item>
        </Card>
      </Col>
      
    </Row>
  );
};

export default GeneralFieldEdit;
