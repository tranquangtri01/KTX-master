import React, { useEffect, useState } from "react";
import { Input, Row, Col, Card, Form, Select } from "antd";
import axios from "axios";
import { URL } from "utils/url";

const rules = {
  name: [
    {
      required: true,
      message: "Hãy nhập tên tòa nhà",
    },
  ],
  roomType: [
    {
      required: true,
    },
  ],
  campus: [
    {
      required: true,
    },
  ],
};

const { Option } = Select;

const GeneralFieldEdit = (props) => {
  const {room} = props;
  const [list, setList] = useState([]);
  const [roomType, setRoomType] = useState([])

  const fetchAllCampus = async () => {
    try {
      const res = await axios.get(URL + "campus");
      setList(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllRomeType = async () => {
    try {
      const res = await axios.get(URL + "room-type");
      setRoomType(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCampus();
    fetchAllRomeType();
  }, []);
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Thông tin chi tiết">
          <Form.Item name="name" label="Tên phòng" rules={rules.name} initialValue={room[0].name}>
            <Input defaultValue={room[0].name}  />
          </Form.Item>
          <Form.Item name="campus" label="Cơ sở quản lý" rules={rules.campus} initialValue={room[0].campusID}>
            <Select className="w-100"  defaultValue={room[0].campusID} >
              {list.length &&
                list.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="roomType" label="Loại phòng" rules={rules.campus} initialValue={room[0].roomTypeID}>
            <Select className="w-100"  defaultValue={room[0].roomTypeID} >
              {roomType.length &&
                roomType.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={rules.description}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralFieldEdit;
