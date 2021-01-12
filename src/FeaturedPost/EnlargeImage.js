import React, { useState } from 'react'
import SpinnerOnly from '../Spinner/SpinnerOnly'
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
            {showPlaceholder ? 
            null
            :
            <SpinnerOnly spinnerColor='#f2f2f2' />
            }
            <Close onClick={props.closeImage}>&times;</Close>
            {/* <Placeholder opacity={showPlaceholder ? 0 : 1}></Placeholder> */}
            <div style={{maxHeight: '92vw', maxWidth: '92vw'}}>
                <Image src={props.image} onLoad={()=>setShowPlaceholder(true)} opacity={showPlaceholder ? 1 : 0} scale={showPlaceholder ? 'scale(1)' : 'scale(.75)'} />
            </div>
        </Container>
    )
}

export default EnlargeImage