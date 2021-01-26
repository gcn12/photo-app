import React, { useState, useEffect } from 'react'
import { db } from '../Firebase'
import {
    Container,
    PhotoLeftContainer,
    Image,
    Username,
    UsersDisplayContainer,
} from './FeaturedUsers.styles'
 
const FeaturedUsers = (props) => {

    const [users, setUsers] = useState([])

    useEffect(()=> {
        db.collection('users')
        .orderBy('id', 'asc')
        .limit(4)
        .get()
        .then(usersData=> {
            let usersArray = []
            usersData.forEach(user=> {
                usersArray.push(user.data())
            })
            setUsers(usersArray)
        })
    },[])

    return(
        <Container>
            <UsersDisplayContainer>
                {users.map((user, index)=> {
                    return(
                        <UserDisplay user={user} />
                    )
                })}
            </UsersDisplayContainer>
        </Container>
    )
}

const UserDisplay = (props) => {
    return(
        <div>
            <PhotoLeftContainer>
                <Image src={props.user.profileImage} />
                <Username>{props.user.username}</Username>
            </PhotoLeftContainer>
        </div>
    )
}

export default FeaturedUsers