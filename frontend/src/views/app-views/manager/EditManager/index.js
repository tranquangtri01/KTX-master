import React from 'react'
import ManagerForm from '../ManagerForm';

const EditManager = props => {
	return (
		<ManagerForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditManager
