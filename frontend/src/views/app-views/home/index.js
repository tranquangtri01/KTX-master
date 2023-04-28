import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  // Button,
  Card,
  Avatar,
  Dropdown,
  Table,
  Menu,

} from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import ChartWidget from "components/shared-components/ChartWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import GoalWidget from "components/shared-components/GoalWidget";
import {
  VisitorChartData,
  ActiveMembersData,
} from "./DefaultDashboardData";
import ApexChart from "react-apexcharts";
import { apexLineChartDefaultOption, COLOR_2 } from "constants/ChartConstant";
import {
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  StopOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { useSelector } from "react-redux";
import { URL } from "utils/url";
import axios from "axios";
import moment from "moment";

const MembersChart = (props) => <ApexChart {...props} />;

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [COLOR_2],
  },
};

const newJoinMemberOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <PlusOutlined />
          <span className="ml-2">Add all</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <StopOutlined />
          <span className="ml-2">Disable all</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const latestTransactionOption = (
  <Menu>
    <Menu.Item key="0">
      <span>
        <div className="d-flex align-items-center">
          <ReloadOutlined />
          <span className="ml-2">Refresh</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="1">
      <span>
        <div className="d-flex align-items-center">
          <PrinterOutlined />
          <span className="ml-2">Print</span>
        </div>
      </span>
    </Menu.Item>
    <Menu.Item key="12">
      <span>
        <div className="d-flex align-items-center">
          <FileExcelOutlined />
          <span className="ml-2">Export</span>
        </div>
      </span>
    </Menu.Item>
  </Menu>
);

const cardDropdown = (menu) => (
  <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
    <a
      href="/#"
      className="text-gray font-size-lg"
      onClick={(e) => e.preventDefault()}
    >
      <EllipsisOutlined />
    </a>
  </Dropdown>
);

export default function Home() {
  const [visitorChartData] = useState(VisitorChartData);
  const [activeMembersData] = useState(ActiveMembersData);
  // const [newMembersData] = useState(NewMembersData);
  // const [recentTransactionData] = useState(RecentTransactionData);
  const [roomCount, setRoomCount] = useState([]);
  const [studentCount, setStudentCount] = useState([]);
  const [billTotalCount, setBillTotalCount] = useState([]);
  const { direction } = useSelector((state) => state.theme);
  const [bill, setBill] = useState([]);
  const [student, setStudent] = useState([]);

  const tableColumnsBill = [
    {
      title: "Tên",
      dataIndex: "Sname",
      key: "Sname",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Avatar size={30} className="font-size-sm" src={record.img}>
            {utils.getNameInitial(text)}
          </Avatar>
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: "Ngày đóng",
      dataIndex: "date",
      key: "date",
      render: (text) => <span>{moment.unix(text).format("DD/MM")}</span>,
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (text) => <span>{moneyChange(text)}</span>,
    },
  ];

  const fetchStudent = async () => {
    try {
      const res = await axios.get(URL + "other/studentLast");

      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBill = async () => {
    try {
      const res = await axios.get(URL + "bill/billAll");

      setBill(res.data);
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
  console.log(billTotalCount, "billTotalCount");

  useEffect(() => {
    fetchBill();
    fetchStudent();
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
      title: "Tổng số sinh viên (HT)",
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

  return (
    <div className="position-relative">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={17}>
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
          <Card
            title="Danh sách nạp tiền gần đây"
            extra={cardDropdown(latestTransactionOption)}
          >
            {bill.length > 0 && (
              <Table
                className="no-border-last"
                columns={tableColumnsBill}
                dataSource={bill}
                rowKey="id"
                pagination={false}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={7}>
          <GoalWidget
            title="Tỉ lệ số phòng ở"
            value={65}
            // extra={<Button type="primary" >Thêm mới sinh viên</Button>}
          />
          <StatisticWidget
            title={
              <MembersChart
                options={memberChartOption}
                series={activeMembersData}
                height={145}
              />
            }
            value="29"
            status={3.7}
            subtitle="Tổng số lượt đăng ký tháng này"
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card
            title="Thành viên mới"
            extra={cardDropdown(newJoinMemberOption)}
          >
            <div className="mt-3">
              {student.map((elm, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <AvatarStatus
                    id={i}
                    src={elm.img}
                    name={elm.name}
                    subTitle={elm.class}
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="Tổng số sinh viên lưu trú tại các tòa"
                series={visitorChartData.series}
                xAxis={visitorChartData.categories}
                height={"400px"}
                direction={direction}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
