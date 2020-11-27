import React from 'react'
import {
    Container
} from './Preview.styles'

const Preview = (props) => {
    return(
        <Container transition='transition' initial='initial' animate={props.previewProps} variants={props.animationMap.preview}>
            <div>Hello</div>
        </Container>
    )
}
 
export default Preview