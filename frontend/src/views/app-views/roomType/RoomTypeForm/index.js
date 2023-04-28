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

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const ProductForm = (props) => {
  const { mode = ADD, param } = props;
  const [roomType, setRoomType] = useState([]);

  let history = useHistory();
  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  let id = 0;
  if (param !== undefined) {
     id  = param.id;
  }

  useEffect(() => {
    if (mode === EDIT) {
      const fetchRoomType = async () => {
        try {
          const res = await axios.get(URL + "room-type/" + id);
          setRoomType(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchRoomType();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    let roomTypeEdit = {
      name: form.getFieldValue("name"),
      quality: form.getFieldValue("quality"),
      price: form.getFieldValue("price"),
    };
    if (mode === ADD) {
      try {
        await axios.post(URL + "room-type/", roomTypeEdit);
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
        await axios.put(URL + "room-type/"+id, roomTypeEdit);
        history.goBack();
        console.log( "edit", roomTypeEdit, URL + "room-type/"+id);
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
                {mode === "ADD" ? "Thêm loại phòng mới" : `Sửa loại phòng`}{" "}
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
              {roomType.length > 0 ? (
                <GeneralFieldEdit
                  uploadedImg={uploadedImg}
                  uploadLoading={uploadLoading}
                  handleUploadChange={handleUploadChange}
                  roomType={roomType}
                />
              ) : (
                <GeneralField
                  uploadedImg={uploadedImg}
                  uploadLoading={uploadLoading}
                  handleUploadChange={handleUploadChange}
                />
              )}
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
