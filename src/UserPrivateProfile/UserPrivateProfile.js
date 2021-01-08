import React, { useEffect, useState } from 'react'
import UserPrivateProfilesPosts from './UserPrivateProfilePosts'
import { connect } from 'react-redux'
import fitty from 'fitty'
import {
    ProfileImage,
    Container,
    PostsContainer,
    Username,
    Name, 
    Bio,
    UserContainer,
} from '../PublicProfile/PublicProfile.styles'

const UserPrivateProfile = (props) => {

    const [isVisible, setIsVisible] = useState(false)

    const { userInformation, getUserProfile } = props
    useEffect(()=> {
        if(userInformation.username){
            getUserProfile(userInformation.username)
        }
        fitty('#public-profile-username', {
            minSize: 1,
            maxSize: 30
        })
        fitty('#public-profile-name', {
            minSize: 1,
            maxSize: 20
        })
        // eslint-disable-next-line
    }, [userInformation])

    
    const { userData, userPosts } = props
    return(
        <div style={{marginTop: '10px'}}>
            <UserContainer visibility={isVisible ? 1 : 0}>
                <ProfileImage onLoad={()=>setIsVisible(true)} alt='profile' src={userData[0]?.profileImage}></ProfileImage>
                <Container>
                    <Username id='public-profile-username'>{userData[0]?.username}</Username>
                    <Name id='public-profile-name'>{userData[0]?.name}</Name>
                    <Bio>{userData[0]?.bio}</Bio>
                </Container>
            </UserContainer>

            <PostsContainer>
            {userPosts?.map((post, index)=> {
                return(
                    <UserPrivateProfilesPosts getUserProfile={props.getUserProfile} post={post} history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} key={index} />
                )
            })}
            </PostsContainer>
            <div style={{marginBottom: '80px'}}></div>
        </div>
    )
}

const mapStateToProps = state => ({
    userData: state.app.userData,
    userInformation: state.app.userInformation,
    userPosts: state.app.userPosts,
})

export default connect(mapStateToProps)(UserPrivateProfile)