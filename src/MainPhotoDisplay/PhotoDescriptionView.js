import React, { useState } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
// import { photoInformation } from '../Redux/Actions/appActions'
import { isVisible, isPostVisible } from '../Redux/Actions/featuredPostActions'
import AddDropdown from './AddDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { enableBodyScroll } from 'body-scroll-lock'
import { PopupDarken } from '../Styles/PopupStyles.styles'
import '../App.css'
// import fitty from 'fitty'
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
    // Name,
    // LocationNameContainer,
} from './PhotoDescriptionView.styles'

const PhotoDescriptionView = (props) => {

    const [showPost, setShowPost] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showAddToCollection, setShowAddToCollection] = useState(false)
    const [collectionsList, setCollectionsList] = useState([])
    const [showSpinner, setShowSpinner] = useState(true)

    const checkIsBookmarked = () => {
        if(!isBookmarked) {
            db.collection('users')
            .doc(props.user)
            .collection('bookmarked')
            .where('username', '==', props.photoInfo.username)
            .where('url', '==', props.photoInfo.url)
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

    const goToPost = () => {
        props.dispatch(isVisible(false))
        props.dispatch(isPostVisible(false))
        // props.dispatch(photoInformation(props.photoInfo))
        // props.getFeaturedPhotoInfo(props.photoInfo.postID)
        // window.scrollTo({top: 0})
        // props.history.push(`/photo-app/post/${props.photoInfo.postID}`)
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
        // const toLock = document.getElementById('add-to-collection-container')
        // disableBodyScroll(toLock)
    }

    const closeAddToCollection = () => {
        setShowAddToCollection(false)
        const toLock = document.getElementById('add-to-collection-container')
        enableBodyScroll(toLock)
    }

    const whenLoaded = () => {
        if(props.index===0){
            // props.dispatch(isMainPhotoDisplayVisible(true))
        }
        setShowPost(true)

    }

    return(
        <div>
            {showAddToCollection && 
            <div>
                <PopupDarken onClick={closeAddToCollection} />
                <AddToCollection showSpinner={showSpinner} closeAddToCollection={closeAddToCollection} showAddToCollection={showAddToCollection} photoInfo={props.photoInfo} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
            </div>
            }
            <Container>
                <Card>
                    <ImageLinkContainer display={showPost ? 'none' : 'initial'} opacity={showPost ? 0 : 1}>
                        <Link to={`/photo-app/post/${props.photoInfo.postID}`} onClick={goToPost}  >
                            <PlaceholderImage className='shine' onLoad={whenLoaded} />
                        </Link>
                    </ImageLinkContainer>
                    <ImageLinkContainer display={showPost ? 'initial' : 'none'} opacity={showPost ? 1 : 0}>
                        <Link onClick={goToPost}  to={`/photo-app/post/${props.photoInfo.postID}`}>
                            <Image onLoad={whenLoaded} id='photo-test' src={props.photoInfo.smallImage} />
                        </Link>
                    </ImageLinkContainer>
                    <BookmarkLocationContainer>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Location>{`${props.photoInfo.location}`}</Location>
                            <Category>{props.photoInfo.category}</Category>
                        </div>
                        <div className='add-dropdown' style={{cursor: 'pointer'}}>
                            {showDropdown && 
                            <AddDropdown setShowSpinner={setShowSpinner} fontSize='20px' translateContainer='translate(-90%, 50%)' openAddToCollection={openAddToCollection} setCollectionsList={setCollectionsList}  id={props.photoInfo.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.photoInfo} />
                            }
                            <Ellipsis className='add-dropdown' onClick={checkIsBookmarked}>&#8942;</Ellipsis>
                        </div>
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
})

export default connect(mapStateToProps)(PhotoDescriptionView)