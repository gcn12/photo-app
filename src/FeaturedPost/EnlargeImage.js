import React, { useState } from 'react'
import SpinnerOnly from '../Spinner/SpinnerOnly'
import {
    Container,
    Image,
    Close,
    ImageContainer,
} from './EnlargeImage.styles'

const EnlargeImage = (props) => {
    
    const [showPlaceholder, setShowPlaceholder] = useState(false)

    return(
        <Container>
            {showPlaceholder ? 
            null
            :
            <SpinnerOnly spinnerColor='#f2f2f2' />
            }
            <Close onClick={props.closeImage}>&times;</Close>
            <ImageContainer display={showPlaceholder ? 'initial' : 'none'}>
                <Image src={props.image} onLoad={()=>setShowPlaceholder(true)} opacity={showPlaceholder ? 1 : 0} scale={showPlaceholder ? 'scale(1)' : 'scale(.75)'} />
            </ImageContainer>
        </Container>
    )
}

export default EnlargeImage