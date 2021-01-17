import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import AddDropdown from '../MainPhotoDisplay/AddDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'

// import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import {
    Container,
    Image,
    Title,
    Description,
    ImageTextContainer,
    More,
    ContentContainer,
} from './SavedPost.styles'
import { PopupDarken } from '../Styles/PopupStyles.styles'

const SavedPost = (props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showAddToCollection, setShowAddToCollection] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(true)

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
                <PopupDarken />
                <AddToCollection closeAddToCollection={closeAddToCollection} removeFromSavedPostArray={removeFromSavedPostArray} photoInfo={props.post} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
            </div>
            :
            null
            }
            <ImageTextContainer>
                <Link to={`/photo-app/post/${props.post.postID}`}>
                    <Image onLoad={()=>setIsVisible(true)} src={props.post.smallImage} />
                </Link>
                <div style={{display: 'flex', alignItems: 'start'}}>
                    <ContentContainer>
                        <Link to={`/photo-app/post/${props.post.postID}/`} style={{textDecoration: 'none'}}>
                            <Title>{props.post.title}</Title>
                        </Link>
                        <Description>{props.post.previewDescription}</Description>
                    </ContentContainer>
                    <div style={{position: 'relative'}}>
                        <More onClick={()=> setShowDropdown(!showDropdown)} className='add-dropdown'>&#8942;</More>
                        {showDropdown ? 
                        <AddDropdown openAddToCollection={openAddToCollection} setShowDropdown={setShowDropdown} isRemoveFromSavedPage={true} index={props.index} removeFromSavedPostArray={removeFromSavedPostArray} translateContainer='translate(-90%, 5%)' setCollectionsList={setCollectionsList} id={props.post.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.post} />
                        :
                        null
                        }
                    </div>
                </div>
            </ImageTextContainer>
        </Container>
    )
}

export default SavedPost