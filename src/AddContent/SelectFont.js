import React from 'react'
import { connect } from 'react-redux'
import { font } from '../Redux/Actions/addContentActions'
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
        props.dispatch(font(selectedFont))
    }

    return(
        <Container styles={props.selectFontStyles}>
            <Title>Select font:</Title>
            <Paragraph font={props.font}>{props.paragraph}</Paragraph>
            <FontSelect onChange={getFont} id='font-select'>
                <FontOption value="'Montserrat', sans-serif;" font="'Montserrat', sans-serif;">Montserrat</FontOption>
                <FontOption value="'Work Sans', sans-serif;" font="'Work Sans', sans-serif;">Work Sans</FontOption>
                <FontOption value="'Heebo', sans-serif;" font="'Heebo', sans-serif;">Heebo</FontOption>
                <FontOption value="'Roboto', sans-serif;" font="'Roboto', sans-serif;">Roboto</FontOption>
                <FontOption value="'Raleway', sans-serif;" font="'Raleway', sans-serif;">Raleway</FontOption>
                <FontOption value="'Poppins', sans-serif;" font="'Poppins', sans-serif;">Poppins</FontOption>
            </FontSelect>
        </Container>
    )
}

const mapStateToProps = state => ({
    selectFontStyles: state.addContent.selectFontStyles,
    paragraph: state.addContent.paragraph,
})

export default connect(mapStateToProps)(SelectFont)