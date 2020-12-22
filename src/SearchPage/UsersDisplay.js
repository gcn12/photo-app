import React from 'react'
import {
    Image
} from './UsersDisplay.styles'

const UsersDisplay = (props) => {
    return(
        <div>
            <Image src={props.item.profileImage} alt=''></Image>
            <div>{props.item.name}</div>
        </div>
    )
}

export default UsersDisplay