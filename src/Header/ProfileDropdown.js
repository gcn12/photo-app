import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { ReactComponent as FilledBookmark } from '../Icons/FilledBookmark.svg'
import { ReactComponent as FilledHeart } from '../Icons/FilledHeart.svg'
import { ReactComponent as Collections } from '../Icons/Collections.svg'
import { ReactComponent as Plane } from '../Icons/Plane.svg'
import { ReactComponent as Gear } from '../Icons/Gear.svg'
import { connect } from 'react-redux'
import { profilePage } from '../Redux/Actions/profileActions'
import { user } from '../Redux/Actions/appActions'
import {
    Container,
    OptionIconContainer,
    OptionText,
    Options,
    Triangle,
    OptionIcon,
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
        <Container fontSize='20px' translateContainer='translate(-70%, 5%)' style={{zIndex: 3}} className='profile-dropdown'>
            <div style={{position: 'absolute'}}></div>
            <Triangle shift='translate(-130%, -90%)' />
            <Options>
                <OptionIconContainer>
                    <Link onClick={()=> props.dispatch(profilePage('posts'))} to='/photo-app/profile/posts' style={{ textDecoration: 'none' }}>
                        <OptionText>My posts</OptionText>
                    </Link>
                </OptionIconContainer>
                <OptionIconContainer>
                    <Link onClick={()=> props.dispatch(profilePage('posts'))} to={`/photo-app/profiles/${props.userInformation.username}`} style={{ textDecoration: 'none' }}>
                        <OptionText>My profile</OptionText>
                    </Link>
                </OptionIconContainer>
                <Link onClick={()=> props.dispatch(profilePage('saved'))} to='/photo-app/profile/saved' style={{ textDecoration: 'none' }}>
                    <OptionIconContainer radius='5px 5px 0 0'>
                        <OptionIcon>
                            <FilledBookmark style={{transform: 'scale(.9)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>Saved</OptionText>
                    </OptionIconContainer>
                </Link>

                <Link onClick={()=> props.dispatch(profilePage('admired'))} to='/photo-app/profile/admired' style={{ textDecoration: 'none' }}>
                    <OptionIconContainer radius='5px 5px 0 0'>
                        <OptionIcon>
                            <FilledHeart style={{transform: 'scale(.8)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>Admired posts</OptionText>
                    </OptionIconContainer>
                </Link>
                <Link onClick={()=> props.dispatch(profilePage('collections'))} to='/photo-app/profile/collections' style={{ textDecoration: 'none' }}>
                    <OptionIconContainer>
                        <OptionIcon>
                            <Collections style={{transform: 'scale(.8)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>Collections</OptionText>
                    </OptionIconContainer>
                </Link>
                <div style={{marginBottom: '10px'}}></div>
                <Link onClick={()=> props.dispatch(profilePage('settings'))} to='/photo-app/profile/settings' style={{ textDecoration: 'none' }}>
                    <OptionIconContainer>
                        <OptionIcon>
                            <Gear style={{transform: 'scale(.8)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>Settings</OptionText>
                    </OptionIconContainer>
                </Link>
                <OptionIconContainer radius='0 0 5px 5px'>
                    <OptionIcon>
                        <Plane style={{transform: 'scale(.8)', position: 'relative', top: 4}} />
                    </OptionIcon>
                    <OptionText onClick={signoutWithRoute}>Sign out</OptionText>
                </OptionIconContainer>
            </Options>
        </Container>
    )
}

const mapStateToProps = state => ({
    userInformation: state.app.userInformation,
})

export default connect(mapStateToProps)(ProfileDropdown)