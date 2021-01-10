import React, { useState } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
import { photoInformation } from '../Redux/Actions/appActions'
import { isVisible } from '../Redux/Actions/featuredPostActions'
import AddDropdown from './AddDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { connect } from 'react-redux'
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import { PopupDarken } from '../Styles/PopupStyles.styles'
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
    // Name,
    // LocationNameContainer,
} from './PhotoDescriptionView.styles'

const PhotoDescriptionView = (props) => {

    const [showPost, setShowPost] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [showAddToCollection, setShowAddToCollection] = useState(false)
    const [collectionsList, setCollectionsList] = useState([])

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
        props.dispatch(photoInformation(props.photoInfo))
        props.getFeaturedPhotoInfo(props.photoInfo.postID)
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
        disableBodyScroll(document.body)
    }

    const closeAddToCollection = () => {
        setShowAddToCollection(false)
        enableBodyScroll(document.body)
    }

    const whenLoaded = () => {
        if(props.index===0){
            props.setIsVisible(true)
        }
        setShowPost(true)

    }

    return(
        <Container opacity={showPost ? 1 : 0}>
            <Card>
                {showAddToCollection ? 
                <div>
                    <PopupDarken />
                    <AddToCollection closeAddToCollection={closeAddToCollection} showAddToCollection={showAddToCollection} photoInfo={props.photoInfo} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
                </div>
                :
                null
                }
                <Image onClick={goToPost} onLoad={whenLoaded} src={props.photoInfo.smallImage}></Image>
                <BookmarkLocationContainer>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Location>{`${props.photoInfo.city}, ${props.photoInfo.country}`}</Location>
                        <Category>{props.photoInfo.category}</Category>
                    </div>
                    <div>
                        <div className='add-dropdown' style={{cursor: 'pointer'}}>
                            {showDropdown ? 
                            <AddDropdown fontSize='20px' translateContainer='translate(-90%, 50%)' openAddToCollection={openAddToCollection} setCollectionsList={setCollectionsList}  id={props.photoInfo.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.photoInfo} />
                            :
                            null
                            }
                            <Ellipsis className='add-dropdown' onClick={checkIsBookmarked}>&#8942;</Ellipsis>
                        </div>
                    </div>
                </BookmarkLocationContainer>
                {/* <Name>{props.photoInfo.author}</Name> */}
                <Title onClick={goToPost} id={`description-view-title-${props.index}`}>{props.photoInfo.title}</Title>
                <Description>{props.photoInfo.previewDescription}</Description>
            </Card>
        </Container>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
})

export default connect(mapStateToProps)(PhotoDescriptionView)