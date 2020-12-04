import React from 'react'
import { db } from '../Firebase'
import { incrementViewCount } from '../Functions'

import { 
    Image, 
    PhotoContainer,
    PhotoTitle,
    PhotoTextContainer,
    PhotoLocation,
} from './DisplayPhoto.styles'

const DisplayPhoto = (props) => {

    const click = () => {
        // props.setPageRoute('PhotoFeatured')
        props.setPhotoInformation(props.photoInfo)
        props.getFeaturedPhotoInfo(props.photoInfo.id, props.photoInfo.username)
        db.collection('preview-posts').where('image', '==', props.photoInfo.image)
        .get()
        .then(reference=> {
            incrementViewCount(reference.docs[0].ref.id)
        })
    }
 
    return(
        <PhotoContainer onClick={click}>
            <PhotoTextContainer>
                <Image className='grid-item masonry' alt='' src={props.photoInfo.image}></Image>
                <PhotoTitle>{props.photoInfo.title}</PhotoTitle>                    
                <PhotoLocation>{`${props.photoInfo.city}, ${props.photoInfo.country}`}</PhotoLocation>
            </PhotoTextContainer>
        </PhotoContainer>
    )
}

export default DisplayPhoto