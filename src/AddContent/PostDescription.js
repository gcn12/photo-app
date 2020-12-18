import React, { useState } from 'react'
import {
    PostDescriptionInput,
    Label,
    PostDescriptionContainer,
} from './AddContent.styles'

const PostDescription = (props) => {
    const [remainingCharacters, setRemainingCharacters] = useState(150)

    const calculateRemainingCharacters = () => {
        const characters = document.getElementById('post-description-input').value
        const characterQuantity = 150 - characters.length
        setRemainingCharacters(characterQuantity)
        props.setNumberCharacters(characterQuantity)
    }

    return(
        <PostDescriptionContainer visibility={props.animationMap.selectFont[props.createDescriptionProps].opacity} variants={props.animationMap.createDescription} initial='initial' animate={props.createDescriptionProps} transition='transition'>
            <Label>Create a short post description (optional):</Label>
            <PostDescriptionInput id='post-description-input' onChange={calculateRemainingCharacters}></PostDescriptionInput>
            <div>Remaining characters: {remainingCharacters}</div>
        </PostDescriptionContainer>
    )
}

export default PostDescription