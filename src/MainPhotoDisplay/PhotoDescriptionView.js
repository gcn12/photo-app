import React, { useEffect, useState } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
import { photoInformation } from '../Redux/Actions/appActions'
import { connect } from 'react-redux'
// import fitty from 'fitty'
import {
    Image,
    Card,
    Description,
    Container,
    Location,
    Title,
    // Name,
    // LocationNameContainer,
} from './PhotoDescriptionView.styles'

const PhotoDescriptionView = (props) => {

    const [showPost, setShowPost] = useState(false)

    useEffect(()=> {
        // fitty(`#description-view-title-${props.index}`, {maxSize: 30})
        // eslint-disable-next-line
    }, [])

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


    return(
        <Container opacity={showPost ? 1 : 0}>
            <Card>
                <Image onClick={goToPost} onLoad={()=> setShowPost(true)} src={props.photoInfo.smallImage}></Image>
                <Location>{`${props.photoInfo.city}, ${props.photoInfo.country}`}</Location>
                {/* <Name>{props.photoInfo.author}</Name> */}
                <Title onClick={goToPost} id={`description-view-title-${props.index}`}>{props.photoInfo.title}</Title>
                <Location>{props.photoInfo.category}</Location>
                <Description>{props.photoInfo.previewDescription}</Description>
            </Card>
        </Container>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(PhotoDescriptionView)