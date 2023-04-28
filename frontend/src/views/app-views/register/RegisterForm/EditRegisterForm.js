import React, { useEffect, useState } from "react";
import { Form, Modal, Select, message } from "antd";

import axios from "axios";
import { URL } from "utils/url";
import moment from "moment";

const { Option } = Select;

const EditRegisterForm = ({
  visible,
  selectedID,
  onCancel,
  student,
  campus,
  fetchAllRegister,
}) => {
  const [room, setRoom] = useState([]);
  const [form] = Form.useForm();
  const [studentEdit, setStudentEdit] = useState([]);
  const [campusEdit, setCampusEdit] = useState([]);

  // const listSelect = list.find(
  //   (item) =>
  //     item.id.toString() === selectedID[0].id.toString()
  // );

  // const campusSelect = campus.filter((item) => item.id === selectedID[0].id);

  const fetchStudentRegister = async (id) => {
    try {
      const res = await axios.get(URL + "student/" + id);
      setStudentEdit(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCampusRegister = async (id) => {
    try {
      const res = await axios.get(URL + "other/campusMan/" + id);
      console.log("CAMPUSEDIT", res.data);
      setCampusEdit(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStudentRegister(selectedID[0].studentID);
    // setStudentEdit(studentEdit);
    fetchCampusRegister(selectedID[0].managerID);
    if (campusEdit.length > 0) {
      fetchRIS(campusEdit[0].id);
    }
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [studentEdit, setStudentEdit] = useState([])

  const onCancelClick = () => {
    form.resetFields();
    onCancel(false);
  };
  const onFinish = async () => {
    const dateNow = moment().unix();
    const dateEnd = moment().add(6, "months").unix();
    const studentFilter = student.find(
      (item) =>
        item.studentID.toString() === form.getFieldValue("studentID").toString()
    );
    const managerFilter = room.find(
      (item) =>
        item.campusID.toString() === form.getFieldValue("campus").toString()
    );

    let registerEdit = {
      studentID: studentFilter.id,
      roomID: form.getFieldValue("roomID").toString(),
      isAccepted: "1",
      managerID: managerFilter.mid,
      dateRegister: dateNow,
      dateStart: dateNow,
      dateEnd: dateEnd,
    };
    try {
      await axios.post(URL + "student-register", registerEdit);
      onCancel();
      message.success(`Tạo thành công`);
      form.resetFields();
      fetchAllRegister();
    } catch (err) {
      message.success(`Tạo thất bại`);
    }
  };
  const fetchRIS = async (campus) => {
    try {
      const res = await axios.get(URL + "other/ris", {
        params: { campusID: campus },
      });
      let roomList = res.data.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === value.place && t.name === value.name
          )
      );
      setRoom(roomList);
    } catch (err) {
      console.log(err);
    }
  };
  const campusChange = (val) => {
    fetchRIS(val);
  };

  return (
    <Modal
      title="Chỉnh sửa đăng ký"
      visible={visible}
      okText="Lưu"
      cancelText="Hủy"
      onCancel={() => onCancelClick()}
      onOk={() => onFinish()}
    >
      <Form form={form} name="addForm" layout="vertical">
        {studentEdit.length > 0 && (
          <Form.Item
            name="studentID"
            label="Sinh viên"
            initialValue={studentEdit[0].studentID}
          >
            <Select
              className="w-100"
              mode="multiple"
              placeholder="Sinh viên"
              defaultValue={studentEdit[0].studentID}
            >
              {student.map((elm) => {
                return (
                  <Option key={elm.id} value={elm.studentID}>
                    {elm.name} - {elm.studentID}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
        {campusEdit.length > 0 && (
          <Form.Item
            name="campus"
            label="Tòa nhà"
            initialValue={campusEdit[0].id}
          >
            <Select
              className="w-100"
              onChange={(val) => campusChange(val)}
              showSearch
              placeholder="Tòa nhà"
              defaultValue={campusEdit[0].name}
              disabled
            >
              {campus.map((elm) => (
                <Option key={elm.id} value={elm.id}>
                  {elm.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="roomID"
          label="Phòng"
          initialValue={selectedID[0].roomName}
        >
          <Select
            className="w-100"
            showSearch
            placeholder="Sinh viên"
            defaultValue={selectedID[0].roomName}
          >
            {room.map((elm) => (
              <Option key={elm.id} value={elm.id}>
                {elm.name} - {elm.rt}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          initialValue={
            selectedID[0].isAccepted === "0"
              ? "Chờ xác nhận"
              : selectedID[0].isAccepted === "1"
              ? "Xác nhận"
              : "Từ chối"
          }
        >
          <Select
            className="w-100"
            defaultValue={
              selectedID[0].isAccepted === "0"
                ? "Chờ xác nhận"
                : selectedID[0].isAccepted === "1"
                ? "Xác nhận"
                : "Từ chối"
            }
            disabled={selectedID[0].isAccepted !== "0"}
          >
            <Option key={"0"} value={"0"}>
              Chờ xác nhận
            </Option>
            <Option key={"1"} value={"1"}>
              Xác nhận
            </Option>
            <Option key={"-1"} value={"-1"} className="bg-danger text-white">
              từ chối
            </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRegisterForm;
