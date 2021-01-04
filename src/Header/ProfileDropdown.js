import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { profilePage } from '../Redux/Actions/profileActions'
import { user } from '../Redux/Actions/appActions'
import {
    Container,
    Item,
} from './ProfileDropdown.styles'

const ProfileDropdown = (props) => {

    const signoutWithRoute = () => {
        props.history.push('/photo-app/posts')
        firebase.auth().signOut()
        .then(()=>props.dispatch(user('')))
        .catch(error=>console.log(error))
    }

    window.onclick = (e) => {
        if (!e.target.matches('.profile-dropdown')) {
            props.setShowProfileDropdown(false)
        }
    } 

    return(
        <Container className='profile-dropdown'>
            <Link onClick={()=> props.dispatch(profilePage('saved'))} to='/photo-app/profile/saved' style={{ textDecoration: 'none' }}>
                <Item>Saved</Item>
            </Link>
            <Link onClick={()=> props.dispatch(profilePage('collections'))} to='/photo-app/profile/collections' style={{ textDecoration: 'none' }}>
                <Item>Collections</Item>
            </Link>
            <Link onClick={()=> props.dispatch(profilePage('posts'))} to='/photo-app/profile/posts' style={{ textDecoration: 'none' }}>
                <Item>My posts</Item>
            </Link>
            <Link onClick={()=> props.dispatch(profilePage('settings'))} to='/photo-app/profile/settings' style={{ textDecoration: 'none' }}>
                <Item>Settings</Item>
            </Link>
            <Item onClick={signoutWithRoute}>Sign out</Item>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(ProfileDropdown)