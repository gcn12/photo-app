import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import{ profilePage } from '../Redux/Actions/profileActions'
import { 
    UL, 
    HeaderContainer,
    LI,
} from './Profile.styles'

const ProfileHeaderDesktop = (props) => {
    return(
        <HeaderContainer>
            <UL>
                <Link to='/photo-app/profile/my-profile' onClick={()=>props.dispatch(profilePage('my profile'))} style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='my profile'  ? '1px solid #242424' : null}}>My profile</LI>
                </Link>
                <Link to='/photo-app/profile/saved' onClick={()=>props.dispatch(profilePage('saved'))} style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='saved'  ? '1px solid #242424' : null}}>Saved</LI>
                </Link>
                <Link to='/photo-app/profile/admired' onClick={()=>props.dispatch(profilePage('admired'))} style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='admired'  ? '1px solid #242424' : null}}>Admired</LI>
                </Link>
                <Link to='/photo-app/profile/collections' onClick={()=>props.dispatch(profilePage('collections'))} style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='collections'  ? '1px solid #242424' : null}}>Collections</LI>
                </Link>
            </UL>
        </HeaderContainer>
    )
}

const mapStateToProps = state => ({
    profilePage: state.profile.profilePage
})

export default connect(mapStateToProps)(ProfileHeaderDesktop)