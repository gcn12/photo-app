import React, { useEffect, useState } from 'react'
import UserPrivateProfilesPosts from './UserPrivateProfilePosts'
import { connect } from 'react-redux'
import fitty from 'fitty'
// import disableScroll from 'disable-scroll'
import { enableBodyScroll } from 'body-scroll-lock'
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
                <PopupDarken />
                <EditProfile showEditProfile={showEditProfile} closeDialog={closeDialog} getUserProfile={props.getUserProfile} userData={userData[0]} setShowEditProfile={setShowEditProfile} />
            </div>
            :
            null
            }
            <UserContainer visibility={isVisible ? 1 : 0}>
                {/* { */}
                {/* // userData[0]?.isProfileImage ?  */}
                <ProfileImage onLoad={()=>setIsVisible(true)} alt='profile' id='user-private-profile-image' src={userData[0]?.profileImage}></ProfileImage>
                {/* : */}
                {/* // <ProfileImage onLoad={()=>setIsVisible(true)} alt='profile' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyNGgtMjR2LTI0aDI0djI0em0tMi0yMmgtMjB2MjBoMjB2LTIwem0tNC4xMTggMTQuMDY0Yy0yLjI5My0uNTI5LTQuNDI3LS45OTMtMy4zOTQtMi45NDUgMy4xNDYtNS45NDIuODM0LTkuMTE5LTIuNDg4LTkuMTE5LTMuMzg4IDAtNS42NDMgMy4yOTktMi40ODggOS4xMTkgMS4wNjQgMS45NjMtMS4xNSAyLjQyNy0zLjM5NCAyLjk0NS0yLjA0OC40NzMtMi4xMjQgMS40OS0yLjExOCAzLjI2OWwuMDA0LjY2N2gxNS45OTNsLjAwMy0uNjQ2Yy4wMDctMS43OTItLjA2Mi0yLjgxNS0yLjExOC0zLjI5eiIvPjwvc3ZnPg==" /> */}
                {/* } */}
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