import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Menu, message } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined
} from "@ant-design/icons";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { Link, useHistory } from "react-router-dom";
import utils from "utils";
import axios from "axios";
import { URL } from "utils/url";

const ProductList = () => {
  let history = useHistory();
  const [list, setList] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const fetchAllCampus = async () => {
    try {
      const res = await axios.get(URL + "campus");
      setList(res.data);
      setListSearch(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllCampus();
  }, []);

  const dropdownMenu = (row) =>{
    return (
      <Menu>
        <Menu.Item >
          <Link to={"/app/campus/detail/" + row.id} >
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">Xem chi tiết</span>
            </Flex>
          </Link>
        </Menu.Item>
        <Menu.Item >
          <Link to={"/app/campus/edit/" + row.id} >
            <Flex alignItems="center">
              <EditOutlined />
              <span className="ml-2">Sửa</span>
            </Flex>
          </Link>
        </Menu.Item>
       

        <Menu.Item onClick={() => handleDelete(row.id)}>
          <Flex alignItems="center">
            <DeleteOutlined />
            <span className="ml-2">
              {selectedRows.length > 0
                ? `Xóa (${selectedRows.length})`
                : "Xóa"}
            </span>
          </Flex>
        </Menu.Item>
      </Menu>
    )
  };

  const addProduct = () => {
    history.push(`/app/campus/add`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}campus/${id}`);
    	message.success(`Xóa thành công`);
      fetchAllCampus();
    } catch (err) {
      console.log(err);
    }
  };

  const tableColumns = [
     {
      title: "STT",
      dataIndex: "id",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Tên cơ sở",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <div className="avatar-status-name">{record.name}</div>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      sorter: (a, b) => utils.antdTableSorter(a, b, "description"),
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
          <Button
            onClick={addProduct}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            Thêm cơ sở mới
          </Button>
        </div>
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

export default ProductList;
