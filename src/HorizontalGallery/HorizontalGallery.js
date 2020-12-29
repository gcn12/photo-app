import React from 'react'
import { db } from '../Firebase'
import { connect } from 'react-redux'
import { homePhotoInformation } from '../Redux/Actions/appActions'
import DisplayPhoto from './DisplayPhoto'
import { 
    Title,
    OverflowX, 
    SeeMore,
    TextContainer,
} from './HorizontalGallery.styles'

const HorizontalGallery = (props) => {

    const seeMore = () => {
        const photosArray = []
        db.collection('posts')
        .where(props.place, '==', props.placeName)
        .get()
        .then(photos => {
            photos.docs.forEach(photo=> {
                photosArray.push(photo.data())
            })
            props.dispatch(homePhotoInformation(photosArray))
            props.history.push('photo-app/posts')
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
                {props.photos.map((info, index) => {
                    const duplicateCheck = info.image !== props.photoInformation.smallImage
                    return(
                        duplicateCheck ? 
                        <DisplayPhoto 
                            setCollectionsList={props.setCollectionsList}
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            getPost={props.getPost} 
                            getCountries={props.getCountries} 
                            key={index} 
                            info={info} 
                            url={info.smallImage}
                        /> 
                        :
                        null
                    )
                })}
            </OverflowX>
            </div>
        :
        null
        }
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.app.user,
    photoInformation: state.app.photoInformation
})

export default connect(mapStateToProps)(HorizontalGallery)