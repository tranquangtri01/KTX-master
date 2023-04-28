import React, { Component } from 'react'
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import Billing from './Billing';
import Notification from './Notification';

const SettingOption = ({ match, location }) => {
	return (
		<Menu
			defaultSelectedKeys={`${match.url}/edit-profile`}
			mode="inline"
			selectedKeys={[location.pathname]}
		>
			<Menu.Item key={`${match.url}/price`}>
				<SettingOutlined />
				<span>Giá điện nước</span>
				<Link to={`price`} />
			</Menu.Item>
			{/* <Menu.Item key={`${match.url}/billing`}>
				<CreditCardOutlined />
				<span>Thanh toán</span>
				<Link to={`billing`} />
			</Menu.Item> */}
			{/* <Menu.Item key={`${match.url}/edit-profile`}>
				<UserOutlined />
				<span>Quản trị viên</span>
				<Link to={'edit-profile'} />
			</Menu.Item> */}
			{/* <Menu.Item key={`${match.url}/change-password`}>
				<LockOutlined />
				<span>Sửa mật khẩu</span>
				<Link to={'change-password'} />
			</Menu.Item> */}
			
			
		</Menu>
	);
};

const SettingContent = ({ match }) => {
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/price`} />
			<Route path={`${match.url}/price`} component={Notification} />
			<Route path={`${match.url}/edit-profile`} component={EditProfile} />
			<Route path={`${match.url}/change-password`} component={ChangePassword} />
			<Route path={`${match.url}/billing`} component={Billing} />
		</Switch>
	)
}

export class Setting extends Component {
	render() {
		return (
			<InnerAppLayout 
				sideContentWidth={320}
				sideContent={<SettingOption {...this.props}/>}
				mainContent={<SettingContent {...this.props}/>}
			/>
    );
	}
}

export default Setting
