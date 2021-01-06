import React, { useEffect } from 'react'
import PublicProfilePosts from './PublicProfilePosts'
import { connect } from 'react-redux'
import {
    ProfileImage,
    Container,
    PostsContainer,
    Username,
    Name, 
    Bio,
    UserContainer,
} from './PublicProfile.styles'

const PublicProfile = (props) => {

    useEffect(()=> {
        props.getUserProfile(props.match.params.username)
        // eslint-disable-next-line
    }, [])
    
    const { userData, userPosts } = props
    return(
        <div style={{marginTop: '55px'}}>
            <UserContainer>
                <ProfileImage alt='profile' src={userData[0]?.profileImage}></ProfileImage>
                <Container>
                    <Username>{userData[0]?.username}</Username>
                    <Name>{userData[0]?.name}</Name>
                    <Bio>{userData[0]?.bio}</Bio>
                </Container>
            </UserContainer>

            <PostsContainer>
            {userPosts?.map((post, index)=> {
                return(
                    <PublicProfilePosts post={post} history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} key={index} />
                )
            })}
            </PostsContainer>
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.app.userData,
    userPosts: state.app.userPosts,
})

export default connect(mapStateToProps)(PublicProfile)