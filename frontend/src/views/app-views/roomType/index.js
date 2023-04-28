import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import RoomTypeList from './RoomTypeList'
import AddRoomType from './AddRoomType'
import EditRoomType from './EditRoomType'
import RoomTypeDetail from './RoomTypeDetail';

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddRoomType} />
			<Route path={`${match.url}/edit/:id`} component={EditRoomType} />
			<Route path={`${match.url}/detail/:id`} component={RoomTypeDetail} />
			<Route path={`${match.url}/list`} component={RoomTypeList} />
		</Switch>
	)
}

export default Ecommerce

