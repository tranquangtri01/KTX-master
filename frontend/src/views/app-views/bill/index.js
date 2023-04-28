import React, { useEffect, useState } from "react";
import { Row, Col,  Card, Avatar, Table, Badge } from "antd";
import utils from "utils";
import axios from "axios";
import { URL } from "utils/url";
import moment from "moment";

export default function Bill() {
  const [ setCampus] = useState([]);
  const [bill, setBill] = useState([]);

  const fetchBill = async () => {
    try {
      const res = await axios.get(URL + "bill/billAll0");

      setBill(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAllCampus = async () => {
    try {
      const res = await axios.get(URL + "campus");
      setCampus(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCampus();
    fetchBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableColumns2 = [
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
      title: "Trạng thái",
      dataIndex: "checked",
      key: "checked",

      render: (item) => item.toString() === "0" ? (
        <>
          <Badge status="warning" />
          <span>Chưa thanh toán</span>
        </>
      ) : (
        <>
          <Badge status="success" />
          <span>Đã thanh toán</span>
        </>
      )
    },
    {
      title: "Tổng",
      dataIndex: "total",
      key: "total",
      render: (text) => <span>{moneyChange(text)}</span>,
    },
  ];

  const moneyChange = (money) => {
    var formatter = new Intl.NumberFormat("vi").format(money);
    return formatter;
  };


  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Card>
            <h3>Danh sách hóa đơn</h3>
            <div className="table-responsive">
              {bill.length > 0 && (
                <Table
                  className="no-border-last"
                  columns={tableColumns2}
                  dataSource={bill}
                  rowKey="id"
                  pagination={false}
                />
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
