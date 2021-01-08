import React, { useState } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
import { photoInformation } from '../Redux/Actions/appActions'
import AddDropdown from './AddDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'
import { connect } from 'react-redux'
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
        props.dispatch(photoInformation(props.photoInfo))
        props.getFeaturedPhotoInfo(props.photoInfo.url, props.photoInfo.username)
        props.history.push(`/photo-app/post/${props.photoInfo.username}/${props.photoInfo.url}`)
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

    return(
        <Container opacity={showPost ? 1 : 0}>
            <Card>
                {showAddToCollection ? 
                <AddToCollection showAddToCollection={showAddToCollection} photoInfo={props.photoInfo} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
                :
                null
                }
                <Image onClick={goToPost} onLoad={()=> setShowPost(true)} src={props.photoInfo.smallImage}></Image>
                <BookmarkLocationContainer>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Location>{`${props.photoInfo.city}, ${props.photoInfo.country}`}</Location>
                        <Category>{props.photoInfo.category}</Category>
                    </div>
                    <div>
                        <div className='add-dropdown' style={{cursor: 'pointer'}}>
                            {showDropdown ? 
                            <AddDropdown fontSize='20px' translateContainer='translate(-90%, 50%)' setCollectionsList={setCollectionsList}  id={props.photoInfo.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.photoInfo} />
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