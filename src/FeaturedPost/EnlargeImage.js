import React, { useState } from 'react'
import {
    Container,
    // Placeholder,
    Image,
    Close,
} from './EnlargeImage.styles'

const EnlargeImage = (props) => {
    
    const [showPlaceholder, setShowPlaceholder] = useState(false)

    return(
        <Container>
            <Close onClick={props.closeImage}>&times;</Close>
            {/* <Placeholder opacity={showPlaceholder ? 0 : 1}></Placeholder> */}
            <Image src={props.image} onLoad={()=>setShowPlaceholder(true)} opacity={showPlaceholder ? 1 : 0} scale={showPlaceholder ? 'scale(1)' : 'scale(.75)'}>
                
            </Image>
        </Container>
    )
}

export default EnlargeImage