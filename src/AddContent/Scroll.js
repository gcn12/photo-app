import React from 'react'
import { ScrollContainer } from './Scroll.styles'

const Scroll = (props) => {
    return(
        <ScrollContainer scrollHeight={props.scrollHeight}>
            {props.children}
        </ScrollContainer>
    )
}

export default Scroll