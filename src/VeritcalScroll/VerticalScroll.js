import React from 'react'
import { Scroll } from './VeritcalScroll.styles'

const VerticalScroll = (props) => {
    return(
        <Scroll scrollHeight={props.scrollHeight}>
            {props.children}
        </Scroll>
    )
}

export default VerticalScroll