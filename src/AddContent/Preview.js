import React from 'react'
import {
    Container
} from './Preview.styles'

const Preview = (props) => {
    return(
        <Container visibility={props.previewProps} transition='transition' initial='initial' animate={props.previewProps ? 'transitionStart' : 'initial'} variants={props.animationMap.preview}>
            <div>Hello</div>
        </Container>
    )
}
 
export default Preview