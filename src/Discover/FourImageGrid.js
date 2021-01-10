import React from 'react'
import {
    Image,
    Container,
} from './FourImageGrid.styles'

const FourImageGrid = (props) => {
    return(
        <Container>
            {props.photos.map((photo, index)=> {
                console.log(photo)
                return(
                    <div key={index}>
                        <Image src={photo.smallImage} key={index} alt='popular'></Image>
                        <div>{photo.title}</div>
                    </div>
                )
            })}
        </Container>
    )
}

export default FourImageGrid 