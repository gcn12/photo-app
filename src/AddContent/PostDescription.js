import React, { useState } from 'react'
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
        props.setNumberCharacters(characterQuantity)
    }

    return(
        <PostDescriptionContainer styles={props.styles}>
            <Label>Create a short post description (optional):</Label>
            <PostDescriptionInput id='post-description-input' onChange={calculateRemainingCharacters}></PostDescriptionInput>
            <div>Remaining characters: {remainingCharacters}</div>
        </PostDescriptionContainer>
    )
}

export default PostDescription