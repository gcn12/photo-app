import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Image,
    Location,
    Container,
    ImageContainer,
} from './CitiesDisplay.styles'

const CitiesDisplay = (props) => {
    const [isVisible, setIsVisible] = useState(false)

    const goToPlace = (place) => {
        props.setHomePhotoInformation([])
        let sortCriteria = props.sortCriteria
        if(place.countryOnly) {
            props.setSortCriteria(place.countryOnly)
            sortCriteria['country'] = place.countryOnly
            sortCriteria['city'] = ''
        }else{
            props.setSortCriteria(place.city)
            sortCriteria['city'] = place.city
            sortCriteria['country'] = ''
        }
        props.sort(sortCriteria, true)
    }

    return(
        <Container onClick={()=>goToPlace(props.item)} visibility={isVisible ? 1 : 0}>
            <Link to='/photo-app/posts'>
                <div style={{overflow: 'hidden', borderRadius: '15px'}}>
                    <ImageContainer>
                    <Image onLoad={()=> setIsVisible(true)} alt='' src={props.item.image}></Image>
                    </ImageContainer>
                </div>
                {props.item.city ? 
                <Location>{props.item.city}, {props.item.country}</Location>
                :
                <Location>{props.item.countryOnly}</Location>
                }
            </Link>
        </Container>
    )
}

export default CitiesDisplay