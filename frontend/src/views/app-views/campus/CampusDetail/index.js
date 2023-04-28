import { Button, Card, Col, message, PageHeader, Row } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";
export default function CampusDetail() {
  const [campus, setCampus] = useState([]);
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(URL + "campus/" + id);
        setCampus(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}campus/${id}`);
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
          <Link to={"/app/campus/edit/" + id}>
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
              <div className="label ">Tên tòa nhà</div>
            </Col>
            <Col span={18}>
              <div>{campus.length && campus[0].name}</div>
            </Col>
          </Row>
          <Row className="detail-row">
            <Col offset={2} span={4}>
              <div className="label ">Mô tả</div>
            </Col>
            <Col span={18}>
              <div>{campus.length && campus[0].description}</div>
            </Col>
          </Row>
        </div>
      </div>
    </Card>
  );
}
