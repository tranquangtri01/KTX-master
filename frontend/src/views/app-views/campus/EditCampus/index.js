import React from 'react'
import CampusForm from '../CampusForm';

const EditCampus = props => {
	return (
		<CampusForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditCampus
