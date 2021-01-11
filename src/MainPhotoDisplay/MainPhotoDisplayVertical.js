import React from 'react'
import PhotoDescriptionView from './PhotoDescriptionView'
import '../App.css'
import { connect } from 'react-redux'
import { 
    PhotoDescriptionViewContainer,
    DisplayContainer,
    LoadMoreButtonContainer,
} from './MainPhotoDisplayVertical.styles'
import { SubmitButton } from '../AddContent/AddContent.styles'

const GetPhotos = (props) => {

    return(
        <div style={{position: 'relative'}}>
            <DisplayContainer opacity={1} style={{marginTop: '120px'}}>
                <PhotoDescriptionViewContainer>
                    {props.homePhotoInformation.map((photo, index)=> {
                        return( 
                            <PhotoDescriptionView 
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