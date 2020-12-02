import React from 'react'
import { ScrollContainer } from './Scroll.styles'

const Scroll = (props) => {
    return(
        <ScrollContainer transition='transition' initial='initial' animate={props.animate} variants={props.variants} visibility={props.visibility} scrollHeight={props.scrollHeight}>
            {props.children}
        </ScrollContainer>
    )
}

export default Scroll