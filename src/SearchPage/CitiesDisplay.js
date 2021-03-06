import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { homePhotoInformation, sortCriteria } from '../Redux/Actions/appActions'
import {
    Image,
    Location,
    Container,
    ImageContainer,
} from './CitiesDisplay.styles'

const CitiesDisplay = (props) => {
    const [isVisible, setIsVisible] = useState(false)

    const goToPlace = (place) => {
        props.dispatch(homePhotoInformation([]))
        let sortCriteriaCopy = {...props.sortCriteria}
        if(place.location) {
            props.dispatch(sortCriteria(place.location))
            sortCriteriaCopy['location'] = place.location
            sortCriteriaCopy['country'] = ''
        }else{
            props.dispatch(sortCriteria(place.country))
            sortCriteriaCopy['country'] = place.country
            sortCriteriaCopy['location'] = ''
        }
        props.sort(sortCriteriaCopy, true)
    }

    return(
        <Container onClick={()=>goToPlace(props.item)} visibility={isVisible ? 1 : 0}>
            <Link to='/photo-app/posts'>
                <div style={{overflow: 'hidden', borderRadius: '15px'}}>
                    <ImageContainer>
                        <Image onLoad={()=> setIsVisible(true)} alt='' src={props.item.image}></Image>
                    </ImageContainer>
                </div>
                {props.item.country ? 
                <Location>{props.item.country}</Location>
                :
                <Location>{props.item.location}</Location>
                }
            </Link>
        </Container>
    )
}


const mapStateToProps = state => ({
    homePhotoInformation: state.app.homePhotoInformation,
    sortCriteria: state.app.sortCriteria,
})

export default connect(mapStateToProps)(CitiesDisplay)