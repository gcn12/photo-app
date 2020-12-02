import React, { useState } from 'react'
import {
    Container,
    Paragraph,
    FontOption,
    Title,
} from './SelectFont.styles'

const SelectFont = (props) => {

    const [font, setFont] = useState('')

    const getFont = () => {
        const selectedFont = document.getElementById('font-select').value
        setFont(selectedFont)
    }

    return(
        <Container visibility={props.animationMap.selectFont[props.selectFontProps].opacity} variants={props.animationMap.selectFont} initial='initial' animate={props.selectBodyProps} transition='transition'>
            <Title>Select font:</Title>
            <Paragraph font={font}>{props.paragraph}</Paragraph>
            <select onChange={getFont} id='font-select'>
                <FontOption value="'Castoro', serif;" font="'Castoro', serif;">Castoro</FontOption>
                <FontOption value="'Roboto', sans-serif;" font="'Roboto', sans-serif;">Roboto</FontOption>
                <FontOption value="'Raleway', sans-serif;" font="'Raleway', sans-serif;">Raleway</FontOption>
                <FontOption value="'Zilla Slab', serif;" font="'Zilla Slab', serif;">Zilla Slab</FontOption>
                <FontOption value="'Caveat', cursive;" font="'Caveat', cursive;">Caveat</FontOption>
            </select>
        </Container>
    )
}

export default SelectFont