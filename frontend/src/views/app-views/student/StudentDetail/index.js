import { Button, Card, Col, message, PageHeader, Row, Typography } from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export default function CampusDetail() {
  const [campus, setCampus] = useState([]);
  let { id } = useParams();
  let history = useHistory();
  const { Title } = Typography;

  useEffect(() => {
    const fetchCampus = async () => {
      try {
        const res = await axios.get(URL + "student/" + id);
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
      await axios.delete(`${URL}student/${id}`);
      message.success(`Xóa thành công`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  const converDate = (item)=>{
    let dob = new Date(item * 1000);

    var year = dob.getFullYear();
    var month = dob.getMonth() + 1;
    var date = dob.getDate();
    
    var time = date + '/' + month + '/' + year  ;
    return <div>{time}</div>
  }

  return (
    <>
      <Card className="card-p0">
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
            <Link to={"/app/student/edit/" + id}>
              <Button type="primary" block>
                Sửa
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Card>

      <Row className="profile" gutter={[20, 20]}>
        <Col span={8}>
          <Card>
            <div className="profile-card pt-4 d-flex flex-column align-items-center">
              <img
                src={campus.length && campus[0].img}
                alt="Profile"
                className="rounded-circle"
              />
              <h2>{campus.length && campus[0].name}</h2>
              <h3>Sinh viên</h3>
              <div className="social-links mt-2">
                <a href="/#">
                  <FacebookOutlined />
                </a>
                <a href="/#">
                  <TwitterOutlined />
                </a>
                <a href="/#">
                  <InstagramOutlined />
                </a>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <div
              className="tab-pane fade show active profile-overview"
              id="profile-overview"
            >
              
              <Title className="mb-3" level={4}>Thông tin chi tiết</Title>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Họ và tên
                </Col>
                <Col span={18}>{campus.length && campus[0].name}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Mã sinh viên
                </Col>
                <Col span={18}>{campus.length && campus[0].studentID}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Lớp
                </Col>
                <Col span={18}>{campus.length && campus[0].class}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Giới tính
                </Col>
                <Col span={18}>{campus.length &&  campus[0].sex.toString()  ==="0" ? "Nam": "Nữ"}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Ngày sinh
                </Col>
                <Col span={18}>{campus.length && converDate(campus[0].dob)}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Căn cước công dân
                </Col>
                <Col span={18}>{campus.length && campus[0].cccd}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Email
                </Col>
                <Col span={18}>{campus.length && campus[0].email}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Số điện thoại
                </Col>
                <Col span={18}>{campus.length && campus[0].phone}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 20]}>
                <Col span={6} className="label">
                  Quê quán
                </Col>
                <Col span={18}>{campus.length && campus[0].hometown}</Col>
              </Row>
              <Row className="mb-3" gutter={[20, 5]}>
                <Col span={24} className="label">
                  Ghi chú
                </Col>
                <Col span={24}>
                <p className="small fst-italic">
                
                {campus.length && campus[0].name}
              </p>
                </Col>
              </Row>
             
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
