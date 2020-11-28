import React, { useState } from 'react'

import {
    DescriptionInput,
    NewItemButton,
    RemoveLastElement,
    Container,
    Label,
    BodyButtonContainer,
    CategoryLocationContainer,
} from './AddContentAnimationTest.styles'

const Body = (props) => {

    const [isAddImage, setIsAddImage] = useState(false)
    const [isAdditionalElements, setIsAdditionalElements] = useState(false)

    const newImage = () => {
        const image = document.createElement('input')
        image.type='file'
        image.className='photo-input additional-item body-photos'
        image.setAttribute('multiple', '')
        image.setAttribute('accept', 'image/jpeg, image/png, image/jpg, image/tif')
        const parent = document.getElementById('content-form')
        parent.appendChild(image)
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
    }
    
    const removeLastElement = () => {
        const parent = document.getElementById('content-form')
        parent.removeChild(parent.lastChild)
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
    }

    const newParagraph = () => {
        const input = document.createElement('textarea')
        input.className='add-content-description-input content-paragraph additional-item'
        const parent = document.getElementById('content-form')
        parent.appendChild(input)
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
    }

    const checkAdditionalElement = () => {
        const additionalElements = document.getElementsByClassName('additional-item')
        if(additionalElements.length > 0) {
            setIsAdditionalElements(true)
        }else{
            setIsAdditionalElements(false)
        }
    }

    return(
        <CategoryLocationContainer visibility={props.animationMap.body[props.bodyProps].opacity} variants={props.animationMap.body} animate={props.bodyProps} transition='transition' initial={'initial'}>
            <Container visibility={props.animationMap.body[props.bodyProps].opacity} id='content-form'>
                <Label>Body content</Label>
                <DescriptionInput className='content-paragraph'></DescriptionInput>
            </Container>
            <BodyButtonContainer>
            {isAdditionalElements ? 
            <RemoveLastElement type="button" onClick={removeLastElement}>{`Remove last ${isAddImage ? 'image' : 'text block'}`}</RemoveLastElement>
            :
            null
            }
            {isAddImage ? 
            <NewItemButton type="button" onClick={newParagraph}>Add paragraph</NewItemButton>
            : 
            <NewItemButton type="button" onClick={newImage}>Add image</NewItemButton>
            }
            </BodyButtonContainer>
        </CategoryLocationContainer>
    )
}

export default Body