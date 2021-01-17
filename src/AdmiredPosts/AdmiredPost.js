import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import AdmiredDropdown from './AdmiredDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
// import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import {
    Container,
    Image,
    Title,
    Description,
    ImageTextContainer,
    More,
} from '../SavedPosts/SavedPost.styles'

const AdmiredPost = (props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showAddToCollection, setShowAddToCollection] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(true)
    const [showSpinner, setShowSpinner] = useState(true)

    const [collectionsList, setCollectionsList] = useState([])

    window.onclick = (e) => {
        if (!e.target.matches('.add-dropdown')) {
            setShowDropdown(false)
        }
    } 

    const removeFromSavedPostArray = () => {
        let dataCopy = [...props.savedPostsData]
        dataCopy.splice(props.index, 1)
        props.setSavedPostsData([...dataCopy])
    }

    const openAddToCollection = () => {
        setShowAddToCollection(true)
        const toNotLock = document.getElementById('add-to-collection-container')
        disableBodyScroll(toNotLock)
    }

    const closeAddToCollection = () => {
        setShowAddToCollection(false)
        const toNotLock = document.getElementById('add-to-collection-container')
        enableBodyScroll(toNotLock)
    }

    return(
        <Container opacity={isVisible ? 1 : 0}>
            {showAddToCollection ? 
            <div>
                <PopupDarken onClick={closeAddToCollection} />
                <AddToCollection showAddToCollection={showAddToCollection} setShowSpinner={setShowSpinner} showSpinner={showSpinner} closeAddToCollection={closeAddToCollection} removeFromSavedPostArray={removeFromSavedPostArray} photoInfo={props.post} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
            </div>
            :
            null
            }
            <ImageTextContainer>
            <Link to={`/photo-app/post/${props.post.postID}`}>
                <Image onLoad={()=>setIsVisible(true)} src={props.post.smallImage} />
            </Link>
            <div style={{display: 'flex', alignItems: 'start'}}>
                <div>
                    <Link to={`/photo-app/post/${props.post.postID}`} style={{textDecoration: 'none'}}>
                        <Title>{props.post.title}</Title>
                    </Link>
                    <Description>{props.post.previewDescription}</Description>
                </div>
                <div style={{position: 'relative'}}>
                    <More onClick={()=> setShowDropdown(!showDropdown)} className='add-dropdown'>&#8942;</More>
                    {showDropdown ? 
                    <AdmiredDropdown setShowSpinner={setShowSpinner} openAddToCollection={openAddToCollection} setShowDropdown={setShowDropdown} isRemoveFromSavedPage={true} index={props.index} removeFromSavedPostArray={removeFromSavedPostArray} translateContainer='translate(-90%, 5%)' setCollectionsList={setCollectionsList} id={props.post.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.post} />
                    :
                    null
                    }
                </div>
            </div>
            </ImageTextContainer>
        </Container>
    )
}

export default AdmiredPost