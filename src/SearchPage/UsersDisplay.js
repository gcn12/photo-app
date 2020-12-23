import React, { useState } from 'react'
import {
    Image, 
    Container,
    HeaderImage,
    Bio,
    Name, 
    Username,
    Follow,
} from './UsersDisplay.styles'

const UsersDisplay = (props) => {

    const [isVisble, setIsVisible] = useState(false)

    return(
        <Container opacity={isVisble ? 1 : 0}>
            <Image onLoad={()=>setIsVisible(true)} src={props.item.profileImage} alt=''></Image>
            <Name>{props.item.name}</Name>
            <Username>{props.item.username}</Username>
            <Bio>Quis imperdiet massa tincidunt nunc. Pellentesque adipiscing commodo elit at.</Bio>
            <div>
                <HeaderImage alt='' src='https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8YmFsaXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'></HeaderImage>
                <HeaderImage alt='' src='https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8YmFsaXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'></HeaderImage>
                <HeaderImage alt='' src='https://images.unsplash.com/photo-1544959068-7c75914bf21e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGJhbGl8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60'></HeaderImage>
            </div>
            <Follow>Follow</Follow>
        </Container>
    )
}

export default UsersDisplay