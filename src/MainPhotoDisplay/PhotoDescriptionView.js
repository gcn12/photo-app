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
        db.collection('preview-posts').where('image', '==', props.photoInfo.image)
        props.history.push('/hello')
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        })
    }

    return(
        <Container onClick={click}>
            <Card>
                <div>{props.photoInfo.title}</div>
                <Image src={props.photoInfo.image}></Image>
                <div>{`${props.photoInfo.author} | ${props.photoInfo.city}, ${props.photoInfo.country}`}</div>
                <Description>{props.photoInfo.previewDescription}</Description>
            </Card>
        </Container>
    )
}

export default PhotoDescriptionView