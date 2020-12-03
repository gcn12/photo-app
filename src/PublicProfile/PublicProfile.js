import React from 'react'
import { DisplayPosts } from '../UserPosts/UserPosts'
import {
    ProfileImage,
    Container,
    // PostsContainer,
} from './PublicProfile.styles'

const PublicProfile = (props) => {

    const { userData, userPosts } = props
    return(
        <div style={{display: 'flex',  justifyContent: 'center', }}>
            <Container>
                <ProfileImage alt='profile' src={userData[0]?.profileImage}></ProfileImage>
                <div>{userData[0]?.name}</div>
                <div>{userData[0]?.username}</div>
                <div>{userData[0]?.bio}</div>
            </Container>
            {/* <PostsContainer> */}
            {userPosts?.map((post, index)=> {
                return(
                    <DisplayPosts getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} key={index} post={post}/>
                )
            })}
            {/* </PostsContainer> */}
        </div>
    )
}

export default PublicProfile