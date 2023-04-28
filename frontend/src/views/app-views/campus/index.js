import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import CampusList from './CampusList'
import AddCampus from './AddCampus'
import EditCampus from './EditCampus'
import CampusDetail from './CampusDetail';

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddCampus} />
			<Route path={`${match.url}/edit/:id`} component={EditCampus} />
			<Route path={`${match.url}/detail/:id`} component={CampusDetail} />
			<Route path={`${match.url}/list`} component={CampusList} />
		</Switch>
	)
}

export default Ecommerce

