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