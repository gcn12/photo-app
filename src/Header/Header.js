import React, { useState } from 'react'
import { db } from '../Firebase'
import SubheaderPosts from './SubheaderPosts'
import SubheaderDropdown from './SubheaderDropdown'
import CategoriesDropdown from './CategoriesDropdown'
import SearchDropdown from './SearchDropdown'
import SubheaderSearch from './SubheaderSearch'
import Search from '../Search/Search'
import { connect } from 'react-redux'
import { homePhotoInformation } from '../Redux/Actions/appActions'
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
} from './Header.styles'

const Header = (props) => {

    const [dropdownTransition, setDropdownTransition] = useState('initial')
    const [visibility, setVisibility] = useState(false)
    const [dropdownCategoriesTransition, setDropdownCategoriesTransition] = useState('initial')
    const [categoriesVisibility, setCategoriesVisibility] = useState(false)
    const [searchTransition, setSearchTransition] = useState('initial')
    const [searchVisibility, setSearchVisibility] = useState(false)
    const [selected, setSelected] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')

    const sort = (value) => {
        setSelected(value)
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
        setSelected('assorted')
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
        setSelectedCategory(category)
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
        setSearchVisibility(true)
        setSearchTransition('transitionStart')
        document.body.style.overflowY = 'hidden'
        // document.body.style.position = 'fixed'
    }

    const getAssortedAndDropOpacity = () => {
        props.dispatch(homePhotoInformation([]))
        let criteria = {
            city: '',
            country: '',
            continent: '',
            category: 'all categories',
            views: true,
            new: false,
            rating: false,
        }
        props.sort(criteria, true)
    }

    return(
        <div style={{position: 'fixed', top: 0, width: '100%', marginBottom: '20px', zIndex:2}}>
            {!props.location.pathname.includes('/photo-app/upload') ? 
            <Border>
                <SubheaderDropdown setIsMainPhotosVisible={props.setIsMainPhotosVisible} getAssortedPhotos={getAssortedPhotos} sort={sort} setSelected={setSelected} selected={selected} setVisibility={setVisibility} visibility={visibility} dropdownTransition={dropdownTransition} setDropdownTransition={setDropdownTransition}/>
                <CategoriesDropdown setIsMainPhotosVisible={props.setIsMainPhotosVisible} selectedCategory={selectedCategory} getCategoryPhotos={getCategoryPhotos} dropdownCategoriesTransition={dropdownCategoriesTransition} categoriesVisibility={categoriesVisibility} setCategoriesVisibility={setCategoriesVisibility} setDropdownCategoriesTransition={setDropdownCategoriesTransition}/>
                <SearchDropdown setSearchVisibility={setSearchVisibility} searchVisibility={searchVisibility} setSearchTransition={setSearchTransition} searchTransition={searchTransition} />
                <Container>
                    <UL>
                        <Link onClick={getAssortedAndDropOpacity} to='/photo-app/posts/popular' style={{ textDecoration: 'none' }}>
                            <LI>Wall</LI>
                        </Link>
                        <Link to='/photo-app/discover' style={{ textDecoration: 'none' }}>
                            <LI>Discover</LI>
                        </Link>
                    </UL>
                    <Search 
                    search={props.search} history={props.history} location={props.location} />
                    <IconContainer>
                        <SearchIcon onClick={startSearchTransition} style={{transform: 'scale(1)'}}></SearchIcon>
                    </IconContainer>
                    <HeaderRight>
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
                        <Link to='/photo-app/profile' style={{ textDecoration: 'none' }}>
                            <Navigation cursor='pointer'>Profile</Navigation>
                        </Link>
                        :
                        <Link to='/photo-app/login' style={{ textDecoration: 'none' }}>
                            <Navigation cursor='pointer'>Log in</Navigation>
                        </Link>
                        } 
                    </HeaderRight>
                </Container>
                {props.location.pathname.includes('/photo-app/posts') ? 
                <SubheaderPosts 
                    location={props.location}
                    sort={props.sort} 
                    setIsMainPhotosVisible={props.setIsMainPhotosVisible} 
                    setCategoriesVisibility={setCategoriesVisibility} 
                    setDropdownCategoriesTransition={setDropdownCategoriesTransition} 
                    getCategoryPhotos={getCategoryPhotos} 
                    getAssortedPhotos={getAssortedPhotos} 
                    setSelected={setSelected} 
                    selected={selected} 
                    setVisibility={setVisibility} 
                    setDropdownTransition={setDropdownTransition} 
                />
                :
                null
                }
                {props.location.pathname.includes('/photo-app/search') ? 
                <SubheaderSearch 
                    search={props.search}
                    location={props.location}
                    sort={props.sort}  
                    setIsMainPhotosVisible={props.setIsMainPhotosVisible} 
                    setCategoriesVisibility={setCategoriesVisibility} 
                    setDropdownCategoriesTransition={setDropdownCategoriesTransition} 
                    getCategoryPhotos={getCategoryPhotos} 
                    getAssortedPhotos={getAssortedPhotos} 
                    setSelected={setSelected} 
                    selected={selected} 
                    setVisibility={setVisibility} 
                    setDropdownTransition={setDropdownTransition} 
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
    user: state.app.user
})

export default connect(mapStateToProps)(Header)