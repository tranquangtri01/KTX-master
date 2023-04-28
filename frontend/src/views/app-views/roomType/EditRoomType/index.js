import React from 'react'
import RoomTypeForm from '../RoomTypeForm';

const EditRoomType = props => {
	return (
		<RoomTypeForm mode="EDIT" param={props.match.params}/>
	)
}

export default EditRoomType
