import React, { useEffect, useState } from "react";
import { Input, Row, Col, Card, Form, Select, DatePicker } from "antd";
import UploadImage from "components/shared-components/UploadImage";
import moment from "moment";
import axios from "axios";
import { URL } from "utils/url";

const rules = {
  name: [
    {
      required: true,
      message: "Hãy nhập tên quản lý",
    },
  ],
  managerID: [
    {
      required: true,
      message: "Hãy nhập mã quản lý",
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
  const { manager } = props;

  let dob = new Date(manager[0].dob * 1000);

  var year = dob.getFullYear();
  var month = dob.getMonth() + 1;
  var date = dob.getDate();

  var time = date + "/" + month + "/" + year;

  const [list, setList] = useState([]);
  const fetchAllCampus = async () => {
    try {
      const res = await axios.get(URL + "campus");
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCampus();
  }, []);
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Thông tin chi tiết">
          <Row gutter={16}>
            <Col sm={24} md={12}>
              <Form.Item
                name="name"
                label="Tên quản lý"
                rules={rules.name}
                initialValue={manager[0].managerName}
              >
                <Input defaultValue={manager[0].managerName} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="managerID"
                label="Mã quản lý"
                rules={rules.managerID}
                initialValue={manager[0].managerID}
              >
                <Input defaultValue={manager[0].managerID} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="sex"
                label="Giới tính"
                rules={rules.sex}
                initialValue={manager[0].sex}
              >
                <Select className="w-100" defaultValue={manager[0].sex}>
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
              <Form.Item
                name="dob"
                label="Ngày sinh"
                rules={rules.dob}
                initialValue={moment(time, dateFormat)}
              >
                <DatePicker
                  format={dateFormat}
                  className="w-100"
                  placeholder="Chọn ngày sinh"
                  defaultValue={moment("01/01/1980", dateFormat)}
                />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={rules.email}
                initialValue={manager[0].email}
              >
                <Input defaultValue={manager[0].email} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={rules.phone}
                initialValue={manager[0].phone}
              >
                <Input defaultValue={manager[0].phone} />
              </Form.Item>
            </Col>
            <Col sm={24} md={12}>
              <Form.Item
                name="campus"
                label="Cơ sở quản lý"
                rules={rules.campus}
                initialValue={manager[0].campusID}
              >
                <Select className="w-100" defaultValue={manager[0].campusID}>
                  {list.length &&
                    list.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Ảnh">
          <UploadImage setImage={props.setImage} uploadedImg={manager[0].img} />
        </Card>
        <Card title="Tài khoản">
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={rules.password}
            initialValue={manager[0].password}
          >
            <Input.Password defaultValue={manager[0].password} />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralFieldEdit;
