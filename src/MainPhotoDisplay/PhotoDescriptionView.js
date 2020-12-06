import React from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
import {
    Image,
    Card,
    Description,
    Container,
} from './PhotoDescriptionView.styles'

const PhotoDescriptionView = (props) => {

    const click = () => {
        props.setPhotoInformation(props.photoInfo)
        props.getFeaturedPhotoInfo(props.photoInfo.url, props.photoInfo.username)
        props.history.push(`/photo-app/post/${props.photoInfo.username}/${props.photoInfo.url}`)
        db.collection('preview-posts').where('image', '==', props.photoInfo.image)
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        })
    } 

    return(
        <Container onClick={click}>
            <Card>
                <Image src={props.photoInfo.image}></Image>
                <div>{`${props.photoInfo.author} | ${props.photoInfo.city}, ${props.photoInfo.country}`}</div>
                <div>{props.photoInfo.title}</div>
                <Description>{props.photoInfo.previewDescription}</Description>
            </Card>
        </Container>
    )
}

export default PhotoDescriptionView