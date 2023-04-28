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
  const [manager, setManager] = useState([]);

  let history = useHistory();
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  let id = 0;
  if (param !== undefined) {
    id = param.id;
  }
  useEffect(() => {
    if (mode === EDIT) {
      const fetchManager = async () => {
        try {
          const res = await axios.get(URL + "manager/" + id);
          setManager(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchManager();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async () => {
    setSubmitLoading(true);
    let managerEdit = {
      managerName: form.getFieldValue("name"),
      managerID: form.getFieldValue("managerID"),
      campusID: form.getFieldValue("campus"),
      sex: form.getFieldValue("sex"),
      dob: form.getFieldValue("dob").unix(),
      email: form.getFieldValue("email"),
      phone: form.getFieldValue("phone"),
      password: form.getFieldValue("password"),
      img:
        manager.length > 0
          ? manager[0].img !== uploadedImg
            ? uploadedImg
            : manager[0].img
          : uploadedImg,
    };
    if (mode === ADD) {
      try {
        await axios.post(URL + "manager", managerEdit);
        setSubmitLoading(false);
        history.goBack();
        message.success(`Tạo thành công`);
      } catch (err) {
        message.error(`Tạo thất bại`);
      }
    }
    if (mode === EDIT) {
      setSubmitLoading(false);
      console.log("edit", managerEdit, URL + "manager/" + id);
      try {
        await axios.put(URL + "manager/" + id, managerEdit);
        history.goBack();
        message.success(`Sửa thành công`);
      } catch (err) {
        message.error(`Tạo thất bại`);
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
                {mode === "ADD" ? "Thêm quản lý mới" : `Sửa thông quản lý`}{" "}
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
              {manager.length > 0 ? (
                <GeneralFieldEdit manager={manager} setImage={setImage} />
              ) : (
                <GeneralField setImage={setImage} />
              )}
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
