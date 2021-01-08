import React, { useState } from 'react'
import { Link } from 'react-router-dom' 
import AddDropdown from '../MainPhotoDisplay/AddDropdown'
import AddToCollection from '../FeaturedPost/AddToCollection'

// import { ReactComponent as TrashCan } from '../Icons/TrashCan.svg'
import {
    Container,
    Image,
    Title,
    Description,
    ImageTextContainer,
    More,
} from './SavedPost.styles'

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

    return(
        <Container opacity={isVisible ? 1 : 0}>
            {showAddToCollection ? 
            <AddToCollection removeFromSavedPostArray={removeFromSavedPostArray} photoInfo={props.post} collectionsList={collectionsList} setIsAddToCollection={setShowAddToCollection} setCollectionsList={setCollectionsList} />
            :
            null
            }
            <ImageTextContainer>
            <Link to={`/photo-app/post/${props.post.username}/${props.post.url}`}>
                <Image onLoad={()=>setIsVisible(true)} src={props.post.image} />
            </Link>
            <div style={{display: 'flex', alignItems: 'start'}}>
                <div>
                    <Link to={`/photo-app/post/${props.post.username}/${props.post.url}`} style={{textDecoration: 'none'}}>
                        <Title>{props.post.title}</Title>
                    </Link>
                    <Description>{props.post.previewDescription}</Description>
                </div>
                <div style={{position: 'relative'}}>
                    <More onClick={()=> setShowDropdown(!showDropdown)} className='add-dropdown'>&#8942;</More>
                    {showDropdown ? 
                    <AddDropdown setShowDropdown={setShowDropdown} isRemoveFromSavedPage={true} index={props.index} removeFromSavedPostArray={removeFromSavedPostArray} translateContainer='translate(-90%, 5%)' setCollectionsList={setCollectionsList} id={props.post.id} setShowAddToCollection={setShowAddToCollection} isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} photoInfo={props.post} />
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