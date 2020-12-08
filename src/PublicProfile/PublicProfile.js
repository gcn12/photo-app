import React, { useEffect } from 'react'
import PublicProfilePosts from './PublicProfilePosts'
import {
    ProfileImage,
    Container,
    PostsContainer,
} from './PublicProfile.styles'

const PublicProfile = (props) => {

    useEffect(()=> {
        props.getUserProfile(props.match.params.username)
        // eslint-disable-next-line
    }, [])
    
    const { userData, userPosts } = props
    return(
        <div style={{display: 'flex'}}>
            <div style={{display: 'flex',   flexDirection: "column", alignItems: "center"}}>
                <Container>
                    <ProfileImage alt='profile' src={userData[0]?.profileImage}></ProfileImage>
                    <div>{userData[0]?.name}</div>
                    <div>{userData[0]?.username}</div>
                    <div>{userData[0]?.bio}</div>
                </Container>
            </div>
                <div>

                <PostsContainer>
                {userPosts?.map((post, index)=> {
                    return(
                        <PublicProfilePosts post={post} history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} key={index} />
                    )
                })}
                </PostsContainer>
                </div>
        </div>
    )
}

export default PublicProfile