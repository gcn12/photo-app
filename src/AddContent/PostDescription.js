import React, { useState } from 'react'
import { connect } from 'react-redux'
import { numberCharacters } from '../Redux/Actions/addContentActions'
import {
    PostDescriptionInput,
    Label,
    PostDescriptionContainer,
} from './AddContent.styles'

const PostDescription = (props) => {
    const [remainingCharacters, setRemainingCharacters] = useState(100)

    const calculateRemainingCharacters = () => {
        const characters = document.getElementById('post-description-input').value
        const characterQuantity = 100 - characters.length
        setRemainingCharacters(characterQuantity)
        props.dispatch(numberCharacters(characterQuantity))
    }

    const closeKeyboard = (e) => {
        if(e.code==='Enter') {
            document.activeElement.blur();
        }
    }

    return(
        <PostDescriptionContainer styles={props.createDescriptionStyles}>
            <Label>Create a short post description (optional):</Label>
            <PostDescriptionInput onKeyDown={closeKeyboard} id='post-description-input' onChange={calculateRemainingCharacters}></PostDescriptionInput>
            <div>Remaining characters: {remainingCharacters}</div>
        </PostDescriptionContainer>
    )
}

const mapStateToProps = state => ({
    createDescriptionStyles: state.addContent.createDescriptionStyles,
})

export default connect(mapStateToProps)(PostDescription)