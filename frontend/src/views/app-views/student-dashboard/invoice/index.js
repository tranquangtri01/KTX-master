import React, { useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Card, Button, Result, message } from "antd";

import { URL } from "utils/url";
import axios from "axios";
import moment from "moment";


export default function Invoice() {
  const [bill, setBill] = useState([]);
  const [checked, setChecked] = useState(false);
  let total = 0;
  const fetchBill = async () => {
    let sid = window.localStorage.getItem("sid");
    try {
      const res = await axios.get(URL + "bill/billID", {
        params: { id: sid },
      });
      setBill(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const moneyChange = (money) => {
    var formatter = new Intl.NumberFormat("vi", {
      style: "currency",
      currency: "VND",
    }).format(money);
    return formatter;
  };
  if (bill.length > 0) {
    total =
      parseFloat(bill[0].waterPrice) * parseFloat(bill[0].waterNum) +
      parseFloat(bill[0].elecNum) * parseFloat(bill[0].elecPrice) +
      parseFloat(bill[0].roomPrice);
  }
  const onCheckout = async () => {
    try {
      await axios.put(URL + "bill/checked", { id: bill[0].id });
      message.success(`Thanh toán thành công`);
      setChecked(true);
    } catch (err) {
      message.success(`Thanh toán thất bại`);
    }
  };

  return (
    <div className="container">
      {bill.length > 0 && bill[0].checked === 0 ? (
        <>
          {!checked ? (
            <Card>
              <div className="d-md-flex justify-content-md-between">
                <div>
                  <img className="logo-middle" src="/img/logo.png" alt="" />
                  <address>
                    <p>
                      <span className="font-weight-semibold text-dark font-size-md">
                        KTX Trường đại học SPKTV
                      </span>
                      <br />
                      <span>Nguyễn Viết xuân, TP. Vinh, Nghệ An</span>
                      <br />
                      <span>SDT: (+84) 000-6789</span>
                    </p>
                  </address>
                </div>
                <div className="mt-3 text-right">
                  <h2 className="mb-1 font-weight-semibold">{bill[0].name}</h2>
                  <p>{moment.unix(bill[0].date).format("DD/MM/YYYY")}</p>
                </div>
              </div>
              <div className="mt-4">
                <table className="w-100">
                  <colgroup />
                  <thead className="ant-table-thead">
                    <tr>
                      <th className="ant-table-cell">STT</th>
                      <th className="ant-table-cell">Loại</th>
                      <th className="ant-table-cell">KL</th>
                      <th className="ant-table-cell">Giá</th>
                      <th className="ant-table-cell">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody className="ant-table-tbody">
                    <tr
                      data-row-key={1}
                      className="ant-table-row ant-table-row-level-0"
                    >
                      <td className="ant-table-cell">1</td>
                      <td className="ant-table-cell">Điện</td>
                      <td className="ant-table-cell">{bill[0].elecNum}</td>
                      <td className="ant-table-cell">
                        <span>{moneyChange(bill[0].elecPrice)}</span>
                      </td>
                      <td className="ant-table-cell">
                        <span>
                          {moneyChange(
                            parseFloat(bill[0].elecNum) *
                              parseFloat(bill[0].elecPrice)
                          )}
                        </span>
                      </td>
                    </tr>
                    <tr
                      data-row-key={2}
                      className="ant-table-row ant-table-row-level-0"
                    >
                      <td className="ant-table-cell">2</td>
                      <td className="ant-table-cell">Nước</td>
                      <td className="ant-table-cell">{bill[0].waterNum}</td>
                      <td className="ant-table-cell">
                        <span>{moneyChange(bill[0].waterPrice)}</span>
                      </td>
                      <td className="ant-table-cell">
                        <span>
                          {moneyChange(
                            parseFloat(bill[0].waterNum) *
                              parseFloat(bill[0].waterPrice)
                          )}
                        </span>
                      </td>
                    </tr>
                    <tr
                      data-row-key={3}
                      className="ant-table-row ant-table-row-level-0"
                    >
                      <td className="ant-table-cell">3</td>
                      <td className="ant-table-cell">Tiền phòng</td>
                      <td className="ant-table-cell">1</td>
                      <td className="ant-table-cell">
                        <span>{moneyChange(bill[0].roomPrice)}</span>
                      </td>
                      <td className="ant-table-cell">
                        <span>{moneyChange(bill[0].roomPrice)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-end">
                  <div className="text-right ">
                    <h2 className="font-weight-semibold mt-4">
                      <span className="mr-1">Tổng: </span>
                      <span>{moneyChange(total)}</span>
                    </h2>
                  </div>
                </div>
              </div>
              <p>
                Lưu ý: Khối lượng điện nước sử dụng đã chia đều cho tất cả thành
                viên cùng phòng
              </p>
              <div className="text-right d-print-none mt-4 mb-4">
                <Button className="mr-3" onClick={() => window.print()}>
                  <PrinterOutlined type="printer" />
                  <span className="ml-1">In</span>
                </Button>
                <Button type="primary" onClick={() => onCheckout()}>
                  <span className="ml-1">Thanh toán</span>
                </Button>
              </div>
            </Card>
          ) : (
            <Result status="success" title="Thanh toán thành công" subTitle={"Bạn đã thanh toán thành công " +bill[0].name} />
          )}
        </>
      ) : (
        <Result
          status="403"
          title="Bạn không còn hóa đơn thanh toán"
          extra={<Button type="primary">Lịch sử thanh toán</Button>}
        />
      )}
    </div>
  );
}
