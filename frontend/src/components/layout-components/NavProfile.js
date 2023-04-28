import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect } from "react-redux";
import {
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";
import { useHistory } from "react-router-dom";

const menuItem = [
  {
    title: "Cài đặt tài khoản",
    icon: SettingOutlined,
    path: "/",
  },
  {
    title: "Thanh toán",
    icon: ShopOutlined,
    path: "/",
  },
  {
    title: "Trợ giúp",
    icon: QuestionCircleOutlined,
    path: "/",
  },
];

export const NavProfile = () => {
  const history = useHistory();

  const signOut = () => {
    window.localStorage.removeItem("lg");
    window.localStorage.removeItem("rl");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("sid");
    window.localStorage.removeItem("img");
    setTimeout(() => {
      history.push(AUTH_PREFIX_PATH + "/signin");
      window.location.reload();
    }, 300);
  };

  const profileImg = window.localStorage.getItem("img");

  const nameUser = window.localStorage.getItem("name");
  const rl = window.localStorage.getItem("rl");
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={(e) => signOut()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Đăng xuất</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <div className="d-flex align-items-center" style={{ height: 72 }}>
            <Avatar
              size={45}
              src={
                profileImg === null || profileImg === ""
                  ? "https://www.w3schools.com/bootstrap4/img_avatar3.png"
                  : profileImg
              }
            />
            <div className="pl-3 d-flex flex-column">
              <h4 className="mb-0">{nameUser !== "" ? nameUser : ""}</h4>
              <span className="text-muted" style={{ lineHeight: 1 }}>
                {rl === "asibmFt" ? "Quản trị viên" : "Sinh viên"}
              </span>
            </div>
          </div>
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
