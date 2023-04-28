import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useHistory } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";
import GeneralFieldEdit from "./GeneralFieldEdit";

const { TabPane } = Tabs;

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const [campus, setCampus] = useState([]);

  let history = useHistory();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  let id = 0;
  if (param !== undefined) {
    id = param.id;
  }

  useEffect(() => {
    if (mode === EDIT) {
      const fetchCampus = async () => {
        try {
          const res = await axios.get(URL + "campus/" + id);
          setCampus(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchCampus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async () => {
    setSubmitLoading(true);
    let campusEdit = {
      name: form.getFieldValue("name"),
      description: form.getFieldValue("description"),
    };
    if (mode === ADD) {
      try {
        await axios.post(URL + "campus", campusEdit);
        setSubmitLoading(false);
        history.goBack();
        message.success(`Tạo thành công`);
      } catch (err) {
        message.success(`Tạo thất bại`);
      }
    }
    if (mode === EDIT) {
      setSubmitLoading(false);
      try {
        await axios.put(URL + "campus/" + id, campusEdit);
        history.goBack();
        console.log("edit", campusEdit, URL + "campus/" + id);
        message.success(`Sửa thành công`);
      } catch (err) {
        message.success(`Tạo thất bại`);
      }
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === "ADD" ? "Thêm cơ sở mới" : `Sửa cơ sở`}{" "}
              </h2>
              <div className="mb-3">
                <Button className="mr-2" onClick={() => history.goBack()}>
                  Hủy
                </Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === "ADD" ? "Thêm" : `Lưu`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="Thông tin" key="1">
              {campus.length > 0 ? (
                <GeneralFieldEdit campus={campus} />
              ) : (
                <GeneralField />
              )}
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
