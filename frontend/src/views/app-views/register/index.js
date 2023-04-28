import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import RegisterList from './RegisterList'
import AddRegister from './AddRegister'
import EditRegister from './EditRegister'
import RegisterDetail from './RegisterDetail';

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddRegister} />
			<Route path={`${match.url}/edit/:id`} component={EditRegister} />
			<Route path={`${match.url}/detail/:id`} component={RegisterDetail} />
			<Route path={`${match.url}/list`} component={RegisterList} />
		</Switch>
	)
}

export default Ecommerce

