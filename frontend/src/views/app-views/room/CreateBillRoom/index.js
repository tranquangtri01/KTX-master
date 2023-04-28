import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  PageHeader,
  Row,
} from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";

import moment from "moment";



export default function CreateBillRoom() {
  const [room, setRoom] = useState([]);
  const [config, setConfig] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [manager, setManager] = useState([]);
  let { id } = useParams();
  let history = useHistory();
  const [form] = Form.useForm();

  const fetchRoom = async () => {
    try {
      const res = await axios.get(URL + "room/" + id);
      setRoom(res.data);
      fetchRoomType(res.data[0].roomTypeID);
      fetchManager(res.data[0].id);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchManager = async (sid) => {
    try {
      const res = await axios.get(URL + "other/getManagerCamp", {
        params: { id: sid },
      });

      setManager(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRoomType = async (rid) => {
    try {
      const res = await axios.get(URL + "room-type/" + rid);
      setRoomType(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await axios.get(URL + "other/settings-price");
      setConfig(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRoom();
    fetchConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(manager, "manager");

  const onFinish = async () => {
    let currentMonth = moment().month() + 1;
    let billName =
      "Hóa đơn thanh toán " + room[0].name + " tháng " + currentMonth;
    const dateNow = moment().unix();

    let studentList = room[0].studentList.split(",");
    // ,room.electric
    let waterNum =
      parseFloat(form.getFieldValue("waterNum")) - parseFloat(room[0].water);
    let elecNum =
      parseFloat(form.getFieldValue("elecNum")) - parseFloat(room[0].electric);
    console.log("ROOM", manager[0].managerID);

    if ( waterNum >= 0 && elecNum >= 0) {
      let roomEdit = {
        water: form.getFieldValue("waterNum"),
        elecNum: form.getFieldValue("elecNum"),
      };
      for (let i = 0; i < studentList.length; i++) {
        const element = studentList[i];
        let bill = {
          name: billName,
          waterNum: parseFloat(waterNum) / studentList.length ,
          elecNum:  parseFloat(elecNum) / studentList.length,
          date: dateNow,
          roomID: room[0].id,
          waterPrice: config[0].waterPrice,
          elecPrice: config[0].electricPrice,
          roomPrice: roomType[0].price,
          managerID: manager[0].managerID,
          studentID: element,
        };
        try {
          await axios.post(URL + "bill", bill);
          message.success(`Tạo thành công hóa đơn`);
        } catch (err) {
          message.error(`Tạo thất bại`);
        }
      }
      try {
        await axios.put(URL + "room/" + id, roomEdit, {
          params: { editWS: true },
        });
      } catch (err) {
        message.error(`Tạo thất bại`);
      }
      history.goBack();
    } else {
      message.error(`Tạo thất bại`);
    }
  };

  // const aaaa = [
  //   {
  //     img: "/img/avatars/thumb-2.jpg",
  //     title: "Khóa 14 CNTT",
  //     name: "Terrance Moreno",
  //   },
  //   {
  //     img: "/img/avatars/thumb-3.jpg",
  //     title: "Khóa 14 CNTT",
  //     name: "Ron Vargas",
  //   },
  //   {
  //     img: "/img/avatars/thumb-4.jpg",
  //     title: "Khóa 14 CNTT",
  //     name: "Luke Cook",
  //   },
  // ];

  return (
    <Card className="mh-500">
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <PageHeader
            className="site-page-header pr-0 pl-0"
            onBack={() => history.goBack()}
            title="Hóa đơn chi tiết phòng"
          />
        </Flex>

        <Flex className="mb-1" mobileFlex={false}>
          <Button
            className="mr-2"
            type="primary"
            danger
            // onClick={() => handleDelete(id)}
          >
            Hủy
          </Button>
          <Button type="primary" onClick={() => onFinish()}>
            Lưu
          </Button>
        </Flex>
      </Flex>
      <Row>
        <Col span={10}>
          <div className="detail">
            <div className="detail-overview">
              <h5 className="card-title ant-card-head-title">
                Thông tin chi tiết
              </h5>

              <Row className="detail-row" gutter={[20, 20]}>
                <Col offset={1} span={6}>
                  <div className="label ">Tên phòng</div>
                </Col>
                <Col span={17}>
                  <div>{room.length && room[0].campusName}</div>
                </Col>
                <Col offset={1} span={6}>
                  <div className="label ">Tên tòa nhà</div>
                </Col>
                <Col span={17}>
                  <div>{room.length && room[0].name}</div>
                </Col>
                <Col offset={1} span={6}>
                  <div className="label ">Loại phòng</div>
                </Col>
                <Col span={17}>
                  <div>{room.length && room[0].roomName}</div>
                </Col>
                <Col offset={1} span={6}>
                  <div className="label ">Số điện (tháng trước)</div>
                </Col>
                <Col span={17}>
                  <div>{room.length && room[0].electric}</div>
                </Col>
                <Col offset={1} span={6}>
                  <div className="label ">Số nước (tháng trước)</div>
                </Col>
                <Col span={17}>
                  <div>{room.length && room[0].water}</div>
                </Col>
                <Col offset={1} span={6}>
                  <div className="label ">Số lượng sinh viên hiện tại</div>
                </Col>
                <Col span={17}>
                  <div>{room.length && room[0].currentNum}</div>
                </Col>
                <Col offset={1} span={23}>
                  {/* <div className="label ">Danh sách sinh viên hiện tại:</div>

                  <div className="mt-3">
                    {aaaa.map((elm, i) => (
                      <div
                        key={i}
                        className={`d-flex align-items-center justify-content-between mb-1 ml-5`}
                      >
                        <AvatarStatus
                          id={i}
                          src={elm.img}
                          name={elm.name}
                          subTitle={elm.title}
                        />
                      </div>
                    ))}
                  </div> */}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className="detail w-100">
            <div className="detail-overview">
              <h5 className="card-title ant-card-head-title">
                Thông tin điện nước
              </h5>
            </div>
          </div>
          <Form
            layout="vertical"
            form={form}
            name="create_bill"
            className="ant-advanced-search-form w-100"
          >
            <Form.Item name="elecNum" label="Số điện" required>
              <Input placeholder="Số điện" />
            </Form.Item>
            <Form.Item name="waterNum" label="Số nước" required>
              <Input placeholder="Số nước" />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
}
