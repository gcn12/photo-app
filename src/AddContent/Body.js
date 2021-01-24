import React, { useState } from 'react'
import {ReactComponent as Text} from '../Icons/Text.svg'
import {ReactComponent as Image} from '../Icons/Image.svg'
import {ReactComponent as Remove} from '../Icons/Remove.svg'
import { connect } from 'react-redux'
import { imageSizeRatio, filesSmall, filesLarge, fileNames } from '../Redux/Actions/addContentActions'
import {
    NewItemButton,
    RemoveLastElement,
    Container,
    Label,
    BodyButtonContainer,
    BodyContainer,
    ButtonIconContainer,
    EmptyBodyContainer,
    BodyContainer2,
} from './AddContent.styles'

const Body = (props) => {

    const [isAddImage, setIsAddImage] = useState(false)
    const [isAdditionalElements, setIsAdditionalElements] = useState(false)
    const [isTooManyImages, setIsTooManyImages] = useState(false)

    const getImageMap = (inputID, inputDiv, index) => {
        const images = document.getElementById(inputID)
        const imagesDiv = document.getElementById(inputDiv)
        while(imagesDiv.firstChild) {
            imagesDiv.removeChild(imagesDiv.lastChild)
        }
        let sizeMapArray = new Array(images.files.length).fill('')
        if(images.files.length<4) {
            if(images.files.length>0) {
                setIsTooManyImages(false)
                let loopIndex = 0
                let imagesLength = images.files.length
                const loopProcessImages = () => {
                    let filesArraySmall = []
                    let filesArrayLarge = []
                    let fileNamesArray = []
                    const processImages = () => {
                        const file = images.files[loopIndex];
                        const fileReader  = new FileReader();
                        let percentageArray = []
                        fileReader.onload = function(e)  {
                            const displayImage = document.createElement("img");
                            displayImage.src = e.target.result;
                            displayImage.className = `upload-gallery-image upload-gallery-image-${inputDiv}`
                            displayImage.src = e.target.result;
                            displayImage.onload = function () {
                                const fileName = file.name
                                const height = this.height;
                                const width = this.width;
                                sizeMapArray[loopIndex] = width/height
                                if(sizeMapArray.length === images.files.length) {
                                    const reducer = (sum, val) => sum + val;
                                    let ratioTotal = sizeMapArray.reduce(reducer, 0);
                                    for (let image of sizeMapArray) {
                                        percentageArray.push(image/ratioTotal)
                                    }
                                    const index = inputID[inputID.length-1]
                                    const imageSizeRatioCopy = props.imageSizeRatio 
                                    imageSizeRatioCopy[index] = percentageArray
                                    props.dispacth(imageSizeRatio(imageSizeRatioCopy))
                                }
    
                                let ratio
                                let finalHeightLarge
                                let finalWidthLarge
                                let finalHeightSmall
                                let finalWidthSmall
                                if (height >= width) {
                                    ratio = width / height
                                    finalHeightLarge = 2500
                                    finalWidthLarge = Math.round(ratio * 2500)
                                    finalHeightSmall = 1200
                                    finalWidthSmall = Math.round(ratio * 1200)
                                }else {
                                    ratio = height / width
                                    finalWidthLarge = 2500
                                    finalHeightLarge = Math.round(ratio * 2500)
                                    finalWidthSmall = 1200
                                    finalHeightSmall = Math.round(ratio * 1200)
                                }
                                let canvasLarge = document.createElement('canvas'), ctx;
                                let canvasSmall = document.createElement('canvas'), ctx2;
                                canvasLarge.width = finalWidthLarge;
                                canvasLarge.height = finalHeightLarge;
                                canvasSmall.width = finalWidthSmall;
                                canvasSmall.height = finalHeightSmall;
                                ctx = canvasLarge.getContext('2d');
                                ctx2 = canvasSmall.getContext('2d');
                                ctx.drawImage(displayImage, 0, 0, canvasLarge.width, canvasLarge.height);
                                ctx2.drawImage(displayImage, 0, 0, canvasSmall.width, canvasSmall.height);
                                const smallImage = document.createElement('img')
                                const imageSrcLarge = canvasLarge.toDataURL('image/jpeg', 1)
                                const imageSrcSmall = canvasSmall.toDataURL('image/jpeg', 1)
                                smallImage.src = imageSrcSmall
                                smallImage.className = `upload-gallery-image`
                                document.getElementById(inputDiv).appendChild(smallImage)
                                filesArrayLarge.push(imageSrcLarge)
                                filesArraySmall.push(imageSrcSmall)
                                fileNamesArray.push(fileName)

                                loopIndex++
                                if(loopIndex < imagesLength) {
                                    processImages()
                                }else{
                                    const filesSmallCopy = props.filesSmall
                                    const filesLargeCopy = props.filesLarge
                                    let fileNamesCopy = {...props.fileNames}


                                    fileNamesCopy = [...props.fileNames, ...fileNamesArray]

                                    filesSmallCopy[index + 1] = filesArraySmall
                                    filesLargeCopy[index + 1] = filesArrayLarge
                                    props.dispatch(filesSmall(filesSmallCopy))
                                    props.dispatch(filesLarge(filesLargeCopy))
                                    props.dispatch(fileNames(fileNamesCopy))
                                }
                            };
                        }
                        fileReader.readAsDataURL(file);
                    }
                    processImages()
                }
                loopProcessImages()
            }
        }else{
            setIsTooManyImages(true)
        }
    }

    const newImage = () => {
        const numberInputs = document.getElementsByClassName('body-photos').length
        const image = document.createElement('input')
        image.type='file'
        image.className='photo-input additional-item body-photos item-to-upload'
        image.setAttribute('multiple', '')
        image.setAttribute('accept', 'image/jpeg, image/png, image/jpg, image/tif')
        image.id = `image-input-${numberInputs}`
        image.setAttribute('hidden', '')

        const uploadButtonLabel = document.createElement('label')
        uploadButtonLabel.htmlFor = `image-input-${numberInputs}`
        uploadButtonLabel.className = 'upload-button-label'
        uploadButtonLabel.innerHTML = 'Select images (max. 3)'

        const imageAndInputDiv = document.createElement('div')
        imageAndInputDiv.id = `image-and-input-div-${numberInputs}`
        imageAndInputDiv.className = 'image-and-input-div'
        
        const imageDiv = document.createElement('div')
        imageDiv.id = `image-div-${numberInputs}`
        imageDiv.className = 'image-div'

        imageAndInputDiv.appendChild(imageDiv)

        const parent = document.getElementById('content-form')
        parent.appendChild(image)
        parent.appendChild(imageAndInputDiv)
        parent.appendChild(uploadButtonLabel)
        setIsAddImage(true)
        image.onchange = ()=> {
            getImageMap(`image-input-${numberInputs}`, `image-div-${numberInputs}`, numberInputs)
            if(!document.getElementById(`image-caption-${numberInputs}`)){
                const imageCaption = document.createElement('input')
                imageCaption.setAttribute('placeholder', 'add image caption text (optional)')
                imageCaption.className = 'image-caption-input item-to-upload'
                imageCaption.autocomplete = 'off'
                imageCaption.id = `image-caption-${numberInputs}`
                imageAndInputDiv.appendChild(imageCaption)
            }
            const buttons = document.getElementById('body-scroll-here');
            buttons.scrollIntoView();
        }
        checkAdditionalElement()
    }
    
    const removeLastElement = () => {
        const numberInputs = document.getElementsByClassName('body-photos').length
        const parent = document.getElementById('content-form')
        parent.removeChild(parent.lastChild)
        parent.removeChild(parent.lastChild)
        if(isAddImage) {
            setIsTooManyImages(false)
            parent.removeChild(parent.lastChild)
            const imageSizeRatioCopy = props.imageSizeRatio
            delete imageSizeRatioCopy[numberInputs-1]
            props.dispatch(imageSizeRatio(imageSizeRatioCopy))
        }
        setIsAddImage(!isAddImage)
        checkAdditionalElement()
    }

    const newParagraph = () => {
        const header = document.createElement('input')
        header.className = 'new-header-input item-to-upload'
        header.placeholder = 'add paragraph header (optional)'
        const paragrah = document.createElement('textarea')
        paragrah.className='add-content-description-input content-paragraph additional-item item-to-upload'
        const parent = document.getElementById('content-form')
        parent.appendChild(header)
        parent.appendChild(paragrah)
        setIsAddImage(false)
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
        <div style={{marginTop: '64px'}}>
            <BodyContainer styles={props.bodyStyles}>
                <BodyContainer2 visibility={isAdditionalElements ? 'visible' : 'hidden'} display={isAdditionalElements ? 'initial' : 'none'} >
                    <Container id='content-form'>
                        <Label>Body content</Label>
                    </Container>
                    {isTooManyImages ? <div>Exceeded image limit of three</div> : null}
                    <BodyButtonContainer id='add-content-body-buttons'>
                        {isAdditionalElements ? 
                        <RemoveLastElement type="button" onClick={removeLastElement}>
                            <ButtonIconContainer>
                            <Remove />
                            </ButtonIconContainer>
                        </RemoveLastElement>
                        :
                        null
                        }
                        <NewItemButton long={!isAdditionalElements} type="button" onClick={newParagraph}>
                            <ButtonIconContainer>
                                <Text />
                            </ButtonIconContainer>
                        </NewItemButton>
                        <NewItemButton border='1px solid white' long={!isAdditionalElements} type="button" onClick={newImage}>
                            <ButtonIconContainer>
                                <Image />
                            </ButtonIconContainer>
                        </NewItemButton>
                    </BodyButtonContainer>
                    <div id='body-scroll-here'></div>
                </BodyContainer2>
                <div style={{marginTop: '72px'}}></div>
            </BodyContainer>
        {isAdditionalElements ? 
        null
        :
        <EmptyBodyContainer styles={props.styles}>
            <Container>
                <Label>Body content</Label>
            </Container>
            <BodyButtonContainer id='add-content-body-buttons'>
                <NewItemButton long={!isAdditionalElements} type="button" onClick={newParagraph}>
                    <ButtonIconContainer>
                        <Text />
                    </ButtonIconContainer>
                </NewItemButton>
                <NewItemButton border='1px solid white' long={!isAdditionalElements} type="button" onClick={newImage}>
                    <ButtonIconContainer>
                        <Image />
                    </ButtonIconContainer>
                </NewItemButton>
            </BodyButtonContainer>
        </EmptyBodyContainer>}
        </div>
        
    )
}

const mapStateToProps = state => ({
    bodyStyles: state.addContent.bodyStyles,
    imageSizeRatio: state.addContent.imageSizeRatio,
    filesSmall: state.addContent.filesSmall,
    filesLarge: state.addContent.filesLarge,
    fileNames: state.addContent.fileNames,
})

export default connect(mapStateToProps)(Body)