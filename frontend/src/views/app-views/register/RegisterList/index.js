import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Menu, message, Badge } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
  CheckOutlined,
  StopOutlined,
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { Link } from "react-router-dom";
import utils from "utils";
import axios from "axios";
import { URL } from "utils/url";
import AddNewCardForm from "../RegisterForm/AddNewRegisterForm";
import EditRegisterForm from "../RegisterForm/EditRegisterForm";

const RegisterList = () => {
  const [list, setList] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [student, setStudent] = useState([]);
  const [campus, setCampus] = useState([]);
  const [selectedID, setSelectedID] = useState([]);

  
  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const fetchAllStudent = async () => {
    try {
      const res = await axios.get(URL + "other/notreq");
      setStudent(res.data);
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
    fetchAllRegister();
    fetchAllStudent();
    fetchAllCampus();
  }, []);

  const fetchAllRegister = async () => {
    try {
      const res = await axios.get(URL + "student-register");
      setList(res.data);
      setListSearch(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}student-register/${id}`);
      message.success(`Xóa thành công`);
      fetchAllRegister();
    } catch (err) {
      console.log(err);
    }
  };

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
    },
  };

  const onSearch = (e) => {
    if (e.currentTarget.value === "") {
      setList(listSearch);
      setSelectedRowKeys([]);
    } else {
      const value = e.currentTarget.value;
      const searchArray = listSearch;
      const data = utils.wildCardSearch(searchArray, value);

      setList(data);
      setSelectedRowKeys([]);
    }
  };

  const fetchAllRegisterDetail = async (id) => {
    try {
      const res = await axios.get(URL + "student-register/" + id);
      setSelectedID(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const setEdit = (id) => {
    setModalEdit(true);
    fetchAllRegisterDetail(id);
  };
  const setSubmitRegister = async (id, isAccepted) => {
    try {
      await axios.put(URL + "student-register/" + id, {
        isAccepted: isAccepted,
      });
      fetchAllRegister();
      message.success(`Phê duyệt thành công`);
    } catch (err) {
      message.error(`Phê duyệt thất bại`);
    }
  };

  const dropdownMenu = (row) => {
    return (
      <Menu>
        <Menu.Item>
          <Link to={"/app/register/detail/" + row.id}>
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">Xem chi tiết</span>
            </Flex>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <div onClick={() => setEdit(row.id)}>
            {/* <Link to={"/app/register/edit/" + row.id}> */}
            <Flex alignItems="center">
              <EditOutlined />
              <span className="ml-2">Sửa</span>
            </Flex>
          </div>
        </Menu.Item>

        {row.isAccepted === "1" ? (
          <Menu.Item>
            <div onClick={() => setSubmitRegister(row.id, "-1")}>
              <Flex alignItems="center">
                <StopOutlined />
                <span className="ml-2">Từ chối</span>
              </Flex>
            </div>
          </Menu.Item>
        ) : (
          <Menu.Item>
            <div onClick={() => setSubmitRegister(row.id, "1")}>
              <Flex alignItems="center">
                <CheckOutlined />
                <span className="ml-2">Phê Duyệt</span>
              </Flex>
            </div>
          </Menu.Item>
        )}

        <Menu.Item onClick={() => handleDelete(row.id)}>
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">
              {selectedRows.length > 0 ? `Xóa (${selectedRows.length})` : "Xóa"}
            </span>
          </Flex>
        </Menu.Item>
      </Menu>
    );
  };

  const tableColumns = [
     {
      title: "STT",
      dataIndex: "id",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Người đăng ký",
      dataIndex: "studentName",
      sorter: (a, b) => utils.antdTableSorter(a, b, "studentName"),
    },
    {
      title: "Phòng",
      dataIndex: "roomName",
      sorter: (a, b) => utils.antdTableSorter(a, b, "roomName"),
    },
    {
      title: "SL",
      dataIndex: "currentNum",
      sorter: (a, b) => utils.antdTableSorter(a, b, "currentNum"),
    },
    {
      title: "Quản lý khu",
      dataIndex: "managerName",
      sorter: (a, b) => utils.antdTableSorter(a, b, "managerName"),
    },
    {
      title: "Trạng thái",
      dataIndex: "isAccepted",
      sorter: (a, b) => utils.antdTableSorter(a, b, "render"),
      render: (_, record) => (
        <div className="d-flex">
          {record.isAccepted === "0" ? (
            <>
              <Badge status="warning" />
              <span>Chưa xác nhận</span>
            </>
          ) : record.isAccepted === "-1" ? (
            <>
              <Badge status="error" />
              <span>Từ chối</span>
            </>
          ) : (
            <>
              <Badge status="success" />
              <span>Đã xác nhận</span>
            </>
          )}
        </div>
      ),
    },

    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  return (
    <Card>
      <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
        </Flex>
        <div>
          <div className="text-right">
            <Button type="primary" onClick={() => showModal()}>
              Thêm mới
            </Button>
          </div>
        </div>
        <AddNewCardForm
          student={student}
          campus={campus}
          visible={modal}
          onCancel={() => closeModal()}
          fetchAllRegister={fetchAllRegister}
        />
        {selectedID.length > 0 && (
          <EditRegisterForm
            list={list}
            student={student}
            campus={campus}
            visible={modalEdit}
            selectedID={selectedID}
            onCancel={setModalEdit}
            fetchAllRegister={fetchAllRegister}
          />
        )}
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />
      </div>
    </Card>
  );
};
console.log("student" )

export default RegisterList;
