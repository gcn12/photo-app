import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { profilePage } from '../Redux/Actions/profileActions'
import { user } from '../Redux/Actions/appActions'
import {
    Container,
    OptionIconContainer,
    OptionText,
    Options,
    Triangle,
} from '../Styles/DropdownStyles.styles'
// import {
//     Container,
//     Item,
// } from './ProfileDropdown.styles'

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
        <Container fontSize='20px' translateContainer='translate(-45%, 5%)' style={{zIndex: 3}} className='profile-dropdown'>
            <div style={{position: 'absolute'}}></div>
            <Triangle shift='translate(-130%, -90%)' />
            <Options>
                <OptionIconContainer>
                    <Link onClick={()=> props.dispatch(profilePage('saved'))} to='/photo-app/profile/saved' style={{ textDecoration: 'none' }}>
                        <OptionText>Saved</OptionText>
                    </Link>
                </OptionIconContainer>
                <OptionIconContainer>
                    <Link onClick={()=> props.dispatch(profilePage('collections'))} to='/photo-app/profile/collections' style={{ textDecoration: 'none' }}>
                        <OptionText>Collections</OptionText>
                    </Link>
                </OptionIconContainer>
                <OptionIconContainer>
                    <Link onClick={()=> props.dispatch(profilePage('posts'))} to='/photo-app/profile/posts' style={{ textDecoration: 'none' }}>
                        <OptionText>My posts</OptionText>
                    </Link>
                </OptionIconContainer>
                <OptionIconContainer>
                    <Link onClick={()=> props.dispatch(profilePage('settings'))} to='/photo-app/profile/settings' style={{ textDecoration: 'none' }}>
                        <OptionText>Settings</OptionText>
                    </Link>
                </OptionIconContainer>
                <OptionIconContainer>
                    <OptionText onClick={signoutWithRoute}>Sign out</OptionText>
                </OptionIconContainer>
            </Options>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(ProfileDropdown)