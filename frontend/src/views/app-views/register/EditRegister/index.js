import React from 'react'
import RegisterForm from '../RegisterForm';

const EditRegister = props => {
	return (
		<RegisterForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditRegister
