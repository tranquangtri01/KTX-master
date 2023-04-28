import React, { Component } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import ThemeConfigurator from "./ThemeConfigurator";
import { connect } from "react-redux";
import { DIR_RTL } from "constants/ThemeConstant";
import NavProfile from "./NavProfile";

export class NavPanel extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <div className="d-flex">
          <NavProfile />
          <div className="pr-3 pl-3" onClick={this.showDrawer}>
            <a href>
              <SettingOutlined className="nav-icon mr-0" />
            </a>
          </div>
        </div>

        <Drawer
          title="Cấu hình giao diện"
          placement={this.props.direction === DIR_RTL ? "left" : "right"}
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <ThemeConfigurator />
        </Drawer>
      </>
    );
  }
}

const mapStateToProps = ({ theme }) => {
  const { locale } = theme;
  return { locale };
};

export default connect(mapStateToProps)(NavPanel);
