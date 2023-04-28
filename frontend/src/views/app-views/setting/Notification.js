import React, { useEffect, useState } from "react";
import { Button, Form, Input, List, message } from "antd";
import { HeatMapOutlined, CoffeeOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import moment from "moment";
import axios from "axios";
import { URL } from "utils/url";

// const initState = [
//   {
//     waterPrice: "0",
//     electricPrice: "0",
//   },
// ];

export default function Notification() {
  const [form] = Form.useForm();
  const [energy, setEnergy] = useState([]);

  const fetchEnergy = async () => {
    try {
      const res = await axios.get(URL + "other/settings-price");
      setEnergy(res.data);
      console.log(energy, res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEnergy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    const dateNow = moment().unix().toString();

    let priceUpdate = {
      electricPrice: form.getFieldValue("electricPrice").toString(),
      waterPrice: form.getFieldValue("waterPrice").toString(),
      date: dateNow,
    };
    console.log(priceUpdate);
    try {
      await axios.post(URL + "other/settings-price", priceUpdate);
      fetchEnergy();
      message.success(`Cập nhật giá thành công`);
    } catch (err) {
      message.success(`Cập nhật giá thất bại`);
    }
  };
  return (
    <>
      <h2 className="mb-4">Giá điện nước</h2>
      <Form form={form} name="addForm" layout="vertical">
        {energy.length > 0 && (
          <List itemLayout="horizontal">
            <List.Item>
              <Flex
                justifyContent="between"
                alignItems="center"
                className="w-100"
              >
                <div className="d-flex align-items-center">
                  <HeatMapOutlined className="h1 mb-0 text-primary" />
                  <div className="ml-3">
                    <h4 className="mb-0">Giá điện</h4>
                    <p>lorem ispumssmsms</p>
                  </div>
                </div>
                <div className="ml-3">
                  <Form.Item
                    name="electricPrice"
                    initialValue={energy[0].electricPrice}
                  >
                    <Input
                      min={1}
                      defaultValue={energy[0].electricPrice}
                      addonAfter="đ/kwh"
                      className="w-100px"
                    />
                  </Form.Item>
                </div>
              </Flex>
            </List.Item>
            <List.Item>
              <Flex
                justifyContent="between"
                alignItems="center"
                className="w-100"
              >
                <div className="d-flex align-items-center">
                  <CoffeeOutlined className="h1 mb-0 text-primary" />
                  <div className="ml-3">
                    <h4 className="mb-0">Giá nước</h4>
                    <p>lorem ispumssmsms</p>
                  </div>
                </div>
                <div className="ml-3">
                  <Form.Item
                    name="waterPrice"
                    initialValue={energy[0].waterPrice}
                  >
                    <Input
                      min={1}
                      defaultValue={energy[0].waterPrice}
                      addonAfter="đ/m3"
                      className="w-100px"
                    />
                  </Form.Item>
                </div>
              </Flex>
            </List.Item>
            <List.Item>
              <Flex justifyContent="end" alignItems="center" className="w-100">
                <Button
                  className="mt-3"
                  type="primary"
                  onClick={() => onSubmit()}
                >
                  Lưu
                </Button>
              </Flex>
            </List.Item>
          </List>
        )}
      </Form>
    </>
  );
}
