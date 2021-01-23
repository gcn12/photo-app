import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import AddDropdown from '../MainPhotoDisplay/AddDropdown'
import { connect } from 'react-redux'
import { isPostVisible, isVisible } from '../Redux/Actions/featuredPostActions'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { enableBodyScroll } from 'body-scroll-lock'

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

    const [isSavedPostVisible, setIsSavedPostVisible] = useState(false)
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
    }

    const closeAddToCollection = () => {
        setShowAddToCollection(false)
        const toNotLock = document.getElementById('add-to-collection-container')
        enableBodyScroll(toNotLock)
    }

    const selectPost = () => {
        props.dispatch(isPostVisible(false))
        props.dispatch(isVisible(false))    
    }

    return(
        <Container opacity={isSavedPostVisible ? 1 : 0}>
            {showAddToCollection ? 
            <div>
                <PopupDarken onClick={closeAddToCollection} />
                <AddToCollection setShowSpinner={setShowSpinner} showSpinner={showSpinner} closeAddToCollection={closeAddToCollection} removeFromSavedPostArray={removeFromSavedPostArray} photoInfo={props.post} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
            </div>
            :
            null
            }
            <ImageTextContainer>
                <Link onClick={selectPost} to={`/photo-app/post/${props.post.postID}`}>
                    <Image onLoad={()=>setIsSavedPostVisible(true)} src={props.post.smallImage} />
                </Link>
                <div style={{display: 'flex', alignItems: 'start'}}>
                    <ContentContainer>
                        <Link onClick={selectPost} to={`/photo-app/post/${props.post.postID}/`} style={{textDecoration: 'none'}}>
                            <Title>{props.post.title}</Title>
                        </Link>
                        <Description>{props.post.previewDescription}</Description>
                    </ContentContainer>
                    <div style={{position: 'relative'}}>
                        <More onClick={()=> setShowDropdown(!showDropdown)} className='add-dropdown'>&#8942;</More>
                        {showDropdown ? 
                        <AddDropdown setShowSpinner={setShowSpinner} openAddToCollection={openAddToCollection} setShowDropdown={setShowDropdown} isRemoveFromSavedPage={true} index={props.index} removeFromSavedPostArray={removeFromSavedPostArray} translateContainer='translate(-90%, 5%)' setCollectionsList={setCollectionsList} id={props.post.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.post} />
                        :
                        null
                        }
                    </div>
                </div>
            </ImageTextContainer>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(SavedPost)