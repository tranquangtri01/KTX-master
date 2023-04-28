import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import RoomList from './RoomList'
import AddRoom from './AddRoom'
import EditRoom from './EditRoom'
import RoomDetail from './RoomDetail';
import CreateBillRoom from './CreateBillRoom';

const Room = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddRoom} />
			<Route path={`${match.url}/create-bill/:id`} component={CreateBillRoom} />
			<Route path={`${match.url}/edit/:id`} component={EditRoom} />
			<Route path={`${match.url}/detail/:id`} component={RoomDetail} />
			<Route path={`${match.url}/list`} component={RoomList} />
		</Switch>
	)
}

export default Room

