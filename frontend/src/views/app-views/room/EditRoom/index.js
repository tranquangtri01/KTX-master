import React from 'react'
import RoomForm from '../RoomForm';

const EditRoom = props => {
	return (
		<RoomForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditRoom
