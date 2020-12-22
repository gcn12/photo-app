import React from 'react'
import {
    Image,
    Location,
    Container,
    ImageContainer,
} from './CitiesDisplay.styles'

const CitiesDisplay = (props) => {
    return(
        <Container>
            <ImageContainer>
            <Image alt='' src={props.item.image}></Image>
            </ImageContainer>
            {props.item.city ? 
            <Location>{props.item.city}, {props.item.country}</Location>
            :
            <Location>{props.item.countryOnly}</Location>
            }
        </Container>
    )
}

export default CitiesDisplay