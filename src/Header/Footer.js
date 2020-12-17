import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { db } from '../Firebase'
import { ReactComponent as Add } from '../Icons/Add.svg'
import { ReactComponent as Profile } from '../Icons/Profile.svg'
import {
    Container,
    ProfileImage,
    Text,
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
                    setImageURL(data.profileImage)
                })
            }
        })
    }

    useEffect(()=> {
        getProfileImage()
    }, [])



    return(
        <div>
            {props.location.pathname.includes('/upload') ? 
            null
            :
            props.user ? 
            <Container>
                <Link to='/photo-app/upload'>
                    <Add style={{cursor: 'pointer'}} />
                </Link>
                <Link to='/photo-app/profile'>
                    {imageURL.length>0 ? 
                    <ProfileImage src={imageURL} alt='profile'></ProfileImage>
                    :
                    <Profile style={{cursor: 'pointer'}} />
                    }
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
        </div>
        )
}

export default Footer