import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import { URL } from "utils/url";
import axios from "axios";
import GeneralFieldEdit from "./GeneralFieldEdit";

const { TabPane } = Tabs;

const ProductForm = (props) => {
  const [student, setStudent] = useState([]);

  let history = useHistory();
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  let id = window.localStorage.getItem("sid");
 
  useEffect(() => {
    const fetchStudent = async () => {
      let sid = window.localStorage.getItem("sid");

      try {
        const res = await axios.get(URL + "other/student", {
          params: { id: sid },
        });
        setStudent(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = async () => {
    setSubmitLoading(true);
    let studentEdit = {
      name: form.getFieldValue("name"),
      studentID: form.getFieldValue("studentID"),
      class: form.getFieldValue("class"),
      sex: form.getFieldValue("sex"),
      dob: form.getFieldValue("dob").unix(),
      cccd: form.getFieldValue("cccd"),
      email: form.getFieldValue("email"),
      phone: form.getFieldValue("phone"),
      hometown: form.getFieldValue("hometown"),
      note: form.getFieldValue("note"),
      password: form.getFieldValue("password"),
      img:
        student.length > 0
          ? student[0].img !== uploadedImg
            ? uploadedImg
            : student[0].img
          : uploadedImg,
    };
    setSubmitLoading(false);
    try {
      await axios.put(URL + "student/" + id, studentEdit);
      message.success(`Sửa thành công`);
    } catch (err) {
      message.success(`Tạo thất bại`);
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
              <h2 className="mb-3">Sửa sinh viên</h2>
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
                  Lưu
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
            <TabPane tab="Thông tin" key="1">
              {student.length && (
                <GeneralFieldEdit student={student} setImage={setImage} />
              )}
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
