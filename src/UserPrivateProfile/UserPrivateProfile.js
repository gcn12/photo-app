import React, { useEffect, useState } from 'react'
import UserPrivateProfilesPosts from './UserPrivateProfilePosts'
import { connect } from 'react-redux'
import fitty from 'fitty'
// import disableScroll from 'disable-scroll'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import EditProfile from './EditProfile'
import {
    ProfileImage,
    Container,
    PostsContainer,
    Username,
    Name, 
    Bio,
    UserContainer,
    EditButton,
} from '../PublicProfile/PublicProfile.styles'
import { PopupDarken } from '../Styles/PopupStyles.styles'

const UserPrivateProfile = (props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [showEditProfile, setShowEditProfile] = useState(false)

    const { userInformation, getUserProfile } = props
    useEffect(()=> {
        window.scrollTo({top: 0})
        if(userInformation.id){
            getUserProfile(userInformation.id)
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

    const showDialog = () => {
        setShowEditProfile(true)
        // disableScroll.on()
        // const toNotLock = document.getElementById('edit-profile-container')
        // disableBodyScroll(toNotLock)
    }

    const closeDialog = () => {
        setShowEditProfile(false)
        const toNotLock = document.getElementById('edit-profile-container')
        enableBodyScroll(toNotLock)
        // disableScroll.off()
    }
    
    const { userData, userPosts } = props
    return(
        <div id='dialog' style={{marginTop: '10px', position: 'relative'}}>
            {showEditProfile ? 
            <div>
                <PopupDarken onClick={closeDialog} />
                <EditProfile showEditProfile={showEditProfile} closeDialog={closeDialog} getUserProfile={props.getUserProfile} userData={userData[0]} setShowEditProfile={setShowEditProfile} />
            </div>
            :
            null
            }
            <UserContainer visibility={isVisible ? 1 : 0}>
                <ProfileImage onLoad={()=>setIsVisible(true)} alt='profile' src={userData[0]?.profileImage}></ProfileImage>
                <Container>
                    <Username id='public-profile-username'>{userData[0]?.username}</Username>
                    <Name id='public-profile-name'>{userData[0]?.name}</Name>
                    <Bio>{userData[0]?.bio}</Bio>
                    <EditButton onClick={showDialog}>Edit profile</EditButton>
                </Container>
            </UserContainer>

            <PostsContainer>
            {userPosts?.map((post, index)=> {
                return(
                    <UserPrivateProfilesPosts index={index} getUserProfile={props.getUserProfile} post={post} history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} key={index} />
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