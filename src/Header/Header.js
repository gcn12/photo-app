import React, { useState } from 'react'
import SubheaderPostsPage from './SubheaderPostsPage'
import SubheaderDropdown from './SubheaderSortMobile'
import SelectCategoryDropdownMobile from './SelectCategoryDropdownMobile'
import SubheaderSearch from './SubheaderSearch'
import Search from '../Search/Search'
import { disableBodyScroll } from 'body-scroll-lock'
import ProfileNavigationDropdown from './ProfileNavigationDropdown'
import { connect } from 'react-redux'
import { homePhotoInformation, profileLoaded, showLogin, showSignup } from '../Redux/Actions/appActions'
import { Link } from 'react-router-dom' 
import {
    Container,
    UL,
    LI,
    Border,
    Navigation,
    HeaderRight,
    ProfileImage,
    ProfileButton,
} from './Header.styles'

const Header = (props) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [showCategories, setShowCategories] = useState(false)

    const getAssortedAndDropOpacity = () => {
        props.dispatch(homePhotoInformation([]))
        let criteria = {
            location: '',
            country: '',
            category: 'all categories',
            views: true,
            new: false,
            rating: false,
        }
        props.sort(criteria, true)
    }

    window.onclick = (e) => {
        if (!e.target.matches('.profile-dropdown')) {
            setShowProfileDropdown(false)
        }
        if (!e.target.matches('.categories-dropdown')) {
            setShowCategories(false)
        }
    } 

    const openLogin = () => {
        disableBodyScroll(document.body)
        props.dispatch(showLogin(true))
    }

    const openSignup = () => {
        disableBodyScroll(document.body)
        props.dispatch(showSignup(true))
    }

    return(
        <div style={{position: 'fixed', top: 0, width: '100%', marginBottom: '20px', zIndex:4}}>
            {!props.location.pathname.includes('/photo-app/upload') ? 
            <Border>
                <SubheaderDropdown sort={props.sort} />
                <SelectCategoryDropdownMobile sort={props.sort} location={props.location} />
                <Container>
                    <UL>
                        <LI>
                            <Link onClick={getAssortedAndDropOpacity} to='/photo-app/posts/popular/all' style={{ textDecoration: 'none', color: '#242424' }}>
                                <Navigation>Wall</Navigation>
                            </Link>
                        </LI>
                        <LI>
                            <Link to='/photo-app/discover' style={{ textDecoration: 'none', color: '#242424' }}>
                                <Navigation>Discover</Navigation>
                            </Link>
                        </LI>
                    </UL>
                    <Search search={props.search} history={props.history} location={props.location} />
                    <HeaderRight visibility={props.profileLoaded ? 'visible' : 'hidden'}>
                        {props.user ? 
                        <Link to='/photo-app/upload' style={{ textDecoration: 'none' }}>
                            <Navigation cursor='pointer'>Upload</Navigation>
                        </Link>
                        :
                        <Navigation onClick={openSignup} cursor='pointer'>Signup</Navigation>
                        }
                        <Navigation>|</Navigation>
                        {props.user ? 
                        <div style={{position: 'relative'}}>
                            <ProfileButton className='profile-dropdown' onClick={()=>setShowProfileDropdown(!showProfileDropdown)} >
                                <ProfileImage onLoad={()=>props.dispatch(profileLoaded(true))} id='header-profile-image' className='profile-dropdown' src={props.userInformation.profileImageSmall} />
                            </ProfileButton>
                            {showProfileDropdown ? 
                            <ProfileNavigationDropdown setShowProfileDropdown={setShowProfileDropdown} history={props.history} />
                            :
                            null
                            }
                        </div>
                        :
                        <Navigation onClick={openLogin} cursor='pointer'>Log in</Navigation>
                        } 
                    </HeaderRight>
                </Container>
                {props.location.pathname.includes('/photo-app/posts') ? 
                <SubheaderPostsPage 
                    setShowCategories={setShowCategories}
                    showCategories={showCategories}
                    location={props.location}
                    sort={props.sort} 
                />
                :
                null
                }
                {props.location.pathname.includes('/photo-app/search') ? 
                <SubheaderSearch 
                    showCategories={showCategories}
                    search={props.search}
                    location={props.location}
                    sort={props.sort}  
                />
                :
                null
                }
                <div style={{marginBottom: '10px'}}></div>
            </Border>
            :
            null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    userInformation: state.app.userInformation,
    dropdownTransition: state.header.dropdownTransition,
    visibility: state.header.visibility,
    profileLoaded: state.app.profileLoaded,
})

export default connect(mapStateToProps)(Header)