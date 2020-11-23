import React from 'react'
import { db } from '../Firebase'
import { 
    Title,
    OverflowX, 
    Image,
    SeeMore,
    TextContainer,
} from './HorizontalGallery.styles'
 
const DisplayPhoto = (props) => {
    return(
        <div>
            <Image onClick={()=>props.setPhotoInformation(props.info)} className='grid-item' alt='' src={props.url}></Image>
        </div>
    )
}

const HorizontalGallery = (props) => {

    const seeMore = () => {
        const photosArray = []
        db.collection('posts').where(props.place, '==', props.placeName)
        .limit(8)
        .get()
        .then(photos => {
            photos.docs.forEach(photo=> {
                photosArray.push(photo.data())
            })
            props.setHomePhotoInformation(photosArray)
            props.setPageRoute('GetPhotos')
        })
    }

    return(
        <div>
            {props.photos ? 
            <div>
            <TextContainer>
                <Title>{props.title}</Title>
                <SeeMore onClick={seeMore}>See more</SeeMore>
            </TextContainer>
            <OverflowX>
                {
                props.photos.map((info, index) => {
                    const duplicateCheck = info.image !== props.photoInformation.image
                    return(
                        duplicateCheck ? 
                        <DisplayPhoto getCountries={props.getCountries} setPhotoInformation={props.setPhotoInformation} setHomePhotoInformation={props.setHomePhotoInformation} key={index} info={info} url={info.image}/>
                        :
                        null
                    )
                })
                }
            </OverflowX>
            </div>
        :
        null
        }
        </div>
    )
}

export default HorizontalGallery