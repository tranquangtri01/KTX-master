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

  const fetchAllRoomType = async () => {
    try {
      const res = await axios.get(URL + "room-type");
      setList(res.data);
      setListSearch(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAllRoomType();
  }, []);

  const dropdownMenu = (row) =>{
    return (
      <Menu>
        <Menu.Item >
          <Link to={"/app/room-type/detail/" + row.id} >
            <Flex alignItems="center">
              <EyeOutlined />
              <span className="ml-2">Xem chi tiết</span>
            </Flex>
          </Link>
        </Menu.Item>
        <Menu.Item >
          <Link to={"/app/room-type/edit/" + row.id} >
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
    history.push(`/app/room-type/add`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}room-type/${id}`);
    	message.success(`Xóa thành công`);
      fetchAllRoomType();
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
      title: "Tên loại phòng",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <div className="avatar-status-name">{record.name}</div>
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Số lượng",
      dataIndex: "quality",
      sorter: (a, b) => utils.antdTableSorter(a, b, "quality"),
    },

    {
      title: "Giá phòng",
      dataIndex: "price",
      sorter: (a, b) => utils.antdTableSorter(a, b, "price"),
      render: (item) => moneyChange(item)
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
  const moneyChange = (money) => {
    var formatter = new Intl.NumberFormat("vi").format(money);
    return formatter;
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
            Thêm loại phòng mới
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
