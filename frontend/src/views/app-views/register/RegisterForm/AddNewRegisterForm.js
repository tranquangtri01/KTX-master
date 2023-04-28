import React, { useState } from "react";
import { Form, Modal, Select, message } from "antd";

import axios from "axios";
import { URL } from "utils/url";
import moment from "moment";

const { Option } = Select;

const AddNewCardForm = ({
  visible,
  onCreate,
  onCancel,
  student,
  campus,
  fetchAllRegister,
}) => {
  const [room, setRoom] = useState([]);
  const [roomVal, setRoomVal] = useState(0);
  const [form] = Form.useForm();

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
    let roomFilter = room.filter((a) => a.id.toString() === roomVal.toString());

    let registerEdit = {
      studentID: studentFilter.id,
      roomID: form.getFieldValue("roomID").toString(),
      isAccepted: "1",
      managerID: managerFilter.mid,
      dateRegister: dateNow,
      dateStart: dateNow,
      dateEnd: dateEnd,
    };
    console.log("chichann"+roomFilter[0].quality);
    console.log("chichann"+roomFilter[0].currentNum);
  
    if (parseInt(roomFilter[0].quality) > parseInt(roomFilter[0].currentNum)) {
      let roomEdit = {
        currentNum: parseInt(roomFilter[0].currentNum) + 1,
        studentList:
          parseInt(roomFilter[0].currentNum) === 0
            ? studentFilter.id
            : roomFilter[0].studentList + "," + studentFilter.id,
      };
      await axios.put(URL + "room/" + roomFilter[0].id, roomEdit, {
        params: { editQuality: true },
      });
    }
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
  const roomChange = (val) => {
    setRoomVal(val);
  };

  console.log("ROOM", room);

  return (
    <Modal
      title="Đăng kí mới"
      visible={visible}
      okText="Lưu"
      cancelText="Hủy"
      onCancel={onCancel}
      onOk={() => onFinish()}
    >
      <Form form={form} name="addForm" layout="vertical">
        <Form.Item name="studentID" label="Sinh viên">
          <Select className="w-100" mode="multiple" placeholder="Sinh viên">
            {student && student.map((elm) => {
              return (
                <Option key={elm.id} value={elm.studentID}>
                  {elm.name} - {elm.studentID} -{ elm.id }
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="campus" label="Tòa nhà">
          <Select
            className="w-100"
            onChange={(val) => campusChange(val)}
            showSearch
            placeholder="Tòa nhà"
          >
            {campus.map((elm) => (
              <Option key={elm.id} value={elm.id}>
                {elm.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="roomID" label="Phòng">
          <Select
            className="w-100"
            showSearch
            placeholder="Sinh viên"
            onChange={(val) => roomChange(val)}
          >
            {room.map((elm, index) => {
              return (
                <Option key={index} value={elm.id}>
                  {elm.name} - {elm.rt}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewCardForm;
