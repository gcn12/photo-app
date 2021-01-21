import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { db } from '../Firebase'
import { ReactComponent as Add } from '../Icons/Add.svg'
import { connect } from 'react-redux'
import {
    Container,
    ProfileImage,
    Text,
    FooterContainer,
} from './Footer.styles'

const Footer = (props) => {

    const [imageURL, setImageURL] = useState('')

    const getProfileImage = () => {
        firebase.auth().onAuthStateChanged((user)=> {
            if(user) {
                db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc=> {
                    const data = doc.data()
                    if(data.profileImage) {
                        setImageURL(data.profileImage)
                    } else{
                        setImageURL("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptNy43NTMgMTguMzA1Yy0uMjYxLS41ODYtLjc4OS0uOTkxLTEuODcxLTEuMjQxLTIuMjkzLS41MjktNC40MjgtLjk5My0zLjM5My0yLjk0NSAzLjE0NS01Ljk0Mi44MzMtOS4xMTktMi40ODktOS4xMTktMy4zODggMC01LjY0NCAzLjI5OS0yLjQ4OSA5LjExOSAxLjA2NiAxLjk2NC0xLjE0OCAyLjQyNy0zLjM5MyAyLjk0NS0xLjA4NC4yNS0xLjYwOC42NTgtMS44NjcgMS4yNDYtMS40MDUtMS43MjMtMi4yNTEtMy45MTktMi4yNTEtNi4zMSAwLTUuNTE0IDQuNDg2LTEwIDEwLTEwczEwIDQuNDg2IDEwIDEwYzAgMi4zODktLjg0NSA0LjU4My0yLjI0NyA2LjMwNXoiLz48L3N2Zz4=")
                    }
                })
            }
        })
    }

    useEffect(()=> {
        getProfileImage()
    }, [])



    return(
        <FooterContainer visibility={props.profileLoaded ? 'visible' : 'hidden'}>
            {props.location.pathname.includes('/upload') ? 
            null
            :
            props.user ? 
            <Container>
                <Link to='/photo-app/upload'>
                    <Add style={{cursor: 'pointer'}} />
                </Link>
                <Link to='/photo-app/profile'>
                    <ProfileImage src={imageURL} alt='profile'></ProfileImage>
                </Link>
            </Container>
            :
            <Container>
                <Link to='/photo-app/signup' style={{textDecoration: 'none'}}>
                    <Text>Sign up</Text>
                </Link>
                <Link to='/photo-app/login' style={{textDecoration: 'none'}}>
                    <Text>Log in</Text>
                </Link>
            </Container>
            }
        </FooterContainer>
        )
}

const mapStateToProps = state => ({
    user: state.app.user,
    profileLoaded: state.app.profileLoaded,
})

export default connect(mapStateToProps)(Footer)
