import React, { useState } from 'react'

import {
    DescriptionInput,
    NewItemButton,
    RemoveLastElement,
    Container,
    Label,
    BodyButtonContainer,
    CategoryLocationContainer,
} from './AddContent.styles'

const Body = (props) => {

    const [isAddImage, setIsAddImage] = useState(false)
    const [isAdditionalElements, setIsAdditionalElements] = useState(false)
    const [isTooManyImages, setIsTooManyImages] = useState(false)

    const getImageMap = (inputID, inputDiv) => {
        const images = document.getElementById(inputID)
        let sizeMapArray = new Array(images.files.length).fill('')
        if(images.files.length<4) {
            if(images.files.length>1) {
                props.setBody('shiftUp')
                setIsTooManyImages(false)
                for (let i = 0; i < images.files.length; i++) {
                    const file = images.files[i];
                    const fileReader  = new FileReader();
                    fileReader.onload = function(e)  {
                        const displayImage = document.createElement("img");
                        displayImage.src = e.target.result;
                        displayImage.className = 'upload-gallery-image'
                        // document.body.appendChild(displayImage);
                        document.getElementById(inputDiv).appendChild(displayImage);
                    }
                    fileReader.readAsDataURL(file);
    
                    let percentageArray = []
                    const reader = new FileReader()
                    reader.readAsDataURL(images.files[i]);
                    reader.onload = (e) => {
                        const image = document.createElement('img')
                        image.src = e.target.result;
                        image.onload = function () {
                            const height = this.height;
                            const width = this.width;
                            sizeMapArray[i] = width/height
                            if(sizeMapArray.length === images.files.length) {
                                const reducer = (sum, val) => sum + val;
                                let ratioTotal = sizeMapArray.reduce(reducer, 0);
                                for (let image of sizeMapArray) {
                                    percentageArray.push(image/ratioTotal)
                                }
                                const index = inputID[inputID.length-1]
                                const imageSizeRatioCopy = props.imageSizeRatio 
                                imageSizeRatioCopy[index] = percentageArray
                                props.setImageSizeRatio(imageSizeRatioCopy)
                            }
                        };
                    }
                }
            }else{
                const index = inputID[inputID.length-1]
                const imageSizeRatioCopy = props.imageSizeRatio 
                imageSizeRatioCopy[index] = [1]
                props.setImageSizeRatio(imageSizeRatioCopy)
                const file = images.files[0];
                const fileReader  = new FileReader();
                fileReader.onload = function(e)  {
                    const displayImage = document.createElement("img");
                    displayImage.src = e.target.result;
                    displayImage.className = 'upload-gallery-image'
                    document.getElementById(inputDiv).appendChild(displayImage);
                }
                fileReader.readAsDataURL(file);
            }
        }else{
            setIsTooManyImages(true)
        }
    }

    const newImage = () => {
        const numberInputs = document.getElementsByClassName('body-photos').length
        const image = document.createElement('input')
        image.type='file'
        image.className='photo-input additional-item body-photos'
        image.setAttribute('multiple', '')
        image.setAttribute('accept', 'image/jpeg, image/png, image/jpg, image/tif')
        image.id = `image-input-${numberInputs}`
        image.setAttribute('hidden', '')

        const uploadButtonLabel = document.createElement('label')
        uploadButtonLabel.htmlFor = `image-input-${numberInputs}`
        uploadButtonLabel.className = 'upload-button-label'
        uploadButtonLabel.innerHTML = 'Select images (max. 3)'
        
        const imageDiv = document.createElement('div')
        imageDiv.id = `image-div-${numberInputs}`
        imageDiv.className = 'image-div'

        const parent = document.getElementById('content-form')
        parent.appendChild(image)
        parent.appendChild(imageDiv)
        parent.appendChild(uploadButtonLabel)
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
        image.onchange = ()=> {
            getImageMap(`image-input-${numberInputs}`, `image-div-${numberInputs}`)
            // props.setBody('shiftUp')
            const buttons = document.getElementById('body-scroll-here');
            buttons.scrollIntoView();
        }
    }
    
    const removeLastElement = () => {
        const numberInputs = document.getElementsByClassName('body-photos').length
        const parent = document.getElementById('content-form')
        parent.removeChild(parent.lastChild)
        if(isAddImage) {
            setIsTooManyImages(false)
            parent.removeChild(parent.lastChild)
            parent.removeChild(parent.lastChild)
            const imageSizeRatioCopy = props.imageSizeRatio
            delete imageSizeRatioCopy[numberInputs-1]
            props.setImageSizeRatio(imageSizeRatioCopy)
        }
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
        // if(document.getElementsByClassName('add-content-description-input').length > 0){
        //     props.setBody('shiftUp')
        // }
     }

    const checkAdditionalElement = () => {
        const additionalElements = document.getElementsByClassName('additional-item')
        if(additionalElements.length > 0) {
            setIsAdditionalElements(true)
        }else{
            setIsAdditionalElements(false)
        }
    }

    const checkProceed = () => {
        if(document.getElementById('content-paragraph-original').value.length > 60) {
            props.setBodyProceed(true)
        }else{
            props.setBodyProceed(false)
        }
    }

    return(
        <CategoryLocationContainer visibility={props.animationMap.body[props.bodyProps].opacity} variants={props.animationMap.body} animate={props.bodyProps} transition='transition' initial={'initial'}>
            <Container visibility={props.animationMap.body[props.bodyProps].opacity} id='content-form'>
                <Label>Body content</Label>
                <DescriptionInput onChange={checkProceed} className='content-paragraph' id='content-paragraph-original'></DescriptionInput>
            </Container>
            {isTooManyImages ? <div>Exceeded image limit of three</div> : null}
            <BodyButtonContainer id='add-content-body-buttons'>
                {isAdditionalElements ? 
                <RemoveLastElement type="button" onClick={removeLastElement}>{`Remove last ${isAddImage ? 'image' : 'text block'}`}</RemoveLastElement>
                :
                null
                }
                {isAddImage ? 
                <NewItemButton type="button" onClick={newParagraph}>Add paragraph</NewItemButton>
                : 
                <NewItemButton long={!isAdditionalElements} type="button" onClick={newImage}>Add image</NewItemButton>
                }
            </BodyButtonContainer>
            <div id='body-scroll-here'></div>
        </CategoryLocationContainer>
    )
}

export default Body