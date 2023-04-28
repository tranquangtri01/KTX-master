import { Button, Card, Col, Image, message, PageHeader, Row } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";
import ImageBg from "../../../../assets/img/welcome.svg";


export default function RoomDetail() {
  const [room, setRoom] = useState([]);
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(URL + "room/" + id);
        setRoom(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}room/${id}`);
      message.success(`Xóa thành công`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <Card className="mh-500">
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <PageHeader
            className="site-page-header pr-0 pl-0"
            onBack={() => history.goBack()}
            title="Quay lại"
          />
        </Flex>

        <Flex className="mb-1" mobileFlex={false}>
          <Button
            className="mr-2"
            type="primary"
            danger
            onClick={() => handleDelete(id)}
          >
            Xóa
          </Button>
          <Link to={"/app/room/edit/" + id}>
            <Button type="primary" block>
              Sửa
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Row  >
        <Col span={18}>
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
        <Col span={6} className="bottom-img">
          <Image src={ImageBg} preview={false} />
        </Col>
      </Row>
    </Card>
  );
}
