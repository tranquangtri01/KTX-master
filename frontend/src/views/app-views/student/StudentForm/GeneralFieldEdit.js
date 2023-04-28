import React from "react";
import { Input, Row, Col, Card, Form, Select, DatePicker } from "antd";
import moment from "moment";
import UploadImage from "components/shared-components/UploadImage";

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

const GeneralFieldEdit = (props) => {
  const { student } = props;

  let dob = new Date(student[0].dob * 1000);

  var year = dob.getFullYear();
  var month = dob.getMonth() + 1;
  var date = dob.getDate();

  var time = date + "/" + month + "/" + year;

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Thông tin chi tiết">
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <Form.Item
                name="name"
                label="Tên sinh viên"
                initialValue={student[0].name}
                rules={rules.name}
              >
                <Input defaultValue={student[0].name} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="studentID"
                label="Mã sinh viên"
                rules={rules.studentID}
                initialValue={student[0].studentID}
              >
                <Input defaultValue={student[0].studentID} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="class"
                label="Lớp"
                rules={rules.class}
                initialValue={student[0].class}
              >
                <Input defaultValue={student[0].class} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="sex"
                label="Giới tính"
                rules={rules.sex}
                initialValue={student[0].sex}
              >
                <Select className="w-100" defaultValue={student[0].sex}>
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
              <Form.Item name="dob" label="Ngày sinh" rules={rules.dob}  initialValue={moment(time, dateFormat)}>
                <DatePicker
                  format={dateFormat}
                  className="w-100"
                  placeholder="Chọn ngày sinh"
                  defaultValue={moment(time, dateFormat)}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="cccd"
                label="Căn cước công dân"
                rules={rules.cccd}
                initialValue={student[0].cccd}
              >
                <Input defaultValue={student[0].cccd} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={rules.email}
                initialValue={student[0].email}
              >
                <Input defaultValue={student[0].email} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={rules.phone}
                initialValue={student[0].phone}
              >
                <Input defaultValue={student[0].phone} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="hometown"
                label="Quê quán"
                rules={rules.hometown}
                initialValue={student[0].hometown}
              >
                <Input defaultValue={student[0].hometown} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="note"
                label="Ghi chú"
                rules={rules.note}
                initialValue={student[0].note}
              >
                <Input.TextArea rows={4} defaultValue={student[0].note} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Ảnh">
          <UploadImage
            uploadedImg={student[0].img}
            setImage={props.setImage}
          />
        </Card>
        <Card title="Tài khoản">
          <Form.Item name="password" label="Mật khẩu" initialValue={student[0].password} rules={rules.password}>
            <Input.Password  defaultValue={student[0].password} />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralFieldEdit;
