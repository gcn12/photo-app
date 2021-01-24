import React from 'react'
import PhotoDescriptionView from './PhotoDescriptionView'
import '../App.css'
import { connect } from 'react-redux'
import { 
    PhotoDescriptionViewContainer,
    DisplayContainer,
    LoadMoreButtonContainer,
    CenterLocation,
} from './MainPostsDisplay.styles'
import { SubmitButton } from '../AddContent/AddContent.styles'

const GetPhotos = (props) => {

    return(
        <div style={{position: 'relative'}}>
            <DisplayContainer>
                {props.sortCriteria.location ? 
                <CenterLocation>{props.sortCriteria.location}</CenterLocation>
                :
                null
                }
                {props.sortCriteria.country ? 
                <CenterLocation>{props.sortCriteria.country}</CenterLocation>
                :
                null
                }
                <PhotoDescriptionViewContainer>
                    {props.homePhotoInformation.map((photo, index)=> {
                        return( 
                            <PhotoDescriptionView 
                            sort={props.sort}
                            history={props.history}
                            index={index}
                            photoLength={props.homePhotoInformation.length}
                            getFeaturedPhotoInfo={props.getFeaturedPhotoInfo}
                            key={index} 
                            photoInfo={photo} 
                            />
                        )
                    })}
                </PhotoDescriptionViewContainer>
                {
                props?.homePhotoInformation?.length > 0 ?
                props.isLoadMore ? 
                <LoadMoreButtonContainer>
                    <SubmitButton onClick={()=>props.sort(props.sortCriteria)}>Load more</SubmitButton>
                </LoadMoreButtonContainer>
                :
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div>You've reached the bottom</div>
                </div>
                :
                null
                }
                <div style={{margin: '30px'}}></div>
            </DisplayContainer>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoadMore: state.app.isLoadMore,
    homePhotoInformation: state.app.homePhotoInformation,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(GetPhotos)