import React from 'react'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { ReactComponent as FilledBookmark } from '../Icons/FilledBookmark.svg'
import { ReactComponent as Profile } from '../Icons/Profile.svg'
import { ReactComponent as Collections } from '../Icons/Collections.svg'
import { ReactComponent as Plane } from '../Icons/Plane.svg'
import { connect } from 'react-redux'
import { profilePage } from '../Redux/Actions/profileActions'
import { user, userPosts, userData } from '../Redux/Actions/appActions'
import {
    Container,
    OptionIconContainerNoButton,
    OptionText,
    Options,
    Triangle,
    OptionIcon,
} from '../Styles/DropdownStyles.styles'

const ProfileNavigationDropdown = (props) => {

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

    const pageRoute = (pageName) => {
        if(pageName !== props.profilePage) {
            if(pageName !== props.profileName) {
                if(pageName==='my profile') {
                    clearDataOnProfileView()
                    // props.dispatch(profilePage('my profile'))
                }
                props.dispatch(profilePage(pageName))
            }
        }
        props.setShowProfileDropdown(false)
    }

    const clearDataOnProfileView = () => {
        props.dispatch(userData([]))
        props.dispatch(userPosts([]))
    }

    return(
        <Container fontSize='20px' translateContainer='translate(-70%, 5%)' style={{zIndex: 3}} className='profile-dropdown'>
            <div style={{position: 'absolute'}}></div>
            <Triangle shift='translate(-130%, -90%)' />
            <Options>

                <Link onClick={()=> pageRoute('my profile')} to='/photo-app/profile/my-profile' style={{ textDecoration: 'none' }}>
                    <OptionIconContainerNoButton>
                        <OptionIcon>
                            <Profile style={{transform: 'scale(.8)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>My profile</OptionText>
                    </OptionIconContainerNoButton>
                </Link>
                
                <Link onClick={()=> pageRoute('saved')} to='/photo-app/profile/saved' style={{ textDecoration: 'none' }}>
                    <OptionIconContainerNoButton radius='5px 5px 0 0'>
                        <OptionIcon>
                            <FilledBookmark style={{transform: 'scale(.9)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>Saved</OptionText>
                    </OptionIconContainerNoButton>
                </Link>

               

                <Link onClick={()=> pageRoute('admired')} to='/photo-app/profile/admired' style={{ textDecoration: 'none' }}>
                    <OptionIconContainerNoButton radius='5px 5px 0 0'>
                        <OptionIcon>
                        <img alt='' style={{transform: 'scale(.8)', position: 'relative', top: 4}} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgNC4yNDhjLTMuMTQ4LTUuNDAyLTEyLTMuODI1LTEyIDIuOTQ0IDAgNC42NjEgNS41NzEgOS40MjcgMTIgMTUuODA4IDYuNDMtNi4zODEgMTItMTEuMTQ3IDEyLTE1LjgwOCAwLTYuNzkyLTguODc1LTguMzA2LTEyLTIuOTQ0eiIvPjwvc3ZnPg==" />
                        </OptionIcon>
                        <OptionText>Admired posts</OptionText>
                    </OptionIconContainerNoButton>
                </Link>
                <Link onClick={()=> pageRoute('collections')} to='/photo-app/profile/collections' style={{ textDecoration: 'none' }}>
                    <OptionIconContainerNoButton>
                        <OptionIcon>
                            <Collections style={{transform: 'scale(.8)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>Collections</OptionText>
                    </OptionIconContainerNoButton>
                </Link>
                <div style={{marginBottom: '10px'}}></div>
                <Link onClick={signoutWithRoute} to='/photo-app/posts/popular/all' style={{ textDecoration: 'none' }}>
                    <OptionIconContainerNoButton radius='0 0 5px 5px'>
                        <OptionIcon>
                            <Plane style={{transform: 'scale(.8)', position: 'relative', top: 4}} />
                        </OptionIcon>
                        <OptionText>Sign out</OptionText>
                    </OptionIconContainerNoButton>
                </Link>
            </Options>
        </Container>
    )
}

const mapStateToProps = state => ({
    userInformation: state.app.userInformation,
    profilePage: state.profile.profilePage
})

export default connect(mapStateToProps)(ProfileNavigationDropdown)