import React from 'react'
import {
    BackgroundImage,
    Card,
} from './SingleLocation.styles'

const SingleLocation = (props) => {
    return(
        <div style={{position: 'relative'}}>
            <Card>
                Hello
            </Card>
            <BackgroundImage src={props.image} />
        </div>
    )
}

export default SingleLocation