import React, { useState } from 'react'
import { db } from '../Firebase'
import Subheader from './Subheader'
import SubheaderDropdown from './SubheaderDropdown'
import CategoriesDropdown from './CategoriesDropdown'
import SearchDropdown from './SearchDropdown'
import Search from '../Search/Search'
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
    const [selected, setSelected] = useState('assorted')
    const [selectedCategory, setSelectedCategory] = useState('')

    const sort = (value) => {
        setSelected(value)
        db.collection('preview-posts').orderBy(value, 'desc')
        .limit(10)
        .get()
        .then(data=> {
            const photoArray = []
            data.docs.forEach(item=> {
                photoArray.push(item.data())
            })
            props.setHomePhotoInformation([...photoArray])
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
                    props.setHomePhotoInformation(photosArray)
                })
            }else{
                props.setHomePhotoInformation(photosArray)
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
            props.setHomePhotoInformation(photosArray)
        })
    }

    const startSearchTransition = () => {
        setSearchVisibility(true)
        setSearchTransition('transitionStart')
    }

    return(
        <div style={{position: 'fixed', top: 0, width: '100%', marginBottom: '20px', zIndex:2}}>
            {!props.location.pathname.includes('/photo-app/upload') ? 
            <Border>
                <SubheaderDropdown getAssortedPhotos={getAssortedPhotos} sort={sort} setSelected={setSelected} selected={selected} setHomePhotoInformation={props.setHomePhotoInformation} setVisibility={setVisibility} visibility={visibility} dropdownTransition={dropdownTransition} setDropdownTransition={setDropdownTransition}/>
                <CategoriesDropdown selectedCategory={selectedCategory} getCategoryPhotos={getCategoryPhotos} dropdownCategoriesTransition={dropdownCategoriesTransition} categoriesVisibility={categoriesVisibility} setCategoriesVisibility={setCategoriesVisibility} setDropdownCategoriesTransition={setDropdownCategoriesTransition}/>
                <SearchDropdown setSearchVisibility={setSearchVisibility} searchVisibility={searchVisibility} setSearchTransition={setSearchTransition} searchTransition={searchTransition} />
                <Container>
                    <UL>
                        <Link onClick={getAssortedPhotos} to='/photo-app/posts' style={{ textDecoration: 'none' }}>
                            <LI>Wall</LI>
                        </Link>
                        <Link to='/photo-app/discover' style={{ textDecoration: 'none' }}>
                            <LI>Discover</LI>
                        </Link>
                    </UL>
                    <Search />
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
                <Subheader setIsMainPhotosVisible={props.setIsMainPhotosVisible} setCategoriesVisibility={setCategoriesVisibility} setDropdownCategoriesTransition={setDropdownCategoriesTransition} getCategoryPhotos={getCategoryPhotos} getAssortedPhotos={getAssortedPhotos} displayView={props.displayView} setDisplayView={props.setDisplayView} sort={sort} setSelected={setSelected} selected={selected} setVisibility={setVisibility} setDropdownTransition={setDropdownTransition} setHomePhotoInformation={props.setHomePhotoInformation}/>
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

export default Header