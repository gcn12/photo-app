import React, { useState } from 'react'
import {
    Image,
    Location,
    Container,
    ImageContainer,
} from './CitiesDisplay.styles'

const CitiesDisplay = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    return(
        <Container visibility={isVisible ? 1 : 0}>
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
        </Container>
    )
}

export default CitiesDisplay