import React from 'react'
import StudentForm from '../StudentForm';

const EditStudent = props => {
	return (
		<StudentForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditStudent
