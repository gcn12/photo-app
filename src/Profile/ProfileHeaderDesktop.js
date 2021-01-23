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
                <Link to='/photo-app/profile/my-profile' style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='my profile'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('my profile'))}>My profile</LI>
                </Link>
                <Link to='/photo-app/profile/saved' style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='saved'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('saved'))}>Saved</LI>
                </Link>
                <Link to='/photo-app/profile/admired' style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='admired'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('admired'))}>Admired</LI>
                </Link>
                <Link to='/photo-app/profile/collections' style={{textDecoration: 'none'}}>
                    <LI style={{borderBottom: props.profilePage==='collections'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('collections'))}>Collections</LI>
                </Link>
            </UL>
        </HeaderContainer>
    )
}

const mapStateToProps = state => ({
    profilePage: state.profile.profilePage
})

export default connect(mapStateToProps)(ProfileHeaderDesktop)