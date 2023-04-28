import {
  Card,
  Col,
  PageHeader,
  Row,
  Table,
} from "antd";
import Flex from "components/shared-components/Flex";
import React, { useEffect, useState } from "react";

import { URL } from "utils/url";
import axios from "axios";

let sid = window.localStorage.getItem("sid");

export default function RoomRelatives() {
  const [list, setList] = useState([]);
  const [ setIsRegisted] = useState(false)

 

  const fetchAllRegister = async () => {
    let sid = window.localStorage.getItem("sid");
    
    try {
      const res = await axios.get(URL + "other/roomRelative", {
        params: { id: sid },
      });
      setList(res.data);
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
    fetchAllRegister();
  }, );

  const tableColumns = [
    {
      title: "STT",
      dataIndex: "id",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Người đăng ký",
      dataIndex: "name",
    },
    {
      title: "MSV",
      dataIndex: "studentID",
    },
    {
      title: "SDT",
      dataIndex: "phone",
    },
  ];

  return (
    <>
      <Card className="card-p0 bg-white">
        <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <PageHeader
              className="site-page-header pr-0 pl-0"
              title="Thông tin bạn cùng phòng"
            />
          </Flex>
        </Flex>
      </Card>
      <Row className="profile" gutter={[20, 20]}>
        <Col span={24}>
          <Card className="card-p0 bg-white">
            <div className="table-responsive">
              <Table columns={tableColumns} dataSource={list} rowKey="id" />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
