import {
  Button,
  Card,
  Col,
  message,
  PageHeader,
  Row,
  Form,
  Select,
  Result,
} from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { URL } from "utils/url";
import axios from "axios";
import moment from "moment";

const { Option } = Select;
let sid = window.localStorage.getItem("sid");

export default function RoomRelatives() {
  const [room, setRoom] = useState([]);
  const [form] = Form.useForm();
  const [campus, setCampus] = useState([]);
  const [isRegisted, setIsRegisted] = useState(false);
  const [registerField, setRegisterField] = useState()

  const fetchAllCampus = async () => {
    try {
      const res = await axios.get(URL + "campus");
      setCampus(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const checkRegister = async () => {
    try {
      let res = await axios.get(URL + "other/checkRegister", {
        params: { id: sid },
      });

      console.log("DATA", res.data);
      if (res.data.length > 0) {
        setIsRegisted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkRegister();
    fetchAllCampus();
  }, []);

  const onFinish = async () => {
    const dateNow = moment().unix();
    const dateEnd = moment().add(6, "months").unix();

    const managerFilter = room.find(
      (item) =>
        item.campusID.toString() === form.getFieldValue("campus").toString()
    );

    let registerEdit = {
      studentID: sid,
      roomID: form.getFieldValue("roomID").toString(),
      isAccepted: "0",
      managerID: managerFilter.mid,
      dateRegister: dateNow,
      dateStart: dateNow,
      dateEnd: dateEnd,
    };
    try {
      await axios.post(URL + "student-register", registerEdit);
      message.success(`Tạo thành công`);
      form.resetFields();
      setIsRegisted(true);
      setRegisterField([registerEdit]);
    } catch (err) {
      message.success(`Tạo thất bại`);
    }
  };
  const fetchRIS = async (campus) => {
    try {
      const res = await axios.get(URL + "other/ris", {
        params: { campusID: campus },
      });
      let roomList = res.data.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === value.place && t.name === value.name
          )
      );
      setRoom(roomList);
    } catch (err) {
      console.log(err);
    }
  };

  const campusChange = (val) => {
    fetchRIS(val);
  };

  console.log(isRegisted);

  return (
    <>
      <Card className="card-p0 bg-white">
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <PageHeader
              className="site-page-header pr-0 pl-0"
              title="Đăng ký phòng"
            />
          </Flex>
        </Flex>
      </Card>
      <Row className="profile" gutter={[20, 20]}>
        <Col span={18}>
          {!isRegisted ? (
            <Card>
              <Form form={form} name="addForm" layout="vertical">
                <Form.Item name="campus" label="Tòa nhà">
                  <Select
                    className="w-100"
                    onChange={(val) => campusChange(val)}
                    showSearch
                    placeholder="Tòa nhà"
                  >
                    {campus &&
                      campus.map((elm) => (
                        <Option key={elm.id} value={elm.id}>
                          {elm.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item name="roomID" label="Phòng">
                  <Select className="w-100" showSearch placeholder="Sinh viên">
                    {room &&
                      room.map((elm, index) => {
                        return (
                          <Option key={index} value={elm.id}>
                            {elm.name} - {elm.rt}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Button type="primary" onClick={() => onFinish()}>
                  Đăng ký
                </Button>
              </Form>
            </Card>
          ) : (
            <>
              {registerField && registerField[0].isAccepted === "0" ? (
                <Result
                  status="404"
                  title="Đang chờ duyệt"
                  subTitle="Tài khoản đang chờ quản lý duyệt"
                />
              ) : (
                <Result
                  status="404"
                  title="Tài khoản đã đăng ký phòng"
                  subTitle="Tài khoản của bạn đã đăng ký phòng"
                />
              )}
            </>
          )}
        </Col>
        <Col span={6}></Col>
      </Row>
    </>
  );
}
