import React, { useState } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
// import { photoInformation } from '../Redux/Actions/appActions'
import { isVisible, isPostVisible } from '../Redux/Actions/featuredPostActions'
import AddDropdown from './AddDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
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
        // disableBodyScroll(document.body)
        const toLock = document.getElementById('description-view-container')
        disableBodyScroll(toLock)
    }

    const closeAddToCollection = () => {
        setShowAddToCollection(false)
        // enableBodyScroll(document.body)
        const toLock = document.getElementById('description-view-container')
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
            {showAddToCollection ? 
            <div>
                <PopupDarken />
                <AddToCollection showSpinner={showSpinner} closeAddToCollection={closeAddToCollection} showAddToCollection={showAddToCollection} photoInfo={props.photoInfo} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
            </div>
            :
            null
            }
            <Container opacity='1' id='description-view-container'>
                <Card>
                    <ImageLinkContainer display={showPost ? 'none' : 'initial'} opacity={showPost ? 0 : 1}>
                        <Link to={`/photo-app/post/${props.photoInfo.postID}`}>
                            <PlaceholderImage className='shine' onLoad={whenLoaded} />
                        </Link>
                    </ImageLinkContainer>
                    <ImageLinkContainer onClick={goToPost} display={showPost ? 'initial' : 'none'} opacity={showPost ? 1 : 0}>
                        <Link to={`/photo-app/post/${props.photoInfo.postID}`}>
                            <Image onLoad={whenLoaded} src={props.photoInfo.smallImage} />
                        </Link>
                    </ImageLinkContainer>
                    <BookmarkLocationContainer>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <Location>{`${props.photoInfo.location}`}</Location>
                            <Category>{props.photoInfo.category}</Category>
                        </div>
                        <div>
                            <div className='add-dropdown' style={{cursor: 'pointer'}}>
                                {showDropdown ? 
                                <AddDropdown setShowSpinner={setShowSpinner} fontSize='20px' translateContainer='translate(-90%, 50%)' openAddToCollection={openAddToCollection} setCollectionsList={setCollectionsList}  id={props.photoInfo.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.photoInfo} />
                                :
                                null
                                }
                                <Ellipsis className='add-dropdown' onClick={checkIsBookmarked}>&#8942;</Ellipsis>
                            </div>
                        </div>
                    </BookmarkLocationContainer>
                    {/* <Name>{props.photoInfo.author}</Name> */}
                    <Link onClick={goToPost} to={`/photo-app/post/${props.photoInfo.postID}`} style={{textDecoration: 'none'}}>
                        {/* <Title onClick={goToPost} id={`description-view-title-${props.index}`}>{props.photoInfo.title}</Title> */}
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