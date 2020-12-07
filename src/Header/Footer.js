import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { db } from '../Firebase'
import { ReactComponent as Add } from '../Icons/Add.svg'
import { ReactComponent as Profile } from '../Icons/Profile.svg'
import {
    Container,
    ProfileImage,
} from './Footer.styles'

const Footer = () => {

    const [imageURL, setImageURL] = useState('')

    const getProfileImage = () => {
        firebase.auth().onAuthStateChanged((user)=> {
            if(user) {
                // user.uid
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
    )
}

export default Footer