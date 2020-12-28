import React from 'react'
import {
    Container,
    Paragraph,
    FontOption,
    Title,
    FontSelect,
} from './SelectFont.styles'

const SelectFont = (props) => {

    const getFont = () => {
        const selectedFont = document.getElementById('font-select').value
        props.setFont(selectedFont)
    }

    return(
        <Container visibility={props.animationMap.selectFont[props.selectFontProps].opacity} variants={props.animationMap.selectFont} initial='initial' animate={props.selectFontProps} transition='transition'>
        {/* <Container visibility={props.animationMap.selectFont[props.selectFontProps].opacity}> */}
            <Title>Select font:</Title>
            <Paragraph font={props.font}>{props.paragraph}</Paragraph>
            <FontSelect onChange={getFont} id='font-select'>
                {/* <FontOption value="'Castoro', serif;" font="'Castoro', serif;">Castoro</FontOption> */}
                <FontOption value="'Montserrat', sans-serif;" font="'Montserrat', sans-serif;">Montserrat</FontOption>
                <FontOption value="'Work Sans', sans-serif;" font="'Work Sans', sans-serif;">Work Sans</FontOption>
                <FontOption value="'Quick Sand', sans-serif;" font="'Quick Sand', sans-serif;">Quick Sand</FontOption>
                <FontOption value="'Heebo', sans-serif;" font="'Heebo', sans-serif;">Heebo</FontOption>
                <FontOption value="'Roboto', sans-serif;" font="'Roboto', sans-serif;">Roboto</FontOption>
                <FontOption value="'Raleway', sans-serif;" font="'Raleway', sans-serif;">Raleway</FontOption>
                <FontOption value="'Zilla Slab', serif;" font="'Zilla Slab', serif;">Zilla Slab</FontOption>
                <FontOption value="'Open Sans', sans-serif;" font="'Open Sans', sans-serif;">Open Sans</FontOption>
                <FontOption value="'Poppins', sans-serif;" font="'Poppins', sans-serif;">Poppins</FontOption>
                <FontOption value="'Antic Slab', serif;" font="'Antic Slab', serif;">Antic Slab</FontOption>
            </FontSelect>
        </Container>
    )
}

export default SelectFont