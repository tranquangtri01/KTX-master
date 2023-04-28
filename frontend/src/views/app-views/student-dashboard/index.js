import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  List,
} from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";

import {
  
} from "./DefaultDashboardData";

import {
  // FileExcelOutlined,
  // PrinterOutlined,
  // PlusOutlined,
  // EllipsisOutlined,
  // StopOutlined,
  // ReloadOutlined,
  // MessageOutlined,
  // LikeOutlined,
  // StarOutlined,
} from "@ant-design/icons";

import { URL, URL_STRAPI, URL_STRAPI_IMG } from "utils/url";
import axios from "axios";



// const memberChartOption = {
//   ...apexLineChartDefaultOption,
//   ...{
//     chart: {
//       sparkline: {
//         enabled: true,
//       },
//     },
//     colors: [COLOR_2],
//   },
// };

export default function Home() {
 
  const [roomCount, setRoomCount] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [billTotalCount, setBillTotalCount] = useState([]);
  const [notification, setNotification] = useState([]);


  const fetchNotifications = async () => {
    try {
      const res = await axios.get(URL_STRAPI + "notifications?populate=deep,5");
      setNotification(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchRoomCount = async () => {
    try {
      const res = await axios.get(URL + "statistic/room-count");
      setRoomCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchStudentCount = async () => {
    try {
      const res = await axios.get(URL + "statistic/student-count");
      setStudentCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBillTotalCount = async () => {
    try {
      const res = await axios.get(URL + "statistic/billmoney-count");
      setBillTotalCount(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(notification, "notification");
  useEffect(() => {
    fetchNotifications();
    fetchRoomCount();
    fetchStudentCount();
    fetchBillTotalCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const moneyChange = (money) => {
    var formatter = new Intl.NumberFormat("vi").format(money);
    return formatter;
  };
  let annualStatisticData = [
    {
      title: "Tổng số phòng",
      value: roomCount.length > 0 ? roomCount[0].count : "0",
    },
    {
      title: "Tổng số sinh viên hệ thống",
      value: studentCount.length > 0 ? studentCount[0].count : "0",
    },
    {
      title: "Tổng số tiền thu",
      value:
        billTotalCount.length > 0
          ? moneyChange(
              parseInt(billTotalCount[0].waterTotal) +
                parseInt(billTotalCount[0].elecTotal) +
                parseInt(billTotalCount[0].roomPrice)
            )
          : "0",
    },
  ];

  // console.log(r, "roomCount");
  return (
    <div className="position-relative">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            {annualStatisticData.map((elm, i) => (
              <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                <StatisticWidget
                  title={elm.title}
                  value={elm.value}
                  status={elm.status}
                  subtitle={elm.subtitle}
                />
              </Col>
            ))}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Card>
                <h2>Thông báo mới nhất</h2>
                {notification.length > 0 && (
                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={notification}
                    renderItem={(item) => (
                      <List.Item
                        key={item.id}
                        extra={
                          <img
                            width={272}
                            alt="logo"
                            src={
                              URL_STRAPI_IMG +
                              item.attributes.Preview.data.attributes.formats
                                .medium.url
                            }
                          />
                        }
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={
                                "https://www.w3schools.com/howto/img_avatar.png"
                              }
                            />
                          }
                          title={"Trần Quang Trí"}
                          description={"Quản trị viên"}
                        />
                        <h5>{item.attributes.Title}</h5>
                        <span className="text-3-line">
                          {item.attributes.Content}
                        </span>
                      </List.Item>
                    )}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <Card>
            <h2 className="mb-5">Liên kết khác</h2>
            <a href="http://spktvinh.edu.vn/" className="lk-other mt-3 mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/C%E1%BB%95ng_tr%C6%B0%E1%BB%9Dng_%C4%91%E1%BA%A1i_h%E1%BB%8Dc_s%C6%B0_ph%E1%BA%A1m_k%E1%BB%B9_thu%E1%BA%ADt_vinh.jpg" />
              <h5>Đại học Sư Phạm Kỹ Thuật Vinh</h5>
            </a>
            <a href="http://spktvinh.edu.vn/" className="lk-other mt-3 mb-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/C%E1%BB%95ng_tr%C6%B0%E1%BB%9Dng_%C4%91%E1%BA%A1i_h%E1%BB%8Dc_s%C6%B0_ph%E1%BA%A1m_k%E1%BB%B9_thu%E1%BA%ADt_vinh.jpg" />
              <h5>Hệ thống đăng ký học</h5>
            </a>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
