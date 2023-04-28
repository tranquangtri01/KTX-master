import React from "react";
import { Input, Row, Col, Card, Form, Select, DatePicker } from "antd";
import UploadImage from "components/shared-components/UploadImage";
import moment from "moment";

const rules = {
  name: [
    {
      required: true,
      message: "Hãy nhập tên sinh viên",
    },
  ],
  studentID: [
    {
      required: true,
      message: "Hãy nhập mã sinh viên",
    },
  ],
  class: [
    {
      required: true,
      message: "Hãy nhập lớp",
    },
  ],
  sex: [
    {
      required: true,
      message: "Hãy nhập giới tính",
    },
  ],
  dob: [
    {
      required: true,
      message: "Hãy nhập ngày sinh",
    },
  ],
};

const dateFormat = "DD/MM/YYYY";
const { Option } = Select;

const GeneralField = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Thông tin chi tiết">
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <Form.Item name="name" label="Tên sinh viên" rules={rules.name}>
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="studentID"
                label="Mã sinh viên"
                rules={rules.studentID}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="class" label="Lớp" rules={rules.class}>
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="sex" label="Giới tính" rules={rules.sex}>
                <Select className="w-100">
                  <Option key={"0"} value={"0"}>
                    Nam
                  </Option>
                  <Option key={"1"} value={"1"}>
                    Nữ
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="dob" label="Ngày sinh" rules={rules.dob}>
                <DatePicker
                  format={dateFormat}
                  className="w-100"
                  placeholder="Chọn ngày sinh"
                  defaultValue={moment("01/01/2000", dateFormat)}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="cccd"
                label="Căn cước công dân"
                rules={rules.cccd}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="email" label="Email" rules={rules.email}>
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="phone" label="Số điện thoại" rules={rules.phone}>
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="hometown"
                label="Quê quán"
                rules={rules.hometown}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item name="note" label="Ghi chú" rules={rules.note}>
                <Input.TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Ảnh">
          <UploadImage setImage={props.setImage} />
        </Card>
        <Card title="Tài khoản">
          <Form.Item name="password" label="Mật khẩu" rules={rules.password}>
            <Input.Password />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
