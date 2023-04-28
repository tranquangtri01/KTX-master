import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import StudentList from './StudentList'
import AddStudent from './AddStudent'
import EditStudent from './EditStudent'
import StudentDetail from './StudentDetail';

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
			<Route path={`${match.url}/add`} component={AddStudent} />
			<Route path={`${match.url}/edit/:id`} component={EditStudent} />
			<Route path={`${match.url}/detail/:id`} component={StudentDetail} />
			<Route path={`${match.url}/list`} component={StudentList} />
		</Switch>
	)
}

export default Ecommerce

