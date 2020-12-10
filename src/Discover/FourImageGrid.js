import React from 'react'
import {
    Image,
    Container,
} from './FourImageGrid.styles'

const FourImageGrid = (props) => {
    return(
        <Container>
            {props.photos.map((photo, index)=> {
                return(
                    <div>
                        <Image src={photo.image} key={index} alt='popular'></Image>
                        <div>{photo.title}</div>
                    </div>
                )
            })}
        </Container>
    )
}

export default FourImageGrid 