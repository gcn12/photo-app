import React, { useState } from 'react'
import {
    Image, 
    Container
} from './UsersDisplay.styles'

const UsersDisplay = (props) => {

    const [isVisble, setIsVisible] = useState(false)

    return(
        <Container opacity={isVisble ? 1 : 0}>
            <Image onLoad={()=>setIsVisible(true)} src={props.item.profileImage} alt=''></Image>
            <div>{props.item.name}</div>
        </Container>
    )
}

export default UsersDisplay