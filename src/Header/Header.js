import React, { useState } from 'react'
import { db } from '../Firebase'
import SubheaderPosts from './SubheaderPosts'
import SubheaderDropdown from './SubheaderDropdown'
import CategoriesDropdown from './CategoriesDropdown'
import SearchDropdown from './SearchDropdown'
import SubheaderSearch from './SubheaderSearch'
import Search from '../Search/Search'
import ProfileDropdown from './ProfileDropdown'
import { connect } from 'react-redux'
import { homePhotoInformation, profileLoaded } from '../Redux/Actions/appActions'
import { searchTransition, searchVisibility, selected, selectedCategory } from '../Redux/Actions/headerActions'
import { ReactComponent as SearchIcon } from '../Icons/Search.svg'
import { Link } from 'react-router-dom' 
import {
    Container,
    UL,
    LI,
    Border,
    Navigation,
    HeaderRight,
    IconContainer,
    ProfileImage,
    CenterSearch,
} from './Header.styles'

const Header = (props) => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const [showCategories, setShowCategories] = useState(false)

    const sort = (value) => {
        props.dispatch(selected(value))
        db.collection('preview-posts')
        .orderBy(value, 'desc')
        .limit(10)
        .get()
        .then(data=> {
            const photoArray = []
            data.docs.forEach(item=> {
                photoArray.push(item.data())
            })
            setTimeout(()=> props.dispatch(homePhotoInformation([...photoArray])), 700)
        })
    }

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
            // setStartAfter(snapshot.docs[snapshot.docs.length-1])
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
                    // setStartAfter(snapshot.docs[snapshot.docs.length-1])
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
            // setStartAfter(snapshot.docs[snapshot.docs.length-1])
            const photosArray = []
            snapshot.docs.forEach(doc => {
                photosArray.push(doc.data())
            })
            setTimeout(()=> props.dispatch(homePhotoInformation([...photosArray])), 700)
        })
    }

    const startSearchTransition = () => {
        props.dispatch(searchVisibility(true))
        props.dispatch(searchTransition('transitionStart'))
        document.body.style.overflowY = 'hidden'
        // document.body.style.position = 'fixed'
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
        // if (!e.target.matches('.user-post-dropdown')) {
        //     props.setShowOptions(false)
        // }
    } 

    return(
        <div style={{position: 'fixed', top: 0, width: '100%', marginBottom: '20px', zIndex:2}}>
            {!props.location.pathname.includes('/photo-app/upload') ? 
            <Border>
                <SubheaderDropdown setIsMainPhotosVisible={props.setIsMainPhotosVisible} getAssortedPhotos={getAssortedPhotos} sort={sort}  />
                <CategoriesDropdown setIsMainPhotosVisible={props.setIsMainPhotosVisible} getCategoryPhotos={getCategoryPhotos} />
                <SearchDropdown  />
                <Container>
                    <UL>
                        <LI>
                            <Link onClick={getAssortedAndDropOpacity} to='/photo-app/posts/popular' style={{ textDecoration: 'none', color: '#242424' }}>
                                Wall
                            </Link>
                        </LI>
                        <LI>
                            <Link to='/photo-app/discover' style={{ textDecoration: 'none', color: '#242424' }}>
                                Discover
                            </Link>
                        </LI>
                    </UL>
                    <CenterSearch>
                        <Search search={props.search} history={props.history} location={props.location} />
                    </CenterSearch>
                    <IconContainer>
                        <SearchIcon onClick={startSearchTransition} style={{transform: 'scale(1)'}}></SearchIcon>
                    </IconContainer>
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
                            {props.userInformation.profileImage ? 
                            // <Avatar className='profile-dropdown' onClick={()=> setShowProfileDropdown(!showProfileDropdown)} style={{transform: 'scale(1.3)', position: 'relative', top: 4, cursor: 'pointer', margin: '0 5px'}} />
                            <ProfileImage onLoad={()=>props.dispatch(profileLoaded(true))} className='profile-dropdown' onClick={()=> setShowProfileDropdown(!showProfileDropdown)} src={props.userInformation.profileImage} />
                            :
                            <ProfileImage onLoad={()=>props.dispatch(profileLoaded(true))} className='profile-dropdown' onClick={()=> setShowProfileDropdown(!showProfileDropdown)} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptNy43NTMgMTguMzA1Yy0uMjYxLS41ODYtLjc4OS0uOTkxLTEuODcxLTEuMjQxLTIuMjkzLS41MjktNC40MjgtLjk5My0zLjM5My0yLjk0NSAzLjE0NS01Ljk0Mi44MzMtOS4xMTktMi40ODktOS4xMTktMy4zODggMC01LjY0NCAzLjI5OS0yLjQ4OSA5LjExOSAxLjA2NiAxLjk2NC0xLjE0OCAyLjQyNy0zLjM5MyAyLjk0NS0xLjA4NC4yNS0xLjYwOC42NTgtMS44NjcgMS4yNDYtMS40MDUtMS43MjMtMi4yNTEtMy45MTktMi4yNTEtNi4zMSAwLTUuNTE0IDQuNDg2LTEwIDEwLTEwczEwIDQuNDg2IDEwIDEwYzAgMi4zODktLjg0NSA0LjU4My0yLjI0NyA2LjMwNXoiLz48L3N2Zz4=" />
                            }
                            {/* <Navigation className='profile-dropdown' onClick={()=> setShowProfileDropdown(!showProfileDropdown)} cursor='pointer'>
                            </Navigation> */}
                            {showProfileDropdown ? 
                            <ProfileDropdown setShowProfileDropdown={setShowProfileDropdown} history={props.history} />
                            :
                            null
                            }
                        </div>
                        :
                        <Link to='/photo-app/login' style={{ textDecoration: 'none' }}>
                            <Navigation cursor='pointer'>Log in</Navigation>
                            {/* <Navigation onClick={()=>props.setShowLogin(true)} cursor='pointer'>Log in</Navigation> */}
                        </Link>
                        } 
                    </HeaderRight>
                </Container>
                {props.location.pathname.includes('/photo-app/posts') ? 
                <SubheaderPosts 
                    setShowCategories={setShowCategories}
                    showCategories={showCategories}
                    location={props.location}
                    sort={props.sort} 
                    setIsMainPhotosVisible={props.setIsMainPhotosVisible} 
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
                    setIsMainPhotosVisible={props.setIsMainPhotosVisible} 
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