import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import{ profilePage } from '../Redux/Actions/profileActions'
import { 
    MobileNavigation,
    MobileUL,
    Navigation,
    MobileLI,
    MobileContainer,
    ArrowIcon,
    PageName
} from './Profile.styles'

const ProfileHeaderMobile = (props) => {

    const [toggleNavigation, setToggleNavigation] = useState(false)

    return(
        <MobileContainer>
            <MobileNavigation height={toggleNavigation ? '200px' : '0px'}>
                <MobileUL>
                    <Link onClick={()=>setToggleNavigation(false)} to='/photo-app/profile/my-profile' style={{textDecoration: 'none'}}>
                        <MobileLI style={{borderBottom: props.profilePage==='my profile'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('my profile'))}>My profile</MobileLI>
                    </Link>
                    <Link onClick={()=>setToggleNavigation(false)} to='/photo-app/profile/saved' style={{textDecoration: 'none'}}>
                        <MobileLI style={{borderBottom: props.profilePage==='saved'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('saved'))}>Saved</MobileLI>
                    </Link>
                    <Link onClick={()=>setToggleNavigation(false)} to='/photo-app/profile/admired' style={{textDecoration: 'none'}}>
                        <MobileLI style={{borderBottom: props.profilePage==='admired'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('admired'))}>Admired</MobileLI>
                    </Link>
                    <Link onClick={()=>setToggleNavigation(false)} to='/photo-app/profile/collections' style={{textDecoration: 'none'}}>
                        <MobileLI style={{borderBottom: props.profilePage==='collections'  ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('collections'))}>Collections</MobileLI>
                    </Link>
                    <Link onClick={()=>setToggleNavigation(false)} to='/photo-app/profile/settings' style={{textDecoration: 'none'}}>
                        <MobileLI style={{borderBottom: props.profilePage==='settings' ? '1px solid #242424' : null}} onClick={()=>props.dispatch(profilePage('settings'))}>Settings</MobileLI>
                    </Link>
                </MobileUL>
            </MobileNavigation>
            <Navigation onClick={()=>setToggleNavigation(!toggleNavigation)}>
                <PageName>{props.profilePage ? props.profilePage : 'My profile'}</PageName>
                <div style={{marginRight: '4px'}}></div>
                <ArrowIcon alt='' rotate={toggleNavigation ? 'rotate(180deg)' : 'rotate(0deg)'} src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMy4yNDUgNGwtMTEuMjQ1IDE0LjM3NC0xMS4yMTktMTQuMzc0LS43ODEuNjE5IDEyIDE1LjM4MSAxMi0xNS4zOTEtLjc1NS0uNjA5eiIvPjwvc3ZnPg==" />
                </Navigation>
        </MobileContainer>
    )
}

const mapStateToProps = state => ({
    profilePage: state.profile.profilePage
})

export default connect(mapStateToProps)(ProfileHeaderMobile)