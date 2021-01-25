import React, { useState } from 'react'
import { db } from '../Firebase'
import SubheaderPostsPage from './SubheaderPostsPage'
import SubheaderDropdown from './SubheaderSortMobile'
import SelectCategoryDropdownMobile from './SelectCategoryDropdownMobile'
import SubheaderSearch from './SubheaderSearch'
import Search from '../Search/Search'
import ProfileNavigationDropdown from './ProfileNavigationDropdown'
import { connect } from 'react-redux'
import { homePhotoInformation, profileLoaded } from '../Redux/Actions/appActions'
import { 
    selected, 
    selectedCategory, 
} from '../Redux/Actions/headerActions'
import { Link } from 'react-router-dom' 
import {
    Container,
    UL,
    LI,
    Border,
    Navigation,
    HeaderRight,
    ProfileImage,
} from './Header.styles'

const Header = (props) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [showCategories, setShowCategories] = useState(false)

    const getAssortedPhotos = () => {
        props.dispatch(selected('assorted'))
        let randomString = ''
        const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
        for (let i = 0; i < 8; i++) {
            randomString += values[Math.floor(Math.random() * 62)]
        }
        window.scrollTo({top: 0})
        db.collection('preview-posts')
        .orderBy('id', 'asc')
        .where('id', '>=', randomString)
        .limit(28)
        .get()
        .then(snapshot => {
            const photosArray = []
            snapshot.docs.forEach(doc => {
                photosArray.push(doc.data())
            })
            if(photosArray.length===0) {
                db.collection('preview-posts')
                .orderBy('id', 'asc')
                .where('id', '<=', randomString)
                .limit(28)
                .get()
                .then(snapshot => {
                    const photosArray = []
                    snapshot.docs.forEach(doc => {
                        photosArray.push(doc.data())
                    })
                    setTimeout(()=> props.dispatch(homePhotoInformation([...photosArray])), 700)
                })
            }else{
                props.dispatch(homePhotoInformation(photosArray))
            }
        })
    }

    const getCategoryPhotos = (category) => {
        props.dispatch(selectedCategory(category))
        window.scrollTo({top: 0})
        db.collection('preview-posts')
        .where('category', '==', category)
        .limit(28)
        .get()
        .then(snapshot => {
            const photosArray = []
            snapshot.docs.forEach(doc => {
                photosArray.push(doc.data())
            })
            setTimeout(()=> props.dispatch(homePhotoInformation([...photosArray])), 700)
        })
    }

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

    return(
        <div style={{position: 'fixed', top: 0, width: '100%', marginBottom: '20px', zIndex:2}}>
            {!props.location.pathname.includes('/photo-app/upload') ? 
            <Border>
                <SubheaderDropdown getAssortedPhotos={getAssortedPhotos} sort={props.sort} />
                <SelectCategoryDropdownMobile sort={props.sort} location={props.location} getCategoryPhotos={getCategoryPhotos} />
                <Container>
                    <UL>
                        <LI>
                            <Link onClick={getAssortedAndDropOpacity} to='/photo-app/posts/popular' style={{ textDecoration: 'none', color: '#242424' }}>
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
                        <Link to='/photo-app/signup' style={{ textDecoration: 'none' }}>
                            <Navigation cursor='pointer'>Signup</Navigation>
                        </Link>
                        }
                        <Navigation>|</Navigation>
                        {props.user ? 
                        <div style={{position: 'relative'}}>
                            <ProfileImage onClick={()=> setShowProfileDropdown(!showProfileDropdown)} onLoad={()=>props.dispatch(profileLoaded(true))} id='header-profile-image' className='profile-dropdown' src={props.userInformation.profileImage} />
                            {showProfileDropdown ? 
                            <ProfileNavigationDropdown setShowProfileDropdown={setShowProfileDropdown} history={props.history} />
                            :
                            null
                            }
                        </div>
                        :
                        <Link to='/photo-app/login' style={{ textDecoration: 'none' }}>
                            <Navigation cursor='pointer'>Log in</Navigation>
                        </Link>
                        } 
                    </HeaderRight>
                </Container>
                {props.location.pathname.includes('/photo-app/posts') ? 
                <SubheaderPostsPage 
                    setShowCategories={setShowCategories}
                    showCategories={showCategories}
                    location={props.location}
                    sort={props.sort} 
                    getCategoryPhotos={getCategoryPhotos} 
                    getAssortedPhotos={getAssortedPhotos} 
                />
                :
                null
                }
                {props.location.pathname.includes('/photo-app/search') ? 
                <SubheaderSearch 
                    setShowCategories={setShowCategories}
                    showCategories={showCategories}
                    search={props.search}
                    location={props.location}
                    sort={props.sort}  
                    getCategoryPhotos={getCategoryPhotos} 
                    getAssortedPhotos={getAssortedPhotos} 
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