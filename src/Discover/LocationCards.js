import React from 'react'
import {
    Container,
    TwoGrid,
    ThreeGrid,
    TwoImage,
    ThreeImage,
} from './LocationCards.styles'

const LocationCards = (props) => {
    return(
        <Container>
            <ThreeGrid>
                {props.photos.map((photo, index) => {
                    return(
                        index===0 || index===1 || index===2 ? 
                        <ThreeImage src={photo.smallImage} />
                        :
                        null
                    )
                })}
            </ThreeGrid>
            <TwoGrid>
                {props.photos.map((photo, index) => {
                    return(
                        index===3 || index===4  ? 
                            <TwoImage src={photo.smallImage}  />
                        :
                        null
                    )
                })}
            </TwoGrid>
        </Container>
    )
}

export default LocationCards