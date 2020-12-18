import React, { useEffect } from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions' 
import fitty from 'fitty'
import {
    Image,
    Card,
    Description,
    Container,
    NameLocation,
    Title,
} from './PhotoDescriptionView.styles'

const PhotoDescriptionView = (props) => {

    useEffect(()=> {
        fitty(`#description-view-title-${props.index}`, {maxSize: 30})
        // eslint-disable-next-line
    }, [])

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

    const imageLoaded = () => {
        if (props.index === props.photoLength - 1){
            // setTimeout(()=>this.props.setIsMainPhotosVisible(true), 1200)
            props.setIsMainPhotosVisible(true)
            props.setObserverVisible(true)
        }
    }


    return(
        <Container onClick={click}>
            <Card>
                <Image onLoad={imageLoaded} src={props.photoInfo.image}></Image>
                <NameLocation>{`${props.photoInfo.author} | ${props.photoInfo.city}, ${props.photoInfo.country}`}</NameLocation>
                {/* <div style={{margin: '0 5%'}}> */}
                    <Title id={`description-view-title-${props.index}`}>{props.photoInfo.title}</Title>
                {/* </div> */}
                <Description>{props.photoInfo.previewDescription}</Description>
            </Card>
        </Container>
    )
}

export default PhotoDescriptionView