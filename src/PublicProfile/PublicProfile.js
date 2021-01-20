import React, { useEffect, useState } from 'react'
import PublicProfilePosts from './PublicProfilePosts'
import { connect } from 'react-redux'
import { db } from '../Firebase'
import fitty from 'fitty'
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

    const [isVisible, setIsVisible] = useState(false)

    useEffect(()=> {
        window.scrollTo({top: 0})
        db.collection('users')
        .where('username', '==', props.match.params.username)
        .get()
        .then(data=> {
            props.getUserProfile(data.docs[0].data().id)
        })
        .catch(err=>console.log(err))
        fitty('#public-profile-username', {
            minSize: 1,
            maxSize: 30
        })
        fitty('#public-profile-name', {
            minSize: 1,
            maxSize: 20
        })
        // eslint-disable-next-line
    }, [])

    
    const { userData, userPosts } = props
    return(
        <div style={{marginTop: '55px'}}>
            <UserContainer visibility={isVisible ? 1 : 0}>
                {userData[0]?.profileImage ? 
                <ProfileImage onLoad={()=>setIsVisible(true)} alt='profile' src={userData[0]?.profileImage}></ProfileImage>
                :
                <ProfileImage onLoad={()=>setIsVisible(true)} alt='profile' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAyNGgtMjR2LTI0aDI0djI0em0tMi0yMmgtMjB2MjBoMjB2LTIwem0tNC4xMTggMTQuMDY0Yy0yLjI5My0uNTI5LTQuNDI3LS45OTMtMy4zOTQtMi45NDUgMy4xNDYtNS45NDIuODM0LTkuMTE5LTIuNDg4LTkuMTE5LTMuMzg4IDAtNS42NDMgMy4yOTktMi40ODggOS4xMTkgMS4wNjQgMS45NjMtMS4xNSAyLjQyNy0zLjM5NCAyLjk0NS0yLjA0OC40NzMtMi4xMjQgMS40OS0yLjExOCAzLjI2OWwuMDA0LjY2N2gxNS45OTNsLjAwMy0uNjQ2Yy4wMDctMS43OTItLjA2Mi0yLjgxNS0yLjExOC0zLjI5eiIvPjwvc3ZnPg==" />
                }
                <Container>
                <Username id='public-profile-username'>{userData[0]?.username}</Username>
                    <Name id='public-profile-name'>{userData[0]?.name}</Name>
                    <Bio>{userData[0]?.bio}</Bio>
                </Container>
            </UserContainer>

            <PostsContainer>
            {userPosts?.map((post, index)=> {
                return(
                    <PublicProfilePosts marginTop='30px' minWidth='200px' height='220px' post={post} history={props.history} getFeaturedPhotoInfo={props.getFeaturedPhotoInfo} key={index} />
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