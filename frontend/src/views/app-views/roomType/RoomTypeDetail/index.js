import { Button, Card, Col, message, PageHeader, Row } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";
export default function RoomTypeDetail() {
  const [roomType, setRoomType] = useState([]);
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    const fetchRoomType = async () => {
      try {
        const res = await axios.get(URL + "room-type/" + id);
        setRoomType(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRoomType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}room-type/${id}`);
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
          <Link to={"/app/room-type/edit/" + id}>
            <Button type="primary" block>
              Sửa
            </Button>
          </Link>
        </Flex>
      </Flex>
      <div className="detail">
        <div className="detail-overview">
          <h5 className="card-title ant-card-head-title">Thông tin chi tiết</h5>
          <Row className="detail-row">
            <Col offset={2} span={4}>
              <div className="label ">Tên loại phòng</div>
            </Col>
            <Col span={18}>
              <div>{roomType.length && roomType[0].name}</div>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col offset={2} span={4}>
              <div className="label ">Số lượng</div>
            </Col>
            <Col span={18}>
              <div>{roomType.length && roomType[0].quality}</div>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col offset={2} span={4}>
              <div className="label ">Giá</div>
            </Col>
            <Col span={18}>
              <div>{roomType.length && roomType[0].price}</div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
}
