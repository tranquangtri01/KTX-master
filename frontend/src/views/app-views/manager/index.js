import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import ManagerList from './ManagerList'
import AddManager from './AddManager'
import EditManager from './EditManager'
import ManagerDetail from './ManagerDetail';

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddManager} />
			<Route path={`${match.url}/edit/:id`} component={EditManager} />
			<Route path={`${match.url}/detail/:id`} component={ManagerDetail} />
			<Route path={`${match.url}/list`} component={ManagerList} />
		</Switch>
	)
}

export default Ecommerce

