import React, { useState } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
import { isVisible, isPostVisible } from '../Redux/Actions/featuredPostActions'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import DescriptionViewDropdown from './DescriptionViewDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { enableBodyScroll } from 'body-scroll-lock'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import '../App.css'
import {
    Image,
    Card,
    Description,
    Container,
    Location,
    Title,
    BookmarkLocationContainer,
    Ellipsis,
    Category,
    PlaceholderImage,
    ImageLinkContainer,
} from './PhotoDescriptionView.styles'

const PhotoDescriptionView = (props) => {

    const [showPost, setShowPost] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showAddToCollection, setShowAddToCollection] = useState(false)
    const [collectionsList, setCollectionsList] = useState([])
    const [showSpinner, setShowSpinner] = useState(true)

    const checkIsBookmarked = () => {
        if(props.user) {
            if(!isBookmarked) {
                db.collection('users')
                .doc(props.user)
                .collection('bookmarked')
                .where('username', '==', props.photoInfo.username)
                .where('postID', '==', props.photoInfo.postID)
                .get()
                .then(data=> {
                    if(data.docs[0]) {
                        setIsBookmarked(true)
                    }
                    setShowDropdown(!showDropdown)
                })
            }else{
                setShowDropdown(!showDropdown)
            }
        }
    }

    const goToPost = () => {
        props.dispatch(isVisible(false))
        props.dispatch(isPostVisible(false))
        db.collection('preview-posts').where('image', '==', props.photoInfo.image)
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        })
    } 
    
    window.onclick = (e) => {
        if (!e.target.matches('.add-dropdown')) {
            setShowDropdown(false)
        }
    } 

    const openAddToCollection = () => {
        setShowAddToCollection(true)
    }

    const closeAddToCollection = () => {
        setShowAddToCollection(false)
        const toLock = document.getElementById('add-to-collection-container')
        enableBodyScroll(toLock)
    }

    const whenLoaded = () => {
        if(props.index===0){
        }
        setShowPost(true)
    }

    const goToPlace = (place) => {
        props.dispatch(homePhotoInformation([]))
        let sortCriteriaCopy = {...props.sortCriteria}
        props.dispatch(sortCriteria(place.location))
        sortCriteriaCopy['location'] = place.location
        sortCriteriaCopy['country'] = ''
        props.sort(sortCriteriaCopy, true)
    }

    return(
        <div>
            <Container>
                <Card>
                    <ImageLinkContainer display={showPost ? 'none' : 'initial'} opacity={showPost ? 0 : 1}>
                        <Link to={`/photo-app/post/${props.photoInfo.postID}`} onClick={goToPost}  >
                            <PlaceholderImage className='shine' />
                        </Link>
                    </ImageLinkContainer>
                    <ImageLinkContainer display={showPost ? 'initial' : 'none'} opacity={showPost ? 1 : 0}>
                        <Link onClick={goToPost}  to={`/photo-app/post/${props.photoInfo.postID}`}>
                            <Image onLoad={whenLoaded} id='photo-test' src={props.photoInfo.smallImage} />
                        </Link>
                    </ImageLinkContainer>
                    <BookmarkLocationContainer>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Location role='button' tabIndex='0' onClick={()=>goToPlace(props.photoInfo)}>{`${props.photoInfo.location}`}</Location>
                            <Category>{props.photoInfo.category}</Category>
                        </div>
                        <div className='add-dropdown' style={{cursor: 'pointer'}}>
                            <button style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}} className='add-dropdown' onClick={checkIsBookmarked}>
                                <Ellipsis className='add-dropdown'>&#8942;</Ellipsis>
                            </button>
                            {showDropdown && 
                            <DescriptionViewDropdown setShowSpinner={setShowSpinner} fontSize='20px' translateContainerUnsaved='translate(-86%, 13%)' translateContainerSaved='translate(-87%, 13%)' openAddToCollection={openAddToCollection} setCollectionsList={setCollectionsList}  id={props.photoInfo.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.photoInfo} />
                            }
                        </div>
                        {showAddToCollection && 
                        <div>
                            <PopupDarken onClick={closeAddToCollection} />
                            <AddToCollection showSpinner={showSpinner} closeAddToCollection={closeAddToCollection} showAddToCollection={showAddToCollection} photoInfo={props.photoInfo} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
                        </div>
                        }
                    </BookmarkLocationContainer>
                    <Link onClick={goToPost} to={`/photo-app/post/${props.photoInfo.postID}`} style={{textDecoration: 'none'}}>
                        <Title id={`description-view-title-${props.index}`}>{props.photoInfo.title}</Title>
                    </Link>
                    <Description>{props.photoInfo.previewDescription}</Description>
                </Card>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    sortCriteria: state.app.sortCriteria
})

export default connect(mapStateToProps)(PhotoDescriptionView)