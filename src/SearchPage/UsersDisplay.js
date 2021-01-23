import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Image, 
    Container,
    Bio,
    Name, 
    Username,
} from './UsersDisplay.styles'

const UsersDisplay = (props) => {

    const [isVisble, setIsVisible] = useState(false)

    return(
        <Container opacity={isVisble ? 1 : 0}>
            <Link to={`/photo-app/profiles/${props.item.username}`}>
                    <Image onLoad={()=>setIsVisible(true)} src={props.item.profileImage} alt=''></Image>
            </Link>
            <Username>{props.item.username}</Username>
            <Name>{props.item.name}</Name>
            <Bio>Quis imperdiet massa tincidunt nunc. Pellentesque adipiscing commodo elit at.</Bio>
        </Container>
    )
}

export default UsersDisplay